'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const Sparkles = dynamic(
  () => import('@react-three/drei').then((mod) => mod.Sparkles),
  { ssr: false }
)

const LOGO_PATH = '/quilt.png'

const ORBIT_CENTER: [number, number, number] = [0.55, -2.5, -0.75]
const ORBIT_RADIUS = 0.64
const ORBIT_SPEED = 0.025
const SCALE = 0.5
const FLOAT_AMPLITUDE = 0.065
const FLOAT_SPEED = 0.3
const ROTATE_SPEED = -0.03

const THEME_COLORS = {
  dark: '#EDEDED',
  light: '#1a1a1a',
} as const

interface PortfolioQuiltFloatingBlockProps {
  theme?: 'dark' | 'light'
  onClick?: () => void
}

/** Quilt logo on a plane, right side lower (opposite Splyc layout) */
export default function PortfolioQuiltFloatingBlock({
  theme = 'dark',
  onClick,
}: PortfolioQuiltFloatingBlockProps) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null)
  const groupRef = useRef<THREE.Group>(null)
  const angleRef = useRef(Math.atan2(0.5, 0.55))
  const timeRef = useRef(0)

  useFrame((_, delta) => {
    if (!groupRef.current) return
    timeRef.current += delta
    angleRef.current += ORBIT_SPEED * delta
    const x = ORBIT_CENTER[0] + ORBIT_RADIUS * Math.cos(angleRef.current)
    const z = ORBIT_CENTER[2] + ORBIT_RADIUS * Math.sin(angleRef.current)
    const floatY = FLOAT_AMPLITUDE * Math.sin(timeRef.current * FLOAT_SPEED * Math.PI * 2)
    groupRef.current.position.set(x, ORBIT_CENTER[1] + floatY, z)
    groupRef.current.rotation.y += ROTATE_SPEED * delta
  })

  useEffect(() => {
    const loader = new THREE.TextureLoader()
    const tex = loader.load(LOGO_PATH, (t) => {
      t.minFilter = THREE.NearestFilter
      t.magFilter = THREE.NearestFilter
      t.generateMipmaps = false
      setTexture(t)
    }, undefined, () => setTexture(null))
    return () => tex.dispose()
  }, [])

  if (!texture) return null

  const [cx, cy, cz] = ORBIT_CENTER
  const initialX = cx + ORBIT_RADIUS * Math.cos(angleRef.current)
  const initialZ = cz + ORBIT_RADIUS * Math.sin(angleRef.current)

  return (
    <group
      ref={groupRef}
      position={[initialX, cy, initialZ]}
      scale={SCALE}
    >
      <Sparkles
        count={30}
        scale={1.5}
        size={0.4}
        speed={0.3}
        opacity={0.6}
        color={THEME_COLORS[theme]}
      />
      <mesh
        onPointerDown={(e) => e.stopPropagation()}
        onPointerUp={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation()
          onClick?.()
        }}
        onPointerOver={(e) => {
          e.stopPropagation()
          if (onClick) document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto'
        }}
      >
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          map={texture}
          color={THEME_COLORS[theme]}
          transparent
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}
