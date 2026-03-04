'use client'

import { useState, useCallback, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { usePageTransition } from '@/contexts/PageTransitionContext'
import DecryptedText from '@/components/DecryptedText'
import {
  CONTACT,
  CONTACT_ENCRYPT_SPEED,
  CONTACT_PARAGRAPH_OFFSET_PX,
} from '@/lib/site-config'

const CONTACT_ITEMS = [
  {
    label: CONTACT.personal.label,
    type: 'email' as const,
    value: CONTACT.personal.email,
    href: `mailto:${CONTACT.personal.email}`,
    ariaLabel: `Personal email: ${CONTACT.personal.email}`,
  },
  {
    label: CONTACT.business.label,
    type: 'email' as const,
    value: CONTACT.business.email,
    href: `mailto:${CONTACT.business.email}`,
    ariaLabel: `Business email: ${CONTACT.business.email}`,
  },
  {
    label: CONTACT.github.label,
    type: 'link' as const,
    value: CONTACT.github.url,
    href: CONTACT.github.url,
    ariaLabel: 'GitHub profile',
  },
  {
    label: CONTACT.x.label,
    type: 'link' as const,
    value: CONTACT.x.url,
    href: CONTACT.x.url,
    ariaLabel: 'X (Twitter) profile',
  },
] as const

export function ContactInfo() {
  const { exitingTo } = usePageTransition()
  const isExiting = !!exitingTo
  const [encryptCompleteCount, setEncryptCompleteCount] = useState(0)

  const expectedEncryptCount = useMemo(
    () => CONTACT_ITEMS.length * 2,
    []
  )

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
      {CONTACT_ITEMS.map((item) => (
        <p key={item.label}>
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
          </span>{' '}
          <a
            href={item.href}
            target={item.type === 'link' ? '_blank' : undefined}
            rel={item.type === 'link' ? 'noopener noreferrer' : undefined}
            className="text-[var(--lithe-primary)] transition hover:opacity-80"
            aria-label={item.ariaLabel}
          >
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
          </a>
        </p>
      ))}
    </motion.div>
  )
}
