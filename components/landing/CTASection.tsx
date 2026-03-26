'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { GlassCard } from '@/components/ui/GlassCard'
import { GlassInput } from '@/components/ui/GlassInput'
import { GlassButton } from '@/components/ui/GlassButton'
import { getStaggerContainerAnimation, getStaggerChildAnimation } from '@/hooks/useAnimations'
import { ArrowRight, Mail } from 'lucide-react'

export function CTASection() {
  return (
    <section id="cta" className="relative py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          {...getStaggerContainerAnimation()}
          className="relative"
        >
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-accent-cyan/10 via-transparent to-accent-emerald/10 rounded-3xl blur-3xl"></div>

          {/* Card */}
          <GlassCard variant="dark" className="relative border border-glass-border-hover/50">
            <div className="flex flex-col items-center text-center space-y-8 py-12 px-8 md:py-16 md:px-12">
              {/* Badge */}
              <motion.div {...getStaggerChildAnimation()} className="inline-flex">
                <span className="px-4 py-2 rounded-full bg-gradient-to-r from-accent-cyan/20 to-accent-emerald/20 border border-accent-cyan/30 text-xs font-semibold text-accent-cyan">
                  LIMITED TIME OFFER
                </span>
              </motion.div>

              {/* Heading */}
              <motion.div {...getStaggerChildAnimation()} className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold text-text-primary">
                  Ready to Transform Your Legal Workflow?
                </h2>
                <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                  Join hundreds of legal professionals using Claro to analyze documents faster and smarter.
                </p>
              </motion.div>

              {/* Email Input + CTA */}
              <motion.div
                {...getStaggerChildAnimation()}
                className="w-full max-w-md flex flex-col sm:flex-row gap-3"
              >
                <GlassInput
                  type="email"
                  placeholder="your@email.com"
                  icon={Mail}
                  className="flex-1"
                />
                <Link href="/signup" className="sm:flex-shrink-0">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="h-full"
                  >
                    <GlassButton variant="primary" size="md" fullWidth className="h-full">
                      Get Started
                      <ArrowRight size={18} className="ml-2" />
                    </GlassButton>
                  </motion.div>
                </Link>
              </motion.div>

              {/* Social Proof */}
              <motion.div {...getStaggerChildAnimation()} className="flex flex-col sm:flex-row items-center gap-8 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-cyan to-accent-emerald border-2 border-black flex items-center justify-center text-text-primary font-bold text-sm"
                    >
                      {i}
                    </div>
                  ))}
                </div>
                <p className="text-text-muted text-sm">
                  Join <span className="text-text-primary font-semibold">500+ legal professionals</span> who trust Claro
                </p>
              </motion.div>

              {/* Footer Text */}
              <motion.p
                {...getStaggerChildAnimation()}
                className="text-xs text-text-muted pt-4"
              >
                No credit card required • 30-day free trial • Cancel anytime
              </motion.p>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  )
}
