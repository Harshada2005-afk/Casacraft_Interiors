import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

/** Accessible modal dialog: closes on Escape, overlay click or the X button. */
export default function Modal({ open, onClose, title, children, size = 'md', footer }) {
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panelRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  const widths = { sm: 'max-w-md', md: 'max-w-xl', lg: 'max-w-3xl', xl: 'max-w-5xl' };

  return createPortal(
    <div className="fixed inset-0 z-[90] flex items-end justify-center p-0 sm:items-center sm:p-6" role="presentation">
      <div className="absolute inset-0 animate-fade-in bg-charcoal/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className={`relative max-h-[92vh] w-full ${widths[size]} animate-fade-up overflow-y-auto rounded-t-3xl bg-ivory shadow-lift outline-none sm:rounded-3xl`}
      >
        {title && (
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-beige bg-ivory/95 px-6 py-4 backdrop-blur">
            <h2 className="text-2xl">{title}</h2>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-stone transition hover:bg-beige hover:text-charcoal"
              aria-label="Close dialog"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
        {!title && (
          <button
            onClick={onClose}
            className="absolute right-3 top-3 z-10 rounded-full bg-white/90 p-2 text-charcoal shadow-soft transition hover:bg-white"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" />
          </button>
        )}
        <div className={title ? 'p-6' : ''}>{children}</div>
        {footer && <div className="flex flex-wrap justify-end gap-3 border-t border-beige px-6 py-4">{footer}</div>}
      </div>
    </div>,
    document.body,
  );
}
