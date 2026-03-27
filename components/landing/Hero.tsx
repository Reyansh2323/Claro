'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { GlassButton } from '@/components/ui/GlassButton'
import { CardSwap } from '@/components/ui/CardSwap'
import { ArrowRight, Sparkles } from 'lucide-react'
import { getStaggerContainerAnimation, getStaggerChildAnimation } from '@/hooks/useAnimations'

export function Hero() {
  const cardSwapData = [
    {
      id: '1',
      title: 'Contract Analysis',
      description: '3 Critical Issues Detected'
    },
    {
      id: '2',
      title: 'Tax Return Summary',
      description: '$142K Total, Due Apr 15'
    },
    {
      id: '3',
      title: 'Lease Agreement',
      description: 'Auto-renew clause flagged'
    }
  ]

  return (
    <section className="relative min-h-screen pt-32 pb-20 px-6 overflow-hidden flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          {...getStaggerContainerAnimation()}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Content */}
          <motion.div className="space-y-8">
            {/* Badge */}
            <motion.div
              {...getStaggerChildAnimation()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-glass-light border border-glass-border w-fit"
            >
              <Sparkles size={16} className="text-accent-cyan" />
              <span className="text-xs font-medium text-text-secondary">
                AI-Powered Legal Intelligence
              </span>
            </motion.div>

            {/* Heading */}
            <motion.div {...getStaggerChildAnimation()} className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary leading-tight">
                Transform{' '}
                <span className="bg-gradient-to-r from-accent-cyan via-accent-emerald to-accent-cyan bg-clip-text text-transparent">
                  Documents
                </span>{' '}
                Into{' '}
                <span className="bg-gradient-to-r from-accent-cyan via-accent-emerald to-accent-cyan bg-clip-text text-transparent">
                  Insights
                </span>
              </h1>
              <p className="text-xl text-text-secondary max-w-2xl leading-relaxed">
                Claro analyzes complex legal documents in seconds, extracting key terms, identifying
                risks, and providing actionable insights powered by advanced AI.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div {...getStaggerChildAnimation()} className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/signup">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto"
                >
                  <GlassButton variant="primary" size="lg" fullWidth>
                    Get Started Free
                    <ArrowRight size={18} className="ml-2" />
                  </GlassButton>
                </motion.div>
              </Link>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <button className="w-full sm:w-auto px-8 py-3 rounded-lg bg-glass-dark border border-glass-border text-text-primary hover:border-glass-border-hover transition-all font-medium flex items-center justify-center gap-2">
                  Watch Demo
                  <Sparkles size={18} />
                </button>
              </motion.div>
            </motion.div>

            {/* Social Proof */}
            <motion.div {...getStaggerChildAnimation()} className="flex items-center gap-6 pt-4">
              <div>
                <p className="text-2xl font-bold text-text-primary">10K+</p>
                <p className="text-sm text-text-muted">Documents Analyzed</p>
              </div>
              <div className="h-12 w-px bg-glass-border"></div>
              <div>
                <p className="text-2xl font-bold text-text-primary">98%</p>
                <p className="text-sm text-text-muted">Accuracy Rate</p>
              </div>
              <div className="h-12 w-px bg-glass-border"></div>
              <div>
                <p className="text-2xl font-bold text-text-primary">500+</p>
                <p className="text-sm text-text-muted">Active Users</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Visual - CardSwap Animation */}
          <motion.div
            {...getStaggerChildAnimation()}
            className="relative h-96 hidden lg:flex items-center justify-center"
          >
            <CardSwap 
              cards={cardSwapData}
              delay={4000}
              easing="elastic"
              className="w-full"
              cardClassName="w-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
