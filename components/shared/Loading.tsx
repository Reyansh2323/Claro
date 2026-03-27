'use client'

import { motion } from 'framer-motion'

export function Loading({ message = 'Processing...' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative w-12 h-12 mb-6">
        {/* Outer ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-white/[0.06]"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Spinning ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-accent-emerald"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
        />
        {/* Inner dot */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent-emerald"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
      <p className="text-xs text-text-dim font-medium tracking-wider uppercase">
        {message}
      </p>
    </div>
  )
}
