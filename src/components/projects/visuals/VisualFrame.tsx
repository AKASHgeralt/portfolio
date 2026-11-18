import type { ReactNode } from 'react'

type Props = {
  file: string
  children: ReactNode
  className?: string
  /** Accessible description of what the illustration shows. */
  label: string
}

/**
 * Shared chrome for project illustrations. Every illustration is explicitly
 * labelled as such so it can't be mistaken for a product screenshot.
 */
export function VisualFrame({ file, children, className = '', label }: Props) {
  return (
    <div
      role="img"
      aria-label={`Illustration: ${label}`}
      className={`relative flex h-full w-full flex-col overflow-hidden rounded-[12px] border border-line bg-surface transition-colors duration-500 group-hover:border-line-strong ${className}`}
    >
      <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-2.5">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex shrink-0 gap-1.5" aria-hidden>
            <span className="size-2 rounded-full bg-white/10" />
            <span className="size-2 rounded-full bg-white/10" />
            <span className="size-2 rounded-full bg-white/10" />
          </span>
          <span className="truncate font-mono text-[0.68rem] text-subtle">{file}</span>
        </div>
        <span className="shrink-0 rounded-[3px] border border-line px-1.5 py-px font-mono text-[0.6rem] uppercase tracking-[0.12em] text-subtle">
          Illustration
        </span>
      </div>
      <div aria-hidden className="relative flex-1 overflow-hidden">
        <div className="h-full transition-transform duration-[900ms] ease-out-expo group-hover:scale-[1.015]">
          {children}
        </div>
      </div>
    </div>
  )
}
