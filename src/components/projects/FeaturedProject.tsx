import { Link } from 'react-router'
import type { Project } from '../../data/projects'
import { Reveal } from '../ui/Reveal'
import { TagList } from '../ui/Tag'
import { ProjectLinks } from './ProjectLinks'
import { CareerVisual } from './visuals/CareerVisual'

/** The flagship treatment: large visual, feature index, architecture strip. */
export function FeaturedProject({ project }: { project: Project }) {
  const highlights = project.features.slice(0, 4)
  return (
    <article aria-labelledby={`${project.slug}-title`} className="relative">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        <Reveal className="flex flex-col lg:col-span-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-[0.72rem] text-accent-soft">{project.index}</span>
            <span className="rounded-full border border-accent/35 bg-accent/10 px-2.5 py-0.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-accent-soft">
              {project.context}
            </span>
          </div>
          <h3 id={`${project.slug}-title`} className="mt-5 text-[clamp(2rem,4vw,3.25rem)] font-medium leading-[1.02] tracking-[-0.04em]">
            {project.name}
          </h3>
          <p className="mt-2 text-[0.95rem] text-subtle">AI-powered career intelligence platform</p>
          <p className="mt-6 text-[1.05rem] leading-relaxed text-muted text-pretty">{project.summary}</p>

          <ul className="mt-8 border-t border-line">
            {highlights.map((f, i) => (
              <li key={f.title} className="grid grid-cols-[2rem_1fr] gap-2 border-b border-line py-3.5">
                <span className="font-mono text-[0.7rem] leading-6 text-subtle">0{i + 1}</span>
                <div>
                  <p className="text-[0.95rem] font-medium tracking-[-0.01em]">{f.title}</p>
                  <p className="mt-1 text-[0.88rem] leading-relaxed text-muted">{f.body}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[0.82rem] text-subtle">
            + mock interviews, a learning roadmap and a GitHub analyzer.{' '}
            <Link to={`/projects/${project.slug}`} className="text-muted underline decoration-line-strong underline-offset-4 hover:text-fg">
              See all features
            </Link>
          </p>

          <div className="mt-8">
            <ProjectLinks project={project} />
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:sticky lg:top-24 lg:col-span-7 lg:self-start">
          <Link
            to={`/projects/${project.slug}`}
            className="group relative flex rounded-[12px]"
            aria-label={`${project.name} case study`}
          >
            <div
              aria-hidden
              className="absolute -inset-px rounded-[13px] bg-gradient-to-br from-accent/40 via-transparent to-transparent opacity-50 transition-opacity duration-700 group-hover:opacity-100"
            />
            <div className="relative flex w-full">
              <CareerVisual />
            </div>
          </Link>
        </Reveal>
      </div>

      {/* architecture strip */}
      <Reveal delay={0.05} className="mt-12">
        <div className="overflow-hidden rounded-[12px] border border-line bg-surface/50">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-3">
            <p className="eyebrow">System architecture</p>
            <TagList items={['React 19', 'FastAPI', 'PostgreSQL', 'Groq LLM']} />
          </div>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-5">
            {project.architecture.map((layer, i) => (
              <li
                key={layer.layer}
                className="relative border-line p-5 max-lg:border-b sm:max-lg:odd:border-r lg:border-r lg:last:border-r-0"
              >
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-subtle">
                  {String(i + 1).padStart(2, '0')} · {layer.layer}
                </p>
                <ul className="mt-3 space-y-1.5">
                  {layer.items.map((it) => (
                    <li key={it} className="text-[0.88rem] text-fg/85">
                      {it}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
          <dl className="grid grid-cols-2 border-t border-line md:grid-cols-4">
            {project.facts.map((f) => (
              <div key={f.label} className="border-line p-5 max-md:odd:border-r max-md:[&:nth-child(-n+2)]:border-b md:border-r md:last:border-r-0">
                <dt className="sr-only">{f.label}</dt>
                <dd>
                  <span className="block text-[1.75rem] font-medium tracking-[-0.03em]">{f.value}</span>
                  <span className="text-[0.8rem] text-muted">{f.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>
    </article>
  )
}
