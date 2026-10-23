import { Star } from 'lucide-react';

export default function Rating({ value, max = 5, size = 'h-4 w-4' }) {
  return (
    <div className="flex items-center gap-0.5" role="img" aria-label={`Rated ${value} out of ${max}`}>
      {Array.from({ length: max }).map((_, i) => (
        <Star key={i} className={`${size} ${i < value ? 'fill-gold text-gold' : 'fill-beige text-beige'}`} aria-hidden="true" />
      ))}
    </div>
  );
}
