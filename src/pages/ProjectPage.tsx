import { ArrowLeft, ArrowRight, Info } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link, useParams } from 'react-router'
import { ProjectLinks } from '../components/projects/ProjectLinks'
import { ProjectVisual } from '../components/projects/ProjectVisual'
import { Reveal } from '../components/ui/Reveal'
import { SectionLink } from '../components/ui/SectionLink'
import { Tag } from '../components/ui/Tag'
import { getProject, projects } from '../data/projects'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { NotFoundPage } from './NotFoundPage'

function Block({ label, children }: { label: string; children: ReactNode }) {
  return (
    <Reveal as="section" className="grid gap-5 border-t border-line py-10 md:grid-cols-12 md:gap-8 md:py-14">
      <h2 className="eyebrow md:col-span-3">{label}</h2>
      <div className="md:col-span-9">{children}</div>
    </Reveal>
  )
}

export function ProjectPage() {
  const { slug } = useParams()
  const project = getProject(slug)
  useDocumentTitle(project?.name ?? 'Page not found', project?.summary)

  if (!project) return <NotFoundPage />

  const i = projects.indexOf(project)
  const next = projects[(i + 1) % projects.length]

  return (
    <article className="pb-10 pt-28 md:pt-36">
      <div className="container-x">
        <SectionLink
          to="projects"
          className="inline-flex items-center gap-2 py-1 text-sm text-muted transition-colors hover:text-fg"
        >
          <ArrowLeft size={15} aria-hidden /> All projects
        </SectionLink>

        <header className="mt-10 grid gap-8 md:mt-14 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal>
              <p className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-[0.72rem] text-accent-soft">{project.index}</span>
                <span className="eyebrow">{project.category}</span>
                {project.role && <Tag tone="accent">Team project</Tag>}
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="display mt-6 text-[clamp(2.4rem,6vw,5rem)] text-balance">{project.title}</h1>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-4 lg:self-end">
            <p className="text-[1.05rem] leading-relaxed text-muted text-pretty">{project.summary}</p>
            <div className="mt-6">
              <ProjectLinks project={project} showCaseStudy={false} />
            </div>
          </Reveal>
        </header>

        <Reveal delay={0.1} className="mt-14 md:mt-20">
          <div className="flex min-h-[20rem] sm:aspect-[16/8] sm:min-h-0">
            <ProjectVisual kind={project.visual} />
          </div>
        </Reveal>

        {project.facts.length > 0 && (
          <Reveal className="mt-6">
            <dl className="flex flex-wrap gap-x-12 gap-y-5">
              {project.facts.map((f) => (
                <div key={f.label}>
                  <dt className="sr-only">{f.label}</dt>
                  <dd className="flex items-baseline gap-2">
                    <span className="text-[1.6rem] font-medium tracking-[-0.03em]">{f.value}</span>
                    <span className="text-sm text-muted">{f.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        )}

        <div className="mt-16 md:mt-24">
          <Block label="The problem">
            <p className="max-w-3xl text-[clamp(1.15rem,1.8vw,1.4rem)] leading-[1.55] tracking-[-0.01em] text-fg/90 text-pretty">
              {project.problem}
            </p>
          </Block>

          {project.role && (
            <Block label={project.role.heading}>
              <ul className="max-w-3xl space-y-3">
                {project.role.points.map((p) => (
                  <li key={p} className="flex gap-3 text-[1.02rem] leading-relaxed text-fg/90">
                    <span className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                    {p}
                  </li>
                ))}
              </ul>
              <p className="mt-5 max-w-3xl text-[0.92rem] leading-relaxed text-muted">{project.role.team}</p>
            </Block>
          )}

          <Block label={project.role ? 'What the team built' : 'What I built'}>
            <ol className="max-w-3xl">
              {project.built.map((b, n) => (
                <li key={b} className="grid grid-cols-[2.25rem_1fr] border-b border-line py-4 first:pt-0 last:border-0">
                  <span className="font-mono text-[0.72rem] leading-7 text-subtle">{String(n + 1).padStart(2, '0')}</span>
                  <span className="leading-relaxed text-fg/85">{b}</span>
                </li>
              ))}
            </ol>
          </Block>

          <Block label="Core functionality">
            <div className="grid gap-px overflow-hidden rounded-[10px] border border-line bg-line sm:grid-cols-2">
              {project.features.map((f) => (
                <div key={f.title} className="bg-ink p-6">
                  <h3 className="text-[1rem] font-medium tracking-[-0.01em]">{f.title}</h3>
                  <p className="mt-2 text-[0.92rem] leading-relaxed text-muted">{f.body}</p>
                </div>
              ))}
            </div>
          </Block>

          <Block label="Architecture">
            <ol className="flex flex-col gap-3 lg:flex-row lg:items-stretch">
              {project.architecture.map((layer, n) => (
                <li key={layer.layer} className="flex flex-1 items-stretch gap-3 lg:flex-col">
                  <div className="flex-1 rounded-[8px] border border-line bg-surface p-4">
                    <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-accent-soft">
                      {String(n + 1).padStart(2, '0')} · {layer.layer}
                    </p>
                    <ul className="mt-3 space-y-1">
                      {layer.items.map((it) => (
                        <li key={it} className="text-[0.88rem] text-fg/85">
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </Block>

          <Block label="Technologies & concepts">
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="text-sm text-muted">Technologies</h3>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {project.stack.map((t) => (
                    <li key={t}>
                      <Tag>{t}</Tag>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm text-muted">Concepts applied</h3>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {project.concepts.map((t) => (
                    <li key={t}>
                      <Tag tone="accent">{t}</Tag>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Block>

          <Block label="Explore">
            <ul className="max-w-3xl space-y-2">
              {project.explore.map((e) => (
                <li key={e} className="flex gap-3 text-fg/85">
                  <ArrowRight size={15} className="mt-1 shrink-0 text-subtle" aria-hidden />
                  {e}
                </li>
              ))}
            </ul>
            <div className="mt-7">
              <ProjectLinks project={project} showCaseStudy={false} />
            </div>
          </Block>

          {project.notes.length > 0 && (
            <Block label="Notes on accuracy">
              <div className="max-w-3xl space-y-3 rounded-[10px] border border-line bg-surface/60 p-5">
                {project.notes.map((n) => (
                  <p key={n} className="flex gap-3 text-[0.9rem] leading-relaxed text-muted">
                    <Info size={15} className="mt-1 shrink-0 text-subtle" aria-hidden />
                    {n}
                  </p>
                ))}
              </div>
            </Block>
          )}
        </div>

        <Link
          to={`/projects/${next.slug}`}
          className="group mt-10 flex items-end justify-between gap-6 border-t border-line pt-10 md:mt-16"
        >
          <span>
            <span className="eyebrow block">Next project</span>
            <span className="mt-3 block text-[clamp(1.8rem,4.5vw,3.5rem)] font-medium leading-none tracking-[-0.04em] transition-colors group-hover:text-accent-soft">
              {next.name}
            </span>
          </span>
          <ArrowRight
            size={32}
            aria-hidden
            className="mb-1 shrink-0 text-muted transition-transform duration-500 group-hover:translate-x-2 group-hover:text-fg"
          />
        </Link>
      </div>
    </article>
  )
}
