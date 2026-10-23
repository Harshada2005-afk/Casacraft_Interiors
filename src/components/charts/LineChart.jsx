/** Smooth area/line chart in plain SVG. data = [{ label, value }] */
export default function LineChart({ data, title, prefix = '', suffix = '' }) {
  const W = 100;
  const H = 40;
  const max = Math.max(...data.map((d) => d.value)) * 1.15;
  const min = 0;
  const pts = data.map((d, i) => [(i / (data.length - 1)) * W, H - ((d.value - min) / (max - min)) * H]);
  const line = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(2)},${y.toFixed(2)}`).join(' ');
  const area = `${line} L${W},${H} L0,${H} Z`;

  return (
    <figure>
      <svg viewBox={`0 -4 ${W} ${H + 6}`} className="h-auto w-full overflow-visible" role="img" aria-label={title}>
        <defs>
          <linearGradient id="lineFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#B8955E" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#B8955E" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((g) => (
          <line key={g} x1="0" x2={W} y1={H * g} y2={H * g} stroke="#E9E0D2" strokeWidth="0.15" />
        ))}
        <path d={area} fill="url(#lineFill)" />
        <path d={line} fill="none" stroke="#B8955E" strokeWidth="0.6" strokeLinejoin="round" strokeLinecap="round" />
        {pts.map(([x, y], i) => (
          <circle key={data[i].label} cx={x} cy={y} r="1" fill="#fff" stroke="#9A7A47" strokeWidth="0.5">
            <title>{`${data[i].label}: ${prefix}${data[i].value}${suffix}`}</title>
          </circle>
        ))}
      </svg>
      <div className="mt-3 flex justify-between text-xs text-stone">
        {data.map((d) => (
          <span key={d.label}>{d.label}</span>
        ))}
      </div>
    </figure>
  );
}
