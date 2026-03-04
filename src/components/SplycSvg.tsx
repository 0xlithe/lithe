'use client'

export default function SplycSvg({ theme }: { theme: 'dark' | 'light' }) {
  return (
    <div
      className="w-full h-full"
      style={{
        transform: 'translateZ(0) scale(0.5)',
        transformOrigin: 'center center',
        backfaceVisibility: 'hidden',
      }}
    >
      <img
        src="/Splyc%20Logo%20Transparent.svg"
        alt=""
        className="w-full h-full object-contain object-center min-w-0"
        style={{
          filter: theme === 'light'
            ? 'invert(1) contrast(1.15)'
            : 'contrast(1.15)',
          imageRendering: '-webkit-optimize-contrast',
          transition: 'filter 0.5s ease',
        }}
      />
    </div>
  )
}
