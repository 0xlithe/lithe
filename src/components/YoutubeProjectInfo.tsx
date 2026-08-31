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

const YOUTUBE_ITEMS: Array<
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
      'a collection of videos — process, walkthroughs, and finished work.',
    ],
  },
]

export function YoutubeProjectInfo() {
  const { exitingTo } = usePageTransition()
  const isExiting = !!exitingTo
  const [encryptCompleteCount, setEncryptCompleteCount] = useState(0)

  const expectedEncryptCount = useMemo(() => {
    let count = 0
    for (const item of YOUTUBE_ITEMS) {
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
      {YOUTUBE_ITEMS.map((item, i) => (
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
        <InteractiveHoverButton href="https://www.youtube.com/@lithe_">
          Watch on YouTube
        </InteractiveHoverButton>
      </div>
    </motion.div>
  )
}
