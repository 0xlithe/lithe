'use client'

import { useEffect } from 'react'
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useMotionTemplate,
  useMotionValueEvent,
} from 'framer-motion'

const DURATION = 2.2
const THEME_BG = { dark: '#0a0a0a', light: '#FFFFFF' } as const

interface ThemeTransitionOverlayProps {
  isActive: boolean
  targetTheme: 'dark' | 'light'
  onProgressUpdate: (progress: number) => void
  onComplete: () => void
}

export default function ThemeTransitionOverlay({
  isActive,
  targetTheme,
  onProgressUpdate,
  onComplete,
}: ThemeTransitionOverlayProps) {
  const progress = useMotionValue(0)
  const radius = useTransform(progress, [0, 1], [0, 1.65])
  const rStr = useMotionTemplate`${radius}`

  useMotionValueEvent(progress, 'change', (v) => onProgressUpdate(v))

  useEffect(() => {
    if (!isActive) return

    progress.set(0)
    const controls = animate(progress, 1, {
      duration: DURATION,
      ease: [0.25, 0.46, 0.45, 0.94],
      onComplete: () => {
        onComplete()
      },
    })

    return () => controls.stop()
  }, [isActive, onComplete, progress])

  if (!isActive) return null

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <defs>
          <filter
            id="themeTransitionFeather"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="0.08"
              result="blurred"
            />
          </filter>
          <mask id="themeTransitionMask" maskContentUnits="objectBoundingBox">
            <g filter="url(#themeTransitionFeather)">
              <motion.circle cx={0} cy={1} r={rStr} fill="white" />
            </g>
          </mask>
        </defs>
      </svg>
      <div
        className="absolute inset-0 h-full w-full"
        style={{
          maskImage: 'url(#themeTransitionMask)',
          maskSize: 'cover',
          maskPosition: 'center',
          maskRepeat: 'no-repeat',
          WebkitMaskImage: 'url(#themeTransitionMask)',
          WebkitMaskSize: 'cover',
          WebkitMaskPosition: 'center',
          WebkitMaskRepeat: 'no-repeat',
          backgroundColor: THEME_BG[targetTheme],
        }}
      />
    </div>
  )
}
