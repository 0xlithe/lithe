'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
  type ReactNode,
} from 'react'

const CIRCLE_CENTER_X = 0
const CIRCLE_CENTER_Y = 1
const MAX_RADIUS = 1.65

type Theme = 'dark' | 'light'

type ThemeTransitionContextValue = {
  progress: number
  targetTheme: Theme | null
  isTransitioning: boolean
  isInsideCircle: (px: number, py: number) => boolean
}

const ThemeTransitionContext = createContext<ThemeTransitionContextValue | null>(
  null
)

export function ThemeTransitionProvider({
  children,
  progress,
  targetTheme,
  isTransitioning,
}: {
  children: ReactNode
  progress: number
  targetTheme: Theme | null
  isTransitioning: boolean
}) {
  const radius = progress * MAX_RADIUS

  const isInsideCircle = useCallback(
    (px: number, py: number) => {
      const dx = px - CIRCLE_CENTER_X
      const dy = py - CIRCLE_CENTER_Y
      return dx * dx + dy * dy <= radius * radius
    },
    [radius]
  )

  const value: ThemeTransitionContextValue = {
    progress,
    targetTheme,
    isTransitioning,
    isInsideCircle,
  }

  return (
    <ThemeTransitionContext.Provider value={value}>
      {children}
    </ThemeTransitionContext.Provider>
  )
}

export function useThemeTransition() {
  return useContext(ThemeTransitionContext)
}

/** Returns the effective theme for an element based on whether the transition circle has passed over it */
export function useThemeAtElement(
  ref: React.RefObject<HTMLElement | null>,
  currentTheme: Theme
): Theme {
  const transition = useThemeTransition()
  const [effectiveTheme, setEffectiveTheme] = useState<Theme>(currentTheme)
  const lastInsideRef = useRef(false)

  useEffect(() => {
    if (!transition?.isTransitioning || !transition.targetTheme || !ref.current) {
      setEffectiveTheme(currentTheme)
      lastInsideRef.current = false
      return
    }

    const check = () => {
      const rect = ref.current!.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const px = centerX / window.innerWidth
      const py = centerY / window.innerHeight
      const inside = transition.isInsideCircle(px, py)

      if (inside) {
        if (!lastInsideRef.current) {
          lastInsideRef.current = true
        }
        setEffectiveTheme(transition.targetTheme!)
      } else {
        if (lastInsideRef.current) {
          lastInsideRef.current = false
        }
        setEffectiveTheme(currentTheme)
      }
    }

    check()
    const id = setInterval(check, 32) // ~30fps

    return () => clearInterval(id)
  }, [ref, currentTheme, transition])

  return transition?.isTransitioning ? effectiveTheme : currentTheme
}
