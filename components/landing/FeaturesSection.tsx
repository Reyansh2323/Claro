'use client'

import { motion } from 'framer-motion'
import { MagicBento } from '@/components/ui/MagicBento'
import { FeatureBadge } from '@/components/landing/FeatureBadge'
import { ShinyText } from '@/components/ui/ShinyText'
import { getStaggerContainerAnimation, getStaggerChildAnimation } from '@/hooks/useAnimations'

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 px-6 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          {...getStaggerContainerAnimation()}
          className="text-center mb-16"
        >
          <motion.div {...getStaggerChildAnimation()} className="mb-4">
            <FeatureBadge />
          </motion.div>
          <motion.div {...getStaggerChildAnimation()}>
            <ShinyText
              text="Everything You Need"
              speed={3}
              color="#b5b5b5"
              shineColor="#ffffff"
              spread={120}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-4"
            />
          </motion.div>
          <motion.p
            {...getStaggerChildAnimation()}
            className="text-xl text-text-secondary max-w-2xl mx-auto"
          >
            Claro provides a comprehensive suite of tools for legal document analysis and management.
          </motion.p>
        </motion.div>

        {/* MagicBento Grid */}
        <motion.div
          {...getStaggerContainerAnimation()}
          className="flex justify-center"
        >
          <MagicBento
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            glowColor="132, 0, 255"
            spotlightRadius={300}
            particleCount={12}
          />
        </motion.div>
      </div>
    </section>
  )
}
