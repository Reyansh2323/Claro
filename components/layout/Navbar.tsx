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
        initial={{ y: -80, x: '-50%', opacity: 0 }}
        animate={{ y: 0, x: '-50%', opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
        className="fixed top-6 left-1/2 md:left-[calc(50%+130px)] z-50 h-14 rounded-full flex items-center justify-between w-[92%] md:w-[calc(100%-260px-4rem)] md:max-w-5xl px-4 pl-6"
        style={{
          background: 'rgba(15, 15, 15, 0.7)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
        }}
      >
        <div className="flex-1 flex items-center justify-between h-full">
          {/* Left: Logo (visible on mobile, hidden on desktop where sidebar has it) */}
          <div className="md:hidden">
            <Link href="/">
              <ClaroLogo size="sm" animate={false} />
            </Link>
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
