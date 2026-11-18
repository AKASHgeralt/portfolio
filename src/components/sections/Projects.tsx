import { projects } from '../../data/projects'
import { FeaturedProject } from '../projects/FeaturedProject'
import { ProjectCard } from '../projects/ProjectCard'
import { SectionHeading } from '../ui/SectionHeading'

export function Projects() {
  const [flagship, housing, bigCats, cnn] = projects
  return (
    <section id="projects" aria-labelledby="projects-title" className="py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          id="projects-title"
          index="02"
          label="Selected work"
          title={
            <>
              From models to <span className="text-muted">working products.</span>
            </>
          }
          intro="Four projects across applied AI, classical machine learning, deep learning and frontend engineering. Each has a case study covering the problem, what I built and how it works."
        />

        <div className="mt-16 md:mt-20">
          <FeaturedProject project={flagship} />
        </div>

        <div className="mt-24 border-t border-line pt-16 md:mt-32 md:pt-20">
          <ProjectCard project={housing} layout="row" visualClass="aspect-[16/10] sm:aspect-[16/9]" />
        </div>

        <div className="mt-24 grid grid-cols-1 gap-20 border-t border-line pt-16 md:mt-32 md:pt-20 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <ProjectCard project={bigCats} layout="stack" visualClass="min-h-[22rem] sm:min-h-0 sm:aspect-[4/3.4]" />
          </div>
          <div className="lg:col-span-7 lg:pt-24">
            <ProjectCard project={cnn} layout="stack" visualClass="min-h-[18rem] sm:min-h-0 sm:aspect-[16/10]" />
          </div>
        </div>
      </div>
    </section>
  )
}
