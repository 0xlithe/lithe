'use client'

import { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import { INTRO_DURATION_MS, INTRO_COVER_DELAY_MS } from '@/lib/site-config'

export type LogoIntroHandle = {
  pause: () => void
  play: () => void
}

const LogoIntro = forwardRef<LogoIntroHandle>(function LogoIntro(_, ref) {
  const [svgContent, setSvgContent] = useState<string | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [fetchError, setFetchError] = useState(false)

  useImperativeHandle(ref, () => ({
    pause: () => setIsPaused(true),
    play: () => setIsPaused(false),
  }))

  useEffect(() => {
    fetch('/LITHE.svg')
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load logo: ${res.status}`)
        return res.text()
      })
      .then(setSvgContent)
      .catch(() => setFetchError(true))
  }, [])

  if (fetchError) return null

  if (!svgContent) return null

  const durationSec = INTRO_DURATION_MS / 1000
  const coverDelaySec = INTRO_COVER_DELAY_MS / 1000

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black">
      {/* First wipe: logo revealed left-to-right */}
      <div
        className="flex min-h-full min-w-full items-center justify-center px-8 [&_svg]:max-h-[30vh] [&_svg]:w-auto [&_svg]:object-contain"
        style={{
          filter: 'brightness(0) invert(1)',
          animation: `logo-wipe-reveal ${durationSec}s linear forwards`,
          animationPlayState: isPaused ? 'paused' : 'running',
        }}
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
      {/* Second wipe: black overlay covers logo */}
      <div
        className="absolute inset-0 z-10 bg-black"
        style={{
          animation: `logo-wipe-cover ${durationSec}s linear forwards`,
          animationDelay: `${coverDelaySec}s`,
          animationPlayState: isPaused ? 'paused' : 'running',
        }}
      />
    </div>
  )
})

export default LogoIntro
