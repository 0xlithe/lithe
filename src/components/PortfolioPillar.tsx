'use client'

import * as THREE from 'three'

const PILLAR_WIDTH = 0.35
const PILLAR_DEPTH = 0.35
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
const edgesGeometry = new THREE.EdgesGeometry(boxGeometry)

interface PortfolioPillarProps {
  theme?: 'dark' | 'light'
}

export default function PortfolioPillar({ theme = 'dark' }: PortfolioPillarProps) {
  const color = THEME_COLORS[theme]

  return (
    <lineSegments
      position={[-0.4, -8, 0]}
      geometry={edgesGeometry}
    >
      <lineBasicMaterial color={color} />
    </lineSegments>
  )
}
