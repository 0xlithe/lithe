'use client'

import Image from 'next/image'
import { useTheme } from '@/contexts/ThemeContext'

export default function Footer() {
  const { theme } = useTheme()

  return (
    <footer
      className="fixed bottom-0 left-0 right-0 z-40 py-6 pr-8"
      style={{ backgroundColor: 'var(--lithe-bg)' }}
    >
      <div className="flex justify-end">
        <Image
          src="/LITHE.svg"
          alt="LITHE"
          width={100}
          height={30}
          className={`h-8 w-auto ${theme === 'dark' ? '[filter:brightness(0)_invert(1)]' : '[filter:brightness(0)]'}`}
        />
      </div>
    </footer>
  )
}
