import { ArrowRight, Check } from 'lucide-react';
import Hero from '../components/ui/Hero';
import Reveal from '../components/ui/Reveal';
import ImageReveal from '../components/ui/ImageReveal';
import ColorPalette from '../components/ui/ColorPalette';
import Button from '../components/ui/Button';
import CTASection from '../components/ui/CTASection';
import { designStyles } from '../data/designStyles';
import { img } from '../utils/image';
import usePageTitle from '../hooks/usePageTitle';

export default function DesignStyles() {
  usePageTitle('Design Styles');

  return (
    <>
      <Hero
        image={img('livingCalm', 2400)}
        eyebrow="Design Styles"
        title="Discover the style that feels like home"
        subtitle="Six design languages we love, and how we tailor each one to your life."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Design Styles' }]}
      />

      {/* Style index */}
      <nav aria-label="Design styles" className="border-b border-beige">
        <ul className="container-lux grid grid-cols-3 gap-px py-6 text-center sm:grid-cols-6">
          {designStyles.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="block rounded-xl px-2 py-3 font-serif text-xl text-charcoal-light transition hover:bg-cream hover:text-gold-dark"
              >
                {s.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {designStyles.map((style, i) => {
        const reversed = i % 2 === 1;
        return (
          <section
            key={style.id}
            id={style.id}
            className={`section scroll-mt-20 ${i % 2 ? 'bg-cream' : ''}`}
            aria-labelledby={`${style.id}-heading`}
          >
            <div className="container-lux grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
              <div className={`lg:col-span-7 ${reversed ? 'lg:order-2' : ''}`}>
                <ImageReveal
                  src={style.image}
                  alt={`${style.name} interior design example`}
                  className="aspect-[4/3] rounded-[2rem] lg:aspect-[5/4]"
                />
              </div>
              <Reveal className="lg:col-span-5" delay={120}>
                <p className="eyebrow">
                  0{i + 1} · {style.tagline}
                </p>
                <h2 id={`${style.id}-heading`} className="mt-3 text-5xl sm:text-6xl">
                  {style.name}
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-stone">{style.description}</p>

                <h3 className="mt-8 font-sans text-sm font-medium uppercase tracking-[0.2em] text-charcoal">Key Characteristics</h3>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {style.characteristics.map((c) => (
                    <li key={c} className="flex items-start gap-2 text-charcoal-light">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden="true" /> {c}
                    </li>
                  ))}
                </ul>

                <h3 className="mt-8 font-sans text-sm font-medium uppercase tracking-[0.2em] text-charcoal">Color Palette</h3>
                <div className="mt-4">
                  <ColorPalette colors={style.palette} />
                </div>

                <h3 className="mt-8 font-sans text-sm font-medium uppercase tracking-[0.2em] text-charcoal">Popular Materials</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {style.materials.map((m) => (
                    <li key={m} className="rounded-full border border-beige-dark bg-white px-4 py-1.5 text-sm text-charcoal-light">
                      {m}
                    </li>
                  ))}
                </ul>

                <Button to={`/consultation?style=${style.name}`} className="mt-10" icon={ArrowRight}>
                  I love this style
                </Button>
              </Reveal>
            </div>
          </section>
        );
      })}

      <CTASection
        title="Not sure which style is yours?"
        text="Our designers will help you discover a look that blends your taste, lifestyle and space."
      />
    </>
  );
}
