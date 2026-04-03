'use client'

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react'
import { supabase } from './supabase'
import type { Profile, UserRole } from './types'
import type { User, Session } from '@supabase/supabase-js'

interface AuthState {
  user: User | null
  profile: Profile | null
  session: Session | null
  loading: boolean
  signUp: (email: string, password: string, fullName: string, role: UserRole) => Promise<{ error: string | null }>
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: string | null }>
  hasRole: (role: UserRole) => boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthState | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchProfile = useCallback(async (userId: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    if (data) setProfile(data as Profile)
  }, [])

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s)
      setUser(s?.user ?? null)
      if (s?.user) fetchProfile(s.user.id)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s)
      setUser(s?.user ?? null)
      if (s?.user) fetchProfile(s.user.id)
      else setProfile(null)
    })

    return () => subscription.unsubscribe()
  }, [fetchProfile])

  const signUp = async (email: string, password: string, fullName: string, role: UserRole) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } }
    })
    if (error) return { error: error.message }

    // Update profile with selected role after signup
    const { data: { user: newUser } } = await supabase.auth.getUser()
    if (newUser) {
      await supabase.from('profiles').update({
        primary_role: role,
        roles: [role]
      } as never).eq('id', newUser.id)
    }
    return { error: null }
  }

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error: error?.message ?? null }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setProfile(null)
  }

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return { error: 'Not authenticated' }
    const { error } = await supabase.from('profiles').update(updates as never).eq('id', user.id)
    if (!error && profile) setProfile({ ...profile, ...updates } as Profile)
    return { error: error?.message ?? null }
  }

  const hasRole = (role: UserRole) => profile?.roles?.includes(role) ?? false

  return (
    <AuthContext.Provider value={{
      user, profile, session, loading,
      signUp, signIn, signOut, updateProfile, hasRole,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  )
}

const defaultAuth: AuthState = {
  user: null, profile: null, session: null, loading: false,
  signUp: async () => ({ error: 'Not initialized' }),
  signIn: async () => ({ error: 'Not initialized' }),
  signOut: async () => {},
  updateProfile: async () => ({ error: 'Not initialized' }),
  hasRole: () => false,
  isAuthenticated: false,
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  return ctx ?? defaultAuth
}
