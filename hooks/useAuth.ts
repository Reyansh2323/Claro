'use client'

import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { supabase } from '@/lib/supabaseClient'

export function useAuth() {
  const router = useRouter()

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
          throw new Error(error.message || 'Login failed')
        }
        if (!data?.session) {
          throw new Error('Could not initialize session. Please check your credentials and network settings.')
        }
        router.push('/dashboard')
      } catch (error: any) {
        if (error?.message?.includes('Failed to fetch')) {
          throw new Error('Cannot connect to Supabase. Please check your internet or environment variables.')
        }
        console.error('Login failed:', error)
        const msg = error?.message || 'Login failed due to unknown error'
        throw new Error(msg)
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
          console.error('Supabase signup error', error)
          throw new Error(error.message || 'Signup failed')
        }
        if (!data?.session) {
          router.push('/login')
          return
        }
        router.push('/dashboard')
      } catch (error: any) {
        if (error?.message?.includes('Failed to fetch')) {
          console.error('Signup failed due to network fetch error. Origin:', window.location.origin)
          throw new Error('Cannot connect to Supabase. Please check your internet or environment variables.')
        }
        console.error('Signup failed:', error)
        const msg = error?.message || 'Signup failed due to unknown error'
        throw new Error(msg)
      }
    },
    [router]
  )

  return { login, logout, signup }
}
