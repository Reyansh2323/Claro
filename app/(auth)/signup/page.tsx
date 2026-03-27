'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, UserPlus, AlertCircle, Check } from 'lucide-react'
import { ClaroLogo } from '@/components/shared/ClaroLogo'
import { useAuth } from '@/hooks/useAuth'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100, damping: 18 } },
}

const passwordChecks = [
  { label: 'At least 8 characters', test: (p: string) => p.length >= 8 },
  { label: 'Contains uppercase', test: (p: string) => /[A-Z]/.test(p) },
  { label: 'Contains number', test: (p: string) => /\d/.test(p) },
]

export default function SignupPage() {
  const router = useRouter()
  const { signup } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (!passwordChecks.every((c) => c.test(password))) {
      setError('Password does not meet requirements')
      return
    }

    setIsLoading(true)
    try {
      const name = email.split('@')[0] || ''
      await signup(email, password, name)
      router.push('/dashboard')
    } catch (err: any) {
      setError(err?.message || 'Failed to create account')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full max-w-md"
    >
      {/* Logo */}
      <motion.div variants={item} className="text-center mb-8">
        <Link href="/" className="inline-block">
          <ClaroLogo size="md" animate />
        </Link>
        <p className="text-sm text-text-dim mt-3">Create your Claro account</p>
      </motion.div>

      {/* Form Card */}
      <motion.div
        variants={item}
        className="p-8 rounded-2xl"
        style={{
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(40px)',
          boxShadow: '0 16px 64px rgba(0,0,0,0.4)',
        }}
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm"
              style={{
                background: 'rgba(239, 68, 68, 0.08)',
                border: '1px solid rgba(239, 68, 68, 0.20)',
                color: '#EF4444',
              }}
            >
              <AlertCircle size={16} />
              {error}
            </motion.div>
          )}

          {/* Email */}
          <div>
            <label className="block text-xs text-text-dim font-medium tracking-wider uppercase mb-2">
              Email
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-dim pointer-events-none" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="pl-10"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs text-text-dim font-medium tracking-wider uppercase mb-2">
              Password
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-dim pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
                required
                className="pl-10 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-dim hover:text-text-secondary transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* Password Strength */}
            {password.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-3 space-y-1.5"
              >
                {passwordChecks.map((check) => {
                  const passes = check.test(password)
                  return (
                    <div key={check.label} className="flex items-center gap-2">
                      <Check
                        size={12}
                        className={passes ? 'text-accent-emerald' : 'text-text-dim'}
                      />
                      <span className={`text-[11px] ${passes ? 'text-accent-emerald' : 'text-text-dim'}`}>
                        {check.label}
                      </span>
                    </div>
                  )
                })}
              </motion.div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs text-text-dim font-medium tracking-wider uppercase mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-dim pointer-events-none" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
                className="pl-10"
              />
            </div>
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full py-3 rounded-lg bg-accent-cyan text-black font-semibold text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ boxShadow: '0 0 20px rgba(6, 182, 212, 0.15)' }}
          >
            {isLoading ? (
              <span className="w-4 h-4 rounded-full border-2 border-black/30 border-t-black animate-spin" />
            ) : (
              <>
                <UserPlus size={16} />
                Create Account
              </>
            )}
          </motion.button>
        </form>
      </motion.div>

      {/* Footer */}
      <motion.p variants={item} className="text-center mt-6 text-sm text-text-dim">
        Already have an account?{' '}
        <Link href="/login" className="text-accent-cyan hover:text-accent-cyan-light transition-colors font-medium">
          Sign in
        </Link>
      </motion.p>
    </motion.div>
  )
}
