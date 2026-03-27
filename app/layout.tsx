import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { ThemeScript } from './theme-script'

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
  title: 'Claro - AI Document Intelligence',
  description: 'Transform complex legal documents into actionable insights with advanced AI analysis',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${playfair.variable} ${inter.variable}`}
    >
      <head>
        <ThemeScript />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-screen bg-black-base text-brand-text transition-colors duration-300"
      >
        {/* Animated gradient blob background */}
        <div id="gradient-blobs" className="z-glass-bg">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
          <div className="blob blob-3"></div>
        </div>

        {/* Main content wrapper with proper z-index */}
        <div className="z-glass-content relative min-h-screen">
          <Providers>
            <div className="fade-in-page min-h-screen">
              {children}
            </div>
          </Providers>
        </div>
      </body>
    </html>
  )
}
