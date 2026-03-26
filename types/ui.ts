/**
 * UI Component Type Definitions
 * Centralized types for all glass components
 */

import { LucideIcon } from 'lucide-react'

/**
 * GlassCard component props
 */
export interface GlassCardProps {
  children: React.ReactNode
  variant?: 'default' | 'subtle' | 'dark'
  hover?: boolean
  className?: string
  onClick?: () => void
  delay?: number
}

/**
 * GlassButton component props
 */
export interface GlassButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'tertiary'
  size?: 'sm' | 'md' | 'lg'
  icon?: LucideIcon
  iconTrailing?: LucideIcon
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
  fullWidth?: boolean
}

/**
 * GlassInput component props
 */
export interface GlassInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  icon?: LucideIcon
  iconTrailing?: LucideIcon
  error?: string
  helperText?: string
  variant?: 'default' | 'subtle'
  fullWidth?: boolean
}

/**
 * GlassModal component props
 */
export interface GlassModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  className?: string
  showCloseButton?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

/**
 * GlassBadge component props
 */
export interface GlassBadgeProps {
  label: string
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
  icon?: LucideIcon
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

/**
 * Design system color palette
 */
export interface ColorPalette {
  black: string
  white: string
  glass: {
    light: string
    lighter: string
    dark: string
    border: string
    borderHover: string
  }
  accent: {
    emerald: string
    cyan: string
    white: string
  }
  text: {
    primary: string
    secondary: string
    muted: string
  }
}

/**
 * Animation configuration
 */
export interface AnimationConfig {
  duration: number
  delay: number
  type: 'spring' | 'tween'
  stiffness?: number
  damping?: number
  ease?: string
}

/**
 * Size variants for components
 */
export type SizeVariant = 'sm' | 'md' | 'lg' | 'xl'

/**
 * Status variants for badges and indicators
 */
export type StatusVariant = 'success' | 'warning' | 'error' | 'info' | 'default'

/**
 * Component variant types
 */
export type ComponentVariant = 'default' | 'subtle' | 'dark'
