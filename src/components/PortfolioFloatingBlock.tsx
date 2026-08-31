'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const Sparkles = dynamic(
  () => import('@react-three/drei').then((mod) => mod.Sparkles),
  { ssr: false }
)

const ORBIT_CENTER: [number, number, number] = [-0.4, -1.5, 0]
const ORBIT_RADIUS = 0.64
const ORBIT_SPEED = 0.03 // radians per second
const SCALE = 0.5
const FLOAT_AMPLITUDE = 0.06
const FLOAT_SPEED = 0.35 // cycles per second
const ROTATE_SPEED = 0.05 // radians per second (Y-axis)

const LOGO_PATH = '/splyc-logo.png'

const THEME_COLORS = {
  dark: '#EDEDED',   // lithe-primary
  light: '#1a1a1a', // lithe-primary
} as const

function flattenLogoToWhite(texture: THREE.Texture) {
  const img = texture.image as CanvasImageSource & { width: number; height: number }
  const canvas = document.createElement('canvas')
  canvas.width = img.width
  canvas.height = img.height
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.drawImage(img, 0, 0)
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const pixels = imageData.data
  for (let i = 0; i < pixels.length; i += 4) {
    pixels[i] = 255
    pixels[i + 1] = 255
    pixels[i + 2] = 255
  }
  ctx.putImageData(imageData, 0, 0)
  texture.image = canvas
  texture.needsUpdate = true
}

interface PortfolioFloatingBlockProps {
  theme?: 'dark' | 'light'
  onClick?: () => void
}

/** Splyc logo on a plane at the cube location */
export default function PortfolioFloatingBlock({ theme = 'dark', onClick }: PortfolioFloatingBlockProps) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null)
  const groupRef = useRef<THREE.Group>(null)
  const angleRef = useRef(Math.atan2(0.5, -0.4)) // initial angle from center
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
      flattenLogoToWhite(t)
      t.colorSpace = THREE.SRGBColorSpace
      setTexture(t)
    })
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
