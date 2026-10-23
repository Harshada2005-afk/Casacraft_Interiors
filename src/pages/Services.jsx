import { Check, ArrowRight } from 'lucide-react';
import Hero from '../components/ui/Hero';
import SectionTitle from '../components/ui/SectionTitle';
import Reveal from '../components/ui/Reveal';
import ImageReveal from '../components/ui/ImageReveal';
import Button from '../components/ui/Button';
import CTASection from '../components/ui/CTASection';
import { services } from '../data/services';
import { designProcess } from '../data/site';
import { getIcon } from '../utils/icons';
import { img } from '../utils/image';
import usePageTitle from '../hooks/usePageTitle';

export default function Services() {
  usePageTitle('Services');

  return (
    <>
      <Hero
        image={img('kitchenIsland', 2400)}
        eyebrow="Our Services"
        title="Everything you need for a beautifully finished space"
        subtitle="Design, visualization and turnkey execution, all handled by one dedicated team."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Services' }]}
      />

      {/* Quick jump navigation */}
      <nav aria-label="Services" className="sticky top-[68px] z-30 border-b border-beige bg-ivory/90 backdrop-blur-lg">
        <ul className="container-lux scrollbar-thin flex gap-2 overflow-x-auto py-3">
          {services.map((s) => (
            <li key={s.id} className="shrink-0">
              <a
                href={`#${s.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="block rounded-full border border-beige-dark px-4 py-2 text-sm text-charcoal-light transition hover:border-gold hover:bg-gold hover:text-white"
              >
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="section space-y-24 md:space-y-32">
        {services.map((service, i) => {
          const Icon = getIcon(service.icon);
          const reversed = i % 2 === 1;
          return (
            <section key={service.id} id={service.id} className="container-lux scroll-mt-40" aria-labelledby={`${service.id}-title`}>
              <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <div className={`relative ${reversed ? 'lg:order-2' : ''}`}>
                  <ImageReveal
                    src={service.image}
                    alt={`${service.title} by CasaCraft Interiors`}
                    className="aspect-[4/3] rounded-[2rem]"
                  />
                  <span className="absolute -bottom-5 left-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-charcoal text-gold-light shadow-lift">
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </span>
                </div>
                <Reveal delay={120}>
                  <p className="eyebrow">Service 0{i + 1}</p>
                  <h2 id={`${service.id}-title`} className="mt-3 text-4xl sm:text-5xl">
                    {service.title}
                  </h2>
                  <p className="mt-5 text-lg leading-relaxed text-stone">{service.description}</p>
                  <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-charcoal-light">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold-dark">
                          <Check className="h-3 w-3" aria-hidden="true" />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-10 flex flex-wrap items-center gap-6">
                    <Button to={`/consultation?service=${encodeURIComponent(service.title)}`} icon={ArrowRight}>
                      Get Started
                    </Button>
                    <p className="text-sm text-stone">
                      Starting from <span className="font-serif text-xl text-charcoal">{service.startingPrice}</span>
                    </p>
                  </div>
                </Reveal>
              </div>
            </section>
          );
        })}
      </div>

      {/* Process recap */}
      <section className="section bg-cream">
        <div className="container-lux">
          <SectionTitle eyebrow="How It Works" title="A simple, transparent process" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {designProcess.map((s, i) => {
              const Icon = getIcon(s.icon);
              return (
                <Reveal key={s.step} delay={i * 100} className="rounded-3xl bg-white p-8 shadow-soft">
                  <div className="flex items-center justify-between">
                    <Icon className="h-7 w-7 text-gold-dark" aria-hidden="true" />
                    <span className="font-serif text-4xl text-beige-dark">{s.step}</span>
                  </div>
                  <h3 className="mt-6 text-2xl">{s.title}</h3>
                  <p className="mt-2 text-stone">{s.text}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
