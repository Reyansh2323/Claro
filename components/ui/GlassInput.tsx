'use client'

import React, { forwardRef } from 'react'
import { LucideIcon } from 'lucide-react'

export interface GlassInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Label text displayed above input */
  label?: string
  /** Leading icon from Lucide */
  icon?: LucideIcon
  /** Trailing icon from Lucide */
  iconTrailing?: LucideIcon
  /** Error message displayed below input */
  error?: string
  /** Helper text displayed below input */
  helperText?: string
  /** Input variant: 'default' | 'subtle' */
  variant?: 'default' | 'subtle'
  /** Full width */
  fullWidth?: boolean
}

export const GlassInput = forwardRef<HTMLInputElement, GlassInputProps>(
  (
    {
      label,
      icon: Icon,
      iconTrailing: IconTrailing,
      error,
      helperText,
      variant = 'default',
      fullWidth = true,
      className = '',
      ...props
    },
    ref
  ) => {
    const baseClasses =
      'w-full px-4 py-2 rounded-lg font-medium transition-all duration-300 border backdrop-blur-2xl'

    const variantClasses = {
      default:
        'bg-glass-dark border-glass-border text-text-primary placeholder-text-muted focus:border-glass-border-hover focus:shadow-glass-glow',
      subtle:
        'bg-glass-light border-glass-border text-text-primary placeholder-text-muted focus:bg-glass-lighter focus:border-glass-border-hover',
    }

    const errorClass = error
      ? 'border-red-500/50 focus:border-red-500 focus:shadow-none'
      : ''

    const widthClass = fullWidth ? 'w-full' : ''

    const containerClasses = `flex flex-col ${widthClass}`

    const inputContainerClasses = 'relative flex items-center'

    const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${errorClass} ${className}`

    return (
      <div className={containerClasses}>
        {label && (
          <label className="text-sm-label mb-2 block">{label}</label>
        )}

        <div className={inputContainerClasses}>
          {Icon && (
            <Icon
              size={18}
              className="absolute left-3 text-text-muted pointer-events-none"
            />
          )}

          <input
            ref={ref}
            className={`${combinedClasses} ${Icon ? 'pl-10' : ''} ${IconTrailing ? 'pr-10' : ''}`}
            {...props}
          />

          {IconTrailing && (
            <IconTrailing
              size={18}
              className="absolute right-3 text-text-muted pointer-events-none"
            />
          )}
        </div>

        {error && <p className="text-sm text-red-400 mt-1">{error}</p>}
        {helperText && !error && (
          <p className="text-sm text-text-muted mt-1">{helperText}</p>
        )}
      </div>
    )
  }
)

GlassInput.displayName = 'GlassInput'
