'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface ScrambledTextProps {
  radius?: number
  duration?: number
  scrambleChars?: string
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}

export const ScrambledText: React.FC<ScrambledTextProps> = ({
  radius = 100,
  duration = 1.2,
  scrambleChars = '.:',
  className = '',
  style = {},
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [charElements, setCharElements] = useState<Array<{ el: HTMLSpanElement; original: string }>>([])
  const animationRef = useRef<Map<HTMLSpanElement, NodeJS.Timeout>>(new Map())

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Split text into individual characters
    const text = String(children)
    const chars: Array<{ el: HTMLSpanElement; original: string }> = []

    // Clear existing content
    container.innerHTML = ''

    for (let i = 0; i < text.length; i++) {
      const char = text[i]
      const span = document.createElement('span')
      span.textContent = char
      span.style.display = 'inline-block'
      span.style.willChange = 'transform, opacity'
      span.dataset.original = char
      container.appendChild(span)
      chars.push({ el: span, original: char })
    }

    setCharElements(chars)

    return () => {
      // Cleanup animations
      animationRef.current.forEach((timeout) => clearTimeout(timeout))
      animationRef.current.clear()
    }
  }, [children])

  const getRandomChar = () => {
    return scrambleChars[Math.floor(Math.random() * scrambleChars.length)]
  }

  const animateChar = (
    element: HTMLSpanElement,
    originalChar: string,
    targetDuration: number
  ) => {
    // Clear any existing animation
    const existingTimeout = animationRef.current.get(element)
    if (existingTimeout) clearTimeout(existingTimeout)

    const startTime = performance.now()
    let currentFrame: number

    const scramble = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / (targetDuration * 1000), 1)

      if (progress < 1) {
        // Still animating - show random characters
        if (Math.random() > 0.3 - progress * 0.3) {
          element.textContent = getRandomChar()
        }
        currentFrame = requestAnimationFrame(scramble)
      } else {
        // Animation complete - show original character
        element.textContent = originalChar
      }
    }

    currentFrame = requestAnimationFrame(scramble)
    animationRef.current.set(element, currentFrame as any)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return

    charElements.forEach(({ el, original }) => {
      const rect = el.getBoundingClientRect()
      const charX = rect.left + rect.width / 2
      const charY = rect.top + rect.height / 2

      const dx = e.clientX - charX
      const dy = e.clientY - charY
      const distance = Math.hypot(dx, dy)

      if (distance < radius) {
        // Within radius - trigger scramble
        const distanceRatio = 1 - distance / radius
        const animationDuration = duration * distanceRatio

        animateChar(el, original, animationDuration)
      }
    })
  }

  const handleMouseLeave = () => {
    // Reset all characters to original
    charElements.forEach(({ el, original }) => {
      el.textContent = original
      const timeout = animationRef.current.get(el)
      if (timeout) clearTimeout(timeout)
      animationRef.current.delete(el)
    })
  }

  return (
    <motion.div
      ref={containerRef}
      className={`font-mono text-[clamp(14px,1.2vw,18px)] text-gray-600 dark:text-white/70 max-w-[600px] leading-relaxed ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    />
  )
}

export default ScrambledText
