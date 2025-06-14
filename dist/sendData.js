"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabase = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const contestants_1 = require("./data/contestants");
const serieses_1 = require("./data/serieses");
const episodes_1 = require("./data/episodes");
const tasks_1 = require("./data/tasks");
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
console.log(supabaseUrl);
console.log(supabaseKey);
if (!supabaseUrl || !supabaseKey) {
    throw new Error(`SupabaseUrl or SupabaseKey is not provided.`);
}
exports.supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
const updateSeries = async () => {
    const { data: getData, error: getError } = await exports.supabase.from('Series').select();
    if (getError)
        throw new Error(JSON.stringify(getError));
    const seriesNames = getData.map(x => x.Name);
    for (const series of serieses_1.seriesData) {
        const uploadPayload = series.getSeriesPayload();
        const data = getData.find(x => x.Name === series.name);
        if (!data) {
            const { data: uploadData, error: uploadError } = await exports.supabase.from('Series').insert(uploadPayload);
            if (uploadError) {
                throw new Error(JSON.stringify(uploadError));
            }
            else {
                console.log(`Successfully Added Series "${series.name}"`);
            }
        }
        else {
            const updateData = {};
            Object.entries(uploadPayload).forEach(([key, value]) => {
                if (key in data && data[key] !== value) {
                    updateData[key] = value;
                }
            });
            if (Object.keys(updateData).length) {
                const { data: updateSeriesData, error: errorSeriesData } = await exports.supabase.from('Series').update(updateData).eq('id', data.id);
                if (errorSeriesData) {
                    throw new Error(JSON.stringify(errorSeriesData));
                }
                else {
                    console.log(`Successfully Updated Series "${series.name}"`);
                }
            }
            else {
                console.log(`Series "${series.name}" already in database, skipping...`);
            }
        }
    }
};
const updateContestants = async () => {
    const { data: getData, error: getError } = await exports.supabase.from('Contestants').select();
    if (getError)
        throw new Error(JSON.stringify(getError));
    for (const contestant of contestants_1.contestants) {
        const uploadPayload = contestant.getContestantUploadData();
        const contestantData = getData.find(x => x["Full Name"] === contestant.fullName);
        if (!contestantData) {
            const { data: uploadData, error: uploadError } = await exports.supabase.from('Contestants').insert(uploadPayload);
            if (uploadError) {
                throw new Error(JSON.stringify(uploadError));
            }
            else {
                console.log(`Successfully Added Contestant "${contestant.fullName}"`);
            }
        }
        else {
            const updateData = {};
            Object.entries(uploadPayload).forEach(([key, value]) => {
                if (key in contestantData) {
                    if (Array.isArray(contestantData[key]) && Array.isArray(value) && (JSON.stringify(value) !== JSON.stringify(contestantData[key]) || contestantData[key].length !== value.length)) {
                        updateData[key] = value;
                    }
                    else if (!Array.isArray(contestantData[key]) && !Array.isArray(value) && contestantData[key] !== value) {
                        updateData[key] = value;
                    }
                }
            });
            if (Object.keys(updateData).length) {
                const { data: updateTaskData, error: errorTaskData } = await exports.supabase.from('Contestants').update(updateData).eq('id', contestantData.id);
                if (errorTaskData) {
                    throw new Error(JSON.stringify(errorTaskData));
                }
                else {
                    console.log(`Successfully Updated Contestant "${contestant.fullName}"`);
                }
            }
            else {
                console.log(`Contestant "${contestant.fullName}" already in database, skipping...`);
            }
        }
    }
};
const updateEpisodes = async () => {
    const { data: getData, error: getError } = await exports.supabase.from('Episode').select('Name');
    if (getError)
        throw new Error(JSON.stringify(getError));
    const episodeNames = getData.map(x => x.Name);
    // TODO: Add updating episodes
    for (const episode of episodes_1.episodes) {
        if (!episodeNames.map(x => x.toString().toLowerCase()).includes(episode.name.toLowerCase())) {
            const { data: uploadData, error: uploadError } = await exports.supabase.from('Episode').insert(episode.getEpisodeUploadPayload());
            if (uploadError) {
                throw new Error(JSON.stringify(uploadError));
            }
            else {
                console.log(`Successfully added Episode "${episode.name}`);
            }
        }
        else {
            console.log(`Episode "${episode.name} already in database, skipping...`);
        }
    }
};
// TODO: Add update for TasksScoring
const updateTasks = async () => {
    const { data: getTasksData, error: getTasksError } = await exports.supabase.from('Tasks').select();
    if (getTasksError)
        throw new Error(JSON.stringify(getTasksError));
    const taskNames = getTasksData.map(x => x.Name);
    for (const task of tasks_1.tasks) {
        const uploadPayload = task.getTaskUploadPayload();
        const taskData = getTasksData.find(x => x.Name === task.name) || undefined;
        if (!taskData) {
            const { data: uploadTaskData, error: uploadTaskError } = await exports.supabase.from('Tasks').insert(uploadPayload);
            if (uploadTaskError) {
                throw new Error(JSON.stringify(uploadTaskError));
            }
            else {
                console.log(`Successfully Added Task ${task.name}`);
            }
            const { data: getTaskData, error: getTaskError } = await exports.supabase.from('Tasks').select();
            const id = getTaskData?.find(x => x.Name === task.name).id;
            const { data: uploadTasksScoringData, error: uploadTasksScoringError } = await exports.supabase.from('TaskScoring').insert(task.getTaskScoringUploadPayload(id));
            if (uploadTasksScoringError) {
                throw new Error(JSON.stringify(uploadTasksScoringError));
            }
            else {
                console.log(`Successfully Added TaskScoring for ${task.name}`);
            }
        }
        else {
            const id = taskData.id;
            const updateData = {};
            Object.entries(uploadPayload).filter(([key, value]) => {
                if (key in taskData) {
                    if (task.episode === 3) {
                        console.log('start');
                        console.log('key', key);
                        console.log(Array.isArray(taskData[key]));
                        console.log(Array.isArray(value));
                        if (Array.isArray(value) && Array.isArray(taskData[key])) {
                            console.log(!taskData[key].every((x) => Array.isArray(value) && value?.includes(x)));
                            console.log(Array.isArray(value) && taskData[key].length !== value?.length);
                        }
                        console.log('stop');
                    }
                    if (Array.isArray(taskData[key]) && Array.isArray(value) && (!taskData[key].every(x => value.includes(x) || taskData[key].length !== value.length))) {
                        updateData[key] = value;
                    }
                    else if (!Array.isArray(taskData[key]) && taskData[key] !== value) {
                        updateData[key] = value;
                    }
                }
            });
            if (Object.keys(updateData).length) {
                const { data: updateTaskData, error: errorTaskData } = await exports.supabase.from('Tasks').update(updateData).eq('id', id);
                if (errorTaskData) {
                    throw new Error(JSON.stringify(errorTaskData));
                }
                else {
                    console.log(`Successfully Updated Task "${task.name}"`);
                }
            }
            else {
                console.log(`Task "${task.name}" already in database, skipping...`);
            }
        }
    }
};
const run = async () => {
    await updateSeries();
    await updateContestants();
    await updateEpisodes();
    await updateTasks();
};
run();
