'use client'

import { useRef } from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import { useThemeAtElement } from '@/contexts/ThemeTransitionContext'
import HoneydewVideoSparkles from '@/components/HoneydewVideoSparkles'

export default function HoneydewVideoSection() {
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
        <HoneydewVideoSparkles theme={effectiveTheme} />
      </div>
    </aside>
  )
}
