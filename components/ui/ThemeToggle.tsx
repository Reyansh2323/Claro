'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-[60px] h-[32px]" />
  }

  const isDark = theme === 'dark'

  return (
    <div className="relative">
      <input
        type="checkbox"
        id="theme-toggle"
        checked={!isDark}
        onChange={(e) => {
          setTheme(e.target.checked ? 'light' : 'dark')
        }}
        className="sr-only"
        aria-label="Toggle theme"
      />
      
      <label
        htmlFor="theme-toggle"
        className="relative inline-flex items-center cursor-pointer"
        style={{
          width: '100px',
          height: '50px',
          display: 'inline-flex',
          position: 'relative',
        }}
      >
        {/* Background */}
        <div
          className={`
            absolute inset-0 rounded-full transition-all duration-300
            backdrop-blur-md border
            ${isDark 
              ? 'bg-glass-dark border-glass-border' 
              : 'bg-glass-light border-glass-border'
            }
          `}
          style={{
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.15), 0 4px 24px rgba(0,0,0,0.18)'
          }}
        />

        {/* Slider Track */}
        <div
          className={`
            absolute inset-0 rounded-full transition-all duration-300
            ${!isDark 
              ? 'bg-gradient-to-r from-yellow-200 to-yellow-100' 
              : 'bg-gradient-to-r from-gray-700 to-gray-800'
            }
          `}
          style={{
            opacity: isDark ? 0 : 1,
          }}
        />

        {/* Slider Button */}
        <div
          className={`
            absolute w-[30px] h-[30px] rounded-full transition-all duration-300
            flex items-center justify-center
            ${isDark 
              ? 'bg-gradient-to-b from-gray-300 to-gray-400 left-[10px]' 
              : 'bg-gradient-to-b from-yellow-300 to-yellow-400 left-[58px]'
            }
          `}
          style={{
            boxShadow: isDark 
              ? '0 2px 8px rgba(0,0,0,0.3), inset 0 -1px 2px rgba(0,0,0,0.1)' 
              : '0 2px 8px rgba(255,200,0,0.3), inset 0 -1px 2px rgba(255,255,255,0.3)'
          }}
        >
          {isDark ? (
            <Moon size={16} className="text-gray-600" />
          ) : (
            <Sun size={16} className="text-yellow-600" />
          )}
        </div>
      </label>
    </div>
  )
}
