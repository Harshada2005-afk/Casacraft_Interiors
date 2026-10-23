import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calendar, Clock, MapPin, Ruler, Palette, Home as HomeIcon, Layers, SearchX } from 'lucide-react';
import Hero from '../components/ui/Hero';
import SectionTitle from '../components/ui/SectionTitle';
import Reveal from '../components/ui/Reveal';
import Loading from '../components/ui/Loading';
import EmptyState from '../components/ui/EmptyState';
import Button from '../components/ui/Button';
import Gallery from '../components/ui/Gallery';
import BeforeAfter from '../components/ui/BeforeAfter';
import ColorPalette from '../components/ui/ColorPalette';
import CTASection from '../components/ui/CTASection';
import ProjectCard from '../components/cards/ProjectCard';
import { getProject } from '../services/api';
import useFetch from '../hooks/useFetch';
import usePageTitle from '../hooks/usePageTitle';

export default function ProjectDetails() {
  const { id } = useParams();
  const { data, loading } = useFetch(() => getProject(id), [id]);
  usePageTitle(data?.project?.title || 'Project');

  if (loading) {
    return (
      <div className="min-h-[70vh] bg-charcoal pt-40">
        <Loading label="Loading project" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="container-lux pb-24 pt-40">
        <EmptyState
          as="h1"
          icon={SearchX}
          title="Project not found"
          text="The project you are looking for may have moved. Explore the rest of our portfolio instead."
          action={
            <Button to="/portfolio" iconLeft={ArrowLeft}>
              Back to Portfolio
            </Button>
          }
        />
      </div>
    );
  }

  const { project, related } = data;
  const facts = [
    { icon: MapPin, label: 'Location', value: project.location },
    { icon: HomeIcon, label: 'Project Type', value: project.category },
    { icon: Palette, label: 'Design Style', value: project.style },
    { icon: Ruler, label: 'Area', value: project.area },
    { icon: Clock, label: 'Duration', value: project.duration },
    { icon: Calendar, label: 'Completed', value: project.year },
  ];

  return (
    <>
      <Hero
        image={project.image.replace('w=1600', 'w=2400')}
        eyebrow={`${project.style} · ${project.category}`}
        title={project.title}
        subtitle={project.location}
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Portfolio', to: '/portfolio' }, { label: project.title }]}
      />

      {/* Key facts */}
      <section className="container-lux relative z-10 -mt-12">
        <Reveal className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-beige shadow-lift sm:grid-cols-3 lg:grid-cols-6">
          {facts.map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-white p-6">
              <Icon className="h-5 w-5 text-gold" aria-hidden="true" />
              <p className="mt-3 text-xs uppercase tracking-wider text-stone">{label}</p>
              <p className="mt-1 font-medium text-charcoal">{value}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* Description & concept */}
      <section className="section">
        <div className="container-lux grid gap-14 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <SectionTitle align="left" eyebrow="The Project" title="Overview" />
            <Reveal className="mt-6 text-lg leading-relaxed text-stone">
              <p>{project.description}</p>
            </Reveal>
            <Reveal className="mt-12 rounded-3xl border-l-4 border-gold bg-cream p-8">
              <p className="eyebrow flex items-center gap-2">
                <Layers className="h-4 w-4" aria-hidden="true" /> Design Concept
              </p>
              <p className="mt-4 font-serif text-2xl leading-relaxed text-charcoal-light">{project.concept}</p>
            </Reveal>
          </div>
          <aside className="space-y-10">
            <Reveal>
              <h2 className="text-2xl">Materials Used</h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {project.materials.map((m) => (
                  <li key={m} className="rounded-full border border-beige-dark bg-white px-4 py-2 text-sm text-charcoal-light">
                    {m}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="text-2xl">Color Palette</h2>
              <div className="mt-5">
                <ColorPalette colors={project.palette} />
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      {/* Gallery */}
      <section className="section bg-cream">
        <div className="container-lux">
          <SectionTitle eyebrow="Gallery" title="Inside the project" subtitle="Click any image to view it full screen." />
          <div className="mt-12">
            <Gallery images={project.gallery} title={project.title} />
          </div>
        </div>
      </section>

      {/* Before / After */}
      <section className="section">
        <div className="container-lux">
          <SectionTitle eyebrow="Transformation" title="Before & After" subtitle="Drag the slider to see how the space was transformed." />
          <Reveal className="mx-auto mt-12 max-w-5xl">
            <BeforeAfter before={project.before} after={project.after} alt={project.title} />
          </Reveal>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="section bg-cream">
          <div className="container-lux">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <SectionTitle align="left" eyebrow="More Work" title="Related projects" />
              <Link to="/portfolio" className="link-underline inline-flex items-center gap-2 text-sm font-medium">
                All projects <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <Reveal key={p.id} delay={i * 100}>
                  <ProjectCard project={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection
        title="Want a Similar Space?"
        text={`Love the ${project.style.toLowerCase()} feel of this project? Let's design something just as special for you.`}
        image={project.gallery[1] || project.image}
      />
    </>
  );
}
