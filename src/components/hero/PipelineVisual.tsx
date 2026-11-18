import { motion } from 'motion/react'

/**
 * Data → Models → Applications.
 * A small, hand-built SVG diagram of how raw data becomes a product.
 * The motion (flowing dashes, pulsing nodes) is pure CSS and is disabled
 * automatically for reduced-motion users by the global stylesheet.
 */

const W = 400
const H = 460
const COL = { data: 56, model: 200, app: 344 }

const dataNodes = [96, 160, 224, 288, 352].map((y, i) => ({ x: COL.data, y, label: ['csv', 'img', 'pdf', 'api', 'sql'][i] }))
const modelNodes = [140, 224, 308].map((y) => ({ x: COL.model, y }))
const appNodes = [
  { x: COL.app, y: 176, label: 'app' },
  { x: COL.app, y: 272, label: 'api' },
]

const curve = (x1: number, y1: number, x2: number, y2: number) => {
  const mx = (x1 + x2) / 2
  return `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`
}

// A few edges carry the "live" signal; the rest stay as quiet structure.
const hot = new Set(['0-1', '1-0', '2-1', '3-2', '4-1', 'm0-0', 'm1-0', 'm1-1', 'm2-1'])

export function PipelineVisual() {
  return (
    <figure className="relative w-full" aria-labelledby="pipeline-caption">
      <div className="relative overflow-hidden rounded-[14px] border border-line bg-surface/70">
        {/* panel chrome */}
        <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
          <span className="font-mono text-[0.68rem] tracking-[0.08em] text-subtle">pipeline / overview</span>
          <span className="flex items-center gap-1.5 font-mono text-[0.68rem] text-subtle">
            <span className="size-1.5 rounded-full bg-accent pulse-node" aria-hidden />
            live
          </span>
        </div>

        <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-labelledby="pipeline-title">
          <title id="pipeline-title">
            Diagram: data sources flow into machine-learning models, which power applications.
          </title>
          <defs>
            <radialGradient id="pv-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#8c7bff" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#8c7bff" stopOpacity="0" />
            </radialGradient>
            <pattern id="pv-dots" width="16" height="16" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.8" fill="#ffffff" opacity="0.06" />
            </pattern>
          </defs>

          <rect width={W} height={H} fill="url(#pv-dots)" />
          <circle cx={COL.model} cy={224} r={150} fill="url(#pv-glow)" />
          {/* orbit rings around the model layer */}
          <circle cx={COL.model} cy={224} r={112} fill="none" stroke="#ffffff" strokeOpacity="0.05" />
          <circle
            cx={COL.model}
            cy={224}
            r={136}
            fill="none"
            stroke="#8c7bff"
            strokeOpacity="0.18"
            className="flow-slow"
          />

          {/* column labels */}
          {[
            { x: COL.data, t: '01 data' },
            { x: COL.model, t: '02 models' },
            { x: COL.app, t: '03 apps' },
          ].map((c) => (
            <text
              key={c.t}
              x={c.x}
              y={44}
              textAnchor="middle"
              className="fill-[#9b9ba5] font-mono"
              fontSize="10.5"
              letterSpacing="1.2"
            >
              {c.t.toUpperCase()}
            </text>
          ))}

          {/* data → model edges */}
          {dataNodes.map((d, i) =>
            modelNodes.map((m, j) => {
              const isHot = hot.has(`${i}-${j}`)
              return (
                <path
                  key={`dm-${i}-${j}`}
                  d={curve(d.x + 14, d.y, m.x - 16, m.y)}
                  fill="none"
                  stroke={isHot ? '#a99bff' : '#ffffff'}
                  strokeOpacity={isHot ? 0.7 : 0.07}
                  strokeWidth={isHot ? 1.2 : 1}
                  className={isHot ? 'flow' : undefined}
                  style={isHot ? { animationDelay: `${-(i * 0.45 + j * 0.3)}s` } : undefined}
                />
              )
            }),
          )}

          {/* model → app edges */}
          {modelNodes.map((m, i) =>
            appNodes.map((a, j) => {
              const isHot = hot.has(`m${i}-${j}`)
              return (
                <path
                  key={`ma-${i}-${j}`}
                  d={curve(m.x + 16, m.y, a.x - 26, a.y)}
                  fill="none"
                  stroke={isHot ? '#a99bff' : '#ffffff'}
                  strokeOpacity={isHot ? 0.7 : 0.07}
                  strokeWidth={isHot ? 1.2 : 1}
                  className={isHot ? 'flow' : undefined}
                  style={isHot ? { animationDelay: `${-(i * 0.6 + j * 0.2)}s` } : undefined}
                />
              )
            }),
          )}

          {/* data nodes */}
          {dataNodes.map((d, i) => (
            <motion.g
              key={`d-${i}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <rect x={d.x - 14} y={d.y - 10} width={28} height={20} rx={3} fill="#18181c" stroke="#ffffff" strokeOpacity="0.16" />
              <text x={d.x} y={d.y + 3.5} textAnchor="middle" fontSize="9" className="fill-[#9b9ba5] font-mono">
                {d.label}
              </text>
            </motion.g>
          ))}

          {/* model nodes */}
          {modelNodes.map((m, i) => (
            <motion.g
              key={`m-${i}`}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ transformOrigin: `${m.x}px ${m.y}px` }}
              transition={{ delay: 0.8 + i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <circle cx={m.x} cy={m.y} r={16} fill="#111113" stroke="#8c7bff" strokeOpacity="0.8" />
              <circle
                cx={m.x}
                cy={m.y}
                r={5}
                fill="#a99bff"
                className="pulse-node"
                style={{ animationDelay: `${i * 0.5}s` }}
              />
            </motion.g>
          ))}

          {/* app nodes */}
          {appNodes.map((a, i) => (
            <motion.g
              key={`a-${i}`}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 + i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <rect x={a.x - 26} y={a.y - 18} width={52} height={36} rx={5} fill="#18181c" stroke="#ededef" strokeOpacity="0.3" />
              <rect x={a.x - 18} y={a.y - 9} width={20} height={3} rx={1.5} fill="#ededef" opacity="0.55" />
              <rect x={a.x - 18} y={a.y - 1} width={34} height={3} rx={1.5} fill="#ededef" opacity="0.18" />
              <rect x={a.x - 18} y={a.y + 7} width={26} height={3} rx={1.5} fill="#8c7bff" opacity="0.7" />
            </motion.g>
          ))}

          {/* baseline readout */}
          <line x1={24} x2={W - 24} y1={404} y2={404} stroke="#ffffff" strokeOpacity="0.08" />
          <text x={24} y={428} fontSize="9.5" className="fill-[#6e6e78] font-mono" letterSpacing="0.6">
            INGEST → LEARN → SHIP
          </text>
          <text x={W - 24} y={428} textAnchor="end" fontSize="9.5" className="fill-[#6e6e78] font-mono">
            idea → product
          </text>
        </svg>
      </div>
      <figcaption id="pipeline-caption" className="sr-only">
        An abstract diagram of the journey from data to models to working applications.
      </figcaption>
    </figure>
  )
}
