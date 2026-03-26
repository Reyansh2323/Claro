'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/layout/Navbar'
import { Sidebar } from '@/components/layout/Sidebar'
import { Footer } from '@/components/layout/Footer'
import { createClient } from '@/lib/supabaseBrowser'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data } = await supabase.auth.getSession()
        if (!data.session) {
          router.push('/login')
        }
      } catch (error) {
        console.error('Session check failed:', error)
        router.push('/login')
      } finally {
        setLoading(false)
      }
    }

    checkSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.push('/login')
      }
    })

    return () => {
      if (subscription) {
        subscription.unsubscribe()
      }
    }
  }, [router, supabase])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black-base text-text-primary">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-accent-cyan border-t-transparent rounded-full animate-spin"></div>
          <p className="text-text-secondary">Checking authentication...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black-base text-text-primary">
      {/* Navbar at top */}
      <Navbar hideUserMenu={false} />

      {/* Main content grid */}
      <div className="flex">
        {/* Sidebar - fixed width */}
        <Sidebar expanded={true} />

        {/* Main content area */}
        <main className="flex-1 md:ml-64 relative z-glass-content min-h-screen">
          {/* Content */}
          <div className="relative z-1 p-6 md:p-10">
            {children}
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer show={true} />
    </div>
  )
}
