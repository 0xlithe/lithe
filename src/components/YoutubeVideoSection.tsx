'use client'

import { useRef } from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import { useThemeAtElement } from '@/contexts/ThemeTransitionContext'
import YoutubeVideoSparkles from '@/components/YoutubeVideoSparkles'

export default function YoutubeVideoSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const effectiveTheme = useThemeAtElement(containerRef, theme)

  return (
    <aside
      ref={containerRef}
      className="absolute -left-24 lg:-left-32 top-[44%] -translate-y-1/2 -translate-x-12 w-[36rem] lg:w-[56rem] overflow-visible z-20"
      aria-hidden
    >
      <div className="relative aspect-square w-full overflow-visible">
        <YoutubeVideoSparkles theme={effectiveTheme} />
      </div>
    </aside>
  )
}
