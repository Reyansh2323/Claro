'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { DashboardPreview } from './DashboardPreview'

export function Hero() {
  const [hasAnimated, setHasAnimated] = useState(false)
  const [typedText, setTypedText] = useState('')
  const [cursorVisible, setCursorVisible] = useState(true)
  const ref = useRef<HTMLDivElement>(null)
  const text = 'Transform Complex Documents Into Clear Insights'
  const [isTypingComplete, setIsTypingComplete] = useState(false)

  useEffect(() => {
    // Trigger animation on mount
    setHasAnimated(true)

    // Typewriter effect
    let i = 0
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setTypedText(text.substring(0, i + 1))
        i++
      } else {
        clearInterval(typingInterval)
        setIsTypingComplete(true)
      }
    }, 70)

    return () => clearInterval(typingInterval)
  }, [text])

  useEffect(() => {
    // Hide cursor after typing is complete
    if (!isTypingComplete) {
      return
    }

    const timer = setTimeout(() => {
      setCursorVisible(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [isTypingComplete])

  return (
    <section className="relative pt-32 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left: Content */}
          <div className="space-y-8 flex flex-col justify-center">
            {/* Headline */}
            <h1
              ref={ref}
              className={`text-5xl sm:text-6xl lg:text-7xl font-serif font-bold leading-[1.1] text-brand-text transition-all duration-700 ${
                hasAnimated
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <span className="text-type">{typedText}</span>
              {cursorVisible && <span className="text-type__cursor">|</span>}
            </h1>

            {/* Subtitle */}
            <p
              className={`text-lg sm:text-xl text-brand-muted leading-relaxed transition-all duration-700 ${
                hasAnimated
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              Claro uses AI to analyze tax returns, contracts, insurance policies, and more—then turns them into plain English summaries, key metrics, actionable items, and critical alerts.
            </p>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 ${
                hasAnimated
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              <Link
                href="/signup"
                className="px-8 py-4 rounded-lg bg-brand-primary text-black font-semibold hover:bg-emerald-500 hover:shadow-lg hover:scale-105 transition-all duration-300 active:scale-95 text-center"
              >
                Get Started
              </Link>
              <Link
                href="#features"
                className="px-8 py-4 rounded-lg border-2 border-brand-primary text-brand-primary font-semibold hover:bg-white/10 transition-all duration-300 text-center"
              >
                Learn More
              </Link>
            </div>

            {/* Trust badge (removed as requested) */}
          </div>

          {/* Right: Dashboard Preview */}
          <DashboardPreview />
        </div>
      </div>
    </section>
  )
}
