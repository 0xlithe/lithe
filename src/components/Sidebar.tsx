'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { HugeiconsIcon } from '@hugeicons/react'
import { Sun01Icon } from '@hugeicons/core-free-icons'
import { useTheme } from '@/contexts/ThemeContext'
import { useThemeTransition } from '@/contexts/ThemeTransitionContext'
import { usePageTransition } from '@/contexts/PageTransitionContext'

function MoonIconWithHover() {
  return (
    <motion.div
      className="inline-flex origin-center"
      variants={{
        rest: { scale: 1, rotate: 0 },
        hover: {
          scale: [1, 1.12, 1],
          rotate: [-8, 4, -8],
          transition: {
            scale: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
          },
        },
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={24}
        height={24}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19.5483 18C20.7476 16.9645 21.5819 15.6272 22 14.1756C19.5473 14.4746 17.0369 13.3432 15.7234 11.1113C14.4099 8.87928 14.6664 6.1807 16.1567 4.2463C14.1701 3.75234 11.9929 3.98823 10.0779 5.07295C7.30713 6.64236 5.83056 9.56635 6.0155 12.5" />
        <motion.path
          d="M2 15.3739C3.13649 16.1865 4.59053 16.1865 5.72702 15.3739C6.41225 14.8754 7.31476 14.8754 7.99999 15.3739C9.13648 16.1865 10.6072 16.2049 11.727 15.3924M17 19.6352C15.8635 18.8226 14.4095 18.8226 13.273 19.6352C12.5877 20.1338 11.6685 20.1153 10.9833 19.6167C9.8468 18.8042 8.39277 18.8042 7.27299 19.6167C6.57104 20.1153 5.68524 20.1153 5 19.6167"
          variants={{
            rest: { pathLength: 1 },
            hover: {
              pathLength: [1, 0.5, 1],
              transition: { duration: 1, repeat: Infinity, ease: 'easeInOut' },
            },
          }}
        />
      </svg>
    </motion.div>
  )
}

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/contact', label: 'Contact' },
]

function NavLink({
  href,
  label,
  defaultColor,
  hoverColor,
  pathname,
  exitAndNavigate,
}: {
  href: string
  label: string
  defaultColor: string
  hoverColor: string
  pathname: string
  exitAndNavigate: (href: string) => void
}) {
  const isActive = pathname === href || (href !== '/' && pathname.startsWith(href))

  const handleClick = (e: React.MouseEvent) => {
    if (isActive) return
    e.preventDefault()
    exitAndNavigate(href)
  }

  const containerVariants = {
    rest: { transition: { staggerChildren: 0, staggerDirection: -1 } },
    hover: { transition: { staggerChildren: 0.05, staggerDirection: 1 } },
  }

  const dashVariants = {
    rest: {
      width: 6,
      backgroundColor: defaultColor,
      transition: { duration: 0.2, ease: 'easeOut' as const },
    },
    hover: {
      width: 20,
      backgroundColor: hoverColor,
      transition: { duration: 0.2, ease: 'easeOut' as const },
    },
  }

  const textVariants = {
    rest: {
      color: defaultColor,
      transition: { duration: 0.2 },
    },
    hover: {
      color: hoverColor,
      transition: { duration: 0.2 },
    },
  }

  return (
    <Link href={href} onClick={handleClick}>
      <motion.div
        className="flex cursor-pointer items-center gap-3"
        variants={containerVariants}
        initial="rest"
        whileHover="hover"
        whileTap="rest"
      >
        <motion.span
          className="h-px shrink-0 rounded-full"
          variants={dashVariants}
        />
        <motion.span
          className="font-geist-sans text-sm font-normal"
          variants={textVariants}
        >
          {label}
        </motion.span>
      </motion.div>
    </Link>
  )
}

export default function Sidebar() {
  const { theme, toggleTheme } = useTheme()
  const themeTransition = useThemeTransition()
  const { exitAndNavigate } = usePageTransition()
  const pathname = usePathname() ?? '/'
  const defaultColor = 'var(--lithe-secondary)'
  const hoverColor = 'var(--lithe-primary)'

  return (
    <>
      <aside
        className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col py-8 pl-8"
        style={{
          backgroundColor: themeTransition?.isTransitioning
            ? 'transparent'
            : 'var(--lithe-bg)',
        }}
    >
      <motion.button
        type="button"
        onClick={toggleTheme}
        className="absolute bottom-20 left-8 transition hover:opacity-80"
        style={{ color: 'var(--lithe-primary)' }}
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        initial="rest"
        whileHover="hover"
        whileTap="rest"
        variants={{
          rest: {},
          hover: {},
        }}
      >
        {theme === 'dark' ? (
          <motion.div
            className="inline-flex"
            variants={{
              rest: { scale: 1 },
              hover: {
                scale: [1, 1.12, 1],
                rotate: [0, -360],
                transition: {
                  scale: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
                  rotate: { duration: 8, repeat: Infinity, ease: 'linear' },
                },
              },
            }}
          >
            <HugeiconsIcon icon={Sun01Icon} size={24} strokeWidth={1.5} color="currentColor" />
          </motion.div>
        ) : (
          <MoonIconWithHover />
        )}
      </motion.button>
      <div className="flex flex-1 flex-col justify-center">
        <nav className="flex flex-col gap-6">
          {NAV.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              defaultColor={defaultColor}
              hoverColor={hoverColor}
              pathname={pathname || '/'}
              exitAndNavigate={exitAndNavigate}
            />
          ))}
        </nav>
      </div>
    </aside>
    </>
  )
}
