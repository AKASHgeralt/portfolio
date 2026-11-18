import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

type Props = {
  index: string
  label: string
  title: ReactNode
  intro?: ReactNode
  id?: string
}

/** Editorial section header: mono index rail on the left, headline on the right. */
export function SectionHeading({ index, label, title, intro, id }: Props) {
  return (
    <div className="grid gap-6 border-t border-line pt-6 md:grid-cols-12 md:gap-8 md:pt-8">
      <Reveal className="md:col-span-3">
        <p className="eyebrow flex items-center gap-3">
          <span className="text-accent-soft">{index}</span>
          <span className="h-px w-6 bg-line-strong" aria-hidden />
          <span>{label}</span>
        </p>
      </Reveal>
      <div className="md:col-span-9">
        <Reveal delay={0.05}>
          <h2 id={id} className="display text-[clamp(2.1rem,5.2vw,4.25rem)] text-balance">
            {title}
          </h2>
        </Reveal>
        {intro && (
          <Reveal delay={0.12}>
            <p className="mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-muted text-pretty">{intro}</p>
          </Reveal>
        )}
      </div>
    </div>
  )
}
