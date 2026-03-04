'use client'

import React, { useState, useCallback, useEffect, useId, useRef } from 'react'

import { cn } from '@/lib/utils'

const PIXEL_FONTS = [
  'font-pixel-square',
  'font-pixel-grid',
  'font-pixel-circle',
  'font-pixel-triangle',
  'font-pixel-line',
] as const

/* Rotating textures — venetian blinds, dither, pixelated, dots, etc. */
const TEXTURE_TYPES = [
  'vertical-lines',   /* venetian blinds */
  'horizontal-lines', /* venetian blinds alt */
  'halftone',         /* dither */
  'grid',             /* pixelated */
  'dots',             /* dots */
] as const

/* Rotating colors — same palette + 2 more, randomized order */
const ROTATING_COLORS = [
  '#C0C0C0',
  '#525252',
  '#EDEDED',
  '#1A1A1A',
  '#8A8A8A',
  '#404040',
  '#D4D4D4',
  '#2D2D2D',
  '#B8B8B8',
  '#5C5C5C',
  '#A3A3A3',
  '#737373',
] as const

const GOLDEN = 0.618033988749895

export type PixelHeadingMode = 'uniform' | 'multi' | 'wave' | 'random'
export type PrefixFont =
  | 'none'
  | 'square'
  | 'grid'
  | 'circle'
  | 'triangle'
  | 'line'

export interface PixelHeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  mode?: PixelHeadingMode
  autoPlay?: boolean
  showLabel?: boolean
  cycleInterval?: number
  staggerDelay?: number
  defaultFontIndex?: number
  prefix?: string
  prefixFont?: PrefixFont
  isolate?: Record<string, 'sans' | 'mono'>
  onFontIndexChange?: (index: number) => void
  /** Optional custom colors — cycles with font index. Default: grayscale gradient palette. */
  colors?: readonly string[]
  children: string
}

function getInitialIndex(i: number, len: number, mode: PixelHeadingMode): number {
  switch (mode) {
    case 'uniform':
      return 0
    case 'multi':
    case 'random':
      return Math.floor((i * GOLDEN) * 10) % 5
    case 'wave':
      return Math.floor((i / Math.max(len - 1, 1)) * 5) % 5
    default:
      return 0
  }
}

export function PixelHeading({
  as: Comp = 'h1',
  mode = 'multi',
  autoPlay = false,
  showLabel = false,
  cycleInterval = 150,
  staggerDelay = 50,
  defaultFontIndex = 0,
  prefix,
  prefixFont = 'none',
  isolate,
  onFontIndexChange,
  colors,
  className,
  children,
  ...props
}: PixelHeadingProps) {
  const colorPalette = colors ?? ROTATING_COLORS
  const text = String(children)
  const chars = Array.from(text)
  const [indices, setIndices] = useState<number[]>(() =>
    chars.map((_, i) =>
      mode === 'uniform' ? defaultFontIndex : getInitialIndex(i, chars.length, mode)
    )
  )
  const [active, setActive] = useState(autoPlay)
  const [uniformIndex, setUniformIndex] = useState(defaultFontIndex)
  const id = useId()

  const [wavePhase, setWavePhase] = useState(0)
  const staggerTimeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])

  const cycle = useCallback(() => {
    if (mode === 'uniform') {
      const next = (uniformIndex + 1) % 5
      setUniformIndex(next)
      onFontIndexChange?.(next)
      staggerTimeoutsRef.current.forEach((t) => clearTimeout(t))
      staggerTimeoutsRef.current = []
      chars.forEach((_, i) => {
        const t = setTimeout(() => {
          setIndices((prev) => {
            const nextArr = [...prev]
            nextArr[i] = next
            return nextArr
          })
        }, i * staggerDelay)
        staggerTimeoutsRef.current.push(t)
      })
    } else if (mode === 'wave') {
      setWavePhase((p) => (p + 1) % Math.max(chars.length, 1))
    } else {
      staggerTimeoutsRef.current.forEach((t) => clearTimeout(t))
      staggerTimeoutsRef.current = []
      chars.forEach((_, i) => {
        if (isolate && chars[i] in isolate) return
        const t = setTimeout(() => {
          setIndices((prev) => {
            const nextArr = [...prev]
            nextArr[i] =
              mode === 'random'
                ? Math.floor(Math.random() * 5)
                : (prev[i] + 1) % 5
            return nextArr
          })
        }, i * staggerDelay)
        staggerTimeoutsRef.current.push(t)
      })
    }
  }, [mode, uniformIndex, chars, isolate, onFontIndexChange, staggerDelay])

  useEffect(() => {
    if (!active) return
    const id = setInterval(cycle, cycleInterval)
    return () => {
      clearInterval(id)
      staggerTimeoutsRef.current.forEach((t) => clearTimeout(t))
      staggerTimeoutsRef.current = []
    }
  }, [active, cycle, cycleInterval])

  const handleMouseEnter = () => setActive(true)
  const handleMouseLeave = () => !autoPlay && setActive(false)
  const handleFocus = () => setActive(true)
  const handleBlur = () => !autoPlay && setActive(false)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      cycle()
    }
  }

  const prefixFontClass =
    prefixFont !== 'none'
      ? PIXEL_FONTS[
          ['square', 'grid', 'circle', 'triangle', 'line'].indexOf(prefixFont)
        ]
      : undefined

  return (
    <Comp
      className={cn('tracking-tight', className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="heading"
      aria-label={`Pixel heading: ${text}`}
      {...props}
    >
      {prefix && (
        <span
          className={prefixFontClass}
          style={{ color: colorPalette[0] }}
        >
          {prefix}
        </span>
      )}
      {chars.map((char, i) => {
        if (isolate && char in isolate) {
          const font = isolate[char]
          return (
            <span
              key={`${id}-${i}`}
              className={font === 'mono' ? 'font-mono' : 'font-sans'}
              style={{ color: colorPalette[0] }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          )
        }
        const rawIndex =
          mode === 'uniform'
            ? indices[i] ?? uniformIndex
            : mode === 'wave'
              ? Math.abs(i - wavePhase)
              : indices[i] ?? 0
        const colorIndex =
          mode === 'wave'
            ? Math.min(rawIndex, colorPalette.length - 1)
            : rawIndex % colorPalette.length
        const displayIndex = rawIndex % 5
        const fontClass = PIXEL_FONTS[displayIndex]
        const color = colorPalette[colorIndex] ?? colorPalette[0]
        const texture = TEXTURE_TYPES[displayIndex]
        return (
          <span
            key={`${id}-${i}`}
            className={fontClass}
            data-texture={texture}
            style={
              {
                '--char-color': color,
              } as React.CSSProperties
            }
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        )
      })}
      {showLabel && (
        <span className="mt-2 block text-xs font-medium uppercase tracking-wider opacity-60">
          {mode}
        </span>
      )}
    </Comp>
  )
}
