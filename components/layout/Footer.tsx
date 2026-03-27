'use client'

import React from 'react'
import { motion } from 'framer-motion'

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
      className="border-t border-white/[0.06] py-8 mt-12"
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-text-dim tracking-wider">
          © {currentYear} Claro. All rights reserved.
        </p>
        <p className="text-[10px] text-text-dim tracking-widest uppercase">
          AI-Powered Legal Document Intelligence
        </p>
      </div>
    </motion.footer>
  )
}
