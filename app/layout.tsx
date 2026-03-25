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
  description: 'Transform complex documents into actionable insights',
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
      className={`${playfair.variable} ${inter.variable} text-slate-100 bg-black`}
    >
      <head>
        <ThemeScript />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-screen bg-brand-bg text-brand-text transition-colors duration-300"
      >
        <Providers>
          <div className="fade-in-page min-h-screen">{children}</div>
        </Providers>
      </body>
    </html>
  )
}
