import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin } from 'lucide-react';
import SmartImage from '../ui/SmartImage';

/** Portfolio project card. `tall` gives a taller image for masonry layouts. */
export default function ProjectCard({ project, tall = false, showButton = true }) {
  return (
    <article className="group overflow-hidden rounded-3xl bg-white shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift">
      <Link to={`/portfolio/${project.id}`} className="block" aria-label={`View project: ${project.title}`}>
        <div className="relative">
          <SmartImage
            src={project.image}
            alt={`${project.title} – ${project.style} ${project.category.toLowerCase()} in ${project.location}`}
            className={tall ? 'aspect-[3/4]' : 'aspect-[4/3]'}
            imgClassName="transition-transform duration-[1.2s] ease-out group-hover:scale-105"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            aria-hidden="true"
          />
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-charcoal backdrop-blur">
            {project.category}
          </span>
          <span
            className="absolute bottom-4 right-4 flex h-11 w-11 translate-y-3 items-center justify-center rounded-full bg-gold text-white opacity-0 shadow-lift transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
            aria-hidden="true"
          >
            <ArrowUpRight className="h-5 w-5" />
          </span>
        </div>
      </Link>
      <div className="p-6">
        <p className="eyebrow mb-2 text-[11px]">{project.style}</p>
        <h3 className="text-2xl leading-snug">
          <Link to={`/portfolio/${project.id}`} className="transition-colors hover:text-gold-dark">
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-stone">
          <MapPin className="h-4 w-4 text-gold" aria-hidden="true" />
          {project.location}
        </p>
        {showButton && (
          <Link
            to={`/portfolio/${project.id}`}
            className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-charcoal transition-colors hover:text-gold-dark"
            tabIndex={-1}
            aria-hidden="true"
          >
            View Project
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>
    </article>
  );
}
