'use client'

import React from 'react'
import { motion } from 'framer-motion'

export interface GlassCardProps {
  /** Content to render inside the card */
  children: React.ReactNode
  /** Visual variant: 'default' = light glass, 'subtle' = lighter, 'dark' = dark overlay */
  variant?: 'default' | 'subtle' | 'dark'
  /** Enable hover animation (scale + glow) */
  hover?: boolean
  /** Additional CSS classes */
  className?: string
  /** Click handler */
  onClick?: () => void
  /** Animation delay in milliseconds */
  delay?: number
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  variant = 'default',
  hover = true,
  className = '',
  onClick,
  delay = 0,
}) => {
  const baseClasses =
    'rounded-lg border transition-all duration-300 backdrop-blur-2xl'

  const variantClasses = {
    default: 'glass-card bg-glass-light border-glass-border',
    subtle:
      'bg-glass-lighter border-glass-border rounded-lg p-4 backdrop-blur-xl',
    dark: 'glass-dark bg-glass-dark border-glass-border',
  }

  const hoverClasses = hover
    ? 'hover:bg-glass-lighter hover:border-glass-border-hover hover:shadow-glass-glow'
    : ''

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${className}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={
        hover
          ? { scale: 1.02, y: -4 }
          : undefined
      }
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 15,
        delay: delay * 0.05,
      }}
      onClick={onClick}
      className={combinedClasses}
      viewport={{ once: true, margin: '0px 0px -100px 0px' }}
    >
      {children}
    </motion.div>
  )
}
