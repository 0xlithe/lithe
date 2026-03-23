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
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button'
import { siBrave, siGooglechrome } from 'simple-icons'

const STORE_ICONS = [siBrave, siGooglechrome] as const
const ICON_SIZE = 20

const QUILT_ITEMS: Array<
  | { label: string; value: string }
  | { label: ''; lines: readonly [string, ...string[]] }
> = [
  {
    label: 'built',
    value: '2026 [wip]',
  },
  {
    label: '',
    lines: [
      'Quilt is a focused automation workspace for X. It brings repetitive engagement workflows — following,',
      'unfollowing, liking, and unliking — into a controlled, task-based interface with safety built in.',
    ],
  },
]

export function QuiltProjectInfo() {
  const { exitingTo } = usePageTransition()
  const isExiting = !!exitingTo
  const [encryptCompleteCount, setEncryptCompleteCount] = useState(0)

  const expectedEncryptCount = useMemo(() => {
    let count = 0
    for (const item of QUILT_ITEMS) {
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
      className="space-y-3 font-sans text-sm"
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
      {QUILT_ITEMS.map((item, i) => (
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
            <span className="text-[var(--lithe-primary)] block space-y-1">
              {item.lines.map((line, j) => (
                <span key={j} className="block">
                  <DecryptedText
                    text={line}
                    animateOn="view"
                    sequential
                    useOriginalCharsOnly
                    parentClassName="inline"
                    encrypting={isExiting}
                    encryptSpeed={CONTACT_ENCRYPT_SPEED}
                    onEncryptComplete={handleEncryptComplete}
                  />
                </span>
              ))}
            </span>
          )}
        </p>
      ))}
      <div className="flex flex-wrap items-start gap-4">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-[var(--lithe-secondary)] hover:text-[var(--lithe-primary)] transition-colors"
        >
          <AnimateIcon animateOnHover animation="out">
            <ArrowLeft size={18} />
          </AnimateIcon>
        </Link>
        <InteractiveHoverButton href="https://github.com/0xlithe/quilt">View project</InteractiveHoverButton>
        <div className="flex flex-col items-center">
          <InteractiveHoverButton href="/portfolio/quilt">
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
          <Link
            href="/portfolio/quilt/privacy"
            className="mt-6 text-xs text-[var(--lithe-muted)] transition-colors hover:text-[var(--lithe-primary)]"
          >
            PRIVACY POLICY
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
