'use client'
import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { Supabase } from '../utils/supabase'
import { AuthedFormProvider, Input, Select } from '@components'
import { SuccessOptions } from '../utils/types'
import {
    GetSeriesDropdownOptions,
    GetSeriesContestants,
    SupabaseSessionEffect,
} from '@hooks'
import { submitEpisode } from './submitEpisode'

export default function Episodes() {
    const methods = useForm({})
    const supabase = new Supabase()

    const seriesName = useWatch({
        control: methods.control,
        name: 'Series',
    })

    const seriesPlaceholder = 'Select a series...'
    const session = SupabaseSessionEffect(supabase, null)
    const {
        // success: seriesSuccess,
        // errorMessage: seriesErrorMessage,
        series,
    } = GetSeriesDropdownOptions(supabase, seriesPlaceholder)
    const {
        // success: contestantsSuccess,
        // errorMessage: contestantsErrorMessage,
        contestants,
    } = GetSeriesContestants(supabase, methods, seriesName)
    const [uploadSuccess, setUploadSuccess] = useState(SuccessOptions.Undefined)
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = methods.handleSubmit(async (data) => {
        setIsLoading(true)
        const {
            success: submissionStatus,
            errorMessage: submissionErrorMessage,
        } = await submitEpisode(supabase, data)
        setUploadSuccess(submissionStatus)
        setErrorMessage(submissionErrorMessage)
        if (uploadSuccess === SuccessOptions.Success) methods.reset()
        setIsLoading(false)
    })

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <AuthedFormProvider methods={methods} session={session}>
                <form
                    onSubmit={(e) => e.preventDefault()}
                    noValidate
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '10px',
                    }}
                >
                    <div style={{ gridColumn: 1 }}>
                        <fieldset disabled={isLoading}>
                            <Select
                                multiple={false}
                                options={series}
                                name={'Series'}
                                label={'Series'}
                                required={true}
                                defaultValue={seriesPlaceholder}
                            />
                            <Input
                                label={'Number'}
                                type={'text'}
                                id={'Number'}
                                placeholder={'Enter Episode Number...'}
                                required={true}
                            />
                            <Input
                                label={'Name'}
                                type={'text'}
                                id={'Name'}
                                placeholder={'Enter Name...'}
                                required={true}
                            />
                        </fieldset>
                    </div>
                    <div style={{ gridColumn: 2 }}>
                        <fieldset disabled={isLoading}>
                            {!contestants.includes(null) &&
                                contestants.map((x, index) => (
                                    <Input
                                        label={x ?? index}
                                        type={'text'}
                                        id={x ?? index}
                                        placeholder={'Enter contestant points'}
                                        required={true}
                                        key={x ?? index}
                                    />
                                ))}
                            {!contestants.includes(null) && (
                                <Select
                                    multiple={false}
                                    options={[
                                        {
                                            label: 'Select Winner',
                                            value: 'Select Winner',
                                            disabled: true,
                                        },
                                        ...contestants.map((x) => ({
                                            label: x,
                                            value: x,
                                        })),
                                    ]}
                                    name={'Winner'}
                                    label={'Winner'}
                                    required={false}
                                    defaultValue="Select Winner"
                                />
                            )}
                        </fieldset>
                    </div>
                    <div
                        className="mt-5"
                        style={{ gridColumnStart: 1, gridColumnEnd: 3 }}
                    >
                        {uploadSuccess === SuccessOptions.Success && (
                            <p className="flex items-center gap-1 mb-5 font-semibold text-green-500">
                                Episode has been submitted successfully
                            </p>
                        )}
                        {uploadSuccess === SuccessOptions.Failure && (
                            <p className="flex items-center gap-1 mb-5 font-semibold text-red-500">
                                Episode has not been submitted successfully.
                                Check database and console
                                {errorMessage}
                            </p>
                        )}
                        <button
                            type="submit"
                            className="submit-button"
                            onClick={onSubmit}
                        >
                            Upload Episode
                        </button>
                    </div>
                </form>
            </AuthedFormProvider>
        </div>
    )
}
