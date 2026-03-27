'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { LogOut, ArrowLeft } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

export default function LogoutPage() {
  const router = useRouter()
  const { logout } = useAuth()
  const [message, setMessage] = useState('Signing you out...')

  useEffect(() => {
    const doLogout = async () => {
      try {
        await logout()
      } catch (error) {
        console.error(error)
        setMessage('Could not sign out automatically. Please click confirm.')
      }
    }
    doLogout()
  }, [logout])

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring' as const, stiffness: 100, damping: 20 }}
        className="w-full max-w-sm p-8 rounded-2xl text-center"
        style={{
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(40px)',
          boxShadow: '0 16px 64px rgba(0,0,0,0.4)',
        }}
      >
        <LogOut size={28} className="text-text-dim mx-auto mb-4" />
        <h1 className="text-xl font-semibold text-white mb-2">Logout</h1>
        <p className="text-sm text-text-dim mb-6">{message}</p>
        <div className="flex flex-col gap-3">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={async () => {
              await logout()
              router.push('/login')
            }}
            className="w-full py-2.5 rounded-lg text-sm font-medium text-white transition-all"
            style={{
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.25)',
            }}
          >
            Confirm Logout
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => router.push('/login')}
            className="w-full py-2.5 rounded-lg text-sm font-medium text-text-secondary flex items-center justify-center gap-2 transition-all"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            <ArrowLeft size={14} />
            Back to Login
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}
