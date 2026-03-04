'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

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

  varying vec2 vUv;

  void main() {
    // Center the coordinates
    vec2 uv = vUv - 0.5;
    uv.x *= 1.5; // aspect correction
    float dist = length(uv);

    // Calculate angle for the tentacle waves
    float angle = atan(uv.y, uv.x);

    // --- 1. RIPPLE EFFECT ---
    float ring1 = smoothstep(0.02, 0.0, abs(dist - (uTime * 0.8)));
    // Delay second ring
    float ring2 = smoothstep(0.02, 0.0, abs(dist - ((uTime - 0.5) * 0.8))) * step(0.5, uTime);

    vec3 rippleColor = vec3(1.0) * (ring1 + ring2);

    // --- 2. TENTACLE WAVE WIPE ---
    // The tentacles wiggle over time
    float tentacles = sin(angle * 12.0 - uTime * 4.0) * 0.15;

    // FIX: smoothstep calculates what should be visible.
    // As uProgress grows, the "transparent hole" in the center grows.
    // Start: full black (alpha=1). End: center eats away (alpha=0 in center).
    float alpha = smoothstep(uProgress * 1.2 - 0.2, uProgress * 1.2 - 0.05, dist + tentacles);

    // Combine black background with white ripples
    vec3 finalColor = mix(vec3(0.0), vec3(1.0), rippleColor);

    gl_FragColor = vec4(finalColor, alpha);
  }
`

export default function RippleShader() {
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uProgress: { value: 0 },
    }),
    []
  )

  useFrame((_, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta
      // Lerp progress 0 -> 1 over ~2 seconds
      const target = 1
      const current = materialRef.current.uniforms.uProgress.value
      materialRef.current.uniforms.uProgress.value += (target - current) * delta * 0.8
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
        transparent
        depthWrite={false}
      />
    </mesh>
  )
}
