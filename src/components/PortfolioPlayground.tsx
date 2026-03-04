'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { useTheme } from '@/contexts/ThemeContext'

const Canvas = dynamic(
  () => import('@react-three/fiber').then((mod) => mod.Canvas),
  { ssr: false }
)

const PortfolioPillar = dynamic(
  () => import('./PortfolioPillar'),
  { ssr: false }
)

const OrbitControls = dynamic(
  () => import('@react-three/drei').then((mod) => mod.OrbitControls),
  { ssr: false }
)

const Sparkles = dynamic(
  () => import('@react-three/drei').then((mod) => mod.Sparkles),
  { ssr: false }
)

const Grid = dynamic(
  () => import('@react-three/drei').then((mod) => mod.Grid),
  { ssr: false }
)

// Default camera: offset from pillar, looking at upper portion
const DEFAULT_CAMERA_POSITION: [number, number, number] = [3.5, 0.5, 1.5]
const ORBIT_TARGET: [number, number, number] = [-0.4, -2.5, 0] // Upper half of pillar
const MIN_POLAR = 0.72 // Block rotating too high up
const MAX_POLAR = 1.2   // Allow rotating down more
const MIN_ZOOM = 3.2
const MAX_ZOOM = 7

function Scene({ theme }: { theme: 'dark' | 'light' }) {
  return (
    <>
      <OrbitControls
        target={ORBIT_TARGET}
        enablePan={false}
        enableZoom
        minDistance={MIN_ZOOM}
        maxDistance={MAX_ZOOM}
        minPolarAngle={MIN_POLAR}
        maxPolarAngle={MAX_POLAR}
        autoRotate
        autoRotateSpeed={0.25}
      />
      <Grid
        position={[0, -5, -3]}
        args={[40, 40]}
        cellSize={0.8}
        cellThickness={0.6}
        cellColor={theme === 'dark' ? '#404040' : '#b0b0b0'}
        sectionSize={3}
        sectionThickness={0.8}
        sectionColor={theme === 'dark' ? '#505050' : '#909090'}
        fadeDistance={20}
        fadeStrength={0.75}
        infiniteGrid
      />
      <PortfolioPillar theme={theme} />
      <Sparkles
        count={100}
        scale={12}
        size={0.8}
        speed={0.4}
        opacity={0.35}
        color={theme === 'dark' ? '#EDEDED' : '#a1a1a1'}
      />
    </>
  )
}

export default function PortfolioPlayground() {
  const { theme } = useTheme()
  return (
    <div className="fixed inset-0 z-0 h-screen w-full flex justify-center">
      <Canvas
        camera={{
          position: DEFAULT_CAMERA_POSITION,
          fov: 45,
        }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <Scene theme={theme} />
        </Suspense>
      </Canvas>
    </div>
  )
}
