import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import {
  GeistPixelSquare,
  GeistPixelGrid,
  GeistPixelCircle,
  GeistPixelTriangle,
  GeistPixelLine,
} from 'geist/font/pixel'
import IntroOutroWrapper from '@/components/IntroOutroWrapper'
import Sidebar from '@/components/Sidebar'
import Footer from '@/components/Footer'
import LogoTeleport from '@/components/LogoTeleport'
import ThemeTransitionZone from '@/components/ThemeTransitionZone'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { PageTransitionProvider } from '@/contexts/PageTransitionContext'
import { SIDEBAR_WIDTH } from '@/lib/site-config'
import './globals.css'

const geistPixelVars = [
  GeistPixelSquare.variable,
  GeistPixelGrid.variable,
  GeistPixelCircle.variable,
  GeistPixelTriangle.variable,
  GeistPixelLine.variable,
].join(' ')

export const metadata: Metadata = {
  title: 'LITHE',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${GeistSans.variable} ${geistPixelVars}`}>
      <body className="h-screen overflow-hidden antialiased font-sans">
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('lithe-theme');document.documentElement.setAttribute('data-theme',t==='light'||t==='dark'?t:'dark');})();`,
          }}
        />
        <ThemeProvider>
          <PageTransitionProvider>
            <IntroOutroWrapper />
            <ThemeTransitionZone className="fixed left-0 top-0 z-40 h-screen w-64">
              <Sidebar />
            </ThemeTransitionZone>
            <ThemeTransitionZone
              className="relative z-10 overflow-hidden pb-16 pt-24"
              style={{ paddingLeft: SIDEBAR_WIDTH }}
            >
              {children}
            </ThemeTransitionZone>
            <ThemeTransitionZone className="fixed bottom-0 left-0 right-0 z-40 py-6 pr-8">
              <Footer />
            </ThemeTransitionZone>
            <LogoTeleport />
          </PageTransitionProvider>
          </ThemeProvider>
      </body>
    </html>
  )
}
