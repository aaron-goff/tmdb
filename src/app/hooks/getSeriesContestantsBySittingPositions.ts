import { useEffect, useState } from "react"
import { Supabase } from "../utils/supabase"
import { UseFormReturn, FieldValues } from "react-hook-form"
import { SeriesColumn } from "../types/Series"
import { SuccessOptions } from "../utils/types"

export const getSeriesContestantsBySettingPosition = (supabase: Supabase, methods: UseFormReturn<FieldValues, any, FieldValues>, seriesName?: string,) => {
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
                    const episodeData = data as any[]
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
    }, [seriesName, methods.setValue])

    return { success, errorMessage, left, middleLeft, middle, middleRight, right}
}