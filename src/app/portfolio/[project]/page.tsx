import { CustomPixelHeader } from '@/components/CustomPixelHeader'
import { SplycProjectInfo } from '@/components/SplycProjectInfo'
import SplycVideoSection from '@/components/SplycVideoSection'
import { EXIT_OFFSET_PORTFOLIO } from '@/lib/site-config'

export default function PortfolioProjectPage({
  params,
}: {
  params: { project: string }
}) {
  const { project } = params
  const title = project === 'splyc' ? 'splyc' : project

  return (
    <main className="min-h-screen px-4 lg:px-6 relative">
      {/* Content: same structure as contact page - not affected by webm */}
      <div className="relative z-10 mr-auto max-w-7xl">
        <CustomPixelHeader exitOffset={EXIT_OFFSET_PORTFOLIO} exitDuration={0.7}>
          {title}
        </CustomPixelHeader>
        {project === 'splyc' && <SplycProjectInfo />}
      </div>
      {/* Webm: absolutely positioned, doesn't move content */}
      {project === 'splyc' && <SplycVideoSection />}
    </main>
  )
}
