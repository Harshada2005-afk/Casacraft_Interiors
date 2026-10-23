/**
 * Brand icons as inline SVG (Lucide no longer ships brand logos).
 */
const paths = {
  Instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </>
  ),
  Facebook: <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8.5a.5.5 0 0 1 .5-.5Z" />,
  Pinterest: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M11 9.5c0-1.4 1-2.5 2.4-2.5 1.6 0 2.6 1.2 2.6 2.8 0 2.2-1.2 4.2-3 4.2-1 0-1.5-.7-1.3-1.5M11 12l-2 9" />
    </>
  ),
  LinkedIn: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" />
    </>
  ),
};

export default function SocialIcons({ socials, className = '' }) {
  return (
    <ul className={`flex items-center gap-3 ${className}`}>
      {socials.map(({ name, href }) => (
        <li key={name}>
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={`CasaCraft Interiors on ${name}`}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-gold hover:text-white"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-[18px] w-[18px]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {paths[name]}
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
