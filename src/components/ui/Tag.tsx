import type { ReactNode } from 'react'

export function Tag({ children, tone = 'default' }: { children: ReactNode; tone?: 'default' | 'accent' }) {
  const toneClass =
    tone === 'accent' ? 'border-accent/35 text-accent-soft bg-accent/[0.06]' : 'border-line-strong text-muted'
  return (
    <span
      className={`inline-flex items-center rounded-[4px] border px-2 py-[3px] font-mono text-[0.7rem] tracking-[0.02em] ${toneClass}`}
    >
      {children}
    </span>
  )
}

export function TagList({ items, className = '' }: { items: string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`} aria-label="Technologies">
      {items.map((t) => (
        <li key={t}>
          <Tag>{t}</Tag>
        </li>
      ))}
    </ul>
  )
}
