'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ClaroLogo } from '@/components/shared/ClaroLogo'
import { DASHBOARD_NAV_ITEMS } from '@/lib/constants'
import {
  BarChart3,
  FileText,
  AlertTriangle,
  DollarSign,
  Settings,
  ChevronLeft,
} from 'lucide-react'

const ICON_MAP: Record<string, React.ReactNode> = {
  BarChart3: <BarChart3 size={20} />,
  FileText: <FileText size={20} />,
  AlertTriangle: <AlertTriangle size={20} />,
  DollarSign: <DollarSign size={20} />,
  Settings: <Settings size={20} />,
}

export interface SidebarProps {
  /** Whether sidebar is expanded (desktop) or collapsed */
  expanded?: boolean
  /** Callback when toggle collapse button is clicked */
  onToggleCollapse?: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({
  expanded = true,
  onToggleCollapse,
}) => {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard'
    }
    return pathname.startsWith(href)
  }

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 15 }}
      className="hidden md:flex flex-col fixed left-0 top-20 bottom-0 w-64 glass-surface-lg bg-white/10 dark:bg-glass-dark border-r border-gray-200 dark:border-glass-border backdrop-blur-3xl z-glass-content"
    >
      {/* Sidebar Content */}
      <div className="flex flex-col h-full">
        {/* Logo Area */}
        <div className="p-6 border-b border-gray-200 dark:border-glass-border">
          <Link href="/" className="flex items-center justify-between">
            <ClaroLogo size="sm" variant="light" animate={false} />
            {onToggleCollapse && expanded && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onToggleCollapse}
                className="text-text-muted hover:text-text-primary transition-colors"
                aria-label="Collapse sidebar"
              >
                <ChevronLeft size={20} />
              </motion.button>
            )}
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto no-scrollbar space-y-2 p-4">
          {DASHBOARD_NAV_ITEMS.map((item, index) => {
            const icon = ICON_MAP[item.icon] || <FileText size={20} />
            const active = isActive(item.href)

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 100,
                  damping: 15,
                  delay: index * 0.05,
                }}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    active
                      ? 'bg-accent-cyan/20 border border-accent-cyan/30 text-accent-cyan'
                      : 'text-text-secondary hover:bg-glass-light border border-transparent hover:border-glass-border'
                  }`}
                >
                  <div className={active ? 'text-accent-cyan' : 'text-text-muted'}>
                    {icon}
                  </div>
                  <span className="text-sm font-medium">{item.label}</span>
                  {active && (
                    <motion.div
                      layoutId="active-indicator"
                      className="ml-auto h-1 w-1 rounded-full bg-accent-cyan"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            )
          })}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-glass-border space-y-2">
          <p className="text-xs text-text-muted px-4 font-medium">
            Legal Document Intelligence
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full px-4 py-2 rounded-lg bg-glass-light border border-glass-border text-text-secondary text-sm hover:bg-glass-lighter transition-all"
          >
            Get Help
          </motion.button>
        </div>
      </div>
    </motion.aside>
  )
}
