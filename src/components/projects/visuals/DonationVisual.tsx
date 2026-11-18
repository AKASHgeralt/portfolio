import { VisualFrame } from './VisualFrame'

const steps = ['Amount', 'Details', 'Pay', 'Certificate']

export function DonationVisual() {
  return (
    <VisualFrame
      file="big-cats / DonationModal.jsx"
      label="A four-step donation journey: choose an amount, enter details, pay through Razorpay and receive a certificate."
    >
      <div className="relative flex h-full items-center justify-center p-5 sm:p-7">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-60">
          {/* abstract stripes, a quiet nod to big-cat markings */}
          <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="size-full">
            {Array.from({ length: 9 }).map((_, i) => (
              <path
                key={i}
                d={`M${-40 + i * 52} 320 C ${10 + i * 52} 220, ${-20 + i * 52} 120, ${40 + i * 52} -20`}
                fill="none"
                stroke="#8c7bff"
                strokeOpacity={0.05 + (i % 3) * 0.025}
                strokeWidth={10 - (i % 4) * 2}
                strokeLinecap="round"
              />
            ))}
          </svg>
        </div>

        <div className="relative w-full max-w-[17rem] rounded-[10px] border border-line-strong bg-ink/90 p-4 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)]">
          <div className="flex items-center justify-between">
            <p className="text-[0.8rem] font-medium">Support the rally</p>
            <span className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-subtle">Step 1 / 4</span>
          </div>

          <ol className="mt-3 flex gap-1" aria-hidden>
            {steps.map((s, i) => (
              <li key={s} className={`h-[3px] flex-1 rounded-full ${i === 0 ? 'bg-accent' : 'bg-white/10'}`} />
            ))}
          </ol>

          <p className="mt-4 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-subtle">Choose an amount</p>
          <div className="mt-2 grid grid-cols-3 gap-1.5">
            {['₹ ···', '₹ ····', '₹ ·····'].map((a, i) => (
              <span
                key={a}
                className={`rounded-[5px] border py-2 text-center font-mono text-[0.7rem] ${
                  i === 1 ? 'border-accent/60 bg-accent/10 text-fg' : 'border-line text-muted'
                }`}
              >
                {a}
              </span>
            ))}
          </div>
          <div className="mt-2 rounded-[5px] border border-line px-3 py-2 font-mono text-[0.65rem] text-subtle">
            Custom amount
          </div>

          <div className="mt-4 flex h-9 items-center justify-center rounded-full bg-fg text-[0.75rem] font-medium text-ink">
            Continue to payment
          </div>
          <p className="mt-2.5 text-center font-mono text-[0.55rem] tracking-[0.08em] text-subtle">
            Secured by Razorpay · UPI available
          </p>
        </div>
      </div>
    </VisualFrame>
  )
}
