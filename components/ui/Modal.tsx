import { ReactNode } from 'react'

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
}

export function Modal({ open, onClose, title, children }: ModalProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-lg rounded-xl bg-brand-surface p-6 shadow-2xl ring-1 ring-brand-border-soft animate-fade-in">
        <div className="mb-4 flex items-center justify-between">
          {title && <h3 className="text-lg font-bold text-brand-text">{title}</h3>}
          <button
            onClick={onClose}
            className="rounded-lg px-3 py-1 text-sm text-brand-muted hover:bg-white/10"
          >
            Close
          </button>
        </div>
        <div className="text-brand-text">{children}</div>
      </div>
    </div>
  )
}
