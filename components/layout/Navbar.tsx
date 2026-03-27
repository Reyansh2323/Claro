'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ClaroLogo } from '@/components/shared/ClaroLogo'
import { User, LogOut, Settings, Bell } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

export interface NavbarProps {
  hideUserMenu?: boolean
}

export const Navbar: React.FC<NavbarProps> = ({
  hideUserMenu = false,
}) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const { logout } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
        className="fixed top-0 left-0 right-0 z-50 h-16"
        style={{
          background: 'rgba(0, 0, 0, 0.60)',
          backdropFilter: 'blur(64px)',
          WebkitBackdropFilter: 'blur(64px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        <div className="h-full px-6 flex items-center justify-between">
          {/* Left: Logo (visible on mobile, hidden on desktop where sidebar has it) */}
          <div className="md:hidden">
            <Link href="/">
              <ClaroLogo size="sm" animate={false} />
            </Link>
          </div>
          <div className="hidden md:block md:ml-[260px]">
            {/* Empty spacer for sidebar offset */}
          </div>

          {/* Right: Controls */}
          <div className="flex items-center gap-3 ml-auto">
            {/* Notification Bell */}
            {!hideUserMenu && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg text-text-dim hover:text-text-secondary hover:bg-white/[0.04] transition-all"
              >
                <Bell size={18} />
              </motion.button>
            )}

            {/* User Menu */}
            {!hideUserMenu && (
              <div className="relative">
                <motion.button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all"
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-accent-emerald to-accent-cyan flex items-center justify-center">
                    <User size={13} className="text-black" />
                  </div>
                  <span className="text-xs text-text-secondary hidden sm:inline font-medium">
                    Account
                  </span>
                </motion.button>

                {/* Dropdown */}
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40"
                        onClick={() => setIsUserMenuOpen(false)}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        className="absolute right-0 mt-2 w-48 z-50 rounded-xl overflow-hidden"
                        style={{
                          background: 'rgba(10, 10, 10, 0.95)',
                          backdropFilter: 'blur(40px)',
                          border: '1px solid rgba(255, 255, 255, 0.10)',
                          boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
                        }}
                      >
                        <div className="p-1.5 space-y-0.5">
                          <Link
                            href="/dashboard/settings"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center gap-3 px-3 py-2 text-sm text-text-secondary hover:text-white hover:bg-white/[0.05] rounded-lg transition-colors"
                          >
                            <Settings size={15} />
                            Settings
                          </Link>
                          <div className="h-px bg-white/[0.06] my-1" />
                          <button
                            onClick={() => {
                              setIsUserMenuOpen(false)
                              handleLogout()
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                          >
                            <LogOut size={15} />
                            Logout
                          </button>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </motion.nav>

      {/* Spacer */}
      <div className="h-16" />
    </>
  )
}
