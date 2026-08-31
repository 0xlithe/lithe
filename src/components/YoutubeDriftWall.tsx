'use client'

import DriftWall from '@/components/DriftWall'

const THUMBNAILS = [
  { image: '/youtube-tiles/popping-off-vayne.jpg', title: 'Popping off with Vayne' },
  { image: '/youtube-tiles/50-vayne-marathon.jpg', title: '50 Vayne Marathon' },
  { image: '/youtube-tiles/playing-in-gold.jpg', title: 'Playing in Gold' },
  { image: '/youtube-tiles/running-it-down-mid.png', title: 'Running it down mid' },
  { image: '/youtube-tiles/playing-in-platinum.jpg', title: 'Playing in Platinum' },
  { image: '/youtube-tiles/playing-in-silver.jpg', title: 'Playing in Silver' },
  { image: '/youtube-tiles/yasuo-97.jpg', title: '97' },
] as const

const COLUMNS = 6
const ROWS = 5
const items = Array.from({ length: COLUMNS * ROWS }, (_, i) => THUMBNAILS[i % THUMBNAILS.length])

export default function YoutubeDriftWall() {
  return (
    <div className="h-full w-full">
      <DriftWall
        className="drift-wall--bleed"
        items={items}
        columns={COLUMNS}
        tileWidth={204}
        tileHeight={126}
        gap={32}
        tilt={17}
        turn={-13}
        perspective={800}
        depth={250}
        speed={0}
        direction="up"
        variance={0.35}
        parallax={0.9}
        lift={40}
        fade={1}
        dim={0.8}
        overlayColor="#060010"
        radius={16}
        roll={-2}
        pauseOnHover={false}
        grayscale={false}
      />
    </div>
  )
}
