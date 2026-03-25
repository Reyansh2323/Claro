'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  Menu,
  X,
  Home,
  FileText,
  Upload,
  Clock,
  LogOut,
} from 'lucide-react'
import { ThemeSwitch } from '@/components/shared/ThemeSwitch'

export function GlobalNavbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 8)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/dashboard', label: 'Dashboard', icon: FileText },
    { href: '/dashboard/upload', label: 'Upload', icon: Upload },
    { href: '/dashboard/history', label: 'History', icon: Clock },
  ]

  const handleLogout = async () => {
    // TODO: replace with auth logout logic
    await router.push('/login')
  }

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        hasScrolled ? 'backdrop-blur-md bg-black/80 shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight text-brand-text">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-primary text-black">
              <span> C </span>
            </div>
            <span className="hidden sm:inline">Claro</span>
          </Link>

          <div className="hidden md:flex items-center gap-5">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1 px-2 py-1 rounded-md text-sm transition-all ${
                  pathname === item.href
                    ? 'bg-brand-primary text-black'
                    : 'text-brand-muted hover:text-brand-primary hover:bg-white/10'
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}

            <ThemeSwitch />
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>

          <button
            className="md:hidden p-2 rounded-md text-brand-text hover:bg-white/10"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle mobile menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 pt-2 animate-fade-in">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-brand-text hover:bg-white/10"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between gap-2">
              <ThemeSwitch />
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
