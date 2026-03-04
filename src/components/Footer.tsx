'use client'

import { useThemeTransition } from '@/contexts/ThemeTransitionContext'

export default function Footer() {
  const themeTransition = useThemeTransition()

  return (
    <footer
      className="fixed bottom-0 left-0 right-0 z-40 py-6 pr-8"
      style={{
        backgroundColor: themeTransition?.isTransitioning
          ? 'transparent'
          : 'var(--lithe-bg)',
      }}
      aria-hidden="true"
    >
      {/* Logo rendered by LogoTeleport for click-to-teleport */}
    </footer>
  )
}
