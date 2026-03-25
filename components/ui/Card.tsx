import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <section
      className={`rounded-xl border border-brand-border-soft bg-brand-surface p-6 shadow-lg transition-all duration-300 hover:shadow-2xl ${className}`}
    >
      {children}
    </section>
  )
}
