import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getIcon } from '../../utils/icons';

/** Service teaser card with icon, title, description and "Learn More" link. */
export default function ServiceCard({ service }) {
  const Icon = getIcon(service.icon);
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-beige bg-white p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-transparent hover:shadow-lift">
      <span
        className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100"
        aria-hidden="true"
      />
      <span className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-cream text-gold-dark transition-all duration-500 group-hover:bg-charcoal group-hover:text-gold-light">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
      <h3 className="text-2xl">{service.title}</h3>
      <p className="mt-3 flex-1 leading-relaxed text-stone">{service.short}</p>
      <Link
        to={`/services#${service.id}`}
        className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-charcoal transition-colors hover:text-gold-dark"
        aria-label={`Learn more about ${service.title}`}
      >
        Learn More
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
      </Link>
    </article>
  );
}
