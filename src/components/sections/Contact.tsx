import { ArrowUpRight } from 'lucide-react'
import { socialLinks, socialList } from '../../data/socialLinks'
import { LinkedInIcon, socialIcon } from '../ui/BrandIcons'
import { ExternalButton } from '../ui/Button'
import { Reveal } from '../ui/Reveal'

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative isolate overflow-hidden py-24 md:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-30%] left-1/2 -z-10 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-accent-deep/20 blur-[150px]"
      />
      <div aria-hidden className="grid-backdrop pointer-events-none absolute inset-0 -z-10 opacity-60" />

      <div className="container-x">
        <Reveal>
          <p className="eyebrow flex items-center gap-3">
            <span className="text-accent-soft">05</span>
            <span className="h-px w-6 bg-line-strong" aria-hidden />
            <span>Contact</span>
          </p>
        </Reveal>

        <div className="mt-8 grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <Reveal delay={0.05}>
              <h2 id="contact-title" className="display text-[clamp(2.6rem,6.4vw,5.5rem)] text-balance">
                Have an interesting problem <span className="text-gradient">to solve?</span>
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-7 max-w-xl text-[1.08rem] leading-relaxed text-muted text-pretty">
                I’m always interested in exploring meaningful ideas, building useful products and connecting with people
                who share a passion for technology. Internships, collaborations and conversations are all welcome.
              </p>
            </Reveal>
            <Reveal delay={0.18} className="mt-9 flex flex-wrap items-center gap-3">
              <ExternalButton href={socialLinks.linkedin.href} variant="primary" className="h-12 px-6 text-[0.95rem]">
                <LinkedInIcon size={16} /> Message me on LinkedIn
                <ArrowUpRight size={16} aria-hidden />
              </ExternalButton>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-5 lg:self-end">
            <ul className="border-t border-line">
              {socialList.map((s) => {
                const Icon = socialIcon[s.key]
                return (
                  <li key={s.key} className="border-b border-line">
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-5 py-5 transition-colors"
                    >
                      <span className="grid size-11 shrink-0 place-items-center rounded-full border border-line-strong text-muted transition-colors duration-300 group-hover:border-accent/60 group-hover:text-fg">
                        <Icon size={17} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-baseline gap-3">
                          <span className="text-[1.15rem] font-medium tracking-[-0.02em]">{s.label}</span>
                          <span className="truncate font-mono text-[0.72rem] text-subtle">{s.handle}</span>
                        </span>
                        <span className="mt-0.5 block text-[0.85rem] text-muted">{s.description}</span>
                      </span>
                      <ArrowUpRight
                        size={18}
                        aria-hidden
                        className="shrink-0 text-subtle transition-[transform,color] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
                      />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
