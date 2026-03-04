'use client'

import { useEffect, useRef, useState } from 'react'
import { animate } from 'animejs'

/**
 * Outro animation: waves form at the top and gradually wipe away the black screen,
 * revealing the content underneath. Uses anime.js.
 */
export default function OutroAnimation({
  onComplete,
  duration = 2000,
  delay = 0,
}: {
  onComplete?: () => void
  duration?: number
  delay?: number
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const waveRef = useRef<SVGGElement>(null)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const wave = waveRef.current
    if (!wave || !containerRef.current) return

    const timeoutIds: ReturnType<typeof setTimeout>[] = []

    const id = setTimeout(() => {
      // Animate the wave group from top to bottom - sweeps down to reveal
      animate(wave, {
        y: [0, 120],
        duration,
        easing: 'inOutExpo',
      }).then(() => {
        setVisible(false)
        onComplete?.()
      })

      // Fallback: ensure we hide even if animation fails
      const fallbackId = setTimeout(() => {
        setVisible(false)
        onComplete?.()
      }, duration + 500)
      timeoutIds.push(fallbackId)
    }, delay)
    timeoutIds.push(id)

    return () => {
      timeoutIds.forEach((tid) => clearTimeout(tid))
    }
  }, [duration, delay, onComplete])

  if (!visible) return null

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-[60] bg-black"
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <mask id="outro-wave-mask">
            <rect width="100" height="100" fill="white" />
            {/* Wave band - black = cutout, reveals content as it sweeps down */}
            <g ref={waveRef} fill="black">
              <path d="M 0 0 L 100 0 L 100 25 Q 75 12 50 25 Q 25 12 0 25 Z" />
              <path d="M 0 15 L 100 15 L 100 45 Q 70 28 40 45 Q 10 28 0 45 Z" />
              <path d="M 0 35 L 100 35 L 100 70 Q 65 50 35 70 Q 5 50 0 70 Z" />
            </g>
          </mask>
        </defs>
        <rect
          width="100"
          height="100"
          fill="black"
          mask="url(#outro-wave-mask)"
        />
      </svg>
    </div>
  )
}
