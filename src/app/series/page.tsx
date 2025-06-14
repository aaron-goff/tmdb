'use client'
import { useForm, useWatch } from 'react-hook-form'
import { useState } from 'react'
import { AuthedFormProvider, Input, Select } from '@components'
import { Supabase } from '../utils/supabase'
import { SuccessOptions } from '../utils/types'
import { GetSeriesContestants, SupabaseSessionEffect } from '@hooks'
import { submitSeries } from './submitSeries'

export default function Series() {
    const supabase = new Supabase()
    const defaultContestantOption = [
        {
            label: 'Select Contestant',
            value: 'Select Contestant',
            disabled: true,
        },
    ]

    const session = SupabaseSessionEffect(supabase, null)
    const methods = useForm()
    const [uploadSuccess, setUploadSuccess] = useState(SuccessOptions.Undefined)
    const [uploadErrorMessage, setUploadErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const seriesName = useWatch({
        control: methods.control,
        name: 'Name',
    })
    const {
        // success: getContestantsSuccess,
        // errorMessage: getContestantsErrorMessage,
        contestantOptions,
        getContestantsIsLoading,
    } = GetSeriesContestants(
        supabase,
        methods,
        seriesName,
        defaultContestantOption
    )

    const onSubmit = methods.handleSubmit(async (data) => {
        setIsLoading(true)
        const { success, errorMessage } = await submitSeries(supabase, data)
        setUploadSuccess(success)
        setUploadErrorMessage(errorMessage)
        if (uploadSuccess === SuccessOptions.Success) methods.reset()
        setIsLoading(false)
    })

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh', // Adjust as needed
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
                            <Input
                                label={'Name'}
                                type={'text'}
                                id={'Name'}
                                placeholder={'Enter Name'}
                                required={true}
                            />
                            <Input
                                label={'Episodes'}
                                type={'text'}
                                id={'Episodes'}
                                placeholder={'Enter Episodes'}
                                required={true}
                            />
                            <Select
                                multiple={false}
                                options={[
                                    { label: 'Dave', value: 'Dave' },
                                    { label: 'Channel 4', value: 'Channel 4' },
                                ]}
                                name={'Network'}
                                label={'Network'}
                                required={true}
                            />
                            <Select
                                multiple={false}
                                options={[
                                    { label: 'True', value: 'True' },
                                    { label: 'False', value: 'False' },
                                ]}
                                name={'IsSpecial'}
                                label={'IsSpecial'}
                                required={false}
                                defaultValue="False"
                            />
                            <Input
                                label={'Date'}
                                type={'text'}
                                id={'Date'}
                                placeholder={'Enter Date'}
                                required={true}
                            />
                        </fieldset>
                    </div>
                    {contestantOptions.length >= 5 && (
                        <div style={{ gridColumn: 2 }}>
                            <fieldset
                                disabled={isLoading && getContestantsIsLoading}
                            >
                                {[
                                    'Left',
                                    'Middle-Left',
                                    'Middle',
                                    'Middle-Right',
                                    'Right',
                                ].map((x) => {
                                    return (
                                        <Select
                                            multiple={false}
                                            options={contestantOptions}
                                            name={x}
                                            label={x}
                                            required={true}
                                            key={x}
                                        />
                                    )
                                })}
                            </fieldset>
                        </div>
                    )}
                    <div
                        className="mt-5"
                        style={{ gridColumnStart: 1, gridColumnEnd: 3 }}
                    >
                        {uploadSuccess === SuccessOptions.Success && (
                            <p className="flex items-center gap-1 mb-5 font-semibold text-green-500">
                                Series has been submitted successfully
                            </p>
                        )}
                        {uploadSuccess === SuccessOptions.Failure && (
                            <p className="flex items-center gap-1 mb-5 font-semibold text-red-500">
                                Series has not been submitted successfully.
                                Check database and console
                                <br />
                                {uploadErrorMessage}
                            </p>
                        )}
                        <button
                            type="submit"
                            className="submit-button"
                            onClick={onSubmit}
                        >
                            Upload Series
                        </button>
                    </div>
                </form>
            </AuthedFormProvider>
        </div>
    )
}
