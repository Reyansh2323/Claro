'use client'

import React from 'react'
import { motion } from 'framer-motion'

export interface FooterProps {
  /** Whether to show footer (useful for conditional rendering) */
  show?: boolean
}

export const Footer: React.FC<FooterProps> = ({ show = true }) => {
  if (!show) return null

  const currentYear = new Date().getFullYear()

  return (
    <motion.footer
      initial={{ y: 100 }}
      whileInView={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 15 }}
      viewport={{ once: true }}
      className="glass-surface-sm bg-glass-dark border-t border-glass-border py-8 md:py-12 mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left: Copyright */}
          <div className="text-sm text-text-muted">
            © {currentYear} Claro. All rights reserved.
          </div>


        </div>

        {/* Divider */}
        <div className="mt-6 pt-6 border-t border-glass-border">
          <p className="text-xs text-text-muted text-center">
            Claro — AI-powered legal document intelligence platform
          </p>
        </div>
      </div>
    </motion.footer>
  )
}
