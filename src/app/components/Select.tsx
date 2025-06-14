import { AnimatePresence } from 'framer-motion'
import { useFormContext } from 'react-hook-form'
import { findInputError } from '../utils/findInputError'
import { isFormInvalid } from '../utils/isFormInvalid'
import { InputError } from './InputError'
import { DropdownOption } from '../utils/types'

export const Select = ({
    multiple,
    options,
    name,
    label,
    defaultValue,
    required,
}: {
    multiple: boolean
    options: DropdownOption[]
    name: string
    label: string
    defaultValue?: string
    required: boolean
}) => {
    const {
        register,
        formState: { errors },
    } = useFormContext()

    const inputError = findInputError(errors, label)
    const isInvalid = isFormInvalid(inputError)

    return (
        <div className="flex flex-col w-full gap-2">
            <div className="flex justify-between">
                <label htmlFor={name} className="font-semibold capitalize">
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
            <select
                multiple={multiple}
                id={name}
                defaultValue={defaultValue}
                key={name}
                {...register(label, {
                    required: {
                        value: required,
                        message: `${label} is required.`,
                    },
                })}
                // dangerouslySetInnerHTML={{ __html: options }}
            >
                {options.map((x: DropdownOption) => (
                    <option
                        value={x.value}
                        key={`${name}-${x.value}`}
                        disabled={x.disabled ?? false}
                    >
                        {x.label}
                    </option>
                ))}
            </select>
        </div>
    )
}
