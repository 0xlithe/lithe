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
        src="/splyc-logo.png"
        alt=""
        className="w-full h-full object-contain object-center min-w-0"
        style={{
          filter: theme === 'light' ? 'brightness(0)' : 'brightness(0) invert(1)',
          imageRendering: 'auto',
          transition: 'filter 0.5s ease',
        }}
      />
    </div>
  )
}
