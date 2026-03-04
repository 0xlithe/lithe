'use client'

import dynamic from 'next/dynamic'
import React, { Suspense, useRef, useEffect, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useTheme } from '@/contexts/ThemeContext'
import { useThemeAtElement } from '@/contexts/ThemeTransitionContext'
import { usePageTransition } from '@/contexts/PageTransitionContext'

const Canvas = dynamic(
  () => import('@react-three/fiber').then((mod) => mod.Canvas),
  { ssr: false }
)

const PortfolioPillar = dynamic(
  () => import('./PortfolioPillar'),
  { ssr: false }
)

const PortfolioFloatingBlock = dynamic(
  () => import('./PortfolioFloatingBlock'),
  { ssr: false }
)

const PortfolioHoneydewFloatingBlock = dynamic(
  () => import('./PortfolioHoneydewFloatingBlock'),
  { ssr: false }
)

const OrbitControls = dynamic(
  () => import('@react-three/drei').then((mod) => mod.OrbitControls),
  { ssr: false }
)

const Sparkles = dynamic(
  () => import('@react-three/drei').then((mod) => mod.Sparkles),
  { ssr: false }
)

const Grid = dynamic(
  () => import('@react-three/drei').then((mod) => mod.Grid),
  { ssr: false }
)

const DEFAULT_CAMERA_POSITION: [number, number, number] = [3.5, 0.5, 1.5]
const ORBIT_TARGET: [number, number, number] = [-0.4, -2.5, 0]
const EXIT_TARGET: [number, number, number] = [4, 3, 2]
/** Camera position at start of enter (zoomed out); animates to DEFAULT_CAMERA_POSITION */
const ENTER_CAMERA_START: [number, number, number] = [6, 2, 4]
const EXIT_DURATION = 0.7
const ENTER_DURATION = 0.6
const MIN_ZOOM = 3.2
const MAX_ZOOM = 7
const EXIT_BLUR_START = 0.55
const EXIT_BLUR_MAX = 8
const ENTER_BLUR_MAX = 8

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

function AnimatedOrbitControls({
  isExiting,
  onExitProgress,
  onEnterProgress,
}: {
  isExiting: boolean
  onExitProgress?: (progress: number) => void
  onEnterProgress?: (progress: number) => void
}) {
  const progressRef = useRef(0)
  const targetRef = useRef(new THREE.Vector3(...EXIT_TARGET))
  const controlsRef = useRef<any>(null)
  const [isEntering, setIsEntering] = useState(true)
  const { camera, invalidate } = useThree()

  useEffect(() => {
    if (isExiting) {
      progressRef.current = 0
      targetRef.current.set(...ORBIT_TARGET)
    } else {
      setIsEntering(true)
      progressRef.current = 0
      targetRef.current.set(...EXIT_TARGET)
      camera.position.set(...ENTER_CAMERA_START)
    }
  }, [isExiting, camera])

  useFrame((_, delta) => {
    if (isExiting) {
      if (progressRef.current >= 1) {
        onExitProgress?.(1)
        return
      }
      progressRef.current = Math.min(progressRef.current + delta / EXIT_DURATION, 1)
      onExitProgress?.(progressRef.current)
      const t = easeOutCubic(progressRef.current)
      targetRef.current.set(
        THREE.MathUtils.lerp(ORBIT_TARGET[0], EXIT_TARGET[0], t),
        THREE.MathUtils.lerp(ORBIT_TARGET[1], EXIT_TARGET[1], t),
        THREE.MathUtils.lerp(ORBIT_TARGET[2], EXIT_TARGET[2], t)
      )
      camera.lookAt(targetRef.current)
    } else if (isEntering) {
      if (progressRef.current >= 1) {
        onEnterProgress?.(1)
        targetRef.current.set(...ORBIT_TARGET)
        camera.position.set(...DEFAULT_CAMERA_POSITION)
        camera.lookAt(...ORBIT_TARGET)
        camera.updateProjectionMatrix()
        setIsEntering(false)
        return
      }
      progressRef.current = Math.min(progressRef.current + delta / ENTER_DURATION, 1)
      onEnterProgress?.(progressRef.current)
      const t = easeOutCubic(progressRef.current)
      targetRef.current.set(
        THREE.MathUtils.lerp(EXIT_TARGET[0], ORBIT_TARGET[0], t),
        THREE.MathUtils.lerp(EXIT_TARGET[1], ORBIT_TARGET[1], t),
        THREE.MathUtils.lerp(EXIT_TARGET[2], ORBIT_TARGET[2], t)
      )
      camera.position.set(
        THREE.MathUtils.lerp(ENTER_CAMERA_START[0], DEFAULT_CAMERA_POSITION[0], t),
        THREE.MathUtils.lerp(ENTER_CAMERA_START[1], DEFAULT_CAMERA_POSITION[1], t),
        THREE.MathUtils.lerp(ENTER_CAMERA_START[2], DEFAULT_CAMERA_POSITION[2], t)
      )
      camera.lookAt(targetRef.current)
    }
    invalidate()
  }, -2)

  const isAnimating = isExiting || isEntering
  const showControls = !isEntering && !isExiting

  return (
    showControls && (
      <OrbitControls
        key="orbit-ready"
        ref={controlsRef}
        target={targetRef.current}
        enablePan={false}
        minDistance={MIN_ZOOM}
        maxDistance={MAX_ZOOM}
        minAzimuthAngle={-Infinity}
        maxAzimuthAngle={Infinity}
        minPolarAngle={0.1}
        maxPolarAngle={Math.PI - 0.1}
        autoRotate
        autoRotateSpeed={0.25}
      />
    )
  )
}

function Scene({
  theme,
  isExiting,
  onExitProgress,
  onEnterProgress,
  onSplycClick,
  onHoneydewClick,
}: {
  theme: 'dark' | 'light'
  isExiting: boolean
  onExitProgress?: (progress: number) => void
  onEnterProgress?: (progress: number) => void
  onSplycClick?: () => void
  onHoneydewClick?: () => void
}) {
  return (
    <>
      <AnimatedOrbitControls
        isExiting={isExiting}
        onExitProgress={onExitProgress}
        onEnterProgress={onEnterProgress}
      />
      <Grid
        position={[0, -5, -3]}
        args={[40, 40]}
        cellSize={0.8}
        cellThickness={0.6}
        cellColor={theme === 'dark' ? '#404040' : '#b0b0b0'}
        sectionSize={3}
        sectionThickness={0.8}
        sectionColor={theme === 'dark' ? '#505050' : '#909090'}
        fadeDistance={20}
        fadeStrength={0.75}
        infiniteGrid
      />
      <PortfolioPillar theme={theme} />
      <Sparkles
        count={100}
        scale={12}
        size={0.8}
        speed={0.4}
        opacity={0.35}
        color={theme === 'dark' ? '#EDEDED' : '#1a1a1a'}
      />
      <PortfolioFloatingBlock theme={theme} onClick={onSplycClick} />
      <PortfolioHoneydewFloatingBlock theme={theme} onClick={onHoneydewClick} />
    </>
  )
}

export default function PortfolioPlayground() {
  const { theme } = useTheme()
  const containerRef = useRef<HTMLDivElement>(null)
  const effectiveTheme = useThemeAtElement(containerRef, theme)
  const { exitingTo, exitAndNavigate } = usePageTransition()
  const isExiting = !!exitingTo
  const [exitProgress, setExitProgress] = useState(0)
  const [enterProgress, setEnterProgress] = useState(0)

  useEffect(() => {
    if (!isExiting) setExitProgress(0)
  }, [isExiting])

  const exitBlur =
    isExiting && exitProgress > EXIT_BLUR_START
      ? ((exitProgress - EXIT_BLUR_START) / (1 - EXIT_BLUR_START)) * EXIT_BLUR_MAX
      : 0
  const enterBlur =
    !isExiting && enterProgress < 1
      ? (1 - enterProgress) * ENTER_BLUR_MAX
      : 0
  const blurAmount = exitBlur || enterBlur

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 h-screen w-full flex justify-center"
      style={{
        filter: blurAmount > 0 ? `blur(${blurAmount}px)` : 'none',
      }}
    >
      <Canvas
        camera={{
          position: DEFAULT_CAMERA_POSITION,
          fov: 45,
        }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <Scene
            theme={effectiveTheme}
            isExiting={isExiting}
            onExitProgress={isExiting ? setExitProgress : undefined}
            onEnterProgress={!isExiting ? setEnterProgress : undefined}
            onSplycClick={() => exitAndNavigate('/portfolio/splyc')}
            onHoneydewClick={() => exitAndNavigate('/portfolio/honeydew')}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
