import { ArrowRight } from 'lucide-react';
import Button from './Button';
import Reveal from './Reveal';
import { img } from '../../utils/image';

/** Dark, image-backed call to action used at the end of most pages. */
export default function CTASection({
  title = 'Ready to Transform Your Space?',
  text = "Let's create a space that reflects your personality, lifestyle and dreams.",
  buttonLabel = 'Book a Consultation',
  to = '/consultation',
  image = img('livingCalm', 2000),
}) {
  return (
    <section className="container-lux py-20 md:py-28">
      <Reveal className="relative isolate overflow-hidden rounded-[2rem] bg-charcoal px-6 py-20 text-center sm:px-12 md:py-28">
        <img
          src={image}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-charcoal/90 via-charcoal/70 to-gold-dark/40" aria-hidden="true" />
        <p className="eyebrow mb-5 text-gold-light">Let’s begin</p>
        <h2 className="mx-auto max-w-3xl text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">{title}</h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-white/75">{text}</p>
        <div className="mt-10 flex justify-center">
          <Button to={to} variant="gold" size="lg" icon={ArrowRight}>
            {buttonLabel}
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
