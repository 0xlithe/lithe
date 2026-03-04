import { CustomPixelHeader } from '@/components/CustomPixelHeader'
import PortfolioPlayground from '@/components/PortfolioPlayground'
import { EXIT_OFFSET_PORTFOLIO } from '@/lib/site-config'

export default function Portfolio() {
  return (
    <main className="min-h-screen px-4 lg:px-6 relative pointer-events-none">
      <PortfolioPlayground />
      <div className="relative z-10 mr-auto max-w-7xl pointer-events-auto">
        <CustomPixelHeader exitOffset={EXIT_OFFSET_PORTFOLIO} exitDuration={0.7}>
          portfolio
        </CustomPixelHeader>
      </div>
    </main>
  )
}
