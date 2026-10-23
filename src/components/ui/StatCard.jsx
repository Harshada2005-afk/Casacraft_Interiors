import { getIcon } from '../../utils/icons';
import { formatNumber } from '../../utils/format';

/** Dashboard metric card. `icon` is an icon name from utils/icons.js. */
export default function StatCard({ label, value, icon, trend, highlight = false }) {
  const Icon = getIcon(icon);
  return (
    <div
      className={`group rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift ${
        highlight ? 'bg-charcoal text-ivory' : 'bg-white shadow-soft'
      }`}
    >
      <div className="flex items-start justify-between">
        <p className={`min-w-0 text-sm ${highlight ? 'text-white/70' : 'text-stone'}`}>{label}</p>
        <span
          className={`flex h-11 w-11 items-center justify-center rounded-2xl transition-colors ${
            highlight ? 'bg-white/10 text-gold-light' : 'bg-cream text-gold-dark group-hover:bg-gold group-hover:text-white'
          }`}
        >
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
      </div>
      <p className="mt-4 font-serif text-4xl">{formatNumber(value)}</p>
      {trend && <p className={`mt-2 text-xs ${highlight ? 'text-gold-light' : 'text-gold-dark'}`}>{trend}</p>}
    </div>
  );
}
