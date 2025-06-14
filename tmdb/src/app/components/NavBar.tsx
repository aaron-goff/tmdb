'use client'
import React from 'react'
import { Supabase } from '../utils/supabase'
import Link from 'next/link'
import supabaseSessionEffect from '../hooks/supabaseSessionEffect'

const Navbar = () => {
    const supabase = new Supabase()
    const supabaseSession = supabaseSessionEffect(supabase, null)

    const links = [
        {
            name: 'Contestants',
            url: '/contestants',
            requiresSupabaseAuth: true,
        },
        { name: 'Episodes', url: '/episodes', requiresSupabaseAuth: true },
        { name: 'Series', url: '/series', requiresSupabaseAuth: true },
        { name: 'Tasks', url: '/tasks', requiresSupabaseAuth: true },
        { name: 'Stats', url: '/stats', requiresSupabaseAuth: false },
    ]

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link href="/" className="logo">
                    The TaskMaster Database
                </Link>
            </div>
            <div className="navbar-center">
                <ul className="nav-links">
                    {(supabaseSession?.user.role === 'authenticated'
                        ? links
                        : links.filter((x) => !x.requiresSupabaseAuth)
                    ).map((x, index) => (
                        <li key={`${index}-${x.name}`}>
                            <Link href={x.url}>{x.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="navbar-right">
                {supabaseSession && (
                    <button
                        className="signout-button"
                        onClick={supabase.signout}
                    >
                        Sign out
                    </button>
                )}
                {!supabaseSession && <Link href="/auth">Sign in</Link>}
            </div>
        </nav>
    )
}

export default Navbar
