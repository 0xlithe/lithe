import { CustomPixelHeader } from '@/components/CustomPixelHeader'
import { QuiltProjectInfo } from '@/components/QuiltProjectInfo'
import QuiltVideoSection from '@/components/QuiltVideoSection'
import { EXIT_OFFSET_PORTFOLIO } from '@/lib/site-config'

export default function QuiltPage() {
  return (
    <main className="min-h-screen px-4 lg:px-6 relative">
      <div className="relative z-10 mr-auto max-w-7xl">
        <CustomPixelHeader exitOffset={EXIT_OFFSET_PORTFOLIO} exitDuration={0.7}>
          quilt
        </CustomPixelHeader>
        <QuiltProjectInfo />
      </div>
      <QuiltVideoSection />
    </main>
  )
}
