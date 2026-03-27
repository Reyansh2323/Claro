'use client'

import React from 'react'
import { clsx, type ClassValue } from 'clsx'
import type { GlassBadgeProps } from '@/types/ui'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export const GlassBadge: React.FC<GlassBadgeProps> = ({
  label,
  variant = 'default',
  icon: Icon,
  size = 'md',
  className = '',
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'success':
        return 'badge-success'
      case 'warning':
        return 'badge-warning'
      case 'error':
        return 'badge-error'
      case 'info':
        return 'badge-info'
      case 'default':
      default:
        return 'bg-white/[0.05] border-white/[0.1] text-white'
    }
  }

  const getSizeClass = () => {
    switch (size) {
      case 'sm':
        return 'px-2 py-0.5 text-[10px]'
      case 'lg':
        return 'px-4 py-1.5 text-sm'
      case 'md':
      default:
        return 'px-2.5 py-1 text-xs'
    }
  }

  return (
    <span
      className={cn(
        'badge-obsidian',
        getVariantClass(),
        getSizeClass(),
        className
      )}
    >
      {Icon && <Icon size={size === 'sm' ? 10 : size === 'lg' ? 14 : 12} className="mr-0.5" />}
      {label}
    </span>
  )
}
