'use client'

import * as THREE from 'three'

const PILLAR_WIDTH = 0.08
const PILLAR_DEPTH = 0.08
const PILLAR_HEIGHT = 12

const THEME_COLORS = {
  dark: '#EDEDED',   // lithe-primary
  light: '#1a1a1a', // lithe-primary
} as const

const boxGeometry = new THREE.BoxGeometry(
  PILLAR_WIDTH,
  PILLAR_HEIGHT,
  PILLAR_DEPTH
)

interface PortfolioPillarProps {
  theme?: 'dark' | 'light'
}

export default function PortfolioPillar({ theme = 'dark' }: PortfolioPillarProps) {
  const color = THEME_COLORS[theme]

  return (
    <mesh position={[-0.4, -8, 0]} geometry={boxGeometry}>
      <meshBasicMaterial color={color} />
    </mesh>
  )
}
