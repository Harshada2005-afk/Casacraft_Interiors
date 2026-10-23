import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';
import SmartImage from '../ui/SmartImage';
import { formatDate } from '../../utils/format';

export default function BlogCard({ post }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift">
      <Link to={`/blog/${post.id}`} className="relative block" tabIndex={-1} aria-hidden="true">
        <SmartImage
          src={post.image}
          alt=""
          className="aspect-[16/11]"
          imgClassName="transition-transform duration-[1.2s] group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-charcoal backdrop-blur">
          {post.category}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <p className="flex items-center gap-2 text-xs text-stone">
          <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true">·</span>
          {post.readTime}
        </p>
        <h3 className="mt-3 text-2xl leading-snug">
          <Link to={`/blog/${post.id}`} className="transition-colors hover:text-gold-dark">
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 line-clamp-3 flex-1 text-stone">{post.excerpt}</p>
        <Link
          to={`/blog/${post.id}`}
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-charcoal transition-colors hover:text-gold-dark"
          aria-label={`Read more: ${post.title}`}
        >
          Read More
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
