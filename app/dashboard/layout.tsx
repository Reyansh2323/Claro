'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { GlobalNavbar } from '@/components/layout/GlobalNavbar'
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
      <div className="min-h-screen flex items-center justify-center bg-brand-bg text-brand-text">
        <div className="p-4 rounded-lg bg-brand-surface border border-brand-border">
          <p>Checking authentication...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg text-brand-text">
      <GlobalNavbar />
      <div className="flex flex-1 pt-16">
        <Sidebar />
        <main className="flex-1 p-4 md:p-8">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  )
}
