/**
 * Site-wide configuration and constants.
 * Update contact info, layout values, and animation timings here.
 */

/** Sidebar width in Tailwind units (w-64 = 256px). Used for layout padding and animations. */
export const SIDEBAR_WIDTH = 256

/** Intro animation: logo wipe duration in ms */
export const INTRO_DURATION_MS = 2500

/** Intro: delay before second wipe (cover) starts, in ms */
export const INTRO_COVER_DELAY_MS = 750

/** Gradient overlay fade duration in seconds */
export const GRADIENT_FADE_DURATION = 0.6

/** Gradient overlay delay before fade starts, in seconds */
export const GRADIENT_FADE_DELAY = 0.7

/** Page exit animation: default slide offset (px) */
export const EXIT_OFFSET_DEFAULT = 550

/** Page exit animation: portfolio (wider text) slide offset (px) */
export const EXIT_OFFSET_PORTFOLIO = 600

/** Contact info encrypt animation speed (ms per character) */
export const CONTACT_ENCRYPT_SPEED = 25

/** Contact info paragraph vertical alignment. 222 ≈ header height + nav alignment. */
export const CONTACT_PARAGRAPH_OFFSET_PX = 222

export const CONTACT = {
  personal: {
    label: 'personal / freelance:',
    email: 'l@lithe.pw',
  },
  business: {
    label: 'business:',
    email: 'mason@splyc.app',
  },
  github: {
    label: 'github:',
    url: 'https://github.com/0xlithe',
  },
  x: {
    label: 'x:',
    url: 'https://x.com/lithe_l',
  },
} as const
