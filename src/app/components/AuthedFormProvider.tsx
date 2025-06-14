import { ReactNode } from 'react'
import { FormProvider } from 'react-hook-form'
import { Session } from '@supabase/auth-js'
import { UseFormMethods } from '../types/UseFormMethods'

export const AuthedFormProvider = ({
    session,
    methods,
    children,
}: {
    session: Session | null
    methods: UseFormMethods
    children: ReactNode
}) => {
    const isAuthed = session?.user.role === 'authenticated'
    return isAuthed ? (
        <FormProvider {...methods}>{children}</FormProvider>
    ) : (
        <div>You are not authenticated</div>
    )
}
