const colors = {
  Pending: 'bg-amber-50 text-amber-700 ring-amber-200',
  Contacted: 'bg-sky-50 text-sky-700 ring-sky-200',
  Scheduled: 'bg-violet-50 text-violet-700 ring-violet-200',
  Completed: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  Cancelled: 'bg-rose-50 text-rose-700 ring-rose-200',
  'In Progress': 'bg-sky-50 text-sky-700 ring-sky-200',
  'Design Phase': 'bg-violet-50 text-violet-700 ring-violet-200',
  Planning: 'bg-amber-50 text-amber-700 ring-amber-200',
  'On Hold': 'bg-stone-light/20 text-charcoal-soft ring-stone-light/60',
  Active: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
};

/** Colour-coded pill for statuses. */
export default function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${colors[status] || colors['On Hold']}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
      {status}
    </span>
  );
}
