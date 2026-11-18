import { motion } from 'motion/react'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { useRef, type PointerEvent } from 'react'
import { profile } from '../../data/profile'
import { socialLinks } from '../../data/socialLinks'
import { PipelineVisual } from '../hero/PipelineVisual'
import { GitHubIcon, LinkedInIcon } from '../ui/BrandIcons'
import { buttonClass } from '../ui/Button'
import { SectionLink } from '../ui/SectionLink'

const ease = [0.16, 1, 0.3, 1] as const

// Line breaks are deliberate: they hold the composition at desktop widths
// and still wrap naturally on small screens.
const headline: { text: string; accent?: boolean }[][] = [
  [{ text: 'Building' }, { text: 'intelligent', accent: true }],
  [{ text: 'systems' }, { text: 'for' }],
  [{ text: 'real-world' }, { text: 'problems.' }],
]

export function Hero() {
  const ref = useRef<HTMLElement>(null)

  // Soft spotlight that follows a fine pointer. Writes CSS vars directly — no re-render.
  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse' || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--mx', `${e.clientX - r.left}px`)
    ref.current.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  let wordIndex = 0

  return (
    <section
      id="home"
      ref={ref}
      onPointerMove={onPointerMove}
      aria-labelledby="hero-title"
      className="noise relative isolate overflow-hidden pb-16 pt-28 md:pb-24 md:pt-36 lg:flex lg:min-h-[100svh] lg:flex-col lg:justify-center lg:pb-20"
      style={{ ['--mx' as string]: '70%', ['--my' as string]: '30%' }}
    >
      {/* backdrop */}
      <div aria-hidden className="grid-backdrop pointer-events-none absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 transition-[background] duration-300"
        style={{
          background:
            'radial-gradient(520px circle at var(--mx) var(--my), rgba(140,123,255,0.075), transparent 65%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] -z-10 h-[520px] w-[720px] rounded-full bg-accent-deep/20 blur-[140px]"
      />

      <div className="container-x grid gap-y-14 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-8">
          <motion.p
            className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            <span className="relative flex size-2" aria-hidden>
              <span className="absolute inset-0 rounded-full bg-accent/60 motion-safe:animate-ping" />
              <span className="relative size-2 rounded-full bg-accent" />
            </span>
            <span>Computer Science Undergraduate</span>
            <span className="text-subtle" aria-hidden>
              /
            </span>
            <span>AI &amp; Machine Learning</span>
          </motion.p>

          <h1
            id="hero-title"
            className="display mt-7 text-[clamp(2.6rem,5.6vw,4.9rem)] md:mt-9"
            aria-label="Building intelligent systems for real-world problems."
          >
            {headline.map((line, li) => (
              <span key={li} className="block" aria-hidden>
                {line.map((w) => {
                  const i = wordIndex++
                  return (
                    <span key={w.text} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                      <motion.span
                        className={`inline-block ${w.accent ? 'text-gradient' : ''}`}
                        initial={{ y: '105%' }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1.05, delay: 0.15 + i * 0.07, ease }}
                      >
                        {w.text}
                      </motion.span>
                      {' '}
                    </span>
                  )
                })}
              </span>
            ))}
          </h1>

          <motion.div
            className="mt-12 grid gap-8 border-t border-line pt-8 md:mt-14 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.75, ease }}
          >
            <div>
              <p className="text-[1.35rem] font-medium tracking-[-0.025em]">{profile.name}</p>
              <p className="mt-1 text-muted">{profile.title}</p>
              <p className="mt-4 font-mono text-[0.72rem] leading-relaxed tracking-[0.04em] text-subtle">
                B.TECH CSE · JNU, NEW DELHI
                <br />
                EXPECTED {profile.graduation}
              </p>
            </div>
            <div>
              <p className="max-w-md text-[1.05rem] leading-relaxed text-muted text-pretty">
                Exploring the intersection of artificial intelligence, data and software engineering — turning ideas
                into intelligent, practical applications.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <SectionLink to="projects" className={buttonClass('primary')}>
                  Explore My Work
                  <ArrowDown
                    size={16}
                    aria-hidden
                    className="transition-transform duration-300 group-hover/btn:translate-y-0.5"
                  />
                </SectionLink>
                <SectionLink to="contact" className={buttonClass('ghost')}>
                  Let’s Connect
                  <ArrowUpRight size={16} aria-hidden />
                </SectionLink>
              </div>
              <ul className="mt-6 flex items-center gap-5 text-sm" aria-label="Social profiles">
                <li>
                  <a
                    href={socialLinks.github.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 py-1 text-muted transition-colors hover:text-fg"
                  >
                    <GitHubIcon size={16} /> GitHub<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
                <li>
                  <a
                    href={socialLinks.linkedin.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 py-1 text-muted transition-colors hover:text-fg"
                  >
                    <LinkedInIcon size={16} /> LinkedIn<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mx-auto w-full max-w-[26rem] lg:col-span-4 lg:mx-0 lg:max-w-none lg:self-center"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.35, ease }}
        >
          <PipelineVisual />
        </motion.div>
      </div>
    </section>
  )
}
