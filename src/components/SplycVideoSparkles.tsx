'use client'

import dynamic from 'next/dynamic'
import { useTheme } from '@/contexts/ThemeContext'

const Canvas = dynamic(
  () => import('@react-three/fiber').then((mod) => mod.Canvas),
  { ssr: false }
)

const Sparkles = dynamic(
  () => import('@react-three/drei').then((mod) => mod.Sparkles),
  { ssr: false }
)

const THEME_COLORS = {
  dark: '#EDEDED',
  light: '#1a1a1a',
} as const

function SparklesScene() {
  const { theme } = useTheme()
  const color = THEME_COLORS[theme]

  return (
    <Sparkles
      count={140}
      scale={4}
      size={0.5}
      speed={0.25}
      opacity={0.5}
      color={color}
    />
  )
}

export default function SplycVideoSparkles() {
  return (
    <div
      className="absolute -inset-6 pointer-events-none rounded-lg overflow-visible"
      aria-hidden
    >
      <Canvas
        camera={{ position: [0, 0, 2], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <SparklesScene />
      </Canvas>
    </div>
  )
}
