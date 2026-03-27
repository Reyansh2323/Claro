'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { clsx, type ClassValue } from 'clsx'
import type { GlassButtonProps } from '@/types/ui'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export const GlassButton: React.FC<GlassButtonProps> = ({
  children,
  variant = 'secondary',
  size = 'md',
  icon: Icon,
  iconTrailing: IconTrailing,
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  className = '',
  fullWidth = false,
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'primary':
        return 'btn-obsidian-primary'
      case 'tertiary':
        return 'text-text-secondary hover:text-white transition-colors bg-transparent border-transparent'
      case 'secondary':
      default:
        return 'btn-obsidian'
    }
  }

  const getSizeClass = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-1.5 text-xs'
      case 'lg':
        return 'px-6 py-3 text-base'
      case 'md':
      default:
        return 'px-4 py-2 text-sm'
    }
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={{ scale: (disabled || loading) ? 1 : 1.02 }}
      whileTap={{ scale: (disabled || loading) ? 1 : 0.98 }}
      className={cn(
        getVariantClass(),
        getSizeClass(),
        fullWidth ? 'w-full' : '',
        'relative overflow-hidden group',
        className
      )}
    >
      {/* Decorative gradient overlay on hover for secondary */}
      {variant === 'secondary' && (
        <span className="absolute inset-0 bg-gradient-to-r from-white/[0.0] via-white/[0.05] to-white/[0.0] opacity-0 group-hover:opacity-100 transition-opacity -translate-x-full group-hover:translate-x-full duration-1000" />
      )}
      
      <span className="flex items-center justify-center gap-2 relative z-10">
        {loading ? (
          <div className="w-4 h-4 rounded-full border-2 border-current/30 border-t-current animate-spin" />
        ) : (
          <>
            {Icon && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />}
            {children}
            {IconTrailing && <IconTrailing size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />}
          </>
        )}
      </span>
    </motion.button>
  )
}
