import { FieldValues } from "react-hook-form"
import { Supabase } from "../utils/supabase"
import { ContestantColumn, ContestantsUploadPayload } from "../types/Contestants"
import { SuccessOptions } from "../utils/types"

export const submitContestant = async (supabase: Supabase, data: FieldValues) => {
    const fullName = `${data['First Name']} ${data['Last Name']}`
    const { data: contestantData, error: getContestantError } =
        await supabase.getContestants(ContestantColumn.FullName, [
            { column: ContestantColumn.FullName, value: fullName },
        ])
    if (getContestantError) {
            return { success: SuccessOptions.Failure, errorMessage: `Something went wrong fetching contestants: \n"${getContestantError.message}"`
        }
    }
    const payload: Partial<ContestantsUploadPayload> = {
        'Full Name': fullName,
    }
    Object.entries(data).forEach(([key, value]) => {
        if (key === 'Series') {
            payload[key] = value.map(toString)
        } else if (key === 'Age') {
            payload[key] = value
                .toString()
                .split(',')
                .map((x: string) => x.trim())
                .map(Number)
        } else {
            payload[key as keyof ContestantsUploadPayload] =
                value.toString()
        }
    })
    if (!contestantData) {
        const uploadError = await supabase.addContestants(
            payload as ContestantsUploadPayload
        )
        if (uploadError) {
            return { success: SuccessOptions.Failure, errorMessage: 'Something went wrong adding Contestant' }
        } else {
            return { success: SuccessOptions.Success, errorMessage: ''}
            
        }
    } else {
        return {success: SuccessOptions.Failure, errorMessage:
            'Contestant already exists. Please use the update form instead. (Update Form does not exist yet)'
        }
    }
}