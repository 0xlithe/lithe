'use client'

import { motion } from 'framer-motion'
import {
  siReact,
  siNextdotjs,
  siTypescript,
  siPrisma,
  siTailwindcss,
} from 'simple-icons'

const SPLYC_TECH_STACK = [
  siReact,
  siNextdotjs,
  siTypescript,
  siPrisma,
  siTailwindcss,
] as const

const ICON_SIZE = 20

export function TechStackLogos() {
  return (
    <span className="inline-flex items-center gap-3 ml-4">
      {SPLYC_TECH_STACK.map((icon, i) => (
        <motion.span
          key={icon.slug}
          className="inline-flex items-center justify-center"
          title={icon.title}
          aria-label={icon.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.35,
            delay: 0.5 + i * 0.08,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          <svg
            role="img"
            viewBox="0 0 24 24"
            width={ICON_SIZE}
            height={ICON_SIZE}
            className="text-[var(--lithe-primary)]"
            style={{ fill: 'currentColor' }}
          >
            <path d={icon.path} />
          </svg>
        </motion.span>
      ))}
    </span>
  )
}
