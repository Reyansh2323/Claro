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
        serif: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      colors: {
        primary: 'var(--app-primary)',
        secondary: 'var(--app-secondary)',
        success: 'var(--app-accent)',
        warning: '#F59E0B',
        error: '#EF4444',
        info: 'var(--app-accent)',
        brand: {
          bg: 'var(--brand-bg)',
          surface: 'var(--brand-surface)',
          surface2: 'var(--brand-surface-2)',
          border: 'var(--brand-border)',
          borderSoft: 'var(--brand-border-soft)',
          text: 'var(--brand-text)',
          muted: 'var(--brand-muted)',
          primary: 'var(--brand-primary)',
          accent: 'var(--brand-accent)',
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'slide-down': 'slideInDown 0.4s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        fadeIn: {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        slideInDown: {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
    },
  },
  plugins: [],
}

module.exports = config
