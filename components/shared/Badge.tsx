import clsx from 'clsx'

interface BadgeProps {
  label: string
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'info'
  size?: 'sm' | 'md' | 'lg'
  color?: string
}

export function Badge({
  label,
  variant = 'primary',
  size = 'md',
  color,
}: BadgeProps) {
  const colorClass = color || ({
    primary: 'bg-blue-100 text-blue-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-indigo-100 text-indigo-800',
  } as Record<string, string>)[variant]

  const sizeClass = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  }[size]

  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full font-medium',
        colorClass,
        sizeClass
      )}
    >
      {label}
    </span>
  )
}
