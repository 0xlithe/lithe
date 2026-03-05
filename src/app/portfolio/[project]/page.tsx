import { CustomPixelHeader } from '@/components/CustomPixelHeader'
import { SplycProjectInfo } from '@/components/SplycProjectInfo'
import { HoneydewProjectInfo } from '@/components/HoneydewProjectInfo'
import SplycVideoSection from '@/components/SplycVideoSection'
import HoneydewVideoSection from '@/components/HoneydewVideoSection'
import { EXIT_OFFSET_PORTFOLIO } from '@/lib/site-config'

export default async function PortfolioProjectPage({
  params,
}: {
  params: Promise<{ project: string }>
}) {
  const { project } = await params
  const title = project === 'splyc' ? 'splyc' : project === 'honeydew' ? 'honeydew' : project

  return (
    <main className="min-h-screen px-4 lg:px-6 relative">
      {/* Content: same structure as contact page - not affected by webm */}
      <div className="relative z-10 mr-auto max-w-7xl">
        <CustomPixelHeader exitOffset={EXIT_OFFSET_PORTFOLIO} exitDuration={0.7}>
          {title}
        </CustomPixelHeader>
        {project === 'splyc' && <SplycProjectInfo />}
        {project === 'honeydew' && <HoneydewProjectInfo />}
      </div>
      {/* Floating SVG: absolutely positioned, doesn't move content */}
      {project === 'splyc' && <SplycVideoSection />}
      {project === 'honeydew' && <HoneydewVideoSection />}
    </main>
  )
}
