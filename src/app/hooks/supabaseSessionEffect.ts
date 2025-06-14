import { Session } from "@supabase/auth-js"
import { useEffect, useState } from "react"
import { Supabase } from "../utils/supabase"

export default function supabaseSessionEffect(supabase: Supabase, initialValue: Session | null) {
    const [session, setSession] = useState<Session | null>(initialValue)
    
    useEffect(() => {
        supabase.client.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        const {
            data: { subscription },
        } = supabase.client.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

        return () => subscription.unsubscribe()
    }, [])

    return session
}