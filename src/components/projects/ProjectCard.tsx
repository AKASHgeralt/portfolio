import { Users } from 'lucide-react'
import { Link } from 'react-router'
import type { Project } from '../../data/projects'
import { Reveal } from '../ui/Reveal'
import { TagList } from '../ui/Tag'
import { ProjectLinks } from './ProjectLinks'
import { ProjectVisual } from './ProjectVisual'

type Layout = 'row' | 'row-reverse' | 'stack'

type Props = { project: Project; layout?: Layout; visualClass?: string }

/**
 * Secondary project presentation. `row` layouts put a wide visual beside the
 * copy; `stack` puts it above, for the paired grid.
 */
export function ProjectCard({ project, layout = 'row', visualClass = '' }: Props) {
  const isRow = layout !== 'stack'
  const visual = (
    <Link
      to={`/projects/${project.slug}`}
      aria-label={`${project.name} case study`}
      className={`group flex rounded-[12px] ${visualClass}`}
    >
      <ProjectVisual kind={project.visual} />
    </Link>
  )

  const copy = (
    <div className="flex flex-col">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="font-mono text-[0.72rem] text-accent-soft">{project.index}</span>
        <span className="eyebrow">{project.category}</span>
      </div>
      <h3 id={`${project.slug}-title`} className="mt-4 text-[clamp(1.6rem,2.8vw,2.25rem)] font-medium leading-[1.05] tracking-[-0.035em]">
        <Link to={`/projects/${project.slug}`} className="transition-colors hover:text-accent-soft">
          {project.name}
        </Link>
      </h3>
      <p className="mt-4 leading-relaxed text-muted text-pretty">{project.summary}</p>

      {project.role && (
        <div className="mt-5 rounded-[8px] border border-line bg-surface/60 p-4">
          <p className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-accent-soft">
            <Users size={13} aria-hidden /> Team project · My role
          </p>
          <p className="mt-2 text-[0.9rem] leading-relaxed text-fg/85">
            Frontend development: the donation interface, the payment portal and the payment experience.
          </p>
        </div>
      )}

      <TagList items={project.stack} className="mt-6" />
      <div className="mt-7">
        <ProjectLinks project={project} size="sm" />
      </div>
    </div>
  )

  if (!isRow) {
    return (
      <article aria-labelledby={`${project.slug}-title`} className="flex min-w-0 flex-col gap-8">
        <Reveal>{visual}</Reveal>
        <Reveal delay={0.08}>{copy}</Reveal>
      </article>
    )
  }

  const reverse = layout === 'row-reverse'
  return (
    <article aria-labelledby={`${project.slug}-title`} className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
      <Reveal className={`lg:col-span-7 ${reverse ? 'lg:order-2' : ''}`}>{visual}</Reveal>
      <Reveal delay={0.08} className={`lg:col-span-5 ${reverse ? 'lg:order-1' : ''}`}>
        {copy}
      </Reveal>
    </article>
  )
}
