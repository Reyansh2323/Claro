'use client'

import { useRef } from 'react'

interface GlareHoverProps {
  width?: string | number
  height?: string | number
  background?: string
  borderRadius?: string
  borderColor?: string
  children?: React.ReactNode
  glareColor?: string
  glareOpacity?: number
  glareAngle?: number
  glareSize?: number
  transitionDuration?: number
  playOnce?: boolean
  className?: string
  style?: React.CSSProperties
}

export function GlareHover({
  width = '100%',
  height = '100%',
  background = 'rgba(255,255,255,0.04)',
  borderRadius = '16px',
  borderColor = 'rgba(255,255,255,0.1)',
  children,
  glareColor = '#ffffff',
  glareOpacity = 0.18,
  glareAngle = -45,
  glareSize = 250,
  transitionDuration = 650,
  playOnce = false,
  className = '',
  style = {},
}: GlareHoverProps) {
  // Convert hex to rgba if needed
  const hex = glareColor.replace('#', '')
  let rgba = glareColor
  if (/^[\dA-Fa-f]{6}$/.test(hex)) {
    const r = parseInt(hex.slice(0, 2), 16)
    const g = parseInt(hex.slice(2, 4), 16)
    const b = parseInt(hex.slice(4, 6), 16)
    rgba = `rgba(${r}, ${g}, ${b}, ${glareOpacity})`
  }

  const overlayRef = useRef<HTMLDivElement>(null)

  const animateIn = () => {
    const el = overlayRef.current
    if (!el) return
    el.style.transition = 'none'
    el.style.backgroundPosition = '-100% -100%, 0 0'
    el.style.transition = `${transitionDuration}ms ease`
    el.style.backgroundPosition = '100% 100%, 0 0'
  }

  const animateOut = () => {
    const el = overlayRef.current
    if (!el) return
    if (playOnce) {
      el.style.transition = 'none'
      el.style.backgroundPosition = '-100% -100%, 0 0'
    } else {
      el.style.transition = `${transitionDuration}ms ease`
      el.style.backgroundPosition = '-100% -100%, 0 0'
    }
  }

  const overlayStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    background: `linear-gradient(${glareAngle}deg, hsla(0,0%,0%,0) 60%, ${rgba} 70%, hsla(0,0%,0%,0) 100%), linear-gradient(0deg, transparent, transparent)`,
    backgroundSize: `${glareSize}% ${glareSize}%, 100% 100%`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '-100% -100%, 0 0',
    pointerEvents: 'none',
    borderRadius,
  }

  return (
    <div
      className={`relative overflow-hidden cursor-pointer transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl ${className}`}
      style={{
        width,
        height,
        background,
        borderRadius,
        border: `1px solid ${borderColor}`,
        backdropFilter: 'blur(12px)',
        ...style,
      }}
      onMouseEnter={animateIn}
      onMouseLeave={animateOut}
    >
      <div ref={overlayRef} style={overlayStyle} />
      {children}
    </div>
  )
}
