'use client'

import { forwardRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { clsx, type ClassValue } from 'clsx'
import { Eye, EyeOff, AlertCircle } from 'lucide-react'
import type { GlassInputProps } from '@/types/ui'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
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
      fullWidth = false,
      type = 'text',
      className = '',
      ...rest
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false)
    const isPassword = type === 'password'
    const inputType = isPassword && showPassword ? 'text' : type

    return (
      <div className={cn('flex flex-col space-y-1.5', fullWidth ? 'w-full' : '', className)}>
        {/* Label */}
        {label && (
          <label className="text-xs text-text-dim font-medium tracking-wider uppercase pl-1">
            {label}
          </label>
        )}

        {/* Input Wrapper */}
        <div className="relative flex items-center">
          {Icon && (
            <Icon
              size={16}
              className="absolute left-3.5 text-text-dim pointer-events-none"
            />
          )}

          <input
            ref={ref}
            type={inputType}
            className={cn(
              variant === 'subtle' 
                ? 'bg-transparent border-b border-white/[0.1] rounded-none px-0 focus:border-accent-cyan outline-none shadow-none focus:shadow-none' 
                : '', 
              Icon ? 'pl-10' : '',
              (isPassword || IconTrailing) ? 'pr-10' : '',
              error ? 'border-red-500/50 focus:border-red-500 focus:shadow-[0_0_20px_rgba(239,68,68,0.1)]' : ''
            )}
            {...rest}
          />

          {/* Trailing Elements */}
          {isPassword ? (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 text-text-dim hover:text-text-secondary transition-colors"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          ) : IconTrailing ? (
            <IconTrailing
              size={16}
              className="absolute right-3.5 text-text-dim pointer-events-none"
            />
          ) : null}
        </div>

        {/* Helper & Error Text */}
        <AnimatePresence>
          {error ? (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -5 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -5 }}
              className="flex items-center gap-1.5 text-red-400 text-xs pl-1"
            >
              <AlertCircle size={12} />
              <span>{error}</span>
            </motion.div>
          ) : helperText ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-text-dim text-[11px] pl-1"
            >
              {helperText}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    )
  }
)

GlassInput.displayName = 'GlassInput'
