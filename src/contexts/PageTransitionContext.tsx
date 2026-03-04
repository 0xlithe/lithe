'use client'

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

const EXIT_TIMEOUT_MS = 600

interface PageTransitionContextValue {
  exitingTo: string | null
  exitAndNavigate: (href: string) => void
  notifyExitComplete: () => void
}

const PageTransitionContext = createContext<PageTransitionContextValue | null>(null)

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [exitingTo, setExitingTo] = useState<string | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const doNavigate = useCallback(
    (href: string | null) => {
      if (href) router.push(href)
      setExitingTo(null)
    },
    [router]
  )

  useEffect(() => {
    if (!exitingTo) return
    timeoutRef.current = setTimeout(() => {
      doNavigate(exitingTo)
      timeoutRef.current = null
    }, EXIT_TIMEOUT_MS)
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [exitingTo, doNavigate])

  const exitAndNavigate = useCallback((href: string) => {
    setExitingTo(href)
  }, [])

  const notifyExitComplete = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setExitingTo((href) => {
      if (href) router.push(href)
      return null
    })
  }, [router])

  return (
    <PageTransitionContext.Provider
      value={{ exitingTo, exitAndNavigate, notifyExitComplete }}
    >
      {children}
    </PageTransitionContext.Provider>
  )
}

export function usePageTransition() {
  const ctx = useContext(PageTransitionContext)
  if (!ctx) {
    throw new Error('usePageTransition must be used within PageTransitionProvider')
  }
  return ctx
}
