'use client'

import { useEffect } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'

const TRANSITION_DURATION = 2
const TURBULENCE_SEED = Math.floor(Math.random() * 100)

interface ThemeTransitionOverlayProps {
  isActive: boolean
  targetTheme: 'dark' | 'light'
  onComplete: () => void
}

export default function ThemeTransitionOverlay({
  isActive,
  targetTheme,
  onComplete,
}: ThemeTransitionOverlayProps) {
  const progress = useMotionValue(0)
  const radius = useTransform(progress, [0, 1], [0, 0.85])

  useEffect(() => {
    if (!isActive) return

    progress.set(0)
    const controls = animate(progress, 1, {
      duration: TRANSITION_DURATION,
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
      className="pointer-events-none fixed inset-0 z-[70] isolate"
      aria-hidden="true"
    >
      <svg
        width="0"
        height="0"
        style={{ position: 'absolute' }}
        aria-hidden="true"
      >
        <defs>
          <filter id="boostBlack" x="0" y="0">
            <feComponentTransfer>
              <feFuncR type="linear" slope="1" intercept="0.04" />
              <feFuncG type="linear" slope="1" intercept="0.04" />
              <feFuncB type="linear" slope="1" intercept="0.04" />
            </feComponentTransfer>
          </filter>
          <filter
            id="themeTransitionSoft"
            x="-40%"
            y="-40%"
            width="180%"
            height="180%"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.04" result="blurred" />
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012"
              numOctaves="2"
              seed={TURBULENCE_SEED}
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                values="0.012;0.018;0.012"
                dur="2.5s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="blurred"
              in2="noise"
              scale="4"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
          <mask id="themeTransitionMask" maskContentUnits="objectBoundingBox">
            <motion.g filter="url(#themeTransitionSoft)">
              <motion.circle
                cx="0.5"
                cy="0.5"
                r={radius}
                fill="white"
              />
            </motion.g>
          </mask>
        </defs>
      </svg>
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{
          maskImage: 'url(#themeTransitionMask)',
          maskSize: 'cover',
          maskPosition: 'center',
          maskRepeat: 'no-repeat',
          WebkitMaskImage: 'url(#themeTransitionMask)',
          WebkitMaskSize: 'cover',
          WebkitMaskPosition: 'center',
          WebkitMaskRepeat: 'no-repeat',
          backdropFilter: 'invert(1)',
          WebkitBackdropFilter: 'invert(1)',
          filter: 'url(#boostBlack)',
        }}
      />
    </div>
  )
}
