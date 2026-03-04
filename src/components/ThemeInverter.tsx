'use client'

import { motion, AnimatePresence } from 'framer-motion'

const BLOB_COUNT = 8

interface ThemeInverterProps {
  isAnimating: boolean
  onAnimationComplete: () => void
}

export function ThemeInverter({
  isAnimating,
  onAnimationComplete,
}: ThemeInverterProps) {
  const blobs = Array.from({ length: BLOB_COUNT })

  return (
    <AnimatePresence onExitComplete={() => {}}>
      {isAnimating && (
        <motion.div
          className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="relative h-full w-full flex items-center justify-center"
            style={{
              filter: 'url(#theme-inverter-goo)',
              mixBlendMode: 'difference',
            }}
          >
            {blobs.map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  width: `${10 + i * 5}rem`,
                  height: `${10 + i * 5}rem`,
                }}
                initial={{ scale: 0, x: 0, y: 0 }}
                animate={{
                  scale: 25,
                  x: (i - 4) * 50,
                  y: (i % 2 === 0 ? 1 : -1) * (i * 20),
                }}
                transition={{
                  duration: 1.2,
                  ease: [0.76, 0, 0.24, 1],
                  delay: i * 0.02,
                }}
                onAnimationComplete={i === BLOB_COUNT - 1 ? onAnimationComplete : undefined}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
