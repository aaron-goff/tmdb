import { createClient} from "@supabase/supabase-js";
import { ContestantColumn, ContestantsUploadPayload } from "../types/Contestants";
import { SeriesColumn, SeriesPayload } from "../types/Series";
import { EpisodeColumn, EpisodePayload } from "../types/Episodes";
import { TaskColumn, TaskPayload, TaskScoringPayload } from "../types/Tasks";
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config({ path: '.env' })

const supabaseUrl = process.env['NEXT_PUBLIC_SUPABASE_URL']
const supabaseKey = process.env['NEXT_PUBLIC_SUPABASE_KEY']

if (!supabaseUrl || !supabaseKey) {
    throw new Error(`SupabaseUrl or SupabaseKey is not provided.`)
}

const supabaseClient = createClient(supabaseUrl, supabaseKey);

export class Supabase {
    client = supabaseClient

    constructor() {
        this.client = supabaseClient
    }

    signout = async () => await this.client.auth.signOut()

    getContestants = async (columns: ContestantColumn | ContestantColumn[] = [], filters: {column: ContestantColumn, value: string | string[] | number[]}[] = []) => {
        let query = this.client.from('Contestants').select(columns.length > 0 ? Array.isArray(columns) ? columns.join(',') : `"${columns}"` : '*' )
        filters.forEach(({column, value}) => {
            if (Array.isArray(value)) {
                query = query.contains(column, value)
            } else {
                query = query.eq(column, value)
            }
        })
        return await query;
    }

    addContestants = async (payload: ContestantsUploadPayload) => {
        const { error} = await this.client.from('Contestants').insert(payload)
        return error
    }

    getSeries = async (columns: SeriesColumn | SeriesColumn[] = [], filters: { column: SeriesColumn, value: string | string[] | number[]}[] = []) => {
        let query = this.client.from('Series').select(columns.length > 0 ? Array.isArray(columns) ? columns.join(',') : columns : '*' )
        filters.forEach(({column, value}) => {
            if (Array.isArray(value)) {
                query = query.contains(column, value)
            } else {
                query = query.eq(column, value)
            }
        })
        return await query
    }

    addSeries = async (payload: SeriesPayload) => {
        const { error } = await this.client.from('Series').insert(payload)
        return error
    }

    getEpisodes = async (columns: EpisodeColumn | EpisodeColumn[] = [], filters: { column: EpisodeColumn, value: string | string[] | number[]}[] = []) => {
        let query = this.client.from('Episode').select(columns.length > 0 ? Array.isArray(columns) ? columns.join(',') : columns : '*' )
        filters.forEach(({column, value}) => {
            if (Array.isArray(value)) {
                query = query.contains(column, value)
            } else {
                query = query.eq(column, value)
            }
        })
        return await query
    }

    addEpisode = async (payload: EpisodePayload) => {
        const { error } = await this.client.from('Episode').insert(payload)
        return error
    }

    updateEpisode = async (columnsToUpdate: {column: EpisodeColumn, value: string | string[] | number[]}[], filters: {column: EpisodeColumn, value: string | string[] | number[]}[]) => {
        const updatePayload: Partial<Record<EpisodeColumn, string | string[] | number | number[]>> = {};
        columnsToUpdate.forEach(({ column, value}) => {
            updatePayload[column] = value
        })
        let query = this.client.from('Episode').update(updatePayload)
        for (const {column, value } of filters) {
            query = query.eq(column, value)
        }
        const { error } = await query
        return error
    }

    getContestantsByPositionInSeries = async (seriesName: string) => {
        const query = this.client.from('Series').select('Left,Middle-Left,Middle,Middle-Right,Right').eq('Name', seriesName)
        return await query
    }

    getTask = async (columns: TaskColumn | TaskColumn[] = [], filters: { column: TaskColumn, value: string | string[] | number[]}[] = []) => {
        let query = this.client.from('Tasks').select(columns.length > 0 ? Array.isArray(columns) ? columns.join(',') : columns : '*' )
        filters.forEach(({column, value}) => {
            if (Array.isArray(value)) {
                query = query.contains(column, value)
            } else {
                query = query.eq(column, value)
            }
        })
        return await query
    }

    addTask = async (payload: TaskPayload) => {
        const { error } = await this.client.from('Tasks').insert(payload)
        return error
    }

    addTaskScoring = async (payload: Partial<TaskScoringPayload>) => {
        const { error } = await this.client.from('TaskScoring').insert(payload)
        return error
    }
}