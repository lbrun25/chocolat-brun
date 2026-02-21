'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { User, Session } from '@supabase/supabase-js'

interface Profile {
  id: string
  user_id: string | null
  email: string
  first_name: string | null
  last_name: string | null
  phone: string | null
  company: string | null
  is_guest: boolean
  created_at: string
  updated_at: string
}

interface AuthContextType {
  user: User | null
  session: Session | null
  profile: Profile | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>
  signUp: (email: string, password: string, firstName?: string, lastName?: string) => Promise<{ error: Error | null; requiresEmailConfirmation?: boolean }>
  resetPasswordForEmail: (email: string) => Promise<{ error: Error | null }>
  getDirectResetLink: (email: string) => Promise<{ error: Error | null; link?: string }>
  resendConfirmationEmail: (email: string) => Promise<{ error: Error | null }>
  signOut: () => Promise<void>
  convertGuestToStandard: (password: string) => Promise<{ error: Error | null }>
  refreshProfile: () => Promise<void>
  refreshSession: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  // Charger le profil utilisateur depuis Supabase
  const loadProfile = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single()

      if (error) {
        if (error?.name === 'AbortError' || (error?.message || '').includes('aborted')) {
          return
        }
        console.error('Error loading profile:', error)
        setProfile(null)
        return
      }

      setProfile(data)
    } catch (error) {
      const isAbort = error instanceof Error && (error.name === 'AbortError' || error.message.includes('aborted'))
      if (isAbort) return
      console.error('Error loading profile:', error)
      setProfile(null)
    }
  }, [])

  // Synchroniser user/session via onAuthStateChange (non-bloquant).
  // Le chargement du profil est déclenché par un useEffect séparé sur `user`
  // pour éviter un deadlock avec le lock interne de Supabase.
  useEffect(() => {
    let mounted = true

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return
      setSession(session)
      setUser(session?.user ?? null)
      if (!session?.user) {
        setProfile(null)
        setLoading(false)
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  // Charger le profil dès que `user` est disponible (séparé de onAuthStateChange
  // pour ne pas bloquer la callback et risquer un deadlock avec le lock interne Supabase).
  useEffect(() => {
    if (!user) return
    let cancelled = false
    loadProfile(user.id).finally(() => {
      if (!cancelled) {
        setLoading(false)
      }
    })
    return () => { cancelled = true }
  }, [user, loadProfile])

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        return { error }
      }

      // Si le profil n'existe pas encore, le créer
      if (data.user) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', data.user.id)
          .maybeSingle()

        if (!profileData) {
          // Vérifier si un profil invité existe avec cet email
          const { data: guestProfile } = await supabase
            .from('profiles')
            .select('*')
            .eq('email', email)
            .eq('is_guest', true)
            .maybeSingle()

          if (guestProfile) {
            // Convertir le profil invité en compte standard
            await supabase
              .from('profiles')
              .update({
                user_id: data.user.id,
                is_guest: false,
                updated_at: new Date().toISOString(),
              })
              .eq('id', guestProfile.id)

            // Mettre à jour les commandes pour pointer vers le nouveau profil
            await supabase
              .from('orders')
              .update({ user_id: guestProfile.id })
              .eq('email', email)
              .is('user_id', null)
          } else {
            // Créer un nouveau profil
            await supabase.from('profiles').insert({
              user_id: data.user.id,
              email: data.user.email!,
              is_guest: false,
            })
          }
        }
      }

      return { error: null }
    } catch (error: any) {
      return { error }
    }
  }, [])

  const signUp = useCallback(async (
    email: string,
    password: string,
    firstName?: string,
    lastName?: string
  ) => {
    const accountExistsError = new Error(
      'Un compte existe déjà avec cet email. Connectez-vous pour accéder à votre compte.'
    )

    try {
      // Vérifier si un profil invité existe déjà avec cet email
      const { data: existingGuest } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', email)
        .eq('is_guest', true)
        .maybeSingle()

      // Vérifier si un compte (non-invité) existe déjà avec cet email
      const { data: existingAccount } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email)
        .eq('is_guest', false)
        .maybeSingle()

      if (existingAccount) {
        return { error: accountExistsError }
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      })

      if (error) {
        return { error }
      }

      if (data.user) {
        if (existingGuest) {
          // Convertir le profil invité en compte standard
          await supabase
            .from('profiles')
            .update({
              user_id: data.user.id,
              is_guest: false,
              first_name: firstName || existingGuest.first_name,
              last_name: lastName || existingGuest.last_name,
              updated_at: new Date().toISOString(),
            })
            .eq('id', existingGuest.id)

          // Mettre à jour les commandes pour pointer vers le nouveau profil
          await supabase
            .from('orders')
            .update({ user_id: existingGuest.id })
            .eq('email', email)
            .is('user_id', null)
        } else {
          // Créer un nouveau profil
          const { error: insertError } = await supabase.from('profiles').insert({
            user_id: data.user.id,
            email: data.user.email!,
            first_name: firstName,
            last_name: lastName,
            is_guest: false,
          })

          // 409 Conflict = profil déjà existant (ex: trigger DB ou doublon)
          if (insertError) {
            const isConflict =
              (insertError as { code?: string; status?: number }).code === '23505' ||
              (insertError as { status?: number }).status === 409 ||
              (insertError.message || '').toLowerCase().includes('duplicate') ||
              (insertError.message || '').toLowerCase().includes('conflict')
            if (isConflict) {
              return { error: accountExistsError }
            }
            return { error: insertError }
          }
        }
      }

      return {
        error: null,
        requiresEmailConfirmation: !data.session,
      }
    } catch (error: any) {
      const isConflict =
        error?.code === '23505' ||
        error?.status === 409 ||
        (error?.message || '').toLowerCase().includes('duplicate') ||
        (error?.message || '').toLowerCase().includes('conflict')
      if (isConflict) {
        return { error: accountExistsError }
      }
      return { error }
    }
  }, [])

  const resetPasswordForEmail = useCallback(async (email: string) => {
    try {
      const redirectTo =
        typeof window !== 'undefined'
          ? `${window.location.origin}/compte/reinitialiser-mot-de-passe`
          : ''
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo,
      })
      if (resetError) return { error: resetError }
      return { error: null }
    } catch (error: any) {
      return { error }
    }
  }, [])

  const getDirectResetLink = useCallback(async (email: string) => {
    try {
      if (typeof window === 'undefined') return { error: new Error('Non disponible') }
      const res = await fetch('/api/auth/generate-reset-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && data.link) return { error: null, link: data.link }
      const errMsg = (res.status === 400 || res.status === 404) && typeof data?.error === 'string' && /not found|introuvable/i.test(data.error)
        ? 'Aucun compte n\'est associé à cet email.'
        : (data?.error || 'Impossible d\'obtenir le lien.')
      return { error: new Error(errMsg) }
    } catch (error: any) {
      return { error }
    }
  }, [])

  const resendConfirmationEmail = useCallback(async (email: string) => {
    try {
      const { error: resendError } = await supabase.auth.resend({
        email,
        type: 'signup',
      })
      if (resendError) return { error: resendError }
      return { error: null }
    } catch (error: any) {
      return { error }
    }
  }, [])

  const signOut = useCallback(async () => {
    await supabase.auth.signOut()
    setUser(null)
    setSession(null)
    setProfile(null)
  }, [])

  const convertGuestToStandard = useCallback(async (password: string) => {
    if (!user || !profile || !profile.is_guest) {
      return { error: new Error('Pas de profil invité à convertir') }
    }

    try {
      // Mettre à jour le mot de passe de l'utilisateur
      const { error: updateError } = await supabase.auth.updateUser({
        password,
      })

      if (updateError) {
        return { error: updateError }
      }

      // Marquer le profil comme non-invité
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ is_guest: false })
        .eq('user_id', user.id)

      if (profileError) {
        return { error: profileError }
      }

      // Recharger le profil
      await loadProfile(user.id)

      return { error: null }
    } catch (error: any) {
      return { error }
    }
  }, [user, profile, loadProfile])

  const refreshProfile = useCallback(async () => {
    if (user) {
      await loadProfile(user.id)
    }
  }, [user, loadProfile])

  const refreshSession = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession()
    setSession(session)
    setUser(session?.user ?? null)
    if (session?.user) {
      await loadProfile(session.user.id)
    } else {
      setProfile(null)
    }
    setLoading(false)
  }, [loadProfile])

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        loading,
        signIn,
        signUp,
        resetPasswordForEmail,
        getDirectResetLink,
        resendConfirmationEmail,
        signOut,
        convertGuestToStandard,
        refreshProfile,
        refreshSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
