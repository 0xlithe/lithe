'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const Sparkles = dynamic(
  () => import('@react-three/drei').then((mod) => mod.Sparkles),
  { ssr: false }
)

const LOGO_PATH = '/youtube.png'

const ORBIT_CENTER: [number, number, number] = [-0.15, -3.25, -0.25]
const ORBIT_RADIUS = 0.38
const ORBIT_SPEED = 0.02
const SCALE = 0.5
const FLOAT_AMPLITUDE = 0.065
const FLOAT_SPEED = 0.3
const ROTATE_SPEED = 0.035

const THEME_COLORS = {
  dark: '#EDEDED',
  light: '#1a1a1a',
} as const

interface PortfolioYoutubeFloatingBlockProps {
  theme?: 'dark' | 'light'
  onClick?: () => void
}

/** YouTube logo on a plane, slightly below Quilt and rotated CW */
export default function PortfolioYoutubeFloatingBlock({
  theme = 'dark',
  onClick,
}: PortfolioYoutubeFloatingBlockProps) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null)
  const groupRef = useRef<THREE.Group>(null)
  const angleRef = useRef(Math.atan2(0.5, 0.15) - 0.45)
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
    let disposed = false
    let tex: THREE.Texture | null = null
    const img = new Image()
    img.onload = () => {
      if (disposed) return
      const size = 512
      const canvas = document.createElement('canvas')
      canvas.width = size
      canvas.height = size
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      const iconSize = size * 0.82
      ctx.drawImage(img, (size - iconSize) / 2, (size - iconSize) / 2, iconSize, iconSize)
      tex = new THREE.CanvasTexture(canvas)
      tex.colorSpace = THREE.SRGBColorSpace
      tex.minFilter = THREE.LinearFilter
      tex.magFilter = THREE.LinearFilter
      tex.needsUpdate = true
      setTexture(tex)
    }
    img.onerror = () => setTexture(null)
    img.src = LOGO_PATH
    return () => {
      disposed = true
      tex?.dispose()
      document.body.style.cursor = 'auto'
    }
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
        raycast={() => null}
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
        <sphereGeometry args={[1.15, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      <mesh>
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
