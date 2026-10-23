import { Quote } from 'lucide-react';
import Rating from '../ui/Rating';
import SmartImage from '../ui/SmartImage';

export default function TestimonialCard({ testimonial, showProjectType = false }) {
  const { name, location, rating, review, image, projectType } = testimonial;
  return (
    <figure className="relative flex h-full flex-col rounded-3xl bg-white p-8 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift">
      <Quote className="absolute right-7 top-7 h-10 w-10 text-beige" aria-hidden="true" />
      <Rating value={rating} />
      {showProjectType && <p className="eyebrow mt-4 text-[11px]">{projectType}</p>}
      <blockquote className="mt-5 flex-1 font-serif text-xl leading-relaxed text-charcoal-light">“{review}”</blockquote>
      <figcaption className="mt-8 flex items-center gap-4 border-t border-beige pt-6">
        <SmartImage src={image} alt={`Portrait of ${name}`} className="h-12 w-12 shrink-0 rounded-full" />
        <div>
          <p className="font-medium text-charcoal">{name}</p>
          <p className="text-sm text-stone">{location}</p>
        </div>
      </figcaption>
    </figure>
  );
}
