/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      colors: {
        obsidian: {
          void: '#000000',
          deep: '#050505',
          surface: '#0a0a0a',
        },
        glass: {
          '2': 'rgba(255, 255, 255, 0.02)',
          '4': 'rgba(255, 255, 255, 0.04)',
          '6': 'rgba(255, 255, 255, 0.06)',
          '8': 'rgba(255, 255, 255, 0.08)',
          '10': 'rgba(255, 255, 255, 0.10)',
          '15': 'rgba(255, 255, 255, 0.15)',
          '20': 'rgba(255, 255, 255, 0.20)',
          dark: 'rgba(0, 0, 0, 0.40)',
          darker: 'rgba(0, 0, 0, 0.60)',
        },
        accent: {
          emerald: '#059669',
          'emerald-light': '#10B981',
          cyan: '#06B6D4',
          'cyan-light': '#22D3EE',
          white: '#FFFFFF',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#E0E0E0',
          muted: '#8A8A8A',
          dim: '#555555',
        },
        status: {
          success: '#10B981',
          warning: '#F59E0B',
          error: '#EF4444',
          info: '#06B6D4',
          processing: '#06B6D4',
        },
        border: {
          glass: 'rgba(255, 255, 255, 0.10)',
          'glass-hover': 'rgba(255, 255, 255, 0.20)',
          'glass-soft': 'rgba(255, 255, 255, 0.05)',
        },
      },
      backdropBlur: {
        '2xl': '40px',
        '3xl': '64px',
        '4xl': '96px',
      },
      animation: {
        'orb-drift': 'orbDrift 20s ease-in-out infinite',
        'orb-drift-delayed': 'orbDrift 25s ease-in-out infinite 5s',
        'orb-drift-slow': 'orbDriftAlt 22s ease-in-out infinite 10s',
        'scanner-sweep': 'scannerSweep 4s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'fade-in-page': 'fadeInPage 1s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'processing-dot': 'processingDot 1.5s ease-in-out infinite',
      },
      keyframes: {
        orbDrift: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '25%': { transform: 'translate(60px, -80px) scale(1.1)' },
          '50%': { transform: 'translate(-40px, 60px) scale(0.95)' },
          '75%': { transform: 'translate(80px, 40px) scale(1.05)' },
        },
        orbDriftAlt: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(-60px, -40px) scale(1.08)' },
          '66%': { transform: 'translate(50px, 70px) scale(0.92)' },
        },
        scannerSweep: {
          '0%': { top: '0%', opacity: '0' },
          '10%': { opacity: '1' },
          '50%': { top: '100%', opacity: '1' },
          '60%': { opacity: '0' },
          '100%': { top: '0%', opacity: '0' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        fadeInPage: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        processingDot: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
      },
      boxShadow: {
        'glass-sm': '0 2px 8px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        'glass-md': '0 8px 24px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        'glass-lg': '0 16px 48px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
        'glass-glow-cyan': '0 0 20px rgba(6, 182, 212, 0.15), 0 0 60px rgba(6, 182, 212, 0.05)',
        'glass-glow-emerald': '0 0 20px rgba(5, 150, 105, 0.15), 0 0 60px rgba(5, 150, 105, 0.05)',
        'inner-light': 'inset 0 1px 0 rgba(255, 255, 255, 0.08), inset 0 0 20px rgba(255, 255, 255, 0.02)',
      },
    },
  },
  plugins: [],
}

module.exports = config
