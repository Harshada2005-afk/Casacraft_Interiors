import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, SearchX } from 'lucide-react';
import Hero from '../components/ui/Hero';
import Reveal from '../components/ui/Reveal';
import Loading from '../components/ui/Loading';
import EmptyState from '../components/ui/EmptyState';
import SmartImage from '../components/ui/SmartImage';
import Button from '../components/ui/Button';
import BlogCard from '../components/cards/BlogCard';
import { blogCategories } from '../data/blog';
import { getBlogPosts } from '../services/api';
import useFetch from '../hooks/useFetch';
import { formatDate } from '../utils/format';
import { img } from '../utils/image';
import usePageTitle from '../hooks/usePageTitle';

export default function Blog() {
  usePageTitle('Blog');
  const { data: posts, loading } = useFetch(getBlogPosts);
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');

  const filtered = useMemo(
    () =>
      (posts || []).filter(
        (p) => (category === 'All' || p.category === category) && `${p.title} ${p.excerpt}`.toLowerCase().includes(query.toLowerCase()),
      ),
    [posts, category, query],
  );

  const showFeatured = category === 'All' && !query && filtered.length > 0;
  const featured = showFeatured ? filtered[0] : null;
  const grid = showFeatured ? filtered.slice(1) : filtered;

  return (
    <>
      <Hero
        image={img('decor', 2400)}
        eyebrow="The Journal"
        title="Ideas, inspiration & design advice"
        subtitle="Practical tips and beautiful ideas from the CasaCraft design studio."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Blog' }]}
      />

      <section className="section">
        <div className="container-lux">
          {/* Filters */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div
              role="toolbar"
              aria-label="Filter articles by category"
              className="scrollbar-thin -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
            >
              {blogCategories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  aria-pressed={category === c}
                  className={`shrink-0 rounded-full px-5 py-2.5 text-sm transition-all duration-300 ${
                    category === c
                      ? 'bg-charcoal text-ivory'
                      : 'border border-beige-dark text-charcoal-light hover:border-gold hover:text-gold-dark'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="relative w-full lg:w-72">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone" aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles…"
                className="field rounded-full pl-11"
                aria-label="Search articles"
              />
            </div>
          </div>

          <div className="mt-12">
            {loading && <Loading variant="cards" label="Loading articles" />}

            {!loading && filtered.length === 0 && (
              <EmptyState
                icon={SearchX}
                title="No articles found"
                text="Try a different category or search term."
                action={
                  <Button
                    onClick={() => {
                      setCategory('All');
                      setQuery('');
                    }}
                  >
                    Clear filters
                  </Button>
                }
              />
            )}

            {featured && (
              <Reveal className="group mb-12 grid overflow-hidden rounded-[2rem] bg-white shadow-soft lg:grid-cols-2">
                <Link to={`/blog/${featured.id}`} tabIndex={-1} aria-hidden="true">
                  <SmartImage
                    src={featured.image}
                    alt=""
                    className="aspect-[16/10] h-full"
                    imgClassName="transition-transform duration-[1.2s] group-hover:scale-105"
                  />
                </Link>
                <div className="flex flex-col justify-center p-8 md:p-12">
                  <p className="eyebrow">Featured · {featured.category}</p>
                  <h2 className="mt-4 text-3xl leading-tight md:text-4xl">
                    <Link to={`/blog/${featured.id}`} className="transition-colors hover:text-gold-dark">
                      {featured.title}
                    </Link>
                  </h2>
                  <p className="mt-4 text-lg text-stone">{featured.excerpt}</p>
                  <p className="mt-6 text-sm text-stone">
                    <time dateTime={featured.date}>{formatDate(featured.date)}</time> · {featured.readTime}
                  </p>
                  <Button to={`/blog/${featured.id}`} variant="outline" className="mt-8 self-start" icon={ArrowRight}>
                    Read More
                  </Button>
                </div>
              </Reveal>
            )}

            {grid.length > 0 && (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {grid.map((post, i) => (
                  <Reveal key={post.id} delay={(i % 3) * 100}>
                    <BlogCard post={post} />
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
