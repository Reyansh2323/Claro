import { InputHTMLAttributes, SelectHTMLAttributes } from 'react'

type InputProps = {
  label?: string
  error?: string
  className?: string
  as?: 'input' | 'select'
} & (InputHTMLAttributes<HTMLInputElement> | SelectHTMLAttributes<HTMLSelectElement>)

export function Input(props: InputProps) {
  const {
    label,
    error,
    className = '',
    as = 'input',
    ...rest
  } = props as any

  const sharedClassName = `w-full rounded-lg border border-brand-border-soft bg-brand-surface-2 px-3 py-2 text-brand-text transition-all duration-300 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30 ${className}`

  return (
    <label className="block w-full">
      {label && <span className="mb-2 block text-sm font-medium text-brand-muted">{label}</span>}
      {as === 'select' ? (
        <select className={sharedClassName} {...(rest as SelectHTMLAttributes<HTMLSelectElement>)} />
      ) : (
        <input className={sharedClassName} {...(rest as InputHTMLAttributes<HTMLInputElement>)} />
      )}
      {error && <p className="mt-1 text-xs text-rose-400">{error}</p>}
    </label>
  )
}
