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

const THEME_COLORS = {
  dark: '#EDEDED',   // lithe-primary
  light: '#1a1a1a', // lithe-primary
} as const

interface PortfolioFloatingBlockProps {
  theme?: 'dark' | 'light'
  onClick?: () => void
}

/** Splyc Logo (from SVG's embedded image) on a plane at the cube location */
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
    let tex: THREE.Texture | null = null
    fetch('/Splyc%20Logo%20Transparent.svg')
      .then((res) => res.text())
      .then((svgText) => {
        const parser = new DOMParser()
        const doc = parser.parseFromString(svgText, 'image/svg+xml')
        const img = doc.querySelector('image')
        const href =
          img?.getAttribute('href') ??
          img?.getAttribute('xlink:href') ??
          img?.getAttributeNS('http://www.w3.org/1999/xlink', 'href')
        if (href?.startsWith('data:image')) {
          tex = new THREE.TextureLoader().load(href, (t) => {
            t.minFilter = THREE.NearestFilter
            t.magFilter = THREE.NearestFilter
            t.generateMipmaps = false
            setTexture(t)
          })
        }
      })
    return () => tex?.dispose()
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
