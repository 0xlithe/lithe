'use client'

import Link from 'next/link'
import { AnimateIcon } from '@/components/animate-ui/icons/icon'
import { ArrowLeft } from '@/components/animate-ui/icons/arrow-left'

export function PrivacyBackButton() {
  return (
    <Link
      href="/portfolio/quilt"
      className="inline-flex items-center gap-2 text-[13px] text-[var(--lithe-secondary)] transition-colors hover:text-[var(--lithe-primary)]"
      aria-label="Back to quilt"
    >
      <AnimateIcon animateOnHover animation="out">
        <ArrowLeft size={14} />
      </AnimateIcon>
      <span>quilt</span>
    </Link>
  )
}
