import { FieldValues } from "react-hook-form";
import { Supabase } from "../utils/supabase";
import { SeriesColumn } from "../types/Series";
import { SuccessOptions } from "../utils/types";
import { TaskColumn, TaskPayload, TaskScoringPayload } from "../types/Tasks";
import { EpisodeColumn } from "../types/Episodes";

export const submitTask = async (supabase: Supabase, data: FieldValues) => {
    const series = data.Series;
    const { data: getSeriesData, error: getErrorData } = await supabase.getSeries([SeriesColumn.Left, SeriesColumn.MiddleLeft, SeriesColumn.Middle, SeriesColumn.MiddleRight, SeriesColumn.Right], [{ column: SeriesColumn.Name, value: series}])
    if (getErrorData || !getSeriesData) throw new Error(JSON.stringify(getErrorData));
    const isTiebreak = data.IsTiebreak;
    const IsLiveTask = data.IsLiveTask;
    const IsPrizeTask = data.IsPrizeTask;
    let TotalPoints = 0;
    let tempTaskPayload: Partial<TaskScoringPayload> = {}
    for (const position of ['Left', 'Middle-Left', 'Middle', 'Middle-Right', 'Right']) {
        const value = data[position];
        
        if (Number(value)) {
            TotalPoints += Number(value)
        }
        if (tempTaskPayload[value as keyof TaskScoringPayload]) {
            (tempTaskPayload[value as keyof TaskScoringPayload] as string[]).push((getSeriesData as any[])[0][position])
        } else {
            (tempTaskPayload[value as keyof TaskScoringPayload] as string[]) = [(getSeriesData as any[])[0][position]]
        }
    }
    const taskUploadPayload: TaskPayload = {
        Name: data.Name,
        Series: data.Series,
        Episode: data.Episode,
        Participants: data.Participants,
        NumOfParticipants: data.Participants.length,
        Categories: data.Categories.split(',') ?? [],
        HasSecret: data.HasSecret,
        IsTeamTask: data.IsTeamTask,
        IsLiveTask: data.IsLiveTask,
        IsPrizeTask,
        isTiebreak,
        IsVisualEditing: data.IsVisualEditing,
        ContestantUsesVisualEditing: data.ContestantUsesVisualEditing.length ? data.ContestantUsesVisualEditing : null,
        Location: data.Location.split(',') ?? [],
        CompletelyObjective: data.CompletelyObjective,
        IsCompletedInStudio: data.IsCompletedInStudio,
        TotalPoints,
        Winner: data.Winner
    }
    const taskUploadError = await supabase.addTask(taskUploadPayload)
    if (taskUploadError) return { success: SuccessOptions.Undefined, errorMessage: `Error submitting task to Tasks table: \n ${taskUploadError.message}` }
    const { data: getTaskData, error: getTaskError } = await supabase.getTask(TaskColumn.Id, [{ column: TaskColumn.Name, value: data.Name}])
    if (getTaskError) return { success: SuccessOptions.Failure, errorMessage: `Failed to get task after upload: ${getTaskError.message}`}
    const taskId = (getTaskData[0] as unknown as { id: number}).id
    const taskScoringUploadPayload: Partial<TaskScoringPayload> = {
        ...tempTaskPayload,
        task: taskId,
        'Total Points': TotalPoints
    }
    const taskScoringUploadError = await supabase.addTaskScoring(taskScoringUploadPayload)
    if (taskScoringUploadError) return { success: SuccessOptions.Failure, errorMessage: `Failed to add TaskScoring: \n ${taskScoringUploadError.message}`}
    const episodeFilters = [{ column: EpisodeColumn.Number, value: data.Episode }, { column: EpisodeColumn.Series, value: data.Series}]

    if (IsPrizeTask) {
        const prizeTaskUploadError = await supabase.updateEpisode([{ column: EpisodeColumn.PrizeTask, value: data.Name}], episodeFilters)
        if (prizeTaskUploadError) return { success: SuccessOptions.Failure, errorMessage: `Failed to update Episode Prize Task: \n ${prizeTaskUploadError.message}`}
    } else if (IsLiveTask) {
        const liveTaskUploadError = await supabase.updateEpisode([{ column: EpisodeColumn.LiveTask, value: data.Name}], episodeFilters)
        if (liveTaskUploadError) return { success: SuccessOptions.Failure, errorMessage: `Failed to update Episode Live Task: \n ${liveTaskUploadError.message}`}
    } else {
        const { data: episodeData, error: episodeError } = await supabase.getEpisodes([EpisodeColumn.RecordedTasks, EpisodeColumn.AdditionalTasks], episodeFilters)
        if (episodeError) return { success: SuccessOptions.Failure, errorMessage: `Failed to fetch Episode data: \n ${episodeError.message}` }
        const { [EpisodeColumn.RecordedTasks]: recordedTasks, [EpisodeColumn.AdditionalTasks]: additionalTasks } = episodeData[0] as unknown as { [EpisodeColumn.RecordedTasks]: string[], [EpisodeColumn.AdditionalTasks]: string[]}
        if (!isTiebreak && taskUploadPayload.NumOfParticipants === 5) {
            recordedTasks.push(taskUploadPayload.Name)
            const additionalTasksUploadError = await supabase.updateEpisode([{ column: EpisodeColumn.RecordedTasks, value: recordedTasks}], episodeFilters)
            if (additionalTasksUploadError) return { success: SuccessOptions.Failure, errorMessage: `Failed to update Episode Recorded Tasks: \n ${additionalTasksUploadError.message}`}
        } else {
            additionalTasks.push(taskUploadPayload.Name)
             const additionalTasksUploadError = await supabase.updateEpisode([{ column: EpisodeColumn.AdditionalTasks, value: additionalTasks}], episodeFilters)
            if (additionalTasksUploadError) return { success: SuccessOptions.Failure, errorMessage: `Failed to update Episode Additional Task: \n ${additionalTasksUploadError.message}`}
        }
    }

    return { success: SuccessOptions.Success, errorMessage: ''}
}