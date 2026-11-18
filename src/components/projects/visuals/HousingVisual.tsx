import { VisualFrame } from './VisualFrame'

// The eight inputs the Streamlit app actually takes, in model order.
const features = ['MedInc', 'HouseAge', 'AveRooms', 'AveBedrms', 'Population', 'AveOccup', 'Latitude', 'Longitude']

export function HousingVisual() {
  const rowH = 30
  const top = 34
  const midY = top + (features.length * rowH) / 2 - rowH / 2 + 6
  return (
    <VisualFrame
      file="housing / app.py"
      label="Eight California Housing features are scaled and passed through an XGBoost regressor to produce a price estimate."
    >
      <svg viewBox="0 0 560 300" className="block h-full w-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <pattern id="hv-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0H0V20" fill="none" stroke="#fff" strokeOpacity="0.035" />
          </pattern>
          <linearGradient id="hv-out" x1="0" x2="1">
            <stop offset="0" stopColor="#8c7bff" stopOpacity="0.25" />
            <stop offset="1" stopColor="#8c7bff" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <rect width="560" height="300" fill="url(#hv-grid)" />

        {/* feature inputs */}
        {features.map((f, i) => {
          const y = top + i * rowH
          return (
            <g key={f}>
              <rect x="22" y={y} width="118" height="22" rx="3" fill="#18181c" stroke="#fff" strokeOpacity="0.1" />
              <text x="32" y={y + 14.5} fontSize="10" className="fill-[#9b9ba5] font-mono">
                {f}
              </text>
              <path
                d={`M140 ${y + 11} C 180 ${y + 11}, 180 ${midY + 6}, 214 ${midY + 6}`}
                fill="none"
                stroke="#a99bff"
                strokeOpacity={i % 3 === 0 ? 0.6 : 0.16}
                className={i % 3 === 0 ? 'flow' : undefined}
                style={{ animationDelay: `${-i * 0.35}s` }}
              />
            </g>
          )
        })}

        {/* scaler */}
        <rect x="214" y={midY - 14} width="70" height="40" rx="4" fill="#111113" stroke="#fff" strokeOpacity="0.2" />
        <text x="249" y={midY + 4} textAnchor="middle" fontSize="10" className="fill-[#ededef] font-mono">
          scaler
        </text>
        <text x="249" y={midY + 17} textAnchor="middle" fontSize="8" className="fill-[#6e6e78] font-mono">
          transform
        </text>
        <path d={`M284 ${midY + 6} H318`} stroke="#a99bff" strokeOpacity="0.6" className="flow" />

        {/* boosted trees */}
        <g transform={`translate(318 ${midY - 58})`}>
          <rect width="128" height="128" rx="6" fill="#111113" stroke="#8c7bff" strokeOpacity="0.55" />
          <text x="64" y="20" textAnchor="middle" fontSize="10" className="fill-[#ededef] font-mono">
            XGBoost
          </text>
          {[0, 1, 2].map((t) => {
            const ox = 22 + t * 42
            return (
              <g key={t} opacity={1 - t * 0.22}>
                <circle cx={ox} cy="44" r="5" fill="#a99bff" />
                <path d={`M${ox} 49 L${ox - 10} 70 M${ox} 49 L${ox + 10} 70`} stroke="#a99bff" strokeOpacity="0.6" />
                <circle cx={ox - 10} cy="73" r="4" fill="#18181c" stroke="#a99bff" />
                <circle cx={ox + 10} cy="73" r="4" fill="#18181c" stroke="#a99bff" />
                <path
                  d={`M${ox - 10} 77 L${ox - 15} 94 M${ox - 10} 77 L${ox - 5} 94 M${ox + 10} 77 L${ox + 15} 94`}
                  stroke="#fff"
                  strokeOpacity="0.2"
                />
              </g>
            )
          })}
          <text x="64" y="116" textAnchor="middle" fontSize="8" className="fill-[#6e6e78] font-mono">
            GridSearchCV-tuned
          </text>
        </g>
        <path d={`M446 ${midY + 6} H474`} stroke="#a99bff" strokeOpacity="0.6" className="flow" />

        {/* output */}
        <rect x="474" y={midY - 18} width="66" height="48" rx="4" fill="url(#hv-out)" stroke="#8c7bff" strokeOpacity="0.5" />
        <text x="507" y={midY + 4} textAnchor="middle" fontSize="15" className="fill-[#ededef]" fontWeight="500">
          $
        </text>
        <text x="507" y={midY + 20} textAnchor="middle" fontSize="8" className="fill-[#9b9ba5] font-mono">
          estimate
        </text>

        <text x="22" y="290" fontSize="8.5" className="fill-[#6e6e78] font-mono" letterSpacing="0.6">
          CALIFORNIA HOUSING · 8 FEATURES → 1 TARGET
        </text>
      </svg>
    </VisualFrame>
  )
}
