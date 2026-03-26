'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { GlassButton } from '@/components/ui/GlassButton'
import { ArrowRight, Sparkles } from 'lucide-react'
import { getStaggerContainerAnimation, getStaggerChildAnimation } from '@/hooks/useAnimations'

export function Hero() {
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

          {/* Visual - Floating Glass Cards */}
          <motion.div
            {...getStaggerChildAnimation()}
            className="relative h-96 hidden lg:flex items-center justify-center"
          >
            {/* Floating Card 1 - Top Left */}
            <motion.div
              initial={{ y: 0, rotate: -5 }}
              animate={{ y: -20, rotate: -5 }}
              transition={{ type: 'spring', stiffness: 100, damping: 10, duration: 4, repeat: Infinity, repeatType: 'reverse' }}
              className="absolute top-0 left-0 w-64 h-40 rounded-2xl bg-glass-light border border-glass-border backdrop-blur-3xl p-6 shadow-2xl"
            >
              <p className="text-xs font-semibold text-accent-cyan mb-2">RISK ASSESSMENT</p>
              <p className="text-sm text-text-primary font-medium">3 Critical Issues Detected</p>
              <div className="mt-3 space-y-2">
                <div className="h-2 bg-red-500/20 rounded-full w-full"></div>
                <div className="h-2 bg-yellow-500/20 rounded-full w-4/5"></div>
              </div>
            </motion.div>

            {/* Floating Card 2 - Center */}
            <motion.div
              initial={{ y: 0, scale: 1 }}
              animate={{ y: 10, scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 100, damping: 10, duration: 5, repeat: Infinity, repeatType: 'reverse' }}
              className="relative w-72 h-48 rounded-2xl bg-glass-darker border border-glass-border/50 backdrop-blur-3xl p-8 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-semibold text-text-primary">Contract Analysis</p>
                <div className="w-3 h-3 rounded-full bg-accent-emerald animate-pulse"></div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent-cyan"></div>
                  <p className="text-xs text-text-muted">Parties: ABC Inc, XYZ Corp</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent-cyan"></div>
                  <p className="text-xs text-text-muted">Term: 3 years, Auto-renew</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent-cyan"></div>
                  <p className="text-xs text-text-muted">Amount: $500K + annual increase</p>
                </div>
              </div>
            </motion.div>

            {/* Floating Card 3 - Bottom Right */}
            <motion.div
              initial={{ y: 0, rotate: 5 }}
              animate={{ y: 20, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 100, damping: 10, duration: 4.5, repeat: Infinity, repeatType: 'reverse' }}
              className="absolute bottom-0 right-0 w-64 h-40 rounded-2xl bg-glass-light border border-glass-border backdrop-blur-3xl p-6 shadow-2xl"
            >
              <p className="text-xs font-semibold text-accent-emerald mb-2">COMPLETION</p>
              <div className="flex items-center justify-between">
                <p className="text-sm text-text-primary font-medium">Analysis Ready</p>
                <div className="text-2xl font-bold text-accent-emerald">98%</div>
              </div>
              <div className="mt-3 w-full h-2 bg-glass-border rounded-full overflow-hidden">
                <div className="h-full w-98 bg-gradient-to-r from-accent-emerald to-accent-cyan rounded-full"></div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
