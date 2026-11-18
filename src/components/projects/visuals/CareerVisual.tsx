import { VisualFrame } from './VisualFrame'

// The real weights of the readiness score, as documented in the repository.
const signals = [
  { label: 'Résumé', weight: 25, color: '#a99bff' },
  { label: 'Skills', weight: 35, color: '#8c7bff' },
  { label: 'Interview', weight: 20, color: '#6a5ae0' },
  { label: 'GitHub', weight: 20, color: '#4a3fa6' },
]

// Example rows illustrating the three skill-gap states the engine produces.
const gapRows: { skill: string; state: 'MATCHED' | 'PARTIAL' | 'MISSING' }[] = [
  { skill: 'Python', state: 'MATCHED' },
  { skill: 'SQL', state: 'MATCHED' },
  { skill: 'REST APIs', state: 'PARTIAL' },
  { skill: 'Docker', state: 'MISSING' },
]

const stateClass = {
  MATCHED: 'text-accent-soft border-accent/40 bg-accent/10',
  PARTIAL: 'text-fg/80 border-white/20 bg-white/[0.04]',
  MISSING: 'text-subtle border-white/10',
}

function ReadinessRing() {
  const r = 52
  const c = 2 * Math.PI * r
  const gap = 4
  let offset = 0
  return (
    <svg viewBox="0 0 140 140" className="size-full -rotate-90">
      <circle cx="70" cy="70" r={r} fill="none" stroke="#ffffff" strokeOpacity="0.06" strokeWidth="10" />
      {signals.map((s) => {
        const len = (s.weight / 100) * c - gap
        const el = (
          <circle
            key={s.label}
            cx="70"
            cy="70"
            r={r}
            fill="none"
            stroke={s.color}
            strokeWidth="10"
            strokeDasharray={`${len} ${c - len}`}
            strokeDashoffset={-offset}
          />
        )
        offset += (s.weight / 100) * c
        return el
      })}
    </svg>
  )
}

export function CareerVisual({ compact = false }: { compact?: boolean }) {
  return (
    <VisualFrame
      file="career-coach / overview"
      label="AI Career Coach concepts: a readiness score built from four weighted signals, a skill-gap list and a next-best-action card."
    >
      <div className="relative grid h-full gap-3 p-4 sm:grid-cols-[1.05fr_1fr] sm:p-5">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-20 -top-24 size-72 rounded-full bg-accent/15 blur-3xl"
        />
        {/* readiness */}
        <div className="relative rounded-[8px] border border-line bg-graphite/70 p-4">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-subtle">Readiness score</p>
          <div className="mt-3 flex items-center gap-4">
            <div className="relative size-24 shrink-0 sm:size-28">
              <ReadinessRing />
              <div className="absolute inset-0 grid place-items-center text-center">
                <div>
                  <p className="text-lg font-medium tracking-tight">0–100</p>
                  <p className="font-mono text-[0.55rem] uppercase tracking-[0.12em] text-subtle">weighted</p>
                </div>
              </div>
            </div>
            <ul className="w-full space-y-1.5">
              {signals.map((s) => (
                <li key={s.label} className="flex items-center justify-between gap-2 text-[0.72rem]">
                  <span className="flex items-center gap-2 text-muted">
                    <span className="size-1.5 rounded-full" style={{ background: s.color }} />
                    {s.label}
                  </span>
                  <span className="font-mono text-subtle">{s.weight}%</span>
                </li>
              ))}
            </ul>
          </div>
          {!compact && (
            <div className="mt-4 rounded-[6px] border border-accent/25 bg-accent/[0.06] p-3">
              <p className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-accent-soft">Next best action</p>
              <p className="mt-1.5 text-[0.75rem] leading-snug text-fg/85">
                One concrete step, explained with your own numbers.
              </p>
            </div>
          )}
        </div>

        {/* skill gap */}
        <div className="relative flex flex-col rounded-[8px] border border-line bg-graphite/70 p-4">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-subtle">Skill gap</p>
            <p className="font-mono text-[0.6rem] text-subtle">target role</p>
          </div>
          <ul className="mt-3 space-y-2">
            {gapRows.map((row) => (
              <li key={row.skill} className="flex items-center justify-between gap-2 border-b border-line pb-2 last:border-0">
                <span className="text-[0.78rem] text-fg/85">{row.skill}</span>
                <span className={`rounded-[3px] border px-1.5 py-px font-mono text-[0.56rem] tracking-[0.1em] ${stateClass[row.state]}`}>
                  {row.state}
                </span>
              </li>
            ))}
          </ul>
          {!compact && (
            <div className="mt-auto grid grid-cols-3 gap-1.5 pt-4">
              {['ATS', 'Roadmap', 'Interview'].map((t) => (
                <span
                  key={t}
                  className="rounded-[4px] border border-line py-1.5 text-center font-mono text-[0.58rem] uppercase tracking-[0.1em] text-subtle"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* roadmap */}
        {!compact && (
          <div className="relative rounded-[8px] border border-line bg-graphite/70 p-4 sm:col-span-2">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-subtle">Learning roadmap</p>
              <p className="font-mono text-[0.6rem] text-subtle">LLM-generated · weekly</p>
            </div>
            <ol className="mt-3 grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((w) => (
                <li key={w}>
                  <p className="font-mono text-[0.58rem] text-subtle">WK {String(w).padStart(2, '0')}</p>
                  <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/[0.06]">
                    <div
                      className="h-full rounded-full bg-accent"
                      style={{ width: `${[100, 100, 45, 0][w - 1]}%`, opacity: w < 3 ? 0.9 : 0.6 }}
                    />
                  </div>
                  <div className="mt-2 space-y-1">
                    {[0, 1].map((t) => (
                      <div key={t} className="flex items-center gap-1.5">
                        <span
                          className={`size-2 shrink-0 rounded-[2px] border ${
                            w < 3 || (w === 3 && t === 0) ? 'border-accent bg-accent/60' : 'border-white/20'
                          }`}
                        />
                        <span className="h-[3px] w-full rounded-full bg-white/10" />
                      </div>
                    ))}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </VisualFrame>
  )
}
