import { useEffect, useState } from "react"
import { Supabase } from "../utils/supabase"
import { SeriesColumn } from "../types/Series"
import { SuccessOptions } from "../utils/types"
import { UseFormMethods } from "../types/UseFormMethods"

export const GetSeriesContestantsBySettingPosition = (supabase: Supabase, methods: UseFormMethods, seriesName?: string,) => {
    const [left, setLeft] = useState('')
    const [middleLeft, setMiddleLeft] = useState('')
    const [middle, setMiddle] = useState('')
    const [middleRight, setMiddleRight] = useState('')
    const [right, setRight] = useState('')
    const [success, setSuccess] = useState(SuccessOptions.Undefined)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        const getContestants = async () => {
            if (seriesName) {
                const { data, error } = await supabase.getSeries([SeriesColumn.Left, SeriesColumn.MiddleLeft, SeriesColumn.Middle, SeriesColumn.MiddleRight, SeriesColumn.Right], [{ column: SeriesColumn.Name, value: seriesName}])
                if (data) {
                    const episodeData = data as unknown as {Left: string; 'Middle-Left': string; Middle: string; 'Middle-Right': string; Right: string}[]
                    setLeft(episodeData[0].Left)
                    setMiddleLeft(episodeData[0]['Middle-Left'])
                    setMiddle(episodeData[0].Middle)
                    setMiddleRight(episodeData[0]['Middle-Right'])
                    setRight(episodeData[0].Right)
                } else {
                    setSuccess(SuccessOptions.Failure)
                    setErrorMessage(`Something has gone wrong fetching contestants by position: ${error.message}`)
                }
            } 
        }

        // Debounce the API call    
        const timeoutId = setTimeout(getContestants, 300)
        return () => clearTimeout(timeoutId)
    }, [seriesName, methods.setValue, supabase])

    return { success, errorMessage, left, middleLeft, middle, middleRight, right}
}