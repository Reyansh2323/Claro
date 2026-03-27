'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Sparkles,
  FileSearch,
  ShieldAlert,
  DollarSign,
  Zap,
  MessageSquare,
  CheckCircle2,
} from 'lucide-react'
import { ClaroLogo } from '@/components/shared/ClaroLogo'
import { Footer } from '@/components/layout/Footer'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 80, damping: 20 } },
}

const FEATURES = [
  {
    icon: FileSearch,
    title: 'Instant Analysis',
    description: 'Extract key information from any legal document in seconds with AI-powered intelligence.',
    gradient: 'from-cyan-500/20 to-cyan-600/5',
    iconColor: 'text-accent-cyan',
  },
  {
    icon: ShieldAlert,
    title: 'Risk Detection',
    description: 'Automatically identify potential risks, unfavorable clauses, and hidden legal pitfalls.',
    gradient: 'from-red-500/20 to-red-600/5',
    iconColor: 'text-red-400',
  },
  {
    icon: CheckCircle2,
    title: 'Compliance Check',
    description: 'Ensure documents meet regulatory requirements and industry standards instantly.',
    gradient: 'from-emerald-500/20 to-emerald-600/5',
    iconColor: 'text-accent-emerald',
  },
  {
    icon: DollarSign,
    title: 'Financial Summary',
    description: 'Extract financial terms, payment schedules, and cost implications automatically.',
    gradient: 'from-yellow-500/20 to-yellow-600/5',
    iconColor: 'text-yellow-400',
  },
  {
    icon: MessageSquare,
    title: 'AI Chat Assistant',
    description: 'Ask questions about your documents and get intelligent, contextual answers.',
    gradient: 'from-purple-500/20 to-purple-600/5',
    iconColor: 'text-purple-400',
  },
  {
    icon: Zap,
    title: 'Custom Reports',
    description: 'Generate comprehensive analysis reports tailored to your needs in one click.',
    gradient: 'from-blue-500/20 to-blue-600/5',
    iconColor: 'text-blue-400',
  },
]

const STATS = [
  { value: '10K+', label: 'Documents Analyzed' },
  { value: '98%', label: 'Accuracy Rate' },
  { value: '500+', label: 'Active Users' },
  { value: '<5s', label: 'Avg. Analysis Time' },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* ==================== NAVBAR ==================== */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
        style={{
          background: 'rgba(0, 0, 0, 0.40)',
          backdropFilter: 'blur(40px)',
          WebkitBackdropFilter: 'blur(40px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/">
            <ClaroLogo size="sm" animate={false} />
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-xs text-text-muted hover:text-white transition-colors font-medium tracking-wider uppercase">
              Features
            </a>
            <a href="#stats" className="text-xs text-text-muted hover:text-white transition-colors font-medium tracking-wider uppercase">
              Platform
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-5 py-2 text-sm text-text-secondary hover:text-white transition-colors font-medium"
              >
                Sign In
              </motion.button>
            </Link>
            <Link href="/signup">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-5 py-2 text-sm font-semibold rounded-lg bg-accent-cyan text-black hover:bg-accent-cyan-light transition-all"
                style={{ boxShadow: '0 0 20px rgba(6, 182, 212, 0.2)' }}
              >
                Get Started
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* ==================== HERO ==================== */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-24">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-5xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div variants={item} className="mb-8">
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium text-accent-cyan tracking-wider uppercase"
              style={{
                background: 'rgba(6, 182, 212, 0.08)',
                border: '1px solid rgba(6, 182, 212, 0.20)',
              }}
            >
              <Sparkles size={13} />
              AI-Powered Legal Intelligence
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={item}
            className="text-display text-5xl md:text-7xl lg:text-8xl mb-6"
          >
            Transform{' '}
            <span className="bg-gradient-to-r from-accent-cyan via-accent-emerald to-accent-cyan bg-clip-text text-transparent">
              Documents
            </span>
            <br />
            Into{' '}
            <span className="bg-gradient-to-r from-accent-emerald via-accent-cyan to-accent-emerald bg-clip-text text-transparent">
              Insights
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={item}
            className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Claro analyzes complex legal documents in seconds, extracting key terms,
            identifying risks, and providing actionable insights powered by advanced AI.
          </motion.p>

          {/* CTA */}
          <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/signup">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3.5 rounded-lg bg-accent-cyan text-black font-semibold text-sm flex items-center gap-2 justify-center transition-all"
                style={{ boxShadow: '0 0 30px rgba(6, 182, 212, 0.25)' }}
              >
                Start Free Analysis
                <ArrowRight size={16} />
              </motion.button>
            </Link>
            <Link href="/login">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3.5 rounded-lg font-medium text-sm text-text-secondary flex items-center gap-2 justify-center transition-all"
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.10)',
                }}
              >
                <Sparkles size={14} />
                Watch Demo
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            variants={item}
            id="stats"
            className="flex flex-wrap justify-center gap-8 md:gap-14"
          >
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-text-dim mt-1 tracking-wider uppercase">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ==================== FEATURES ==================== */}
      <section id="features" className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 80, damping: 20 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span
              className="inline-block px-4 py-2 rounded-full text-[10px] font-semibold text-accent-emerald tracking-[0.25em] uppercase mb-4"
              style={{
                background: 'rgba(5, 150, 105, 0.08)',
                border: '1px solid rgba(5, 150, 105, 0.20)',
              }}
            >
              Powerful Features
            </span>
            <h2 className="text-display text-4xl md:text-5xl text-white mb-4">
              Everything You Need
            </h2>
            <p className="text-lg text-text-muted max-w-2xl mx-auto">
              A comprehensive suite of tools for legal document analysis and management.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 80, damping: 20, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="group p-6 rounded-xl transition-all duration-300 cursor-default"
                  style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                  }}
                >
                  <div
                    className={`inline-flex w-10 h-10 rounded-lg bg-gradient-to-br ${feature.gradient} items-center justify-center mb-4`}
                  >
                    <Icon size={20} className={feature.iconColor} />
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <section className="py-24 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 80, damping: 20 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-display text-4xl md:text-5xl text-white mb-6">
            Ready to get started?
          </h2>
          <p className="text-lg text-text-muted mb-10">
            Join hundreds of legal teams already using Claro to transform their document workflows.
          </p>
          <Link href="/signup">
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-4 rounded-lg bg-accent-cyan text-black font-semibold text-base flex items-center gap-3 mx-auto transition-all"
              style={{ boxShadow: '0 0 40px rgba(6, 182, 212, 0.25)' }}
            >
              Start Free Analysis
              <ArrowRight size={18} />
            </motion.button>
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
