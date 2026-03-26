'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { GlassCard } from '@/components/ui/GlassCard'
import { GlassInput } from '@/components/ui/GlassInput'
import { GlassButton } from '@/components/ui/GlassButton'
import { ClaroLogo } from '@/components/shared/ClaroLogo'
import { useAuth } from '@/hooks/useAuth'
import { createClient } from '@/lib/supabaseBrowser'
import { Mail, Lock, AlertCircle } from 'lucide-react'
import { getEntranceAnimation } from '@/hooks/useAnimations'

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [authChecking, setAuthChecking] = useState(true)

  const supabase = createClient()

  useEffect(() => {
    const verifySession = async () => {
      if (!supabase) {
        console.error('Supabase is not initialized')
        setError('Cannot connect to Supabase. Please check your environment configuration.')
        setAuthChecking(false)
        return
      }
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        router.push('/dashboard')
      } else {
        setAuthChecking(false)
      }
    }
    verifySession()
  }, [supabase, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await login(email, password)
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.')
      setIsLoading(false)
    }
  }

  if (authChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-accent-cyan border-t-transparent rounded-full animate-spin"></div>
          <p className="text-text-secondary">Checking authentication...</p>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="flex items-center justify-center min-h-[calc(100vh-200px)] px-4"
    >
      <motion.div
        {...getEntranceAnimation()}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 15,
        }}
        className="w-full max-w-md"
      >
        <GlassCard variant="dark">
          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="mb-4"
            >
              <ClaroLogo size="md" variant="light" animate={false} />
            </motion.div>
            <h1 className="heading-sm text-text-primary text-center">Sign In</h1>
            <p className="text-text-muted text-sm text-center mt-2">
              Welcome back to AI Document Intelligence
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-3 bg-red-500/15 border border-red-500/30 rounded-lg flex items-start gap-3"
            >
              <AlertCircle size={18} className="text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-400 text-sm">{error}</p>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <GlassInput
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={Mail}
              required
              disabled={isLoading}
            />

            {/* Password Input */}
            <GlassInput
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={Lock}
              required
              disabled={isLoading}
            />

            {/* Submit Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="pt-2"
            >
              <GlassButton
                type="submit"
                variant="primary"
                size="md"
                fullWidth
                loading={isLoading}
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </GlassButton>
            </motion.div>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-glass-border"></div>
            <span className="text-text-muted text-xs">New to Claro?</span>
            <div className="flex-1 h-px bg-glass-border"></div>
          </div>

          {/* Sign Up Link */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href="/signup"
              className="block w-full py-2 px-4 text-center rounded-lg bg-glass-light border border-glass-border text-text-primary hover:border-glass-border-hover transition-all text-sm font-medium"
            >
              Create Account
            </Link>
          </motion.div>

          {/* Footer */}
          <p className="text-xs text-text-muted text-center mt-6">
            By signing in, you agree to our{' '}
            <a href="#terms" className="text-accent-cyan hover:text-accent-white">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#privacy" className="text-accent-cyan hover:text-accent-white">
              Privacy Policy
            </a>
          </p>
        </GlassCard>
      </motion.div>
    </motion.div>
  )
}
