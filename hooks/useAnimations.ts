'use client'

import { useInView } from 'framer-motion'
import { useRef } from 'react'
import type { AnimationConfig } from '@/types/ui'

/**
 * Spring animation configuration presets
 */
export const SPRING_PRESETS = {
  /** Quick, snappy entrance */
  entrance: {
    type: 'spring' as const,
    stiffness: 100,
    damping: 15,
    mass: 0.5,
    duration: 0.6,
  },

  /** Smooth hover interaction */
  hover: {
    type: 'spring' as const,
    stiffness: 300,
    damping: 30,
    mass: 0.2,
    duration: 0.2,
  },

  /** Tap/click interaction */
  tap: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 40,
    mass: 0.1,
  },

  /** Slow, elegant appearance */
  slow: {
    type: 'spring' as const,
    stiffness: 60,
    damping: 20,
    mass: 0.8,
    duration: 1,
  },

  /** Page transition */
  pageTransition: {
    type: 'spring' as const,
    stiffness: 80,
    damping: 12,
    mass: 0.3,
    duration: 0.8,
  },
}

/**
 * Hook to detect if element is in view, returns boolean
 * Useful for triggering animations on scroll
 */
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

/**
 * Get spring animation config for entrance (page load)
 */
export function getEntranceAnimation(delay: number = 0) {
  return {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: {
      ...SPRING_PRESETS.entrance,
      delay: delay * 0.05,
    },
  }
}

/**
 * Get spring animation config for fade in
 */
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

/**
 * Get spring animation config for slide from left
 */
export function getSlideInLeftAnimation(delay: number = 0) {
  return {
    initial: { opacity: 0, x: -40 },
    animate: { opacity: 1, x: 0 },
    transition: {
      ...SPRING_PRESETS.entrance,
      delay: delay * 0.05,
    },
  }
}

/**
 * Get spring animation config for slide from right
 */
export function getSlideInRightAnimation(delay: number = 0) {
  return {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    transition: {
      ...SPRING_PRESETS.entrance,
      delay: delay * 0.05,
    },
  }
}

/**
 * Get spring animation config for slide from top
 */
export function getSlideInTopAnimation(delay: number = 0) {
  return {
    initial: { opacity: 0, y: -40 },
    animate: { opacity: 1, y: 0 },
    transition: {
      ...SPRING_PRESETS.entrance,
      delay: delay * 0.05,
    },
  }
}

/**
 * Get spring animation config for slide from bottom
 */
export function getSlideInBottomAnimation(delay: number = 0) {
  return {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: {
      ...SPRING_PRESETS.entrance,
      delay: delay * 0.05,
    },
  }
}

/**
 * Get hover animation for interactive elements
 */
export function getHoverAnimation() {
  return {
    whileHover: { scale: 1.05, y: -2 },
    whileTap: { scale: 0.95 },
    transition: SPRING_PRESETS.hover,
  }
}

/**
 * Get scale up animation
 */
export function getScaleUpAnimation(delay: number = 0) {
  return {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: {
      ...SPRING_PRESETS.entrance,
      delay: delay * 0.05,
    },
  }
}

/**
 * Get stagger container animation (for animated lists)
 */
export function getStaggerContainerAnimation() {
  return {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  }
}

/**
 * Get stagger child animation
 */
export function getStaggerChildAnimation(delay: number = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: {
      ...SPRING_PRESETS.entrance,
      delay: delay * 0.05,
    },
  }
}

/**
 * Custom hook to manage animation state
 */
export function useSpringAnimation(
  config: Partial<AnimationConfig> = {}
) {
  const defaultConfig = SPRING_PRESETS.entrance

  return {
    ...defaultConfig,
    ...config,
  }
}
