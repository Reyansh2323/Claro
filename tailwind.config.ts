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
        // Legacy brand colors (kept for compatibility)
        primary: 'var(--app-primary)',
        secondary: 'var(--app-secondary)',
        success: 'var(--app-accent)',
        warning: '#F59E0B',
        error: '#EF4444',
        info: 'var(--app-accent)',
        brand: {
          bg: '#000000',
          surface: 'rgba(255, 255, 255, 0.05)',
          surface2: 'rgba(0, 0, 0, 0.4)',
          border: 'rgba(255, 255, 255, 0.1)',
          borderSoft: 'rgba(255, 255, 255, 0.05)',
          text: '#FFFFFF',
          muted: '#B3C6D5',
          primary: '#FFFFFF',
          accent: '#06B6D4',
        },
        // Glass palette
        glass: {
          light: 'rgba(255, 255, 255, 0.05)',
          lighter: 'rgba(255, 255, 255, 0.08)',
          dark: 'rgba(0, 0, 0, 0.4)',
          border: 'rgba(255, 255, 255, 0.1)',
          borderHover: 'rgba(255, 255, 255, 0.2)',
        },
        // Accent colors for glass surfaces
        accent: {
          emerald: '#10B981',
          cyan: '#06B6D4',
          white: '#FFFFFF',
        },
      },
      backdropBlur: {
        '2xl': '40px',
        '3xl': '64px',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'slide-down': 'slideInDown 0.4s ease-out forwards',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
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
        glowPulse: {
          '0%, 100%': {
            opacity: '0.5',
          },
          '50%': {
            opacity: '1',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-20px)',
          },
        },
      },
      boxShadow: {
        'glass-sm': '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
        'glass-md': '0 10px 15px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.1)',
        'glass-lg': '0 20px 25px rgba(0, 0, 0, 0.3), 0 10px 10px rgba(0, 0, 0, 0.2)',
        'glass-glow': '0 0 20px rgba(6, 182, 212, 0.3), 0 0 40px rgba(16, 185, 129, 0.1)',
      },
    },
  },
  plugins: [],
}

module.exports = config
