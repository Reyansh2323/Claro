'use client'

import { motion } from 'framer-motion'
import LandingNavbar from '@/components/landing/Navbar'
import { Hero } from '@/components/landing/Hero'
import { FeaturesSection } from '@/components/landing/FeaturesSection'
import { Footer } from '@/components/layout/Footer'

export default function LandingPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-black dark:bg-black text-text-primary overflow-hidden"
    >
      {/* Navigation */}
      <LandingNavbar />

      {/* Main Content */}
      <main className="relative">
        {/* Hero Section */}
        <Hero />

        {/* Features Section */}
        <FeaturesSection />
      </main>

      {/* Footer */}
      <Footer show={true} />
    </motion.div>
  )
}
