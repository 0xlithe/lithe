'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const RippleShader = dynamic(() => import('./RippleShader'), { ssr: false })

const Canvas = dynamic(
  () => import('@react-three/fiber').then((mod) => mod.Canvas),
  { ssr: false }
)

export default function WebGLOutroAnimation({
  onComplete,
  duration = 2500,
}: {
  onComplete?: () => void
  duration?: number
}) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const id = setTimeout(() => setVisible(false), duration)
    return () => clearTimeout(id)
  }, [duration])

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[60] bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 w-full h-full">
            <Canvas
              camera={{ position: [0, 0, 1], fov: 50 }}
              gl={{ alpha: true, antialias: true }}
            >
              <RippleShader />
            </Canvas>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
