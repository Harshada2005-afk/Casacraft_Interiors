import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

/**
 * Full-bleed image hero.
 * `fullHeight` is used on the home page; inner pages use the shorter version
 * with breadcrumbs.
 */
export default function Hero({ image, eyebrow, title, subtitle, children, fullHeight = false, breadcrumbs }) {
  return (
    <section
      className={`relative isolate flex items-end overflow-hidden bg-charcoal ${
        fullHeight ? 'min-h-[100svh] pb-20 pt-32 md:pb-28' : 'min-h-[60vh] pb-16 pt-36 md:min-h-[68vh] md:pb-20'
      }`}
    >
      <img
        src={image}
        alt=""
        aria-hidden="true"
        fetchpriority="high"
        className="absolute inset-0 -z-10 h-full w-full animate-slow-zoom object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-charcoal/85 via-charcoal/40 to-charcoal/20" aria-hidden="true" />

      <div className="container-lux">
        {breadcrumbs && (
          <nav aria-label="Breadcrumb" className="mb-6 animate-fade-in">
            <ol className="flex flex-wrap items-center gap-1 text-sm text-white/70">
              {breadcrumbs.map((crumb, i) => (
                <li key={crumb.label} className="flex items-center gap-1">
                  {i > 0 && <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />}
                  {crumb.to ? (
                    <Link to={crumb.to} className="transition-colors hover:text-gold-light">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-white" aria-current="page">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <div className="max-w-3xl">
          {eyebrow && (
            <p className="eyebrow mb-5 flex animate-fade-up items-center gap-3 text-gold-light">
              <span className="h-px w-10 bg-gold-light" aria-hidden="true" />
              {eyebrow}
            </p>
          )}
          <h1
            className={`animate-fade-up text-white [animation-delay:120ms] ${
              fullHeight ? 'text-5xl leading-[1.05] sm:text-6xl lg:text-[5.5rem]' : 'text-4xl leading-tight sm:text-5xl lg:text-6xl'
            }`}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="mt-6 max-w-xl animate-fade-up text-base leading-relaxed text-white/80 [animation-delay:240ms] sm:text-lg">
              {subtitle}
            </p>
          )}
          {children && <div className="mt-10 animate-fade-up [animation-delay:360ms]">{children}</div>}
        </div>
      </div>
    </section>
  );
}
