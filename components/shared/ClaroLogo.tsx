'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

export interface ClaroLogoProps {
  /** Size variant: 'sm' | 'md' | 'lg' */
  size?: 'sm' | 'md' | 'lg'
  /** Text color variant: 'light' | 'dark' (for backgrounds) */
  variant?: 'light' | 'dark'
  /** Additional CSS classes */
  className?: string
  /** Whether to show animation on hover */
  animate?: boolean
}

export const ClaroLogo: React.FC<ClaroLogoProps> = ({
  size = 'md',
  variant = 'light',
  className = '',
  animate = true,
}) => {
  const sizes = {
    sm: {
      text: 'text-2xl',
      sparkle: 16,
      top: '-0.5rem',
      right: '-0.75rem',
    },
    md: {
      text: 'text-4xl',
      sparkle: 20,
      top: '-0.75rem',
      right: '-1rem',
    },
    lg: {
      text: 'text-5xl',
      sparkle: 24,
      top: '-1rem',
      right: '-1.25rem',
    },
  }

  const colors = {
    light: 'text-white',
    dark: 'text-black',
  }

  const currentSize = sizes[size]
  const currentColor = colors[variant]

  return (
    <motion.div
      className={`flex items-center gap-2 ${className}`}
      whileHover={animate ? { scale: 1.05 } : undefined}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
    >
      {/* Logo text "CLARO" in serif */}
      <div className="relative inline-block">
        <h1
          className={`${currentSize.text} font-serif font-bold tracking-wider ${currentColor}`}
          style={{
            fontFamily: 'var(--font-playfair)',
            letterSpacing: '-0.02em',
          }}
        >
          CLARO
        </h1>

        {/* 4-point AI sparkle positioned over the "O" */}
        <motion.div
          className="absolute"
          style={{
            top: currentSize.top,
            right: currentSize.right,
          }}
          animate={animate ? { rotate: 360 } : undefined}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <Sparkles
            size={currentSize.sparkle}
            className={`${currentColor} fill-current`}
            strokeWidth={1.5}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}
