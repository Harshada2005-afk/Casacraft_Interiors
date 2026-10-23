import { Star } from 'lucide-react';
import Hero from '../components/ui/Hero';
import Reveal from '../components/ui/Reveal';
import Loading from '../components/ui/Loading';
import Rating from '../components/ui/Rating';
import SmartImage from '../components/ui/SmartImage';
import CTASection from '../components/ui/CTASection';
import TestimonialCard from '../components/cards/TestimonialCard';
import { getTestimonials } from '../services/api';
import useFetch from '../hooks/useFetch';
import { img } from '../utils/image';
import usePageTitle from '../hooks/usePageTitle';

export default function Testimonials() {
  usePageTitle('Testimonials');
  const { data: reviews, loading } = useFetch(getTestimonials);

  const average = reviews ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : '–';
  const [featured, ...rest] = reviews || [];

  return (
    <>
      <Hero
        image={img('livingClassic', 2400)}
        eyebrow="Testimonials"
        title="Kind words from the people we design for"
        subtitle="Nothing makes us happier than a client who loves coming home."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Testimonials' }]}
      />

      <section className="section">
        <div className="container-lux">
          {/* Summary */}
          <Reveal className="grid gap-8 rounded-[2rem] bg-white p-8 shadow-soft md:grid-cols-3 md:p-12">
            <div className="text-center md:border-r md:border-beige">
              <p className="font-serif text-7xl text-charcoal">{average}</p>
              <div className="mt-2 flex justify-center">
                <Rating value={Math.round(Number(average) || 5)} size="h-5 w-5" />
              </div>
              <p className="mt-2 text-sm text-stone">Average rating</p>
            </div>
            <div className="text-center md:border-r md:border-beige">
              <p className="font-serif text-7xl text-charcoal">100+</p>
              <p className="mt-4 text-sm text-stone">Happy clients across India</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-7xl text-charcoal">98%</p>
              <p className="mt-4 text-sm text-stone">Would recommend us to a friend</p>
            </div>
          </Reveal>

          {loading && (
            <div className="mt-14">
              <Loading variant="cards" count={3} label="Loading reviews" />
            </div>
          )}

          {featured && (
            <Reveal className="mt-16 grid items-center gap-10 overflow-hidden rounded-[2rem] bg-charcoal p-8 text-ivory md:grid-cols-5 md:p-14">
              <SmartImage
                src={featured.image.replace('w=200', 'w=600')}
                alt={`Portrait of ${featured.name}`}
                className="mx-auto aspect-square w-40 rounded-full md:col-span-2 md:w-64"
              />
              <figure className="md:col-span-3">
                <div className="flex gap-1">
                  {Array.from({ length: featured.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-gold text-gold" aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="mt-6 font-serif text-3xl leading-snug text-white md:text-4xl">“{featured.review}”</blockquote>
                <figcaption className="mt-8">
                  <p className="font-medium text-white">{featured.name}</p>
                  <p className="text-sm text-gold-light">
                    {featured.projectType} · {featured.location}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          )}

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((t, i) => (
              <Reveal key={t.id} delay={(i % 3) * 100}>
                <TestimonialCard testimonial={t} showProjectType />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection title="Become our next happy client" />
    </>
  );
}
