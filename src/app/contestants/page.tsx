'use client'
import { useForm } from 'react-hook-form'
import { Input } from '../components/Input'
import { Select } from '../components/Select'
import { useState } from 'react'
import { Supabase } from '../utils/supabase'
import { AuthedFormProvider } from '../components/AuthedFormProvider'
import supabaseSessionEffect from '../hooks/supabaseSessionEffect'
import { SubmitButton } from '../components/SubmitButton'
import {
    ContestantColumn,
    ContestantsUploadPayload,
} from '../types/Contestants'
import { SuccessOptions } from '../utils/types'
import { submitContestant } from './submitContestant'

const seriesOptions = [
    ...new Array(19).fill(null).map((_, index) => {
        return { label: `${index + 1}`, value: `${index + 1}` }
    }),
    ...new Array(3).fill(null).map((_, index) => {
        return {
            label: `Champion of Champions ${index + 1}`,
            value: `Champion of Champions ${index + 1}`,
        }
    }),
    ...new Array(5).fill(null).map((_, index) => {
        return {
            label: `New Year Treat ${index + 1}`,
            value: `New Year Treat ${index + 1}`,
        }
    }),
]

const places = [
    'England',
    'Australia',
    'New Zealand',
    'Ireland',
    'Northern Ireland',
    'Scotland',
    'Wales',
    'United States of America',
    'United Kingdom',
    'Canada',
    'Hong Kong',
    'Pakistan',
    'Japan',
    'Malaysia',
    'Somalia',
]

export default function Contestants() {
    const supabase = new Supabase()
    const methods = useForm()
    const [success, setSuccess] = useState(SuccessOptions.Undefined)
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const session = supabaseSessionEffect(supabase, null)

    const onSubmit = methods.handleSubmit(async (data) => {
        setIsLoading(true)
        const {
            success: submissionStatus,
            errorMessage: submissionErrorMessage,
        } = await submitContestant(supabase, data)
        setSuccess(submissionStatus)
        setErrorMessage(submissionErrorMessage)
        if (success === SuccessOptions.Success) methods.reset()
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
            {/* <div style={{ alignItems: 'center' }}>Add Contestant</div> */}
            <AuthedFormProvider methods={methods} session={session}>
                <form
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '10px',
                    }}
                    onSubmit={(e) => e.preventDefault()}
                    noValidate
                >
                    <div style={{ gridColumn: 1 }}>
                        <fieldset disabled={isLoading}>
                            <Input
                                id={'First Name'}
                                label={'First Name'}
                                placeholder="Enter First Name"
                                type={'text'}
                                required={true}
                            />
                            <Input
                                id={'Last Name'}
                                label={'Last Name'}
                                placeholder="Enter Last Name"
                                type={'text'}
                                required={true}
                            />
                            <Select
                                multiple={true}
                                name={'Series'}
                                label={'Series'}
                                options={seriesOptions}
                                required={true}
                            />
                        </fieldset>
                    </div>
                    <div style={{ gridColumn: 2 }}>
                        <fieldset disabled={isLoading}>
                            <Select
                                multiple={false}
                                required={true}
                                name={'Place of Birth'}
                                label="Place of Birth"
                                defaultValue="England"
                                options={places
                                    .sort()
                                    .map((x) => ({ value: x, label: x }))}
                            />
                            <Select
                                multiple={false}
                                required={true}
                                name={'Nationality'}
                                label="Nationality"
                                defaultValue="United Kingdom"
                                options={places
                                    .sort()
                                    .map((x) => ({ value: x, label: x }))}
                            />
                            <Select
                                multiple={false}
                                required={true}
                                name={'Place of Business'}
                                label="Place of Business"
                                defaultValue="United Kingdom"
                                options={places
                                    .sort()
                                    .map((x) => ({ value: x, label: x }))}
                            />
                            <Input
                                id={'Age'}
                                label={'Age'}
                                placeholder="Enter Contestant Age"
                                type={'text'}
                                required={true}
                            />
                            <div>
                                Note: If contestant is in multiple seasons, use
                                comma-separated ages
                            </div>
                        </fieldset>
                    </div>
                    <div
                        className="mt-5"
                        style={{ gridColumnStart: 1, gridColumnEnd: 3 }}
                    >
                        {success === SuccessOptions.Success && (
                            <p className="flex items-center gap-1 mb-5 font-semibold text-green-500">
                                Contestant has been submitted successfully
                            </p>
                        )}
                        {success === SuccessOptions.Failure && (
                            <p className="flex items-center gap-1 mb-5 font-semibold text-red-500">
                                {errorMessage}
                            </p>
                        )}
                        <SubmitButton
                            onSubmit={onSubmit}
                            label="Upload Contestant"
                        />
                    </div>
                </form>
            </AuthedFormProvider>
        </div>
    )
}
