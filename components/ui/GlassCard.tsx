'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { clsx, type ClassValue } from 'clsx'
import { useSpringAnimation } from '@/hooks/useAnimations'
import type { GlassCardProps } from '@/types/ui'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  variant = 'default',
  hover = true,
  className = '',
  onClick,
  delay = 0,
}) => {
  const animationConfig = useSpringAnimation({ delay: delay * 0.05 })

  const getVariantClass = () => {
    switch (variant) {
      case 'dark':
        return 'glass-panel-dark'
      case 'subtle':
        return 'bg-white/[0.02] border border-white/[0.04] rounded-xl'
      case 'default':
      default:
        return 'glass-panel'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={animationConfig}
      onClick={onClick}
      className={cn(
        getVariantClass(),
        hover && 'glass-panel-hover cursor-default',
        onClick && 'cursor-pointer',
        'p-6 relative overflow-hidden',
        className
      )}
    >
      {/* Decorative inner glow for default variant */}
      {variant === 'default' && (
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent" />
      )}
      {children}
    </motion.div>
  )
}
