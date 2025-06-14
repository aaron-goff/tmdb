import { Supabase } from "../utils/supabase"

export const getContestants = async () => {
    const supabase = new Supabase().client
    const { data: getData, error: getError } = await supabase
        .from('Contestants')
        .select()
    if (getError) {
        throw new Error(JSON.stringify(getError));
    }
    const { data: episodeData, error: episodeError } = await supabase.from('Episode').select()
    if (episodeError) throw new Error(JSON.stringify(episodeError));
    const { data: taskData, error: taskError } = await supabase.from('Tasks').select(`*, TaskScoring( * )`)
    if (taskError) throw new Error(JSON.stringify(taskError));
    // const { data: taskScoringData, error: taskScoringError } = await supabase.from('TaskScoring').select();
    // if (taskScoringError) throw new Error(JSON.stringify(taskScoringError))

    // const liveTasks = taskData.filter(x => x.IsLiveTask).map(x => x.Name)

    const foo = getData.map(contestant => {
        const contestantName = contestant['Full Name']
        const totalWins = episodeData.filter(episode => episode.First[0] === contestantName).length ?? 0;
        const liveTasks = taskData.filter(x => x.IsLiveTask && x.Participants.includes(contestant['Full Name'])) ?? [];
        const tasksScoring = liveTasks.map(x => x.TaskScoring);
        let livetaskPoints = 0;
        let totalLiveTaskPoints = 0
        tasksScoring.forEach(x => {
            Object.entries(x).forEach(([key,value]) => {
                if (Number(key) && Array.isArray(value) && value) {
                    totalLiveTaskPoints += Number(key) * value.length
                } else if (Number(key) && !Array.isArray(value) && value) {
                    totalLiveTaskPoints += Number(key)
                }
                if (Array.isArray(value) && value.includes(contestantName)) {
                    livetaskPoints += Number(key) ? Number(key) : 0
                } else if (value === contestantName) {
                    livetaskPoints += Number(key) ? Number(key) : 0
                }
            })
        })
        
        return {
            ...contestant,
            'Episode Wins': totalWins,
            'Live Task Points': livetaskPoints,
            'Total Live Task Points': totalLiveTaskPoints,
            'Percentage Total Live Task Points': `${Math.round((livetaskPoints / totalLiveTaskPoints) * 100) ?? 0}%`
        }
    })
    return foo
}