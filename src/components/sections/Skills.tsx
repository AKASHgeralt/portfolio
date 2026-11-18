import { motion } from 'motion/react'
import { useState } from 'react'
import { projects } from '../../data/projects'
import { skillGroups } from '../../data/skills'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export function Skills() {
  const [focus, setFocus] = useState<string | null>(null)
  const focusName = projects.find((p) => p.slug === focus)?.name

  return (
    <section id="skills" aria-labelledby="skills-title" className="py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          id="skills-title"
          index="03"
          label="Skills"
          title={
            <>
              A connected toolkit, <span className="text-muted">from data to deployment.</span>
            </>
          }
          intro="Grouped by where each tool sits in a system. Pick a project to see which technologies it uses."
        />

        <Reveal className="mt-14 md:mt-16">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-5">
            <p id="skill-filter-label" className="eyebrow shrink-0">
              Filter by project
            </p>
            <div
              role="group"
              aria-labelledby="skill-filter-label"
              className="-mx-5 flex gap-1.5 overflow-x-auto px-5 pb-1 md:mx-0 md:flex-wrap md:px-0"
            >
              {[{ slug: null as string | null, name: 'All' }, ...projects].map((p) => {
                const active = focus === p.slug
                return (
                  <button
                    key={p.name}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setFocus(p.slug)}
                    className={`relative isolate shrink-0 rounded-full border px-3.5 py-1.5 text-[0.82rem] transition-colors duration-300 ${
                      active ? 'border-transparent text-ink' : 'border-line-strong text-muted hover:text-fg'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="skill-filter"
                        className="absolute inset-0 -z-10 rounded-full bg-fg"
                        transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                      />
                    )}
                    <span className="relative">{p.name}</span>
                  </button>
                )
              })}
            </div>
          </div>
          <p className="sr-only" aria-live="polite">
            {focusName ? `Highlighting technologies used in ${focusName}.` : 'Showing all technologies.'}
          </p>
        </Reveal>

        <div className="mt-10 grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, gi) => {
            const used = focus ? group.skills.filter((s) => s.projects?.includes(focus)).length : group.skills.length
            return (
              <Reveal
                key={group.id}
                delay={(gi % 3) * 0.06}
                className="relative border-b border-r border-line p-6 md:p-7"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-[1.05rem] font-medium tracking-[-0.015em]">{group.label}</h3>
                  <span className="font-mono text-[0.68rem] text-subtle">
                    {String(used).padStart(2, '0')}/{String(group.skills.length).padStart(2, '0')}
                  </span>
                </div>
                <p className="mt-1 text-[0.85rem] text-muted">{group.blurb}</p>
                <ul className="mt-6 flex flex-wrap gap-x-1.5 gap-y-2">
                  {group.skills.map((s) => {
                    const lit = !focus || s.projects?.includes(focus)
                    return (
                      <li
                        key={s.name}
                        className={`rounded-[5px] border px-2.5 py-1 text-[0.86rem] transition-[opacity,color,border-color,background-color] duration-500 ${
                          focus && lit
                            ? 'border-accent/45 bg-accent/10 text-fg'
                            : lit
                              ? 'border-line-strong text-fg/85'
                              : 'border-line text-fg/85 opacity-30'
                        }`}
                      >
                        {s.name}
                      </li>
                    )
                  })}
                </ul>
              </Reveal>
            )
          })}
        </div>
        <p className="mt-5 max-w-2xl text-[0.82rem] leading-relaxed text-subtle">
          Highlights reflect technologies used in the projects featured on this site, and for team projects, in my own
          part of the work. Technologies that never light up are ones I’ve learned and used outside these projects.
        </p>
      </div>
    </section>
  )
}
