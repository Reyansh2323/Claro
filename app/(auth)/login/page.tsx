'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/shared/Button'
import { useAuth } from '@/hooks/useAuth'
import { createClient } from '@/lib/supabaseBrowser'

export default function LoginPage() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [authChecking, setAuthChecking] = useState(true)

  const supabase = createClient()

  useEffect(() => {
    console.log('[Auth]: NEXT_PUBLIC_SUPABASE_URL', process.env.NEXT_PUBLIC_SUPABASE_URL)
    console.log('[Auth]: checking supabase URL format',
      typeof process.env.NEXT_PUBLIC_SUPABASE_URL === 'string' &&
      process.env.NEXT_PUBLIC_SUPABASE_URL.startsWith('https://') &&
      process.env.NEXT_PUBLIC_SUPABASE_URL.endsWith('.supabase.co')
    )

    const verifySession = async () => {
      if (!supabase) {
        console.error('Supabase is not initialized')
        setError('Cannot connect to Supabase. Please check your environment configuration.')
        setAuthChecking(false)
        return
      }
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        window.location.href = '/dashboard'
      } else {
        setAuthChecking(false)
      }
    }
    verifySession()
  }, [supabase])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await login(email, password)
    } catch (err: any) {
      console.error('--- LOGIN ERROR OBJECT ---', err)
      const message = err instanceof Error ? err.message : 'Login failed. Please try again.'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  if (authChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-bg text-brand-text">
        <p>Checking authentication status...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 pt-24">
      <div className="w-full max-w-[420px] min-w-0 sm:w-[90%]">
        <div className="bg-white rounded-lg shadow-lg p-8 z-10">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">C</span>
            </div>
            <span className="text-2xl font-bold text-gray-800">Claro</span>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">
            Welcome Back
          </h1>
          <p className="text-gray-600 text-center mb-6">Login to your account</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}

            <div>
              <label className="label">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input"
              />
            </div>

            <div>
              <label className="label">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={isLoading}
            >
              Sign In
            </Button>
          </form>

          <p className="text-center text-gray-600 mt-6">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-blue-600 hover:underline font-semibold">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
