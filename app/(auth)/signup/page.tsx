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
import { User, Mail, Lock, AlertCircle, CheckCircle } from 'lucide-react'
import { getEntranceAnimation } from '@/hooks/useAnimations'

export default function SignupPage() {
  const router = useRouter()
  const { signup } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [authChecking, setAuthChecking] = useState(true)
  const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong' | 'none'>(
    'none'
  )

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

  // Check password strength
  const checkPasswordStrength = (pwd: string) => {
    if (!pwd) return 'none'
    if (pwd.length < 8) return 'weak'
    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(pwd)) return 'strong'
    return 'medium'
  }

  const handlePasswordChange = (value: string) => {
    setPassword(value)
    setPasswordStrength(checkPasswordStrength(value))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!name) {
      setError('Full name is required')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (passwordStrength === 'weak') {
      setError('Password must be at least 8 characters')
      return
    }

    setIsLoading(true)

    try {
      await signup(email, password, name)
      setSuccess('Account created successfully! Redirecting to dashboard...')
      setTimeout(() => {
        router.push('/dashboard')
      }, 1500)
    } catch (err: any) {
      setError(err.message || 'Signup failed. Please try again.')
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
            <h1 className="heading-sm text-text-primary text-center">Create Account</h1>
            <p className="text-text-muted text-sm text-center mt-2">
              Join the future of legal document intelligence
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

          {/* Success Message */}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-3 bg-emerald-500/15 border border-emerald-500/30 rounded-lg flex items-start gap-3"
            >
              <CheckCircle size={18} className="text-emerge-400 flex-shrink-0 mt-0.5" />
              <p className="text-accent-emerald text-sm">{success}</p>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Input */}
            <GlassInput
              label="Full Name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              icon={User}
              required
              disabled={isLoading}
            />

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
            <div>
              <GlassInput
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                icon={Lock}
                required
                disabled={isLoading}
              />
              {password && (
                <div className="mt-2 p-2 rounded-lg bg-glass-light">
                  <div className="flex items-center gap-2 mb-1">
                    <div
                      className={`h-1.5 flex-1 rounded-full ${
                        passwordStrength === 'strong'
                          ? 'bg-accent-emerald'
                          : passwordStrength === 'medium'
                          ? 'bg-yellow-400'
                          : 'bg-red-400'
                      }`}
                    ></div>
                    <span className="text-xs font-medium text-text-muted capitalize">
                      {passwordStrength}
                    </span>
                  </div>
                  <p className="text-xs text-text-muted">
                    Use uppercase, lowercase, and numbers for stronger password
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password Input */}
            <GlassInput
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              icon={Lock}
              required
              disabled={isLoading}
              error={confirmPassword && password !== confirmPassword ? 'Passwords do not match' : undefined}
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
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </GlassButton>
            </motion.div>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-glass-border"></div>
            <span className="text-text-muted text-xs">Already have an account?</span>
            <div className="flex-1 h-px bg-glass-border"></div>
          </div>

          {/* Sign In Link */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href="/login"
              className="block w-full py-2 px-4 text-center rounded-lg bg-glass-light border border-glass-border text-text-primary hover:border-glass-border-hover transition-all text-sm font-medium"
            >
              Sign In
            </Link>
          </motion.div>

          {/* Footer */}
          <p className="text-xs text-text-muted text-center mt-6">
            By creating an account, you agree to our{' '}
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
