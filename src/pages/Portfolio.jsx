import { useMemo, useState } from 'react';
import { SearchX } from 'lucide-react';
import Hero from '../components/ui/Hero';
import Reveal from '../components/ui/Reveal';
import Loading from '../components/ui/Loading';
import EmptyState from '../components/ui/EmptyState';
import Button from '../components/ui/Button';
import CTASection from '../components/ui/CTASection';
import ProjectCard from '../components/cards/ProjectCard';
import { projectCategories } from '../data/projects';
import { getProjects } from '../services/api';
import useFetch from '../hooks/useFetch';
import { img } from '../utils/image';
import usePageTitle from '../hooks/usePageTitle';

export default function Portfolio() {
  usePageTitle('Portfolio');
  const { data: projects, loading } = useFetch(getProjects);
  const [filter, setFilter] = useState('All');

  const visible = useMemo(() => (projects || []).filter((p) => filter === 'All' || p.category === filter), [projects, filter]);
  const countFor = (cat) => (projects || []).filter((p) => cat === 'All' || p.category === cat).length;

  return (
    <>
      <Hero
        image={img('livingBright', 2400)}
        eyebrow="Portfolio"
        title="A collection of spaces, each with its own story"
        subtitle="Browse homes, villas, kitchens, offices and commercial spaces we have had the joy of designing."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Portfolio' }]}
      />

      <section className="section">
        <div className="container-lux">
          {/* Filters */}
          <div
            role="toolbar"
            aria-label="Filter projects by category"
            className="scrollbar-thin -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0"
          >
            {projectCategories.map((cat) => {
              const active = filter === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFilter(cat)}
                  aria-pressed={active}
                  className={`shrink-0 rounded-full px-5 py-2.5 text-sm transition-all duration-300 ${
                    active
                      ? 'bg-charcoal text-ivory shadow-soft'
                      : 'border border-beige-dark text-charcoal-light hover:border-gold hover:text-gold-dark'
                  }`}
                >
                  {cat}
                  {projects && <span className={`ml-2 text-xs ${active ? 'text-gold-light' : 'text-stone'}`}>{countFor(cat)}</span>}
                </button>
              );
            })}
          </div>

          <p className="mt-6 text-center text-sm text-stone" aria-live="polite">
            {!loading &&
              `Showing ${visible.length} ${visible.length === 1 ? 'project' : 'projects'}${filter !== 'All' ? ` in ${filter}` : ''}`}
          </p>

          <div className="mt-10">
            {loading && <Loading variant="cards" label="Loading projects" />}
            {!loading && visible.length === 0 && (
              <EmptyState
                icon={SearchX}
                title="No projects in this category yet"
                text="We are always working on something new. Try another category."
                action={<Button onClick={() => setFilter('All')}>Show all projects</Button>}
              />
            )}
            {!loading && visible.length > 0 && (
              // Masonry layout with CSS columns: cards alternate between tall and regular images
              <div key={filter} className="columns-1 gap-8 sm:columns-2 lg:columns-3">
                {visible.map((project, i) => (
                  <Reveal key={project.id} delay={(i % 3) * 100} className="mb-8 break-inside-avoid">
                    <ProjectCard project={project} tall={i % 3 === 1} />
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <CTASection
        title="Have a space in mind?"
        text="Tell us about your project and we will design something you will love coming home to."
      />
    </>
  );
}
