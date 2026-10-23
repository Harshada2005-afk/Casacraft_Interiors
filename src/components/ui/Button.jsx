import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const base =
  'group inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-all duration-300 ease-out focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60';

const variants = {
  primary: 'bg-charcoal text-ivory hover:bg-gold-dark hover:shadow-lift hover:-translate-y-0.5',
  gold: 'bg-gold text-white hover:bg-gold-dark hover:shadow-lift hover:-translate-y-0.5',
  outline: 'border border-charcoal/80 text-charcoal hover:bg-charcoal hover:text-ivory',
  light: 'border border-white/70 text-white backdrop-blur-sm hover:bg-white hover:text-charcoal',
  ghost: 'text-charcoal hover:bg-beige/60',
  danger: 'bg-red-600 text-white hover:bg-red-700',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

/**
 * One button for the whole site.
 * - Pass `to` to render a React Router <Link>
 * - Pass `href` to render a normal <a>
 * - Otherwise renders a <button>
 */
export default function Button({
  children,
  to,
  href,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconLeft: IconLeft,
  loading = false,
  className = '',
  ...props
}) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  const content = (
    <>
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
      ) : (
        IconLeft && <IconLeft className="h-4 w-4" aria-hidden="true" />
      )}
      <span>{children}</span>
      {Icon && !loading && <Icon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {content}
      </a>
    );
  }
  return (
    <button type="button" className={classes} {...props} disabled={loading || props.disabled}>
      {content}
    </button>
  );
}
