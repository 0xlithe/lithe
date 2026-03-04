'use client'

import { motion } from 'framer-motion'
import {
  siReact,
  siNextdotjs,
  siTypescript,
  siPrisma,
  siTailwindcss,
  siDotnet,
  siAvaloniaui,
} from 'simple-icons'

const SPLYC_TECH_STACK = [
  siReact,
  siNextdotjs,
  siTypescript,
  siPrisma,
  siTailwindcss,
] as const

const HONEYDEW_TECH_STACK = [siDotnet, siAvaloniaui] as const

const ICON_SIZE = 20

function TechStackIcons({
  icons,
}: {
  icons: readonly { slug: string; title: string; path: string; hex: string; svg: string }[]
}) {
  return (
    <span className="inline-flex items-center gap-3 ml-4 align-middle">
      {icons.map((icon, i) => {
        const svgWithColor = icon.svg.replace(/<path\s+/, `<path fill="currentColor" `)
        return (
          <motion.span
            key={icon.slug}
            className="inline-flex shrink-0 items-center justify-center text-[var(--lithe-primary)]"
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
            <span
              className="inline-block"
              style={{ width: ICON_SIZE, height: ICON_SIZE }}
              dangerouslySetInnerHTML={{
                __html: svgWithColor.replace(
                  /<svg([^>]*)>/,
                  `<svg$1 width="${ICON_SIZE}" height="${ICON_SIZE}" class="inline-block">`
                ),
              }}
            />
          </motion.span>
        )
      })}
    </span>
  )
}

export function TechStackLogos() {
  return <TechStackIcons icons={SPLYC_TECH_STACK} />
}

export function HoneydewTechStackLogos() {
  return <TechStackIcons icons={HONEYDEW_TECH_STACK} />
}
