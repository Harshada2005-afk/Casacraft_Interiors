/** Loading indicator: a centered spinner, or a skeleton grid for card lists. */
export default function Loading({ label = 'Loading…', variant = 'spinner', count = 6 }) {
  if (variant === 'cards') {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true" aria-label={label}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-3xl bg-white shadow-soft">
            <div className="aspect-[4/3] animate-pulse bg-beige" />
            <div className="space-y-3 p-6">
              <div className="h-3 w-1/3 animate-pulse rounded bg-beige" />
              <div className="h-5 w-3/4 animate-pulse rounded bg-beige" />
              <div className="h-3 w-1/2 animate-pulse rounded bg-beige" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20" role="status">
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 rounded-full border-2 border-beige" />
        <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-gold" />
      </div>
      <p className="text-sm tracking-wide text-stone">{label}</p>
    </div>
  );
}
