'use client'

import dynamic from 'next/dynamic'
import { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useTheme } from '@/contexts/ThemeContext'

const FADE_DURATION_MS = 400

const Canvas = dynamic(
  () => import('@react-three/fiber').then((mod) => mod.Canvas),
  { ssr: false }
)

const Sparkles = dynamic(
  () => import('@react-three/drei').then((mod) => mod.Sparkles),
  { ssr: false }
)

const OrbitControls = dynamic(
  () => import('@react-three/drei').then((mod) => mod.OrbitControls),
  { ssr: false }
)

const THEME_COLORS = {
  dark: '#EDEDED',
  light: '#1a1a1a',
} as const

const ORBIT_RADIUS = 1.5
const ORBIT_SPEED = 0.06
const DRIFT_AMOUNT = 0.04
const DRIFT_SPEED = 0.4
const ROTATION_AMOUNT = 0.08
const ROTATION_SPEED = 0.3
const LOGO_SCALE = 1.5

const LOGO_PATHS = {
  dark: '/honeydew_light.png',
  light: '/honeydew_dark.png',
} as const

function FloatingLogo({ theme }: { theme: 'dark' | 'light' }) {
  const groupRef = useRef<THREE.Group>(null)
  const [texture, setTexture] = useState<THREE.Texture | null>(null)

  useEffect(() => {
    const loader = new THREE.TextureLoader()
    const tex = loader.load(LOGO_PATHS[theme], (t) => {
      t.minFilter = THREE.NearestFilter
      t.magFilter = THREE.NearestFilter
      t.generateMipmaps = false
      setTexture(t)
    })
    return () => tex.dispose()
  }, [theme])

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    groupRef.current.position.x = Math.sin(t * DRIFT_SPEED) * DRIFT_AMOUNT
    groupRef.current.position.y = Math.cos(t * DRIFT_SPEED * 0.7) * DRIFT_AMOUNT
    groupRef.current.rotation.z = Math.sin(t * ROTATION_SPEED) * ROTATION_AMOUNT
  })

  if (!texture) return null

  return (
    <group ref={groupRef} scale={LOGO_SCALE}>
      <mesh>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          map={texture}
          transparent
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}

function OrbitingSparkles({ theme }: { theme: 'dark' | 'light' }) {
  const groupRef = useRef<any>(null)
  const sparklesRef = useRef<any>(null)
  const color = THEME_COLORS[theme]

  useEffect(() => {
    if (sparklesRef.current) {
      sparklesRef.current.raycast = () => {}
    }
  }, [])

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * ORBIT_SPEED
    }
  })

  return (
    <group ref={groupRef} position={[-0.4, 0, 1.5]}>
      <group position={[ORBIT_RADIUS, 0, 0]}>
        <Sparkles
          ref={sparklesRef}
          count={140}
          scale={2}
          size={1.2}
          speed={0.03}
          opacity={0.5}
          color={color}
          raycast={() => null}
        />
      </group>
    </group>
  )
}

function SparklesScene({ theme }: { theme: 'dark' | 'light' }) {
  return (
    <>
      <FloatingLogo theme={theme} />
      <OrbitingSparkles theme={theme} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        enableDamping={false}
        rotateSpeed={0.5}
        minAzimuthAngle={-Math.PI / 4}
        maxAzimuthAngle={Math.PI / 4}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
      />
    </>
  )
}

export default function HoneydewVideoSparkles({
  theme: themeProp,
}: {
  theme?: 'dark' | 'light'
} = {}) {
  const { theme: contextTheme } = useTheme()
  const theme = themeProp ?? contextTheme
  const [displayTheme, setDisplayTheme] = useState(theme)
  const [opacity, setOpacity] = useState(1)
  const isFadingRef = useRef(false)

  useEffect(() => {
    if (theme === displayTheme) return
    isFadingRef.current = true
    setOpacity(0)
  }, [theme, displayTheme])

  const handleTransitionEnd = () => {
    if (!isFadingRef.current) return
    setDisplayTheme(theme)
    isFadingRef.current = false
    setOpacity(1)
  }

  return (
    <div
      className="absolute inset-0 z-10 rounded-lg overflow-visible"
      style={{
        pointerEvents: 'auto',
        opacity,
        transition: `opacity ${FADE_DURATION_MS}ms ease`,
      }}
      onTransitionEnd={handleTransitionEnd}
      aria-hidden
    >
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 50 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          preserveDrawingBuffer: true,
        }}
        dpr={3}
        frameloop="always"
        style={{ cursor: 'grab' }}
      >
        <SparklesScene theme={displayTheme} />
      </Canvas>
    </div>
  )
}
