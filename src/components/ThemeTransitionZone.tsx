'use client'

import { useRef } from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import { useThemeAtElement } from '@/contexts/ThemeTransitionContext'

interface ThemeTransitionZoneProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

/** Wraps content and applies data-theme based on whether the transition circle has passed over it */
export default function ThemeTransitionZone({
  children,
  className,
  style,
}: ThemeTransitionZoneProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const effectiveTheme = useThemeAtElement(ref, theme)

  return (
    <div
      ref={ref}
      className={className}
      style={style}
      data-theme={effectiveTheme}
    >
      {children}
    </div>
  )
}
