'use client'

import { Supabase } from '../utils/supabase'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { Auth as SupabaseAuth } from '@supabase/auth-ui-react'
import supabaseSessionEffect from '../hooks/supabaseSessionEffect'

export default function Auth() {
    const supabase = new Supabase()
    const supabaseSession = supabaseSessionEffect(supabase, null)

    if (!supabaseSession) {
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <SupabaseAuth
                    supabaseClient={supabase.client}
                    appearance={{ theme: ThemeSupa }}
                    providers={[]}
                />
            </div>
        )
    } else {
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <button className="signout-button" onClick={supabase.signout}>
                    Sign Out
                </button>
            </div>
        )
    }
}
