'use client'

import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

export function useAuth() {
  const router = useRouter()

  const logout = useCallback(async () => {
    try {
      // TODO: Call logout API endpoint
      router.push('/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }, [router])

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        console.log('Login attempt for:', email, 'with password length:', password.length)
        // TODO: Call login API endpoint
        router.push('/dashboard')
      } catch (error) {
        console.error('Login failed:', error)
        throw error
      }
    },
    [router]
  )

  const signup = useCallback(
    async (email: string, password: string, name: string) => {
      try {
        console.log('Signup attempt for:', email, name, 'with password length:', password.length)
        // TODO: Call signup API endpoint
        router.push('/dashboard')
      } catch (error) {
        console.error('Signup failed:', error)
        throw error
      }
    },
    [router]
  )

  return { login, logout, signup }
}
