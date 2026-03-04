import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"

type InteractiveHoverButtonProps = {
  children: React.ReactNode
  href?: string
} & (React.AnchorHTMLAttributes<HTMLAnchorElement> | React.ButtonHTMLAttributes<HTMLButtonElement>)

export function InteractiveHoverButton({
  children,
  className,
  href,
  ...props
}: InteractiveHoverButtonProps) {
  const sharedProps = {
    className: cn(
      "group relative w-auto cursor-pointer overflow-hidden rounded-full border p-2 px-6 text-center font-semibold transition-colors duration-300",
      className
    ),
    style: {
      backgroundColor: 'var(--lithe-bg)',
      borderColor: 'var(--lithe-border)',
      color: 'var(--lithe-secondary)',
    } as React.CSSProperties,
  }

  const content = (
    <>
      <div className="flex items-center justify-center gap-2">
        <div
          className="h-2 w-2 rounded-full transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[100.8]"
          style={{ backgroundColor: 'var(--lithe-primary)' }}
        />
        <span className="inline-block transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:translate-x-12 group-hover:opacity-0">
          {children}
        </span>
      </div>
      <div
        className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 opacity-0 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:-translate-x-5 group-hover:opacity-100"
        style={{ color: 'var(--lithe-bg)' }}
      >
        <span>{children}</span>
        <ArrowRight size={18} strokeWidth={2} />
      </div>
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...sharedProps}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    )
  }

  return (
    <button {...sharedProps} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  )
}
