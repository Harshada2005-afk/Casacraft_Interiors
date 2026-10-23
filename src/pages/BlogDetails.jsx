import { useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, SearchX } from 'lucide-react';
import Hero from '../components/ui/Hero';
import Reveal from '../components/ui/Reveal';
import Loading from '../components/ui/Loading';
import EmptyState from '../components/ui/EmptyState';
import Button from '../components/ui/Button';
import CTASection from '../components/ui/CTASection';
import SectionTitle from '../components/ui/SectionTitle';
import BlogCard from '../components/cards/BlogCard';
import { blogPosts } from '../data/blog';
import { getBlogPost } from '../services/api';
import useFetch from '../hooks/useFetch';
import { formatDate } from '../utils/format';
import usePageTitle from '../hooks/usePageTitle';

/** Renders one content block of an article. */
function Block({ block }) {
  if (block.type === 'h2') return <h2 className="mt-12 text-3xl">{block.text}</h2>;
  if (block.type === 'quote')
    return (
      <blockquote className="my-10 border-l-4 border-gold bg-cream px-8 py-6 font-serif text-2xl italic leading-relaxed text-charcoal-light">
        “{block.text}”
      </blockquote>
    );
  return <p className="mt-5 text-lg leading-[1.85] text-charcoal-soft">{block.text}</p>;
}

export default function BlogDetails() {
  const { id } = useParams();
  const { data: post, loading } = useFetch(() => getBlogPost(id), [id]);
  usePageTitle(post?.title || 'Blog');

  if (loading) {
    return (
      <div className="min-h-[70vh] bg-charcoal pt-40">
        <Loading label="Loading article" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container-lux pb-24 pt-40">
        <EmptyState
          as="h1"
          icon={SearchX}
          title="Article not found"
          text="This article may have been moved or removed."
          action={
            <Button to="/blog" iconLeft={ArrowLeft}>
              Back to Blog
            </Button>
          }
        />
      </div>
    );
  }

  const more = blogPosts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <>
      <Hero
        image={post.image.replace('w=1400', 'w=2400')}
        eyebrow={post.category}
        title={post.title}
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Blog', to: '/blog' }, { label: post.category }]}
      >
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/80">
          <span>
            By <span className="text-white">{post.author}</span>, {post.authorRole}
          </span>
          <span className="flex items-center gap-2">
            <Calendar className="h-4 w-4" aria-hidden="true" />
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </span>
          <span className="flex items-center gap-2">
            <Clock className="h-4 w-4" aria-hidden="true" />
            {post.readTime}
          </span>
        </div>
      </Hero>

      <article className="section">
        <Reveal className="container-lux max-w-3xl">
          <p className="font-serif text-2xl leading-relaxed text-charcoal md:text-3xl">{post.excerpt}</p>
          <div className="mt-6 h-px w-24 bg-gold" aria-hidden="true" />
          {post.content.map((block, i) => (
            <Block key={i} block={block} />
          ))}
          <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-beige pt-8 sm:flex-row sm:items-center">
            <Button to="/blog" variant="ghost" iconLeft={ArrowLeft}>
              All articles
            </Button>
            <Button to="/consultation">Talk to a designer</Button>
          </div>
        </Reveal>
      </article>

      <section className="section bg-cream">
        <div className="container-lux">
          <SectionTitle eyebrow="Keep Reading" title="More from the journal" />
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {more.map((p, i) => (
              <Reveal key={p.id} delay={i * 100}>
                <BlogCard post={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
