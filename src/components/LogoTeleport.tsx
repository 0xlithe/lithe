'use client'

import { useState, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTheme } from '@/contexts/ThemeContext'
import { useThemeTransition, useThemeAtElement } from '@/contexts/ThemeTransitionContext'
import { SIDEBAR_WIDTH } from '@/lib/site-config'

const LOGO_WIDTH = 100
const LOGO_HEIGHT = 30
const PADDING = 48
const SWIPE_DISTANCE = 180

function getRandomPosition() {
  if (typeof window === 'undefined') return { x: 300, y: 200 }
  const maxX = window.innerWidth - LOGO_WIDTH - PADDING
  const maxY = window.innerHeight - LOGO_HEIGHT - PADDING
  const minX = SIDEBAR_WIDTH + PADDING
  const minY = PADDING
  return {
    x: Math.floor(Math.random() * (maxX - minX + 1)) + minX,
    y: Math.floor(Math.random() * (maxY - minY + 1)) + minY,
  }
}

export default function LogoTeleport() {
  const ref = useRef<HTMLButtonElement>(null)
  const { theme } = useTheme()
  const themeTransition = useThemeTransition()
  const effectiveTheme = useThemeAtElement(ref, theme)
  const [position, setPosition] = useState<'footer' | { x: number; y: number }>('footer')
  const [isScalingOut, setIsScalingOut] = useState(false)
  const isThemeTransitioning = themeTransition?.isTransitioning ?? false

  const handleClick = useCallback(() => {
    if (isScalingOut) return
    setIsScalingOut(true)
  }, [isScalingOut])

  const handleScaleOutComplete = useCallback(() => {
    setPosition(getRandomPosition())
    setIsScalingOut(false)
  }, [])

  const filterClass =
    effectiveTheme === 'dark' ? '[filter:brightness(0)_invert(1)]' : '[filter:brightness(0)]'

  return (
    <motion.button
      ref={ref}
      type="button"
      className={`fixed z-50 cursor-pointer select-none outline-none ${filterClass}`}
      style={{
        ...(position === 'footer'
          ? { right: 32, bottom: 24 }
          : { left: position.x, top: position.y }),
      }}
      initial={false}
      animate={{
        scale: isScalingOut ? 0 : 1,
        x: isThemeTransitioning ? SWIPE_DISTANCE : 0,
        opacity: isThemeTransitioning ? 0.4 : 1,
      }}
      transition={{
        scale: isScalingOut
          ? { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }
          : isThemeTransitioning
            ? { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
            : { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] },
        x: isThemeTransitioning
          ? { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
          : { duration: 0.35, ease: [0.34, 1.56, 0.64, 1] },
        opacity: { duration: 0.4 },
      }}
      onAnimationComplete={() => {
        if (isScalingOut) {
          handleScaleOutComplete()
        }
      }}
      onClick={handleClick}
      aria-label="LITHE logo"
    >
      <motion.span
        className="inline-block"
        animate={{
          filter: isThemeTransitioning ? 'blur(8px)' : 'blur(0px)',
        }}
        transition={{ duration: 0.4 }}
      >
        <Image
          src="/LITHE.svg"
          alt="LITHE"
          width={LOGO_WIDTH}
          height={LOGO_HEIGHT}
          className="h-8 w-auto pointer-events-none"
          draggable={false}
        />
      </motion.span>
    </motion.button>
  )
}
