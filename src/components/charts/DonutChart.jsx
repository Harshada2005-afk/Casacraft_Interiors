const COLORS = ['#262523', '#B8955E', '#8C877F', '#E3CFA8', '#D8CBB6'];

/** SVG donut chart with legend. data = [{ label, value }] */
export default function DonutChart({ data, title }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const r = 15.9155; // circumference = 100, so dash values map to percentages
  let offset = 25;

  return (
    <figure className="flex flex-col items-center gap-6 sm:flex-row lg:flex-col 2xl:flex-row">
      <div className="relative h-40 w-40 shrink-0">
        <svg viewBox="0 0 42 42" className="h-full w-full" role="img" aria-label={title}>
          <circle cx="21" cy="21" r={r} fill="none" stroke="#F4EFE7" strokeWidth="5" />
          {data.map((d, i) => {
            const pct = (d.value / total) * 100;
            const el = (
              <circle
                key={d.label}
                cx="21"
                cy="21"
                r={r}
                fill="none"
                stroke={COLORS[i % COLORS.length]}
                strokeWidth="5"
                strokeDasharray={`${pct} ${100 - pct}`}
                strokeDashoffset={offset}
              >
                <title>{`${d.label}: ${d.value}`}</title>
              </circle>
            );
            offset -= pct;
            return el;
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-serif text-3xl">{total}</span>
          <span className="text-xs text-stone">Projects</span>
        </div>
      </div>
      <ul className="w-full min-w-0 flex-1 space-y-2 text-sm">
        {data.map((d, i) => (
          <li key={d.label} className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-2 text-charcoal-light">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} aria-hidden="true" />
              {d.label}
            </span>
            <span className="text-stone">{Math.round((d.value / total) * 100)}%</span>
          </li>
        ))}
      </ul>
    </figure>
  );
}
