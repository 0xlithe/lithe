'use client'

import { useEffect, useRef } from 'react'
import { animate, stagger } from 'animejs'

const PRISM_COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#38bdf8', '#3b82f6', '#8b5cf6']

export default function HeroAnimation() {
  const logoRef = useRef<HTMLDivElement>(null)
  const raysRef = useRef<HTMLDivElement>(null)
  const trianglesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Prism ray lines animation
    const rays = raysRef.current?.querySelectorAll('.prism-ray')
    if (rays && rays.length) {
      animate(rays, {
        opacity: [0.3, 0.8],
        x: [0, 60],
        y: [0, 40],
        duration: 2000,
        delay: stagger(80),
        easing: 'inOutQuad',
        loop: true,
        alternate: true,
      })
    }

    // Concentric triangles scaling
    const trianglePaths = trianglesRef.current?.querySelectorAll('.triangle-path')
    if (trianglePaths && trianglePaths.length) {
      animate(trianglePaths, {
        scale: [0.8, 1.05],
        opacity: [0.4, 0.7],
        duration: 3000,
        delay: stagger(200),
        easing: 'inOutQuad',
        loop: true,
        alternate: true,
      })
    }

    // Product text fade
    const productText = trianglesRef.current?.querySelector('.product-text')
    if (productText) {
      animate(productText, {
        opacity: [0.5, 1],
        duration: 1500,
        easing: 'outQuad',
      })
    }
  }, [])

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-24">
      {/* Logo with prism effect - top left */}
      <div ref={logoRef} className="absolute left-8 top-32 md:left-16 md:top-40">
        <div className="text-4xl font-bold tracking-tight md:text-5xl">LITHE</div>
        <div ref={raysRef} className="relative mt-2 h-10">
          {PRISM_COLORS.map((color, i) => (
            <div
              key={i}
              className="prism-ray absolute left-0 h-[2px] w-24 origin-left md:w-32"
              style={{
                backgroundColor: color,
                top: `${i * 6}px`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Concentric triangles with PRODUCT - center right */}
      <div
        ref={trianglesRef}
        className="relative flex items-center justify-center md:ml-32"
      >
        <svg
          viewBox="0 0 200 200"
          className="h-64 w-64 md:h-96 md:w-96"
        >
          <g transform="translate(100,100)">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <polygon
                key={i}
                className="triangle-path"
                fill="none"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="1"
                points="0,-80 69.3,40 -69.3,40"
                style={{
                  transform: `scale(${1.2 - i * 0.18})`,
                }}
              />
            ))}
          </g>
        </svg>
        <div className="product-text absolute text-center text-sm uppercase tracking-[0.4em] text-lithe-muted">
          PRODUCT
        </div>
      </div>
    </section>
  )
}
