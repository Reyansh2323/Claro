'use client'

import { ReactNode } from 'react'
import { Sidebar } from '@/components/layout/Sidebar'
import { Navbar } from '@/components/layout/Navbar'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="md:ml-[260px] min-h-[calc(100vh-4rem)] px-6 py-6 lg:px-10 lg:py-8">
        {children}
      </main>
    </>
  )
}
