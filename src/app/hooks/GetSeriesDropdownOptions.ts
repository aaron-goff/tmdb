import { useEffect, useState } from "react"
import { Supabase } from "../utils/supabase"
import { SeriesColumn } from "../types/Series"
import { SuccessOptions } from "../utils/types"

export default function GetSeriesDropdownOptions(supabase: Supabase, seriesPlaceholder: string) {
    const [success, setSuccess] = useState(SuccessOptions.Undefined)
    const [errorMessage, setErrorMessage] = useState('');
    const [series, setSeries] = useState([
        { label: seriesPlaceholder, value: seriesPlaceholder, disabled: true },
    ])

    useEffect(() => {
        const getSeries = async () => {
            const { data: getSeriesData, error: getSeriesError } =
                await supabase.getSeries(SeriesColumn.Name)
            if (getSeriesError) {
                setSuccess(SuccessOptions.Failure)
                setErrorMessage(
                    `Something went wrong fetching contestants: \n"${getSeriesError.message}"`
                )
                return
            }
            const options = (getSeriesData as unknown as { Name: string }[])
                .map((x) => x.Name)
                .sort((a, b) => {
                    if (a.match(/^\d.*/) && b.match(/^\d.*/)) {
                        return parseInt(a) - parseInt(b)
                    }
                    return a.toLowerCase().localeCompare(b.toLowerCase())
                })
                .map((x) => ({ label: x, value: x, disabled: false }))
            setSeries([
                {
                    label: seriesPlaceholder,
                    value: seriesPlaceholder,
                    disabled: true,
                },
                ...options,
            ])
        }
        getSeries()
    }, [seriesPlaceholder, supabase])

    return { success, errorMessage, series }
}