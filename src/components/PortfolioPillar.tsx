'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const PILLAR_WIDTH = 0.08
const PILLAR_DEPTH = 0.08
const PILLAR_HEIGHT = 12
const TRANSITION_SPEED = 3

const THEME_COLORS = {
  dark: '#EDEDED',   // lithe-primary
  light: '#1a1a1a', // lithe-primary
} as const

const boxGeometry = new THREE.BoxGeometry(
  PILLAR_WIDTH,
  PILLAR_HEIGHT,
  PILLAR_DEPTH
)
const edgesGeometry = new THREE.EdgesGeometry(boxGeometry)

interface PortfolioPillarProps {
  theme?: 'dark' | 'light'
}

export default function PortfolioPillar({ theme = 'dark' }: PortfolioPillarProps) {
  const color = THEME_COLORS[theme]
  const solidOpacityRef = useRef(1)
  const wireframeOpacityRef = useRef(0)
  const solidMatRef = useRef<THREE.MeshBasicMaterial>(null)
  const wireframeMatRef = useRef<THREE.LineBasicMaterial>(null)

  useFrame((_, delta) => {
    const targetSolid = 1
    const targetWireframe = 0
    solidOpacityRef.current += (targetSolid - solidOpacityRef.current) * Math.min(delta * TRANSITION_SPEED, 1)
    wireframeOpacityRef.current += (targetWireframe - wireframeOpacityRef.current) * Math.min(delta * TRANSITION_SPEED, 1)
    solidMatRef.current && (solidMatRef.current.opacity = solidOpacityRef.current)
    wireframeMatRef.current && (wireframeMatRef.current.opacity = wireframeOpacityRef.current)
  })

  return (
    <group position={[-0.4, -8, 0]}>
      <mesh geometry={boxGeometry} raycast={() => null}>
        <meshBasicMaterial
          ref={solidMatRef}
          color={color}
          transparent
          opacity={1}
        />
      </mesh>
      <lineSegments geometry={edgesGeometry} raycast={() => null}>
        <lineBasicMaterial
          ref={wireframeMatRef}
          color={color}
          transparent
          opacity={0}
        />
      </lineSegments>
    </group>
  )
}
