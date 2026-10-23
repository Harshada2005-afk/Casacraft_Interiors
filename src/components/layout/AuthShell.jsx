import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Logo from '../ui/Logo';

/** Split-screen layout for login / register screens. */
export default function AuthShell({ image, quote, quoteBy, children, dark = false }) {
  return (
    <div className={`grid min-h-screen lg:grid-cols-2 ${dark ? 'bg-charcoal' : 'bg-ivory'}`}>
      <div className="relative hidden overflow-hidden lg:block">
        <img src={image} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full animate-slow-zoom object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-charcoal/10" aria-hidden="true" />
        <div className="absolute left-10 top-10">
          <Logo light />
        </div>
        {quote && (
          <figure className="absolute inset-x-10 bottom-12 max-w-lg">
            <blockquote className="font-serif text-3xl leading-snug text-white">“{quote}”</blockquote>
            {quoteBy && <figcaption className="mt-4 text-sm text-gold-light">{quoteBy}</figcaption>}
          </figure>
        )}
      </div>

      <main id="main" className="flex flex-col px-5 py-8 sm:px-10">
        <div className="flex items-center justify-between">
          <div className="lg:hidden">
            <Logo light={dark} />
          </div>
          <Link
            to="/"
            className={`ml-auto inline-flex items-center gap-2 text-sm transition-colors ${dark ? 'text-white/60 hover:text-white' : 'text-stone hover:text-charcoal'}`}
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to website
          </Link>
        </div>
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-12 animate-fade-up">{children}</div>
      </main>
    </div>
  );
}
