'use client'

import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { useEffect } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'

interface ShinyTextProps {
  text: string
  speed?: number
  color?: string
  shineColor?: string
  spread?: number
  className?: string
}

export const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  speed = 3,
  color = '#b5b5b5',
  shineColor = '#ffffff',
  spread = 120,
  className = '',
}) => {
  const x = useMotionValue(-spread)
  const isMobile = useMediaQuery('(max-width: 768px)')

  // Gradient template for shine effect
  const linearGradient = useMotionTemplate`linear-gradient(
    90deg,
    ${color},
    ${shineColor} ${useMotionValue(50 + spread / 2)}%,
    ${color}
  )`

  useEffect(() => {
    if (isMobile) return // Disable animation on mobile, show static text

    const animation = setInterval(() => {
      x.set(x.get() + 5)
    }, 1000 / (speed * 60))

    return () => clearInterval(animation)
  }, [x, speed, isMobile])

  // Mobile: simple static text
  if (isMobile) {
    return <div className={`${className} bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-white`}>{text}</div>
  }

  // Desktop: animated gradient shine
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={className}
      style={{
        backgroundImage: linearGradient,
        backgroundSize: '200% 100%',
        backgroundPosition: `${x.get()}px 0`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
    >
      {text}
    </motion.div>
  )
}

export default ShinyText
