'use client'

import React from 'react'
import { LucideIcon } from 'lucide-react'

export interface GlassBadgeProps {
  /** Badge label text */
  label: string
  /** Badge variant: 'default' | 'success' | 'warning' | 'error' | 'info' */
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
  /** Icon from Lucide */
  icon?: LucideIcon
  /** Size: 'sm' | 'md' | 'lg' */
  size?: 'sm' | 'md' | 'lg'
  /** Additional CSS classes */
  className?: string
}

export const GlassBadge: React.FC<GlassBadgeProps> = ({
  label,
  variant = 'default',
  icon: Icon,
  size = 'md',
  className = '',
}) => {
  const baseClasses = 'inline-flex items-center gap-1.5 rounded-full font-medium border'

  const variantClasses = {
    default: 'badge bg-glass-light border-glass-border text-text-primary',
    success:
      'badge-success bg-emerald-500/15 border-emerald-500/30 text-accent-emerald',
    warning:
      'badge-warning bg-yellow-500/15 border-yellow-500/30 text-yellow-400',
    error: 'badge-error bg-red-500/15 border-red-500/30 text-red-400',
    info: 'badge-info bg-cyan-500/15 border-cyan-500/30 text-accent-cyan',
  }

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  }

  const iconSize = size === 'sm' ? 14 : size === 'md' ? 16 : 18

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`

  return (
    <div className={combinedClasses}>
      {Icon && <Icon size={iconSize} />}
      <span>{label}</span>
    </div>
  )
}
