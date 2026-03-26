'use client'

import { motion } from 'framer-motion'
import { GlassCard } from '@/components/ui/GlassCard'
import { getStaggerContainerAnimation, getStaggerChildAnimation } from '@/hooks/useAnimations'
import {
  FileText,
  DollarSign,
  CheckCircle2,
  AlertTriangle,
  MessageSquare,
  Zap,
} from 'lucide-react'

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
  gradient: string
}

const FEATURES: Feature[] = [
  {
    icon: <FileText size={24} />,
    title: 'Instant Analysis',
    description: 'Extract key information from any legal document in seconds with AI-powered intelligence.',
    gradient: 'from-cyan-400/20 to-cyan-500/10',
  },
  {
    icon: <AlertTriangle size={24} />,
    title: 'Risk Detection',
    description: 'Automatically identify potential risks, unfavorable clauses, and legal pitfalls.',
    gradient: 'from-red-400/20 to-red-500/10',
  },
  {
    icon: <CheckCircle2 size={24} />,
    title: 'Compliance Check',
    description: 'Ensure documents meet regulatory requirements and industry standards.',
    gradient: 'from-emerald-400/20 to-emerald-500/10',
  },
  {
    icon: <DollarSign size={24} />,
    title: 'Financial Summary',
    description: 'Extract financial terms, payment schedules, and cost implications instantly.',
    gradient: 'from-yellow-400/20 to-yellow-500/10',
  },
  {
    icon: <MessageSquare size={24} />,
    title: 'AI Chat Assistant',
    description: 'Ask questions about your documents and get intelligent, contextual answers.',
    gradient: 'from-purple-400/20 to-purple-500/10',
  },
  {
    icon: <Zap size={24} />,
    title: 'Custom Reports',
    description: 'Generate comprehensive reports tailored to your specific needs and requirements.',
    gradient: 'from-blue-400/20 to-blue-500/10',
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          {...getStaggerContainerAnimation()}
          className="text-center mb-16"
        >
          <motion.div {...getStaggerChildAnimation()} className="mb-4">
            <span className="inline-block px-4 py-2 rounded-full bg-glass-light border border-glass-border text-xs font-semibold text-accent-cyan">
              POWERFUL FEATURES
            </span>
          </motion.div>
          <motion.h2 {...getStaggerChildAnimation()} className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Everything You Need
          </motion.h2>
          <motion.p
            {...getStaggerChildAnimation()}
            className="text-xl text-text-secondary max-w-2xl mx-auto"
          >
            Claro provides a comprehensive suite of tools for legal document analysis and management.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          {...getStaggerContainerAnimation()}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {FEATURES.map((feature, index) => (
            <motion.div
              key={index}
              {...getStaggerChildAnimation(index * 0.1)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <GlassCard variant="subtle" className="h-full">
                <div className="flex flex-col h-full">
                  {/* Icon */}
                  <div
                    className={`inline-flex w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} items-center justify-center text-accent-cyan mb-4`}
                  >
                    {feature.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-text-primary mb-2">{feature.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{feature.description}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
