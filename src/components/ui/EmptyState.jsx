import { Inbox } from 'lucide-react';

/** Friendly message for empty lists and missing content. */
export default function EmptyState({ icon: Icon = Inbox, title = 'Nothing here yet', text, action, as: Heading = 'h3' }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-beige-dark bg-white/60 px-6 py-16 text-center">
      <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-cream text-gold-dark">
        <Icon className="h-7 w-7" aria-hidden="true" />
      </span>
      <Heading className="text-2xl">{title}</Heading>
      {text && <p className="mt-2 max-w-sm text-stone">{text}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
