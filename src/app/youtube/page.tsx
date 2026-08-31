import { CustomPixelHeader } from '@/components/CustomPixelHeader'
import YoutubeVideoSection from '@/components/YoutubeVideoSection'
import YoutubeDriftWall from '@/components/YoutubeDriftWall'

export default function YoutubePage() {
  return (
    <main className="min-h-screen px-4 lg:px-6 relative">
      <YoutubeVideoSection />
      <div className="relative z-10 ml-auto w-max max-w-full pr-4">
        <CustomPixelHeader exitOffset={1200} exitDuration={0.7}>
          youtube thumbnails
        </CustomPixelHeader>
      </div>
      <aside
        className="pointer-events-auto absolute left-[16%] right-16 top-[44%] z-10 h-[600px] translate-x-[100px] -translate-y-1/2 lg:right-24"
        aria-label="Video tiles"
      >
        <YoutubeDriftWall />
      </aside>
    </main>
  )
}
