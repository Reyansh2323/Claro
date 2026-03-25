'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/shared/Button'
import { useAuth } from '@/hooks/useAuth'

export default function LogoutPage() {
  const router = useRouter()
  const { logout } = useAuth()
  const [message, setMessage] = useState('Preparing logout...')

  useEffect(() => {
    // automatically sign out on load if user came via direct link
    const doLogout = async () => {
      try {
        await logout()
      } catch (error) {
        console.error(error)
        setMessage('Could not log out automatically. Please click confirm.')
      }
    }
    doLogout()
  }, [logout])

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-brand-bg text-brand-text">
      <div className="w-full max-w-md p-6 rounded-xl bg-brand-surface border border-brand-border shadow-lg">
        <h1 className="text-2xl font-bold mb-3">Logout</h1>
        <p className="text-sm text-brand-muted mb-5">{message}</p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
          <Button onClick={() => router.push('/login')} variant="secondary" fullWidth>
            Stay on Login
          </Button>
          <Button
            onClick={async () => {
              await logout()
              router.push('/login')
            }}
            variant="danger"
            fullWidth
          >
            Confirm Logout
          </Button>
        </div>
      </div>
    </div>
  )
}
