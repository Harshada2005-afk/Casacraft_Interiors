import { CircleCheck, AlertCircle, Info, X } from 'lucide-react';

const styles = {
  success: { icon: CircleCheck, accent: 'text-emerald-600' },
  error: { icon: AlertCircle, accent: 'text-red-600' },
  info: { icon: Info, accent: 'text-gold-dark' },
};

/** A single toast notification. Rendered by ToastProvider. */
export default function Toast({ message, type = 'success', onClose }) {
  const { icon: Icon, accent } = styles[type] || styles.info;
  return (
    <div
      className="pointer-events-auto flex animate-slide-in items-start gap-3 rounded-2xl border border-beige bg-white p-4 shadow-lift"
      role="status"
    >
      <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${accent}`} aria-hidden="true" />
      <p className="flex-1 text-sm text-charcoal">{message}</p>
      <button
        onClick={onClose}
        className="rounded-full p-1 text-stone transition hover:bg-cream hover:text-charcoal"
        aria-label="Dismiss notification"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
