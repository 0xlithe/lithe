'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react'
import ThemeTransitionOverlay from '@/components/ThemeTransitionOverlay'
import { ThemeTransitionProvider } from '@/contexts/ThemeTransitionContext'

type Theme = 'dark' | 'light'

const ThemeContext = createContext<{
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  isTransitioning: boolean
} | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark')
  const [mounted, setMounted] = useState(false)
  const [overlayActive, setOverlayActive] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem('lithe-theme') as Theme | null
    if (stored === 'light' || stored === 'dark') {
      setThemeState(stored)
      document.documentElement.setAttribute('data-theme', stored)
    }
  }, [])

  useEffect(() => {
    if (!mounted) return
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('lithe-theme', theme)
  }, [theme, mounted])

  const setTheme = (t: Theme) => setThemeState(t)

  const handleOverlayComplete = useCallback(() => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'))
    setOverlayActive(false)
    setProgress(0)
  }, [])

  const handleProgressUpdate = useCallback((p: number) => {
    setProgress(p)
  }, [])

  const toggleTheme = useCallback(() => {
    if (overlayActive) return
    setOverlayActive(true)
  }, [overlayActive])

  const targetTheme = theme === 'dark' ? 'light' : 'dark'

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, toggleTheme, isTransitioning: overlayActive }}
    >
      <ThemeTransitionProvider
        progress={progress}
        targetTheme={overlayActive ? targetTheme : null}
        isTransitioning={overlayActive}
      >
        {children}
      </ThemeTransitionProvider>
      <ThemeTransitionOverlay
        isActive={overlayActive}
        targetTheme={targetTheme}
        onProgressUpdate={handleProgressUpdate}
        onComplete={handleOverlayComplete}
      />
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
