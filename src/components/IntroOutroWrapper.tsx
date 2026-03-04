'use client'

import { useState, useEffect } from 'react'
import LogoIntro from '@/components/LogoIntro'
import GradientFadeOverlay from '@/components/GradientFadeOverlay'

import { INTRO_DURATION_MS } from '@/lib/site-config'

export default function IntroOutroWrapper() {
  const [showIntro, setShowIntro] = useState(true)
  const [showGradient, setShowGradient] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => {
      setShowIntro(false)
      setShowGradient(true)
    }, INTRO_DURATION_MS)
    return () => clearTimeout(id)
  }, [])

  const handleGradientComplete = () => setShowGradient(false)

  return (
    <>
      {showIntro && <LogoIntro />}
      {showGradient && (
        <GradientFadeOverlay onComplete={handleGradientComplete} />
      )}
    </>
  )
}
