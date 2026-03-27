'use client'

import { motion, useMotionValue, useMotionTemplate } from 'framer-motion'
import { useRef, useState } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'

interface CardData {
  color: string
  title: string
  description: string
  label: string
}

interface MagicBentoProps {
  enableSpotlight?: boolean
  enableBorderGlow?: boolean
  enableTilt?: boolean
  enableMagnetism?: boolean
  clickEffect?: boolean
  glowColor?: string
  spotlightRadius?: number
  particleCount?: number
}

const DEFAULT_CARD_DATA: CardData[] = [
  {
    color: '#060010',
    title: 'Instant Analysis',
    description: 'Extract key information from any legal document in seconds with AI-powered intelligence.',
    label: 'AI',
  },
  {
    color: '#060010',
    title: 'Risk Detection',
    description: 'Automatically identify potential risks, unfavorable clauses, and legal pitfalls.',
    label: 'Alerts',
  },
  {
    color: '#060010',
    title: 'Compliance Check',
    description: 'Ensure documents meet regulatory requirements and industry standards.',
    label: 'Compliance',
  },
  {
    color: '#060010',
    title: 'Financial Summary',
    description: 'Extract financial terms, payment schedules, and cost implications instantly.',
    label: 'Finance',
  },
  {
    color: '#060010',
    title: 'AI Chat Assistant',
    description: 'Ask questions about your documents and get intelligent, contextual answers.',
    label: 'Chat',
  },
  {
    color: '#060010',
    title: 'Custom Reports',
    description: 'Generate comprehensive reports tailored to your specific needs.',
    label: 'Reports',
  },
]

export const MagicBento: React.FC<MagicBentoProps> = ({
  enableSpotlight = true,
  enableBorderGlow = true,
  enableTilt = true,
  enableMagnetism = true,
  clickEffect = true,
  glowColor = '132, 0, 255',
  spotlightRadius = 300,
  particleCount = 12,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery('(max-width: 768px)')

  // Spotlight effect
  const spotlightX = useMotionValue(0)
  const spotlightY = useMotionValue(0)

  const spotlightBackground = useMotionTemplate`radial-gradient(
    circle ${spotlightRadius}px at ${spotlightX}px ${spotlightY}px,
    rgba(${glowColor}, 0.15),
    transparent 100%
  )`

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableSpotlight || isMobile) return

    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return

    spotlightX.set(e.clientX - rect.left)
    spotlightY.set(e.clientY - rect.top)
  }

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full"
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Spotlight background */}
      {enableSpotlight && !isMobile && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: spotlightBackground }}
        />
      )}

      {/* Cards grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DEFAULT_CARD_DATA.map((card, index) => (
          <MagicCard
            key={index}
            card={card}
            index={index}
            enableTilt={enableTilt && !isMobile}
            enableMagnetism={enableMagnetism && !isMobile}
            enableBorderGlow={enableBorderGlow}
            clickEffect={clickEffect}
            particleCount={particleCount}
            glowColor={glowColor}
          />
        ))}
      </div>
    </motion.div>
  )
}

interface MagicCardProps {
  card: CardData
  index: number
  enableTilt: boolean
  enableMagnetism: boolean
  enableBorderGlow: boolean
  clickEffect: boolean
  particleCount: number
  glowColor: string
}

const MagicCard: React.FC<MagicCardProps> = ({
  card,
  index,
  enableTilt,
  enableMagnetism,
  enableBorderGlow,
  clickEffect,
  particleCount,
  glowColor,
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [clickParticles, setClickParticles] = useState<Array<{ id: number; x: number; y: number }>>([])

  // Tilt effect
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)

  // Magnetism effect
  const magnetX = useMotionValue(0)
  const magnetY = useMotionValue(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Tilt
    if (enableTilt) {
      const rotX = ((e.clientY - centerY) / rect.height) * 10
      const rotY = ((e.clientX - centerX) / rect.width) * -10
      rotateX.set(rotX)
      rotateY.set(rotY)
    }

    // Magnetism (slight movement toward cursor)
    if (enableMagnetism) {
      const maxDistance = 20
      const distX = Math.max(-maxDistance, Math.min(maxDistance, (e.clientX - centerX) * 0.1))
      const distY = Math.max(-maxDistance, Math.min(maxDistance, (e.clientY - centerY) * 0.1))
      magnetX.set(distX)
      magnetY.set(distY)
    }
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
    magnetX.set(0)
    magnetY.set(0)
    setIsHovered(false)
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!clickEffect) return

    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return

    const particles = Array.from({ length: particleCount }, (_, i) => ({
      id: Date.now() + i,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }))

    setClickParticles(particles)
    setTimeout(() => setClickParticles([]), 600)
  }

  return (
    <motion.div
      ref={cardRef}
      className="relative h-64 group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      onClick={handleClick}
      style={{
        perspective: '1000px',
        x: enableMagnetism ? magnetX : 0,
        y: enableMagnetism ? magnetY : 0,
      }}
    >
      {/* Glow background */}
      {enableBorderGlow && (
        <motion.div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at center, rgba(${glowColor}, 0.2), transparent)`,
          }}
        />
      )}

      {/* Card content */}
      <motion.div
        className="relative h-full rounded-xl border border-white/10 bg-black/80 backdrop-blur-md p-6 flex flex-col transition-all"
        style={{
          rotateX: enableTilt ? rotateX : 0,
          rotateY: enableTilt ? rotateY : 0,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{
          borderColor: isHovered ? '#06B6D4' : 'rgba(255,255,255,0.1)',
          boxShadow: isHovered ? `0 0 20px rgba(${glowColor}, 0.3)` : 'none',
        }}
      >
        {/* Border glow shine */}
        {enableBorderGlow && (
          <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300 bg-gradient-to-br from-transparent via-white to-transparent transform -translate-x-full group-hover:translate-x-full duration-1000" />
          </div>
        )}

        {/* Label */}
        <div className="flex items-center justify-between mb-4 relative z-10">
          <motion.span
            className="text-xs font-semibold text-white/50 tracking-widest uppercase"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            {card.label}
          </motion.span>
        </div>

        {/* Title */}
        <motion.h3
          className="text-xl font-bold text-white mb-2 relative z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {card.title}
        </motion.h3>

        {/* Description */}
        <motion.p
          className="text-sm text-white/60 flex-1 relative z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {card.description}
        </motion.p>

        {/* Animated particles on click */}
        {clickParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 rounded-full bg-cyan-400"
            initial={{
              x: particle.x,
              y: particle.y,
              opacity: 1,
              scale: 1,
            }}
            animate={{
              x: particle.x + (Math.random() - 0.5) * 200,
              y: particle.y + (Math.random() - 0.5) * 200,
              opacity: 0,
              scale: 0,
            }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        ))}
      </motion.div>

      {/* Floating particles background */}
      {particleCount > 0 && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none z-0">
          {Array.from({ length: Math.min(particleCount, 8) }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-0.5 rounded-full bg-white"
              animate={{
                y: [0, -20, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2 + i * 0.2,
                repeat: Infinity,
                delay: i * 0.15,
              }}
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}

export default MagicBento
