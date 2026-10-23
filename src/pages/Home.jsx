import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

import Hero from '../components/ui/Hero';
import Button from '../components/ui/Button';
import SectionTitle from '../components/ui/SectionTitle';
import Reveal from '../components/ui/Reveal';
import ImageReveal from '../components/ui/ImageReveal';
import SmartImage from '../components/ui/SmartImage';
import CountUp from '../components/ui/CountUp';
import CTASection from '../components/ui/CTASection';
import ProjectCard from '../components/cards/ProjectCard';
import ServiceCard from '../components/cards/ServiceCard';
import TestimonialCard from '../components/cards/TestimonialCard';
import BlogCard from '../components/cards/BlogCard';

import { heroContent, whyChooseUs, designProcess, stats } from '../data/site';
import { featuredProjects } from '../data/projects';
import { services } from '../data/services';
import { designStyles } from '../data/designStyles';
import { testimonials } from '../data/testimonials';
import { blogPosts } from '../data/blog';
import { getIcon } from '../utils/icons';
import { img } from '../utils/image';
import usePageTitle from '../hooks/usePageTitle';

export default function Home() {
  usePageTitle();

  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <Hero
        fullHeight
        image={heroContent.image}
        eyebrow="Luxury Interior Design Studio"
        title={heroContent.headline}
        subtitle={heroContent.subtitle}
      >
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button to="/portfolio" variant="gold" size="lg" icon={ArrowRight}>
            Explore Our Work
          </Button>
          <Button to="/consultation" variant="light" size="lg">
            Book a Consultation
          </Button>
        </div>
      </Hero>

      {/* ---------------- INTRO + STATS ---------------- */}
      <section className="section">
        <div className="container-lux grid items-center gap-14 lg:grid-cols-2">
          <div className="relative">
            <ImageReveal
              src={img('livingChair', 1200)}
              alt="Sunlit living room corner with a sculptural armchair"
              className="aspect-[4/5] rounded-[2rem]"
            />
            <Reveal
              delay={200}
              className="absolute -bottom-8 -right-4 hidden w-56 rounded-3xl bg-charcoal p-6 text-ivory shadow-lift sm:block lg:-right-10"
            >
              <p className="font-serif text-5xl text-gold-light">
                <CountUp end={10} suffix="+" />
              </p>
              <p className="mt-2 text-sm text-white/70">Years of crafting beautiful homes across India</p>
            </Reveal>
          </div>
          <div>
            <SectionTitle
              align="left"
              eyebrow="Welcome to CasaCraft"
              title="Interiors that feel like you, only more beautiful."
              subtitle="We are a boutique studio of designers, architects and makers. For over a decade we have shaped homes, offices and boutique spaces that balance beauty, comfort and everyday function."
            />
            <Reveal delay={150} className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="border-l border-gold/40 pl-4">
                  <p className="font-serif text-4xl text-charcoal">
                    <CountUp end={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-1 text-sm text-stone">{s.label}</p>
                </div>
              ))}
            </Reveal>
            <Reveal delay={250} className="mt-10">
              <Button to="/about" variant="outline" icon={ArrowRight}>
                Our Story
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- FEATURED PROJECTS ---------------- */}
      <section className="section bg-cream">
        <div className="container-lux">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionTitle
              align="left"
              eyebrow="Featured Projects"
              title="Spaces we are proud of"
              subtitle="A glimpse into homes and workplaces designed with care, character and craftsmanship."
            />
            <Reveal>
              <Button to="/portfolio" variant="outline" icon={ArrowRight}>
                View Full Portfolio
              </Button>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project, i) => (
              <Reveal key={project.id} delay={(i % 3) * 120}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- SERVICES ---------------- */}
      <section className="section">
        <div className="container-lux">
          <SectionTitle
            eyebrow="What We Do"
            title="Design services for every space"
            subtitle="From a single room to a complete home or office, we bring the same passion and precision to every project."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, i) => (
              <Reveal key={service.id} delay={(i % 4) * 100} className={i === services.length - 1 ? 'sm:col-span-2 lg:col-span-1' : ''}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
            <Reveal delay={300} className="hidden lg:block">
              <Link
                to="/services"
                className="group flex h-full flex-col justify-between rounded-3xl bg-charcoal p-8 text-ivory transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift"
              >
                <p className="eyebrow text-gold-light">Explore</p>
                <div>
                  <p className="font-serif text-3xl leading-tight">See all services &amp; pricing</p>
                  <span className="mt-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold transition-transform duration-500 group-hover:rotate-45">
                    <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- WHY CHOOSE US ---------------- */}
      <section className="section relative overflow-hidden bg-charcoal">
        <img
          src={img('livingOpen', 2000)}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-15"
        />
        <div className="container-lux relative">
          <SectionTitle
            light
            eyebrow="Why Choose Us"
            title="The CasaCraft difference"
            subtitle="Thoughtful design, honest process and craftsmanship you can feel."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyChooseUs.map((item, i) => {
              const Icon = getIcon(item.icon);
              return (
                <Reveal key={item.title} delay={i * 120}>
                  <div className="group h-full rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/50 hover:bg-white/10">
                    <span className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/15 text-gold-light transition-colors duration-500 group-hover:bg-gold group-hover:text-white">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <h3 className="text-2xl text-white">{item.title}</h3>
                    <p className="mt-3 leading-relaxed text-white/65">{item.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- DESIGN PROCESS ---------------- */}
      <section className="section">
        <div className="container-lux">
          <SectionTitle
            eyebrow="Our Process"
            title="From first conversation to final reveal"
            subtitle="A clear, collaborative four-step journey, so you always know what happens next."
          />
          <ol className="relative mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            <span
              className="absolute left-0 right-0 top-10 hidden h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent lg:block"
              aria-hidden="true"
            />
            {designProcess.map((step, i) => {
              const Icon = getIcon(step.icon);
              return (
                <Reveal as="li" key={step.step} delay={i * 150} className="relative text-center">
                  <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-gold/40 bg-ivory text-gold-dark shadow-soft">
                    <Icon className="h-7 w-7" aria-hidden="true" />
                    <span className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-charcoal text-xs font-medium text-gold-light">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="mt-6 text-2xl">
                    <span className="sr-only">Step {step.step}: </span>
                    {step.title}
                  </h3>
                  <p className="mx-auto mt-3 max-w-xs leading-relaxed text-stone">{step.text}</p>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ---------------- DESIGN STYLES ---------------- */}
      <section className="section bg-cream">
        <div className="container-lux">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionTitle align="left" eyebrow="Design Styles" title="Find the style that speaks to you" />
            <Reveal>
              <Button to="/design-styles" variant="outline" icon={ArrowRight}>
                Explore All Styles
              </Button>
            </Reveal>
          </div>
          <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
            {designStyles.map((style, i) => (
              <Reveal key={style.id} delay={(i % 3) * 100}>
                <Link
                  to={`/design-styles#${style.id}`}
                  className="group relative block overflow-hidden rounded-3xl"
                  aria-label={`${style.name} style`}
                >
                  <SmartImage
                    src={style.image.replace('w=1600', 'w=800')}
                    alt=""
                    className="aspect-[4/5] md:aspect-[4/3]"
                    imgClassName="transition-transform duration-[1.2s] group-hover:scale-110"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/10 to-transparent transition-colors duration-500 group-hover:from-charcoal/90"
                    aria-hidden="true"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                    <p className="font-serif text-2xl text-white md:text-3xl">{style.name}</p>
                    <p className="mt-1 max-h-0 overflow-hidden text-sm text-white/75 opacity-0 transition-all duration-500 group-hover:max-h-10 group-hover:opacity-100">
                      {style.tagline}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- TESTIMONIALS ---------------- */}
      <section className="section">
        <div className="container-lux">
          <SectionTitle
            eyebrow="Testimonials"
            title="Loved by homeowners & businesses"
            subtitle="Our favourite part of every project is the moment clients walk into their finished space."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {testimonials.slice(0, 4).map((t, i) => (
              <Reveal key={t.id} delay={i * 100}>
                <TestimonialCard testimonial={t} />
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-12 text-center">
            <Button to="/testimonials" variant="outline" icon={ArrowRight}>
              Read More Reviews
            </Button>
          </Reveal>
        </div>
      </section>

      {/* ---------------- INSPIRATION / BLOG ---------------- */}
      <section className="section bg-cream">
        <div className="container-lux">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionTitle align="left" eyebrow="Inspiration" title="Ideas for a more beautiful home" />
            <Reveal>
              <Button to="/blog" variant="outline" icon={ArrowRight}>
                Visit the Journal
              </Button>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.slice(0, 3).map((post, i) => (
              <Reveal key={post.id} delay={i * 120}>
                <BlogCard post={post} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- FINAL CTA ---------------- */}
      <CTASection />
    </>
  );
}
