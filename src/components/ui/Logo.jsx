import { Link } from 'react-router-dom';

export default function Logo({ light = false, to = '/', subtitle = 'Interiors' }) {
  return (
    <Link to={to} className="group flex items-center gap-3" aria-label="CasaCraft Interiors – home">
      <span
        className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-colors duration-300 ${
          light ? 'border-white/30 group-hover:border-gold-light' : 'border-charcoal/15 bg-charcoal group-hover:bg-gold-dark'
        }`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 32 32"
          className="h-5 w-5"
          fill="none"
          stroke={light ? '#E3CFA8' : '#E3CFA8'}
          strokeWidth="2"
          strokeLinejoin="round"
        >
          <path d="M16 5 5 13v14h7v-8h8v8h7V13Z" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-serif text-2xl font-semibold tracking-tight ${light ? 'text-white' : 'text-charcoal'}`}>CasaCraft</span>
        <span className={`mt-0.5 text-[10px] uppercase tracking-[0.42em] ${light ? 'text-gold-light' : 'text-gold-dark'}`}>{subtitle}</span>
      </span>
    </Link>
  );
}
