import { SeriesColumn, SeriesPayload } from "../types/Series";
import { Supabase } from "../utils/supabase";
import { FieldValues } from "react-hook-form";
import { SuccessOptions } from "../utils/types";

export const submitSeries = async (supabase: Supabase, data: FieldValues) => {
    const series = await supabase.getSeries(SeriesColumn.Name, [{ column: SeriesColumn.Name, value: data['Name']}])
    if (series.data && series.data.length) {
        return { success: SuccessOptions.Failure, errorMessage: `Series with name ${data['Name']} already exists. Try using the update page instead (Update page does not exist yet)`}
    }
    const payload: Partial<SeriesPayload> = {
        Name: "",
        Left: "",
        "Middle-Left": "",
        Middle: "",
        "Middle-Right": "",
        Right: "",
        Episodes: 0,
        Network: "",
        IsSpecial: false,
        Date: ""
    }
    Object.entries(data).forEach(([key, value]) => {
        if (key === 'Episodes') {
            payload[key] = Number(value)
        } else if (key === 'IsSpecial') {
            payload[key] = Boolean(value)
        } else {
            payload[key as keyof SeriesPayload] = value
        }
    })
    const uploadError = await supabase.addSeries(payload as SeriesPayload);
    return { 
        success: uploadError ? SuccessOptions.Failure : SuccessOptions.Success,
        errorMessage: uploadError ? `Something went wrong uploading the episode.\n${uploadError.message}` : ''
    }
}