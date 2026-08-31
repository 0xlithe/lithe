'use client'

import { useState, useCallback, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePageTransition } from '@/contexts/PageTransitionContext'
import DecryptedText from '@/components/DecryptedText'
import { AnimateIcon } from '@/components/animate-ui/icons/icon'
import { ArrowLeft } from '@/components/animate-ui/icons/arrow-left'
import {
  CONTACT_ENCRYPT_SPEED,
  CONTACT_PARAGRAPH_OFFSET_PX,
} from '@/lib/site-config'
import { TechStackLogos } from '@/components/TechStackLogos'
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button'
import { siBrave, siGooglechrome } from 'simple-icons'

const STORE_ICONS = [siBrave, siGooglechrome] as const
const ICON_SIZE = 20

const SPLYC_ITEMS: Array<
  | { label: string; value: string }
  | { label: ''; lines: readonly [string, ...string[]] }
> = [
  {
    label: 'est',
    value: '2025',
  },
  {
    label: '',
    lines: [
      'Splyc combines livestream monitoring, automated and manual clipping, AI-assisted content generation, video editing, cross-platform publishing, and analytics into a single workflow. Its browser extension, Splyc+, also enables users to capture moments directly from supported livestream platforms.',
    ],
  },
]

export function SplycProjectInfo() {
  const { exitingTo } = usePageTransition()
  const isExiting = !!exitingTo
  const [encryptCompleteCount, setEncryptCompleteCount] = useState(0)

  const expectedEncryptCount = useMemo(() => {
    let count = 0
    for (const item of SPLYC_ITEMS) {
      if ('value' in item) {
        if (item.label) count += 2
        else count += 1
      } else {
        count += item.lines.length
      }
    }
    return count
  }, [])

  const handleEncryptComplete = useCallback(() => {
    setEncryptCompleteCount((c) => c + 1)
  }, [])

  useEffect(() => {
    if (isExiting) setEncryptCompleteCount(0)
  }, [isExiting])

  const allEncrypted = encryptCompleteCount >= expectedEncryptCount
  const shouldFadeOut = isExiting && allEncrypted

  return (
    <motion.div
      className="max-w-2xl space-y-3 pr-4 font-sans text-sm"
      style={{
        marginTop: `calc(50vh - ${CONTACT_PARAGRAPH_OFFSET_PX}px)`,
        color: 'var(--lithe-secondary)',
      }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: shouldFadeOut ? 0 : 1,
      }}
      transition={{
        opacity: {
          duration: shouldFadeOut ? 0.25 : 0.4,
          ease: [0.4, 0, 0.2, 1],
        },
      }}
    >
      {SPLYC_ITEMS.map((item, i) => (
        <p key={i} className={!('label' in item && item.label) ? 'leading-relaxed' : ''}>
          {'value' in item ? (
            item.label ? (
              <>
                <span className="text-[var(--lithe-muted)]">
                  <DecryptedText
                    text={item.label}
                    animateOn="view"
                    sequential
                    useOriginalCharsOnly
                    parentClassName="inline"
                    encrypting={isExiting}
                    encryptSpeed={CONTACT_ENCRYPT_SPEED}
                    onEncryptComplete={handleEncryptComplete}
                  />
                </span>
                :{' '}
                <span className="text-[var(--lithe-primary)]">
                  <DecryptedText
                    text={item.value}
                    animateOn="view"
                    sequential
                    useOriginalCharsOnly
                    parentClassName="inline"
                    encrypting={isExiting}
                    encryptSpeed={CONTACT_ENCRYPT_SPEED}
                    onEncryptComplete={handleEncryptComplete}
                  />
                </span>
                <TechStackLogos />
              </>
            ) : (
              <span className="text-[var(--lithe-primary)]">
                <DecryptedText
                  text={item.value}
                  animateOn="view"
                  sequential
                  useOriginalCharsOnly
                  parentClassName="inline"
                  encrypting={isExiting}
                  encryptSpeed={CONTACT_ENCRYPT_SPEED}
                  onEncryptComplete={handleEncryptComplete}
                />
              </span>
            )
          ) : (
            <span className="block break-words text-[var(--lithe-primary)] leading-relaxed">
              {item.lines.map((line, j) => (
                <DecryptedText
                  key={j}
                  text={line}
                  animateOn="view"
                  sequential
                  useOriginalCharsOnly
                  parentClassName="!block w-full whitespace-pre-wrap"
                  encrypting={isExiting}
                  encryptSpeed={CONTACT_ENCRYPT_SPEED}
                  onEncryptComplete={handleEncryptComplete}
                />
              ))}
            </span>
          )}
        </p>
      ))}
      <div className="flex flex-wrap items-center gap-4">
        <Link
          href="/portfolio"
          className="inline-flex items-center leading-none text-[var(--lithe-secondary)] hover:text-[var(--lithe-primary)] transition-colors"
        >
          <AnimateIcon animateOnHover animation="out">
            <ArrowLeft size={18} />
          </AnimateIcon>
        </Link>
        <InteractiveHoverButton href="https://splyc.app">Sign up now</InteractiveHoverButton>
        <InteractiveHoverButton href="https://chromewebstore.google.com/detail/splyc+/bhaeebdghgikgpnibfgblddjiojlbecc?hl=en-US">
          <span className="inline-flex items-center gap-2">
            {STORE_ICONS.map((icon) => {
              const svgWithColor = icon.svg.replace(/<path\s+/, `<path fill="currentColor" `)
              return (
                <span
                  key={icon.slug}
                  className="inline-flex shrink-0 items-center justify-center"
                  title={icon.title}
                  aria-label={icon.title}
                  style={{ width: ICON_SIZE, height: ICON_SIZE }}
                  dangerouslySetInnerHTML={{
                    __html: svgWithColor.replace(
                      /<svg([^>]*)>/,
                      `<svg$1 width="${ICON_SIZE}" height="${ICON_SIZE}" class="inline-block">`
                    ),
                  }}
                />
              )
            })}
            <span>Download Extension</span>
          </span>
        </InteractiveHoverButton>
      </div>
    </motion.div>
  )
}
