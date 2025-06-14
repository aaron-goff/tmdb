import { useEffect, useState } from "react";
import { DropdownOption, SuccessOptions } from "../utils/types";
import { Supabase } from "../utils/supabase";
import { EpisodeColumn } from "../types/Episodes";
import { UseFormReturn, FieldValues } from "react-hook-form";

export const getEpisodesBySeries = (supabase: Supabase, methods: UseFormReturn<FieldValues, any, FieldValues>,seriesName: string, episodePlaceholder: DropdownOption) => {
    const [success, setSuccess] = useState(SuccessOptions.Undefined)
    const [errorMessage, setErrorMessage] = useState('');
    const [episodes, setEpisodes] = useState([
       episodePlaceholder,
    ])

    useEffect(() => {
        const getEpisodes = async () => {
            const { data, error } = await supabase.getEpisodes([EpisodeColumn.Number, EpisodeColumn.Name], [{ column: EpisodeColumn.Series, value: seriesName}])
            if (error) {
                setSuccess(SuccessOptions.Failure)
                setErrorMessage(`Something went wrong fetching episodes for Series ${seriesName}. \n\n${error.message}`)
                return
            }
            const options: DropdownOption[] = (data as unknown as { Name: string, Number: number }[])
                .sort(({ Number: a}, { Number: b}) => {
                    return a - b
                })
                .map((x) => ({ label: `Ep. ${x.Number}: ${x.Name}`, value: `Ep. ${x.Number}: ${x.Name}`, disabled: false }))
            setEpisodes([episodePlaceholder, ...options])
        }
        getEpisodes()
    }, [seriesName, methods.setValue])
    return { success, errorMessage, episodes }
}