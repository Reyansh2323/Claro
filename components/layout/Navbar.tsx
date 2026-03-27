'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ClaroLogo } from '@/components/shared/ClaroLogo'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { User, LogOut, Settings } from 'lucide-react'

export interface NavbarProps {
  /** Hide user menu - useful for landing pages */
  hideUserMenu?: boolean
  /** Custom logo element */
  logo?: React.ReactNode
  /** Additional right-side content before user menu */
  rightContent?: React.ReactNode
  /** Callback for logout */
  onLogout?: () => void
}

export const Navbar: React.FC<NavbarProps> = ({
  hideUserMenu = false,
  logo,
  rightContent,
  onLogout,
}) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  return (
    <>
      {/* Navbar Background with glass effect */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
        className="fixed top-0 left-0 right-0 z-modal glass-surface-lg bg-white/10 dark:bg-glass-dark border-b border-gray-200 dark:border-glass-border backdrop-blur-3xl"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left: Logo */}
            <Link href="/" className="flex items-center">
              {logo || <ClaroLogo size="sm" variant="light" animate />}
            </Link>

            {/* Center/Right: Navigation */}
            <div className="flex items-center gap-6">
              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Right content (custom) */}
              {rightContent && <div>{rightContent}</div>}

              {/* User Menu */}
              {!hideUserMenu && (
                <div className="relative">
                  <motion.button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-glass-light border border-glass-border hover:border-glass-border-hover transition-all"
                  >
                    <User size={18} />
                    <span className="text-sm text-text-secondary hidden sm:inline">
                      Account
                    </span>
                  </motion.button>

                  {/* Dropdown Menu */}
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                      className="absolute right-0 mt-2 w-48 glass-card bg-glass-dark border-glass-border shadow-glass-lg z-modal"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <div className="p-2 space-y-1">
                        <Link
                          href="/dashboard/settings"
                          className="flex items-center gap-3 px-3 py-2 text-sm text-text-primary hover:bg-glass-light rounded-lg transition-colors"
                        >
                          <Settings size={16} />
                          Settings
                        </Link>

                        <hr className="border-glass-border my-2" />

                        <button
                          onClick={() => {
                            onLogout?.()
                            setIsUserMenuOpen(false)
                          }}
                          className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                          <LogOut size={16} />
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Spacer to account for fixed navbar */}
      <div className="h-20"></div>
    </>
  )
}
