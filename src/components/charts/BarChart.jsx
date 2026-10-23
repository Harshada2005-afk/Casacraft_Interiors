/** Lightweight, dependency-free SVG bar chart. data = [{ label, value }] */
export default function BarChart({ data, title }) {
  const H = 38; // chart height in viewBox units (width is 100)
  const max = Math.max(...data.map((d) => d.value)) * 1.15;
  const barWidth = 100 / data.length;

  return (
    <figure>
      <svg viewBox={`0 0 100 ${H}`} className="h-auto w-full overflow-visible" role="img" aria-label={title}>
        {[0.25, 0.5, 0.75, 1].map((g) => (
          <line key={g} x1="0" x2="100" y1={H * (1 - g)} y2={H * (1 - g)} stroke="#E9E0D2" strokeWidth="0.15" />
        ))}
        {data.map((d, i) => {
          const h = (d.value / max) * H;
          const x = i * barWidth + barWidth * 0.22;
          const w = barWidth * 0.56;
          const isLast = i === data.length - 1;
          return (
            <g key={d.label}>
              <rect x={x} y={H - h} width={w} height={h} rx="1.2" fill={isLast ? '#B8955E' : '#262523'} opacity={isLast ? 1 : 0.85}>
                <title>{`${d.label}: ${d.value}`}</title>
              </rect>
              <text x={x + w / 2} y={H - h - 1.5} textAnchor="middle" fontSize="2.6" fill="#55524D">
                {d.value}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="mt-3 grid text-center text-xs text-stone" style={{ gridTemplateColumns: `repeat(${data.length}, 1fr)` }}>
        {data.map((d) => (
          <span key={d.label}>{d.label}</span>
        ))}
      </div>
    </figure>
  );
}
