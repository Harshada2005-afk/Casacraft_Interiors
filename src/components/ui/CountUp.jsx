import { useEffect, useState } from 'react';
import useInView from '../../hooks/useInView';

/** Animates a number from 0 to `end` once it scrolls into view. */
export default function CountUp({ end, suffix = '', duration = 1600 }) {
  const [ref, visible] = useInView({ threshold: 0.4 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!visible) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(end);
      return undefined;
    }
    let frame;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setValue(Math.round(end * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [visible, end, duration]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}
