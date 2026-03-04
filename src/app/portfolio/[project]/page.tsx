import { CustomPixelHeader } from '@/components/CustomPixelHeader'
import { SplycProjectInfo } from '@/components/SplycProjectInfo'
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
      {project === 'splyc' && (
        <aside
          className="absolute right-16 lg:right-24 top-[44%] -translate-y-1/2 w-80 lg:w-[28rem]"
          aria-hidden
        >
          <div
            className="aspect-square w-full rounded-lg overflow-hidden"
            style={{ background: 'var(--lithe-bg)' }}
          >
            <video
              src="/splyc_rotating_dither.webm?v=2"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover object-left scale-110"
              style={{ mixBlendMode: 'screen', backgroundColor: 'transparent' }}
            />
          </div>
        </aside>
      )}
    </main>
  )
}
