'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'

const Canvas = dynamic(
  () => import('@react-three/fiber').then((mod) => mod.Canvas),
  { ssr: false }
)

const GradientFadeShader = dynamic(
  () => import('./GradientFadeShader'),
  { ssr: false }
)

import { GRADIENT_FADE_DURATION, GRADIENT_FADE_DELAY } from '@/lib/site-config'

export default function GradientFadeOverlay({
  onComplete,
  duration = GRADIENT_FADE_DURATION,
  delay = GRADIENT_FADE_DELAY,
}: {
  onComplete?: () => void
  duration?: number
  delay?: number
}) {
  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[60] bg-black"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{
        delay,
        duration,
        ease: 'easeOut',
      }}
      onAnimationComplete={onComplete}
    >
      <div className="absolute inset-0 w-full h-full">
        <Canvas
          camera={{ position: [0, 0, 1], fov: 50 }}
          gl={{ alpha: false, antialias: true }}
        >
          <GradientFadeShader />
        </Canvas>
      </div>
    </motion.div>
  )
}
