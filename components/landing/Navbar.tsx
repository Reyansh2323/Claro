'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ClaroLogo } from '@/components/shared/ClaroLogo'
import { GlassButton } from '@/components/ui/GlassButton'
import { Menu, X } from 'lucide-react'

export default function LandingNavbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`fixed top-0 left-0 right-0 z-[1000] px-6 py-4 transition-all duration-300 ${
        isScrolled
          ? 'bg-glass-dark backdrop-blur-3xl border-b border-glass-border shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <ClaroLogo size="md" variant="light" animate={false} />
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <motion.a
            href="#features"
            whileHover={{ color: '#06B6D4' }}
            className="text-text-secondary hover:text-accent-cyan transition-colors text-sm font-medium"
          >
            Features
          </motion.a>
          <motion.a
            href="#benefits"
            whileHover={{ color: '#06B6D4' }}
            className="text-text-secondary hover:text-accent-cyan transition-colors text-sm font-medium"
          >
            Benefits
          </motion.a>
          <motion.a
            href="#cta"
            whileHover={{ color: '#06B6D4' }}
            className="text-text-secondary hover:text-accent-cyan transition-colors text-sm font-medium"
          >
            Get Started
          </motion.a>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/login">
              <button className="px-6 py-2 text-text-primary text-sm font-medium hover:text-accent-cyan transition-colors">
                Sign In
              </button>
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link href="/signup">
              <GlassButton variant="primary" size="sm">
                Get Started
              </GlassButton>
            </Link>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-text-secondary hover:text-text-primary transition-colors"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 10 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden mt-4 pt-4 border-t border-glass-border/50 space-y-3"
        >
          <a
            href="#features"
            className="block text-text-secondary hover:text-accent-cyan transition-colors text-sm font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Features
          </a>
          <a
            href="#benefits"
            className="block text-text-secondary hover:text-accent-cyan transition-colors text-sm font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Benefits
          </a>
          <a
            href="#cta"
            className="block text-text-secondary hover:text-accent-cyan transition-colors text-sm font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Get Started
          </a>
          <div className="flex gap-3 pt-3">
            <Link href="/login" className="flex-1">
              <button className="w-full px-4 py-2 text-text-primary text-sm font-medium hover:text-accent-cyan transition-colors">
                Sign In
              </button>
            </Link>
            <Link href="/signup" className="flex-1">
              <GlassButton variant="primary" size="sm" fullWidth>
                Get Started
              </GlassButton>
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}

export { default as Navbar } from './Navbar'
