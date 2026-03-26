'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

export interface GlassButtonProps {
  /** Button label */
  children: React.ReactNode
  /** Button variant: 'primary' = cyan, 'secondary' = dark, 'tertiary' = subtle */
  variant?: 'primary' | 'secondary' | 'tertiary'
  /** Button size: 'sm' | 'md' | 'lg' */
  size?: 'sm' | 'md' | 'lg'
  /** Leading icon from Lucide */
  icon?: LucideIcon
  /** Trailing icon from Lucide */
  iconTrailing?: LucideIcon
  /** Disabled state */
  disabled?: boolean
  /** Loading state (shows spinner) */
  loading?: boolean
  /** Click handler */
  onClick?: () => void
  /** Button type */
  type?: 'button' | 'submit' | 'reset'
  /** Additional CSS classes */
  className?: string
  /** Full width */
  fullWidth?: boolean
}

export const GlassButton: React.FC<GlassButtonProps> = ({
  children,
  variant = 'primary',
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
  const baseClasses =
    'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-300 border cursor-pointer'

  const variantClasses = {
    primary:
      'btn-primary bg-accent-cyan text-black border-transparent hover:shadow-glass-glow',
    secondary:
      'btn-secondary bg-glass-dark border-glass-border text-text-primary hover:bg-glass-lighter',
    tertiary:
      'btn-subtle bg-transparent border-glass-border text-text-primary hover:bg-glass-light',
  }

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  const widthClass = fullWidth ? 'w-full' : ''

  const disabledClass = disabled || loading ? 'opacity-50 cursor-not-allowed' : ''

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${disabledClass} ${className}`

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={
        !disabled && !loading
          ? { scale: 1.05, y: -2 }
          : undefined
      }
      whileTap={
        !disabled && !loading
          ? { scale: 0.95 }
          : undefined
      }
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
      className={combinedClasses}
    >
      {Icon && !loading && <Icon size={size === 'sm' ? 16 : size === 'md' ? 18 : 20} />}
      {loading && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
        />
      )}
      <span>{children}</span>
      {IconTrailing && !loading && (
        <IconTrailing size={size === 'sm' ? 16 : size === 'md' ? 18 : 20} />
      )}
    </motion.button>
  )
}
