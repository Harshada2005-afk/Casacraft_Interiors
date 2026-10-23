import { useState } from 'react';
import { MoveHorizontal } from 'lucide-react';

/** Drag (or use the keyboard on) the slider to compare before & after. */
export default function BeforeAfter({ before, after, alt = 'Project' }) {
  const [pos, setPos] = useState(50);

  return (
    <div className="relative aspect-[16/10] w-full select-none overflow-hidden rounded-3xl bg-beige shadow-soft">
      <img src={after} alt={`${alt} – after`} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img
          src={before}
          alt={`${alt} – before`}
          className="absolute inset-0 h-full w-full object-cover grayscale-[60%] sepia-[20%]"
          loading="lazy"
        />
      </div>

      <span className="absolute left-4 top-4 rounded-full bg-charcoal/70 px-3 py-1 text-xs uppercase tracking-widest text-white backdrop-blur">
        Before
      </span>
      <span className="absolute right-4 top-4 rounded-full bg-gold/90 px-3 py-1 text-xs uppercase tracking-widest text-white backdrop-blur">
        After
      </span>

      <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }} aria-hidden="true">
        <div className="absolute inset-y-0 -translate-x-1/2 border-l-2 border-white/90" />
        <div className="absolute top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-charcoal shadow-lift">
          <MoveHorizontal className="h-5 w-5" />
        </div>
      </div>

      <input
        type="range"
        min="0"
        max="100"
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        aria-label="Compare before and after"
      />
    </div>
  );
}
