import { ArrowRight, Check } from 'lucide-react';
import Hero from '../components/ui/Hero';
import SectionTitle from '../components/ui/SectionTitle';
import Reveal from '../components/ui/Reveal';
import ImageReveal from '../components/ui/ImageReveal';
import SmartImage from '../components/ui/SmartImage';
import CountUp from '../components/ui/CountUp';
import Button from '../components/ui/Button';
import CTASection from '../components/ui/CTASection';
import { aboutContent, stats, whyChooseUs } from '../data/site';
import { getIcon } from '../utils/icons';
import { img, unsplash } from '../utils/image';
import usePageTitle from '../hooks/usePageTitle';

export default function About() {
  usePageTitle('About Us');
  const { story, philosophy, mission, approach, team } = aboutContent;

  return (
    <>
      <Hero
        image={aboutContent.heroImage}
        eyebrow="About CasaCraft"
        title="Designing homes with heart since 2015"
        subtitle="A boutique studio driven by curiosity, craft and a deep respect for the way people live."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'About' }]}
      />

      {/* Our Story */}
      <section className="section">
        <div className="container-lux grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionTitle align="left" eyebrow="Our Story" title="From a kitchen table to 150+ beautiful spaces" />
            <Reveal delay={100} className="mt-6 space-y-5 text-lg leading-relaxed text-stone">
              {story.map((p) => (
                <p key={p.slice(0, 20)}>{p}</p>
              ))}
            </Reveal>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <ImageReveal src={aboutContent.storyImage} alt="Designer reviewing architectural plans" className="aspect-[3/4] rounded-3xl" />
            <ImageReveal src={img('dining', 900)} alt="Elegant dining area" className="mt-12 aspect-[3/4] rounded-3xl" />
          </div>
        </div>
      </section>

      {/* Philosophy & Mission */}
      <section className="section bg-cream">
        <div className="container-lux grid gap-8 lg:grid-cols-2">
          <Reveal className="relative overflow-hidden rounded-[2rem] bg-white p-10 shadow-soft md:p-14">
            <p className="eyebrow">Our Philosophy</p>
            <h2 className="mt-4 text-4xl">Timeless over trendy.</h2>
            <p className="mt-6 text-lg leading-relaxed text-stone">{philosophy}</p>
          </Reveal>
          <Reveal delay={150} className="relative overflow-hidden rounded-[2rem] bg-charcoal p-10 text-ivory shadow-soft md:p-14">
            <img
              src={aboutContent.philosophyImage}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-20"
            />
            <div className="relative">
              <p className="eyebrow text-gold-light">Our Mission</p>
              <h2 className="mt-4 text-4xl text-white">Spaces that improve everyday life.</h2>
              <p className="mt-6 text-lg leading-relaxed text-white/75">{mission}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Design Approach */}
      <section className="section">
        <div className="container-lux">
          <SectionTitle
            eyebrow="Our Design Approach"
            title="How we bring ideas to life"
            subtitle="Four principles guide every project, whatever its size."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {approach.map((a, i) => (
              <Reveal key={a.title} delay={i * 120}>
                <div className="h-full rounded-3xl border border-beige p-8 transition-all duration-500 hover:-translate-y-1 hover:border-gold/60 hover:bg-white hover:shadow-soft">
                  <span className="font-serif text-5xl text-gold/70">0{i + 1}</span>
                  <h3 className="mt-4 text-2xl">{a.title}</h3>
                  <p className="mt-3 leading-relaxed text-stone">{a.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="relative overflow-hidden bg-charcoal py-20">
        <img
          src={img('livingLoft', 2000)}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="container-lux relative grid grid-cols-2 gap-10 text-center lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 100}>
              <p className="font-serif text-6xl text-gold-light md:text-7xl">
                <CountUp end={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-3 text-sm uppercase tracking-[0.2em] text-white/70">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section">
        <div className="container-lux grid items-center gap-14 lg:grid-cols-2">
          <ImageReveal
            src={img('bedroomHotel', 1200)}
            alt="Calm, luxurious bedroom designed by CasaCraft"
            className="order-2 aspect-[4/3] rounded-[2rem] lg:order-1"
          />
          <div className="order-1 lg:order-2">
            <SectionTitle align="left" eyebrow="Why Choose Us" title="A partner you can trust with your home" />
            <ul className="mt-8 space-y-6">
              {whyChooseUs.map((item, i) => {
                const Icon = getIcon(item.icon);
                return (
                  <Reveal as="li" key={item.title} delay={i * 100} className="flex gap-5">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cream text-gold-dark">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-xl">{item.title}</h3>
                      <p className="mt-1 text-stone">{item.text}</p>
                    </div>
                  </Reveal>
                );
              })}
            </ul>
            <Reveal className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-charcoal-light">
              {['Transparent pricing', 'Dedicated project manager', '1-year service warranty'].map((t) => (
                <span key={t} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-gold" aria-hidden="true" /> {t}
                </span>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section bg-cream">
        <div className="container-lux">
          <SectionTitle eyebrow="The Studio" title="Meet the people behind the designs" />
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={i * 120} className="group text-center">
                <SmartImage
                  src={unsplash(m.image, 700)}
                  alt={`Portrait of ${m.name}`}
                  className="aspect-[4/5] rounded-3xl"
                  imgClassName="grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
                <h3 className="mt-6 text-2xl">{m.name}</h3>
                <p className="mt-1 text-sm text-stone">{m.role}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-14 text-center">
            <Button to="/portfolio" variant="primary" icon={ArrowRight}>
              See Our Work
            </Button>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
