'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Card {
  id: string
  title: string
  description: string
  label?: string
  stat?: string
  detail?: string
}

interface CardSwapProps {
  cards: Card[]
  delay?: number
  easing?: 'ease' | 'easeIn' | 'easeOut' | 'easeInOut' | 'elastic' | 'backIn' | 'backOut' | 'anticipate'
  className?: string
  cardClassName?: string
}

export function CardSwap({
  cards,
  delay = 4000,
  easing = 'elastic',
  className = '',
  cardClassName = '',
}: CardSwapProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length)
    }, delay)

    return () => clearInterval(interval)
  }, [cards.length, delay])

  if (!cards || cards.length === 0) {
    return null
  }

  const currentCard = cards[currentIndex]

  // Map easing strings to Framer Motion transition configs
  const getTransitionConfig = (): any => {
    switch (easing) {
      case 'elastic':
        return { type: 'spring' as const, damping: 12, stiffness: 100 }
      case 'backIn':
        return { type: 'spring' as const, damping: 15, stiffness: 150 }
      case 'backOut':
        return { type: 'spring' as const, damping: 10, stiffness: 80 }
      case 'anticipate':
        return { type: 'spring' as const, damping: 8, stiffness: 120 }
      default:
        return { duration: 0.6, ease: easing }
    }
  }

  return (
    <div className={`relative w-full h-64 md:h-72 lg:h-80 ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentCard.id}
          initial={{ opacity: 0, rotateY: -180, scale: 0.8 }}
          animate={{ opacity: 1, rotateY: 0, scale: 1 }}
          exit={{ opacity: 0, rotateY: 180, scale: 0.8 }}
          transition={getTransitionConfig()}
          className={`absolute inset-0 ${cardClassName}`}
          style={{
            perspective: '1000px',
          }}
        >
          {/* Glass Card */}
          <div
            className="w-full h-full rounded-xl p-6 md:p-8 backdrop-blur-md border border-white/10 dark:border-white/10 bg-white/5 dark:bg-black/80 flex flex-col justify-between"
            style={{
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
            }}
          >
            {/* Label (if exists) */}
            {currentCard.label && (
              <div className="text-xs tracking-widest text-white/50 uppercase font-semibold mb-2">
                {currentCard.label}
              </div>
            )}

            {/* Stat/Title */}
            <div>
              {currentCard.stat ? (
                <div className="text-2xl md:text-3xl font-bold text-white mb-4">
                  {currentCard.stat}
                </div>
              ) : (
                <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-2">
                  {currentCard.title}
                </h3>
              )}

              {!currentCard.stat && (
                <p className="text-text-secondary text-sm md:text-base leading-relaxed">
                  {currentCard.description}
                </p>
              )}
            </div>

            {/* Detail (if exists) */}
            {currentCard.detail && (
              <div className="text-xs text-white/60 mt-4">
                {currentCard.detail}
              </div>
            )}

            {/* Progress Indicator */}
            <div className="flex items-center gap-2 pt-4">
              {cards.map((_, idx) => (
                <motion.div
                  key={idx}
                  className={`h-1 rounded-full transition-all ${
                    idx === currentIndex ? 'w-8 bg-accent-cyan' : 'w-2 bg-glass-border'
                  }`}
                  animate={{
                    width: idx === currentIndex ? 32 : 8,
                  }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
