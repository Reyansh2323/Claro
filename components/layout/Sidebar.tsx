'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ClaroLogo } from '@/components/shared/ClaroLogo'
import {
  LayoutDashboard,
  FileSearch,
  ShieldAlert,
  DollarSign,
  Upload,
  Settings,
  HelpCircle,
} from 'lucide-react'

const NAV_ITEMS = [
  { id: 'command', label: 'Command Center', href: '/dashboard', icon: LayoutDashboard },
  { id: 'upload', label: 'Upload Document', href: '/dashboard/upload', icon: Upload },
  { id: 'analysis', label: 'Contract Analysis', href: '/dashboard/analysis', icon: FileSearch },
  { id: 'risk', label: 'Risk Intelligence', href: '/dashboard/history', icon: ShieldAlert },
  { id: 'financial', label: 'Financial Extraction', href: '/dashboard/documents', icon: DollarSign },
]

const BOTTOM_NAV = [
  { id: 'settings', label: 'System Protocols', href: '/dashboard/settings', icon: Settings },
]

export interface SidebarProps {
  expanded?: boolean
}

export const Sidebar: React.FC<SidebarProps> = () => {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard'
    return pathname.startsWith(href)
  }

  return (
    <motion.aside
      initial={{ x: -280, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.3 }}
      className="hidden md:flex flex-col fixed left-0 top-0 bottom-0 w-[260px] z-40"
      style={{
        background: 'rgba(0, 0, 0, 0.50)',
        backdropFilter: 'blur(64px)',
        WebkitBackdropFilter: 'blur(64px)',
        borderRight: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: 'inset -1px 0 0 rgba(255, 255, 255, 0.04)',
      }}
    >
      {/* Logo Section */}
      <div className="px-6 pt-8 pb-6 border-b border-white/[0.06]">
        <Link href="/">
          <ClaroLogo size="sm" animate={false} />
        </Link>
        <p className="text-[10px] uppercase tracking-[0.25em] text-text-dim mt-3 font-medium">
          Legal Intelligence Platform
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto no-scrollbar px-3 py-4 space-y-1">
        {NAV_ITEMS.map((item, index) => {
          const active = isActive(item.href)
          const Icon = item.icon

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                type: 'spring',
                stiffness: 100,
                damping: 15,
                delay: 0.4 + index * 0.06,
              }}
            >
              <Link
                href={item.href}
                className={`group relative flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                  active
                    ? 'text-white'
                    : 'text-text-muted hover:text-text-secondary'
                }`}
                style={active ? {
                  background: 'linear-gradient(90deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
                } : undefined}
              >
                {/* Active indicator bar */}
                {active && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-accent-emerald"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    style={{ boxShadow: '0 0 8px rgba(5, 150, 105, 0.5)' }}
                  />
                )}

                <Icon
                  size={18}
                  className={`flex-shrink-0 transition-colors ${
                    active ? 'text-accent-emerald' : 'text-text-dim group-hover:text-text-muted'
                  }`}
                />
                <span className="text-[13px] font-medium">{item.label}</span>
              </Link>
            </motion.div>
          )
        })}
      </nav>

      {/* Bottom Section */}
      <div className="px-3 py-4 border-t border-white/[0.06] space-y-1">
        {BOTTOM_NAV.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.id}
              href={item.href}
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-text-dim hover:text-text-muted transition-colors"
            >
              <Icon size={18} className="flex-shrink-0" />
              <span className="text-[13px] font-medium">{item.label}</span>
            </Link>
          )
        })}
        <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-text-dim hover:text-text-muted transition-colors">
          <HelpCircle size={18} className="flex-shrink-0" />
          <span className="text-[13px] font-medium">Support</span>
        </button>

        <div className="px-4 pt-3">
          <p className="text-[10px] text-text-dim font-medium tracking-wider uppercase">
            Claro v2.0
          </p>
        </div>
      </div>
    </motion.aside>
  )
}
