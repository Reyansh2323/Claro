import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Claro - AI Legal & Document Intelligence',
  description: 'Enterprise-grade AI platform for parsing, analyzing, and extracting critical insights from legal documents, master lease agreements, tax returns, and corporate insurance policies.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`dark ${playfair.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head />
      <body className="min-h-screen bg-obsidian-void text-text-primary">
        {/* Layer 0: The Obsidian Terminal Grid */}
        <div className="obsidian-grid" aria-hidden="true" />

        {/* Layer 1: Quantum Lighting Mesh Gradient Orbs */}
        <div className="quantum-lighting" aria-hidden="true">
          <div className="quantum-orb quantum-orb--emerald" />
          <div className="quantum-orb quantum-orb--cyan" />
          <div className="quantum-orb quantum-orb--white" />
        </div>

        {/* Layer 2: Application Content */}
        <div className="relative z-[1] min-h-screen">
          <Providers>
            {children}
          </Providers>
        </div>
      </body>
    </html>
  )
}
