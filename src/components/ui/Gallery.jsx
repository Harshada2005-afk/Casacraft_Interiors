import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Expand } from 'lucide-react';
import Modal from './Modal';
import SmartImage from './SmartImage';

/** Editorial image grid with a keyboard-friendly lightbox. */
export default function Gallery({ images = [], title = 'Gallery image' }) {
  const [active, setActive] = useState(null);
  const open = active !== null;
  const go = (dir) => setActive((i) => (i + dir + images.length) % images.length);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const layout = ['md:col-span-2 md:row-span-2', '', '', 'md:col-span-2'];

  return (
    <>
      <div className="grid auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-2 md:auto-rows-[240px] md:grid-cols-4">
        {images.map((src, i) => (
          <button
            key={`${src}-${i}`}
            type="button"
            onClick={() => setActive(i)}
            className={`group relative overflow-hidden rounded-3xl ${layout[i % layout.length]}`}
            aria-label={`Open ${title} ${i + 1} of ${images.length}`}
          >
            <SmartImage
              src={src}
              alt={`${title} ${i + 1}`}
              className="h-full w-full"
              imgClassName="transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-charcoal/0 transition-colors duration-300 group-hover:bg-charcoal/30">
              <Expand className="h-7 w-7 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
            </span>
          </button>
        ))}
      </div>

      <Modal open={open} onClose={() => setActive(null)} size="xl">
        {open && (
          <div className="relative bg-charcoal">
            <img src={images[active]} alt={`${title} ${active + 1}`} className="max-h-[80vh] w-full object-contain" />
            {images.length > 1 && (
              <>
                <button
                  onClick={() => go(-1)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-soft transition hover:bg-white"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => go(1)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-soft transition hover:bg-white"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
            <p className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-charcoal/70 px-3 py-1 text-xs text-white">
              {active + 1} / {images.length}
            </p>
          </div>
        )}
      </Modal>
    </>
  );
}
