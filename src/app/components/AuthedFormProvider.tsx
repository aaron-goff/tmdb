import { ReactNode } from 'react'
import { FieldValues, FormProvider, UseFormReturn } from 'react-hook-form'
import { Session } from '@supabase/auth-js'

export const AuthedFormProvider = ({
    session,
    methods,
    children,
}: {
    session: Session | null
    methods: UseFormReturn<FieldValues, any, FieldValues>
    children: ReactNode
}) => {
    const isAuthed = session?.user.role === 'authenticated'
    return isAuthed ? (
        <FormProvider {...methods}>{children}</FormProvider>
    ) : (
        <div>You are not authenticated</div>
    )
}
