'use client'

import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { createClient } from '@/lib/supabaseBrowser'

function getFriendlyAuthError(error: any) {
  if (!error) return 'Operation failed. Please try again.'

  const code = (error.code || error.status || '').toString().toLowerCase()
  const message = (error.message || '').toString().toLowerCase()

  if (code === 'user_already_exists' || message.includes('already exists')) {
    return 'Account already exists. Please sign in or use another email.'
  }
  if (code.includes('invalid') || message.includes('invalid email') || message.includes('invalid password') || message.includes('wrong password') || message.includes('invalid login credentials')) {
    return 'Invalid email or password. Please try again.'
  }
  if (message.includes('failed to fetch') || message.includes('network')) {
    return 'Cannot connect to Supabase. Please check your internet connection.'
  }

  return error.message ? error.message : 'Operation failed. Please try again.'
}

export function useAuth() {
  const router = useRouter()
  const supabase = createClient()

  const logout = useCallback(async () => {
    if (!supabase) {
      throw new Error('Cannot connect to Supabase. Please check your internet or environment variables.')
    }

    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      router.push('/login')
    } catch (error) {
      console.error('Logout failed:', error)
      throw error
    }
  }, [router])

  const login = useCallback(
    async (email: string, password: string) => {
      if (!supabase) {
        throw new Error('Cannot connect to Supabase. Please check your internet or environment variables.')
      }

      try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) {
          console.error('Supabase login error', error)
          throw new Error(getFriendlyAuthError(error))
        }
        if (data?.user) {
          window.location.href = '/dashboard'
          return
        }
        if (!data?.session) {
          throw new Error('Could not initialize session. Please check your credentials and network settings.')
        }
        window.location.href = '/dashboard'
      } catch (error: any) {
        const friendly = getFriendlyAuthError(error)
        console.error('Login failed:', error)
        throw new Error(friendly)
      }
    },
    [router]
  )

  const signup = useCallback(
    async (email: string, password: string, name: string) => {
      if (!supabase) {
        throw new Error('Cannot connect to Supabase. Please check your internet or environment variables.')
      }

      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: name },
          },
        })
        if (error) {
          console.error('DETAILED SUPABASE ERROR:', error)
          throw new Error(getFriendlyAuthError(error))
        }

        if (data?.user) {
          window.location.href = '/dashboard'
          return
        }

        if (!data?.session) {
          window.location.href = '/login'
          return
        }
        window.location.href = '/dashboard'
      } catch (error: any) {
        const friendly = getFriendlyAuthError(error)
        console.error('Signup failed:', error)
        throw new Error(friendly)
      }
    },
    [router]
  )

  return { login, logout, signup }
}
