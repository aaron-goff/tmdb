import { useFormContext } from 'react-hook-form'
import { findInputError } from '../utils/findInputError'
import { isFormInvalid } from '../utils/isFormInvalid'
import { AnimatePresence } from 'framer-motion'
import { InputError } from './InputError'
import { useState } from 'react'

export const Input = ({
    label,
    type,
    id,
    placeholder,
    required,
    key,
    disabled,
}: {
    label: string
    type: string
    id: string
    placeholder: string
    required: boolean
    key?: string
    disabled?: boolean
}) => {
    const {
        register,
        formState: { errors },
    } = useFormContext()

    const inputError = findInputError(errors, label)
    const isInvalid = isFormInvalid(inputError)

    return (
        <div className="flex flex-col w-full gap-2">
            {type === 'text' && (
                <div>
                    <div className="flex justify-between">
                        <label
                            htmlFor={id}
                            className="font-semibold capitalize"
                        >
                            {label}
                        </label>
                        <AnimatePresence mode="wait" initial={false}>
                            {isInvalid && (
                                <InputError
                                    message={inputError.error.message}
                                    key={inputError.error.message}
                                />
                            )}
                        </AnimatePresence>
                    </div>
                    <input
                        id={id}
                        type={type}
                        className="w-full p-5 font-medium border rounded-md border-slate-300 placeholder:opacity-60"
                        placeholder={placeholder}
                        key={key ?? id}
                        disabled={disabled}
                        {...register(label, {
                            required: {
                                value: required,
                                message: `${label} is required.`,
                            },
                        })}
                    />
                </div>
            )}
            {type === 'checkbox' && (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label htmlFor={id} className="font-semibold capitalize">
                        {label}
                    </label>
                    <input
                        id={id}
                        type={type}
                        style={{ alignItems: 'flex-end' }}
                        className="w-full p-5 font-medium border rounded-md border-slate-300 placeholder:opacity-60"
                        placeholder={placeholder}
                        key={key ?? id}
                        {...register(label, {
                            required: {
                                value: required,
                                message: `${label} is required.`,
                            },
                        })}
                    />{' '}
                </div>
            )}
        </div>
    )
}
