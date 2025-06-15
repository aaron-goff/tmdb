import { useEffect, useState } from "react"
import { Supabase } from "../utils/supabase"
import { ContestantColumn } from "../types/Contestants"
import { DropdownOption, SuccessOptions } from "../utils/types"
import { UseFormMethods } from "../types/UseFormMethods"

export default function GetSeriesContestants(supabase: Supabase, methods: UseFormMethods, seriesName?: string, defaultContestantOptions?: DropdownOption[], updatedPlaceholder?: DropdownOption) {
    const [contestants, setContestants] = useState(new Array(5).fill(null))
    const [success, setSuccess] = useState(SuccessOptions.Undefined)
    const [errorMessage, setErrorMessage] = useState('');
    const [contestantOptions, setContestantOptions] = useState<
            DropdownOption[]
        >(defaultContestantOptions && defaultContestantOptions.length > 0 ? defaultContestantOptions : [])
    const [getContestantsIsLoading, setGetContestantsIsLoading] = useState(false)

    useEffect(() => {
        const getContestants = async () => {
            setGetContestantsIsLoading(true)
            if (seriesName) {
                const { data: getContestantsData, error: getContestantsError } =
                    await supabase.getContestants(ContestantColumn.FullName, [{ column: ContestantColumn.Series, value: [seriesName]}])
                if (getContestantsError) {
                    setSuccess(SuccessOptions.Failure)
                    setErrorMessage(
                        `Something went wrong fetching contestants: \n"${getContestantsError.message}"`
                    )
                    return
                }
                const formattedContestantNames = (getContestantsData as unknown as {'Full Name': string}[]).map((x) => x['Full Name'])
                setContestants(formattedContestantNames)
                const newOptions = formattedContestantNames.map((x: string) => ({
                    value: x,
                    label: x,
                    disabled: false,
                }))
                if (!newOptions.length) {
                    newOptions.push({
                    label: 'No contestants found',
                    value: 'No contestants found',
                    disabled: true,
                })
                }
                if (updatedPlaceholder !== undefined) {
                    setContestantOptions([updatedPlaceholder, ...newOptions])
                } else if (defaultContestantOptions && defaultContestantOptions.length > 0) {
                    setContestantOptions([...defaultContestantOptions, ...newOptions])
                } else {
                    setContestantOptions(newOptions)
                }
            }
            setGetContestantsIsLoading(false)
        }

        // Debounce the API call
        const timeoutId = setTimeout(getContestants, 300)
        return () => clearTimeout(timeoutId)
    }, [seriesName, methods.setValue])

    return {success, errorMessage, contestants, contestantOptions, getContestantsIsLoading}
}