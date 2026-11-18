import { GraduationCap, MapPin } from 'lucide-react'
import { profile } from '../../data/profile'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export function Education() {
  return (
    <section id="education" aria-labelledby="education-title" className="py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          id="education-title"
          index="04"
          label="Education"
          title={
            <>
              Learning the fundamentals, <span className="text-muted">building on top of them.</span>
            </>
          }
        />

        <Reveal className="mt-14 md:mt-20">
          <article className="relative overflow-hidden rounded-[14px] border border-line bg-surface">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-16 select-none text-[clamp(8rem,22vw,17rem)] font-semibold leading-none tracking-[-0.06em] text-white/[0.025]"
            >
              JNU
            </div>
            <div className="relative grid gap-10 p-6 sm:p-8 md:grid-cols-12 md:p-12">
              <div className="md:col-span-7">
                <p className="eyebrow flex items-center gap-2">
                  <GraduationCap size={14} aria-hidden /> Undergraduate degree
                </p>
                <h3 className="mt-5 text-[clamp(1.75rem,3.4vw,2.75rem)] font-medium leading-[1.05] tracking-[-0.035em]">
                  {profile.university}
                </h3>
                <p className="mt-3 flex items-center gap-1.5 text-muted">
                  <MapPin size={15} aria-hidden /> {profile.location}
                </p>
              </div>
              <dl className="grid content-start gap-6 md:col-span-5 md:border-l md:border-line md:pl-10">
                <div>
                  <dt className="eyebrow">Degree</dt>
                  <dd className="mt-2 text-[1.05rem] leading-snug">{profile.degree}</dd>
                </div>
                <div>
                  <dt className="eyebrow">Expected graduation</dt>
                  <dd className="mt-2 text-[1.05rem]">{profile.graduation}</dd>
                </div>
              </dl>
            </div>

            {/* progress track (no invented dates: only "now" and the expected end) */}
            <div className="relative border-t border-line px-6 py-7 sm:px-8 md:px-12">
              <div className="flex items-center justify-between font-mono text-[0.68rem] uppercase tracking-[0.12em] text-subtle">
                <span>Enrolled</span>
                <span className="text-accent-soft">In progress</span>
                <span>{profile.graduation}</span>
              </div>
              <div className="relative mt-3 h-px bg-line-strong" aria-hidden>
                <span className="absolute left-0 top-1/2 size-2 -translate-y-1/2 rounded-full bg-fg/60" />
                <span className="absolute left-0 top-0 h-px w-1/2 bg-gradient-to-r from-fg/40 to-accent" />
                <span className="absolute left-1/2 top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_0_4px_rgba(140,123,255,0.18)]" />
                <span className="absolute right-0 top-1/2 size-2 -translate-y-1/2 rounded-full border border-fg/40 bg-ink" />
              </div>
            </div>
          </article>
        </Reveal>

        <Reveal delay={0.05} className="mt-10 grid gap-6 md:grid-cols-12 md:gap-8">
          <p className="eyebrow md:col-span-3">Areas of interest</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-3 md:col-span-9">
            {profile.interests.map((i) => (
              <li key={i} className="flex items-center gap-2.5 text-[1.02rem] text-fg/85">
                <span className="size-1 rounded-full bg-accent" aria-hidden />
                {i}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
