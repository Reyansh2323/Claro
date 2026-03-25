'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FileText, Upload, Clock } from 'lucide-react'

export function Sidebar() {
  const pathname = usePathname()

  const isActive = (href: string) => pathname === href

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 p-6">
      <div className="mb-8">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">C</span>
          </div>
          <span className="text-lg font-bold text-gray-800">Claro</span>
        </Link>
      </div>

      <nav className="flex flex-col gap-2">
        <Link
          href="/dashboard"
          className={`px-4 py-2 rounded-lg transition-colors ${
            isActive('/dashboard')
              ? 'bg-blue-50 text-blue-600 font-medium'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <span className="inline-flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Dashboard
          </span>
        </Link>
        <Link
          href="/dashboard/upload"
          className={`px-4 py-2 rounded-lg transition-colors ${
            isActive('/dashboard/upload')
              ? 'bg-blue-50 text-blue-600 font-medium'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <span className="inline-flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Upload Document
          </span>
        </Link>
        <Link
          href="/dashboard/history"
          className={`px-4 py-2 rounded-lg transition-colors ${
            isActive('/dashboard/history')
              ? 'bg-blue-50 text-blue-600 font-medium'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <span className="inline-flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Document History
          </span>
        </Link>
      </nav>

      <div className="mt-auto pt-6 border-t">
        <p className="text-xs text-gray-500">v0.1.0</p>
      </div>
    </aside>
  )
}
