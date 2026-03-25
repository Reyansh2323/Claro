'use client'

import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'

const applyTheme = (mode: 'light' | 'dark') => {
  if (typeof window === 'undefined') return
  if (mode === 'light') {
    document.body.classList.add('light-mode')
    document.documentElement.classList.remove('dark')
  } else {
    document.body.classList.remove('light-mode')
    document.documentElement.classList.add('dark')
  }
  localStorage.setItem('theme-mode', mode)
}

export function ThemeToggle() {
  const [isLight, setIsLight] = useState(false)

  useEffect(() => {
    const saved = (localStorage.getItem('theme-mode') as 'light' | 'dark') || 'dark'
    setIsLight(saved === 'light')
    applyTheme(saved)
  }, [])

  const toggle = () => {
    const next = isLight ? 'dark' : 'light'
    setIsLight(!isLight)
    applyTheme(next)
  }

  return (
    <label className="theme-switch" aria-label={`Switch to ${isLight ? 'dark' : 'light'} theme`}>
      <input
        type="checkbox"
        checked={isLight}
        onChange={toggle}
        className="theme-switch-checkbox"
        aria-hidden="true"
      />
      <span className="theme-switch-slider">
        <span className="theme-switch-circle" />
        <span className="theme-switch-icon sun">
          <Sun className="w-4 h-4" />
        </span>
        <span className="theme-switch-icon moon">
          <Moon className="w-4 h-4" />
        </span>
      </span>
    </label>
  )
}

