'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Black #000000 and page bg #0A0A0A (10/255 ≈ 0.039)
const BLACK = [0, 0, 0] as const
const DARK = [10 / 255, 10 / 255, 10 / 255] as const

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform float uTime;
  uniform float uProgress;
  uniform vec3 uBlack;
  uniform vec3 uDark;

  varying vec2 vUv;

  void main() {
    vec2 uv = vUv - 0.5;
    uv.x *= 1.5;

    // Warp: organic distortion
    float warp = sin(uv.x * 8.0 + uTime * 2.0) * 0.04
      + sin(uv.y * 6.0 + uTime * 1.5) * 0.03
      + sin((uv.x + uv.y) * 10.0 - uTime * 2.5) * 0.02;

    float dist = length(uv + warp);
    float angle = atan(uv.y, uv.x);

    // Warped gradient mix (0.0 = black, 1.0 = dark)
    float mixFactor = smoothstep(0.0, 0.9, dist + sin(angle * 5.0 + uTime * 2.0) * 0.08);

    // Blend warp with uProgress for smooth fade
    float t = mix(mixFactor * 0.5, 1.0, uProgress);
    vec3 color = mix(uBlack, uDark, t);

    gl_FragColor = vec4(color, 1.0);
  }
`

export default function GradientFadeShader() {
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uBlack: { value: new THREE.Vector3(...BLACK) },
      uDark: { value: new THREE.Vector3(...DARK) },
    }),
    []
  )

  useFrame((_, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta
      const target = 1
      const current = materialRef.current.uniforms.uProgress.value
      materialRef.current.uniforms.uProgress.value +=
        (target - current) * delta * 1.2
    }
  })

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
      />
    </mesh>
  )
}
