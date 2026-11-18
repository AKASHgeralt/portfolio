import { VisualFrame } from './VisualFrame'

const classes = ['airplane', 'automobile', 'bird', 'cat', 'deer', 'dog', 'frog', 'horse', 'ship', 'truck']

// Deterministic pseudo-random "pixels" so the mosaic is stable between renders.
const pixels = Array.from({ length: 64 }, (_, i) => {
  const v = Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1
  return 0.08 + v * 0.55
})

const layers = [
  { label: 'Conv2D', size: 72, depth: 4 },
  { label: 'MaxPool', size: 54, depth: 4 },
  { label: 'Conv2D', size: 46, depth: 6 },
  { label: 'MaxPool', size: 34, depth: 6 },
]

export function CnnVisual() {
  return (
    <VisualFrame
      file="image-classifier / model"
      label="A 32 by 32 pixel image passes through convolution and pooling layers, then dense layers choose one of ten CIFAR-10 classes."
    >
      <div className="flex h-full flex-col gap-5 p-5 sm:p-6">
        <div className="flex flex-1 items-center justify-between gap-3">
          {/* input mosaic */}
          <div className="shrink-0">
            <div className="grid size-[76px] grid-cols-8 gap-px overflow-hidden rounded-[4px] border border-line-strong sm:size-[88px]">
              {pixels.map((o, i) => (
                <span key={i} style={{ background: `rgba(169,155,255,${o})` }} />
              ))}
            </div>
            <p className="mt-2 text-center font-mono text-[0.58rem] text-subtle">32×32×3</p>
          </div>

          {/* feature maps */}
          <div className="flex flex-1 items-center justify-around">
            {layers.map((l, li) => (
              <div key={li} className="flex flex-col items-center">
                <div className="relative" style={{ width: l.size * 0.62 + l.depth * 4, height: l.size * 0.62 + l.depth * 4 }}>
                  {Array.from({ length: l.depth }).map((_, d) => (
                    <span
                      key={d}
                      className="absolute rounded-[2px] border bg-graphite"
                      style={{
                        width: l.size * 0.62,
                        height: l.size * 0.62,
                        left: d * 4,
                        top: d * 4,
                        borderColor: `rgba(140,123,255,${0.25 + d * 0.08})`,
                      }}
                    />
                  ))}
                </div>
                <p className="mt-2 font-mono text-[0.55rem] text-subtle">{l.label}</p>
              </div>
            ))}
          </div>

          {/* dense */}
          <div className="hidden shrink-0 flex-col items-center gap-1 xs:flex">
            {Array.from({ length: 7 }).map((_, i) => (
              <span key={i} className={`size-1.5 rounded-full ${i === 3 ? 'bg-accent' : 'bg-white/20'}`} />
            ))}
            <p className="mt-1 font-mono text-[0.55rem] text-subtle">Dense</p>
          </div>
        </div>

        {/* output classes */}
        <div className="border-t border-line pt-4">
          <p className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-subtle">Softmax · 10 classes</p>
          <ul className="mt-2.5 grid grid-cols-5 gap-1">
            {classes.map((c) => (
              <li
                key={c}
                className={`truncate rounded-[3px] border px-1 py-1 text-center font-mono text-[0.55rem] sm:text-[0.6rem] ${
                  c === 'cat' ? 'border-accent/60 bg-accent/10 text-fg' : 'border-line text-subtle'
                }`}
              >
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </VisualFrame>
  )
}
