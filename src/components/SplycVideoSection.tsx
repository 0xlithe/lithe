'use client'

import { useRef } from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import { useThemeAtElement } from '@/contexts/ThemeTransitionContext'
import SplycVideoSparkles from '@/components/SplycVideoSparkles'

const THEME_BG = { dark: '#0a0a0a', light: '#FFFFFF' } as const

export default function SplycVideoSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const effectiveTheme = useThemeAtElement(containerRef, theme)

  return (
    <aside
      ref={containerRef}
      className="absolute right-16 lg:right-24 top-[44%] -translate-y-1/2 translate-x-12 w-[36rem] lg:w-[56rem] overflow-visible z-20"
      aria-hidden
    >
      <div className="relative aspect-square w-full overflow-visible">
        <div
          className="absolute inset-0 rounded-lg overflow-hidden z-0"
          style={{
            background: THEME_BG[effectiveTheme],
            transition: 'background-color 0.5s ease',
          }}
        />
        <SplycVideoSparkles theme={effectiveTheme} />
      </div>
    </aside>
  )
}
