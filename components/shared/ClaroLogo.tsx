'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

export interface ClaroLogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  animate?: boolean
}

export const ClaroLogo: React.FC<ClaroLogoProps> = ({
  size = 'md',
  className = '',
  animate = true,
}) => {
  const config = {
    sm: { text: 'text-xl', sparkle: 12, gap: '-top-1 -right-2.5' },
    md: { text: 'text-3xl', sparkle: 14, gap: '-top-1.5 -right-3' },
    lg: { text: 'text-5xl', sparkle: 18, gap: '-top-2 -right-4' },
  }

  const c = config[size]

  return (
    <motion.div
      className={`flex items-center ${className}`}
      whileHover={animate ? { scale: 1.03 } : undefined}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      <div className="relative inline-block">
        <span
          className={`${c.text} font-serif font-bold tracking-[0.2em] text-white uppercase`}
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          CLARO
        </span>
        <motion.div
          className={`absolute ${c.gap}`}
          animate={animate ? { opacity: [0.6, 1, 0.6] } : undefined}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Sparkles
            size={c.sparkle}
            className="text-accent-emerald"
            strokeWidth={1.5}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}
