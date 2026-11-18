import { profile } from '../../data/profile'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

const paragraphs = [
  'I’m a Computer Science undergraduate at Jawaharlal Nehru University, New Delhi, and I enjoy building intelligent systems that solve real problems.',
  'My interests sit where artificial intelligence, machine learning and software engineering meet. I like to explore how data, algorithms and modern AI tools can become applications that people actually use.',
  'That’s why I try to understand the whole journey from an idea to a working product: training and evaluating a model, then designing the API, database and interface around it. My projects so far range from regression and convolutional networks to a full-stack AI product deployed on the web.',
  'I’m still early in that journey, and I treat learning as part of the work. I keep experimenting and building, aiming to become an engineer who doesn’t just understand technology but uses it to create meaningful solutions.',
]

function ProfileCard() {
  const rows: [string, string][] = [
    ['degree', '"B.Tech, CSE"'],
    ['at', `"${profile.universityShort}, New Delhi"`],
    ['graduating', String(profile.graduation)],
  ]
  return (
    <figure className="overflow-hidden rounded-[12px] border border-line bg-surface">
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <span className="font-mono text-[0.68rem] text-subtle">about.ts</span>
        <span className="font-mono text-[0.62rem] text-subtle">TypeScript</span>
      </div>
      <pre className="overflow-x-auto p-5 font-mono text-[0.78rem] leading-[1.9] text-muted sm:text-[0.8rem]">
        <code>
          <span className="text-accent-soft">const</span> <span className="text-fg">engineer</span> = {'{'}
          {'\n'}
          {rows.map(([k, v]) => (
            <span key={k}>
              {'  '}
              {k}: <span className={v.startsWith('"') ? 'text-fg/85' : 'text-accent-soft'}>{v}</span>,{'\n'}
            </span>
          ))}
          {'  '}focus: [{'\n'}
          {['AI', 'ML', 'Deep Learning', 'Software Engineering'].map((f) => (
            <span key={f}>
              {'    '}
              <span className="text-fg/85">"{f}"</span>,{'\n'}
            </span>
          ))}
          {'  '}],{'\n'}
          {'  '}approach: <span className="text-fg/85">"idea → model → product"</span>,{'\n'}
          {'}'}
          <span className="ml-0.5 inline-block h-[1.05em] w-[0.5em] translate-y-[0.2em] bg-accent/80 motion-safe:animate-[blink_1.1s_steps(1)_infinite]" />
        </code>
      </pre>
      <figcaption className="sr-only">
        A short code snippet that summarises Akashveer’s degree, university, expected graduation year and focus areas.
      </figcaption>
    </figure>
  )
}

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          id="about-title"
          index="01"
          label="About"
          title={
            <>
              An engineer in the making, <span className="text-muted">interested in the whole system.</span>
            </>
          }
        />

        <div className="mt-14 grid gap-14 md:mt-20 md:grid-cols-12 md:gap-8">
          <div className="space-y-6 md:col-span-7 md:col-start-4 lg:col-span-5 lg:col-start-4">
            {paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <p
                  className={
                    i === 0
                      ? 'text-[1.3rem] leading-[1.5] tracking-[-0.015em] text-fg text-pretty'
                      : 'text-[1.02rem] leading-relaxed text-muted text-pretty'
                  }
                >
                  {p}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1} className="md:col-span-8 md:col-start-4 lg:col-span-4 lg:col-start-9">
            <ProfileCard />
            <div className="mt-6">
              <p className="eyebrow">Open to</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {profile.openTo.map((o) => (
                  <li
                    key={o}
                    className="rounded-full border border-line px-3 py-1 text-[0.8rem] text-muted"
                  >
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* philosophy */}
        <Reveal className="mt-24 md:mt-32">
          <figure className="relative grid gap-6 border-y border-line py-12 md:grid-cols-12 md:gap-8 md:py-16">
            <p className="eyebrow md:col-span-3">Engineering philosophy</p>
            <blockquote className="md:col-span-9">
              <p className="text-[clamp(1.6rem,3.4vw,2.85rem)] font-medium leading-[1.15] tracking-[-0.035em] text-balance">
                “Great engineering isn’t just writing code. It’s{' '}
                <span className="text-gradient">finding problems worth solving</span>, designing thoughtful solutions and
                building products people can actually use.”
              </p>
            </blockquote>
          </figure>
        </Reveal>
      </div>
    </section>
  )
}
