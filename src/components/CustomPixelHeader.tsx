'use client'

import { motion } from 'framer-motion'
import { PixelHeading } from '@/components/ui/pixel-heading-character'
import { usePageTransition } from '@/contexts/PageTransitionContext'
import { cn } from '@/lib/utils'
import { EXIT_OFFSET_DEFAULT, SIDEBAR_WIDTH } from '@/lib/site-config'

const PIXEL_HEADER_CLASS =
  'text-5xl md:text-7xl font-normal tracking-tight [text-shadow:0_0_0.5px_rgba(255,255,255,0.35),0_3px_0_rgba(0,0,0,0.5)]'

/** Enter: slide out from behind sidebar (left → right). Exit: slide left behind sidebar. */
const ENTER_TRANSITION = { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const }

interface CustomPixelHeaderProps {
  children: string
  className?: string
  /** Exit animation offset (px). Default from config. Portfolio uses larger for wider text. */
  exitOffset?: number
  /** Exit animation duration (s). Portfolio uses longer to sync with playground outro. */
  exitDuration?: number
}

export function CustomPixelHeader({
  children,
  className,
  exitOffset = EXIT_OFFSET_DEFAULT,
  exitDuration = 0.35,
}: CustomPixelHeaderProps) {
  const { exitingTo, notifyExitComplete } = usePageTransition()
  const isExiting = !!exitingTo
  const exitX = -Math.abs(exitOffset)
  const enterX = -(SIDEBAR_WIDTH - 36) // Slightly inside sidebar for enter-from-left effect

  return (
    <motion.div
      initial={isExiting ? false : { x: enterX }}
      animate={isExiting ? { x: exitX } : { x: 0 }}
      transition={
        isExiting
          ? { x: { duration: exitDuration, ease: [0.4, 0, 0.2, 1] } }
          : ENTER_TRANSITION
      }
      onAnimationComplete={isExiting ? notifyExitComplete : undefined}
    >
      <PixelHeading
        mode="wave"
        autoPlay
        cycleInterval={500}
        staggerDelay={200}
        className={cn(PIXEL_HEADER_CLASS, className)}
      >
        {children}
      </PixelHeading>
    </motion.div>
  )
}
