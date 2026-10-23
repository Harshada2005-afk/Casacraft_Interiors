import Reveal from './Reveal';

/** Eyebrow + heading + optional subtitle, used at the top of every section. */
export default function SectionTitle({ eyebrow, title, subtitle, align = 'center', light = false, className = '' }) {
  const alignment = align === 'center' ? 'mx-auto text-center items-center' : 'text-left items-start';
  return (
    <Reveal className={`flex max-w-2xl flex-col gap-4 ${alignment} ${className}`}>
      {eyebrow && (
        <span className={`eyebrow flex items-center gap-3 ${light ? 'text-gold-light' : ''}`}>
          <span className={`h-px w-8 ${light ? 'bg-gold-light' : 'bg-gold'}`} aria-hidden="true" />
          {eyebrow}
        </span>
      )}
      <h2 className={`text-4xl leading-tight sm:text-5xl ${light ? 'text-white' : 'text-charcoal'}`}>{title}</h2>
      {subtitle && <p className={`text-base leading-relaxed sm:text-lg ${light ? 'text-white/75' : 'text-stone'}`}>{subtitle}</p>}
    </Reveal>
  );
}
