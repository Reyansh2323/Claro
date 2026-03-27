'use client'

import { useInView } from 'framer-motion'
import { useRef } from 'react'
import type { AnimationConfig } from '@/types/ui'

/**
 * Spring animation configuration presets for Obsidian Tahoe
 */
export const SPRING_PRESETS = {
  entrance: {
    type: 'spring' as const,
    stiffness: 100,
    damping: 18,
    mass: 0.5,
    duration: 0.6,
  },
  hover: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 30,
    mass: 0.2,
    duration: 0.2,
  },
  tap: {
    type: 'spring' as const,
    stiffness: 500,
    damping: 40,
    mass: 0.1,
  },
}

export function useElementInView(options: {
  margin?: string
  once?: boolean
} = {}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, {
    margin: (options.margin || '0px 0px -100px 0px') as any,
    once: options.once !== false,
  })

  return { ref, isInView }
}

export function getEntranceAnimation(delay: number = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: {
      ...SPRING_PRESETS.entrance,
      delay: delay * 0.05,
    },
  }
}

export function getFadeInAnimation(delay: number = 0) {
  return {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: {
      duration: 0.4,
      delay: delay * 0.05,
    },
  }
}

export function getHoverAnimation() {
  return {
    whileHover: { scale: 1.02, y: -2 },
    whileTap: { scale: 0.98 },
    transition: SPRING_PRESETS.hover,
  }
}

export function getScaleUpAnimation(delay: number = 0) {
  return {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: {
      ...SPRING_PRESETS.entrance,
      delay: delay * 0.05,
    },
  }
}

export function useSpringAnimation(
  config: Partial<AnimationConfig> = {}
) {
  const defaultConfig = SPRING_PRESETS.entrance

  return {
    ...defaultConfig,
    ...config,
  }
}
