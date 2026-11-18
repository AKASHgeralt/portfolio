import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'
import type { Project } from '../../data/projects'
import { GitHubIcon } from '../ui/BrandIcons'
import { ExternalButton } from '../ui/Button'

type Props = { project: Project; showCaseStudy?: boolean; size?: 'md' | 'sm' }

export function ProjectLinks({ project, showCaseStudy = true, size = 'md' }: Props) {
  const sm = size === 'sm' ? 'h-10 px-4 text-[0.85rem]' : ''
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {project.links.live && (
        <ExternalButton
          href={project.links.live}
          variant="primary"
          className={sm}
          aria-label={`Open the ${project.name} live demo`}
        >
          Live demo <ArrowUpRight size={15} aria-hidden />
        </ExternalButton>
      )}
      <ExternalButton
        href={project.links.github}
        variant={project.links.live ? 'ghost' : 'primary'}
        className={sm}
        aria-label={`View the ${project.name} source code on GitHub`}
      >
        <GitHubIcon size={15} /> Source
      </ExternalButton>
      {showCaseStudy && (
        <Link
          to={`/projects/${project.slug}`}
          className="group/cs inline-flex h-10 items-center gap-1.5 rounded-full px-3 text-[0.88rem] text-muted transition-colors hover:text-fg"
          aria-label={`Read the ${project.name} case study`}
        >
          Case study
          <ArrowRight size={15} aria-hidden className="transition-transform duration-300 group-hover/cs:translate-x-1" />
        </Link>
      )}
    </div>
  )
}
