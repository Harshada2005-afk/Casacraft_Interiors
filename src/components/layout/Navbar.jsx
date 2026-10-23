import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, User, ArrowRight, Phone } from 'lucide-react';
import Logo from '../ui/Logo';
import Button from '../ui/Button';
import { navLinks, siteInfo } from '../../data/site';
import { useAuth } from '../../context/AuthContext';

/**
 * Sticky navbar. Transparent over the hero image, then turns into a
 * frosted ivory bar once the user scrolls.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu whenever the route changes
  useEffect(() => setOpen(false), [pathname]);

  // Lock page scroll while the mobile menu is open, close with Escape
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const solid = scrolled || open;
  const linkColor = solid ? 'text-charcoal-light hover:text-charcoal' : 'text-white/85 hover:text-white';

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          solid ? 'bg-ivory/90 py-3 shadow-[0_1px_0_rgba(38,37,35,0.06)] backdrop-blur-lg' : 'bg-transparent py-5'
        }`}
      >
        <a
          href="#main"
          onClick={(e) => {
            e.preventDefault();
            const main = document.getElementById('main');
            main?.setAttribute('tabindex', '-1');
            main?.focus();
          }}
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <nav className="container-lux flex items-center justify-between gap-6" aria-label="Main navigation">
          <Logo light={!solid} />

          <ul className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `link-underline text-[15px] transition-colors duration-300 ${isActive ? (solid ? 'text-gold-dark after:scale-x-100' : 'text-gold-light after:scale-x-100') : linkColor}`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to={user ? '/dashboard' : '/login'}
              className={`hidden h-11 w-11 items-center justify-center rounded-full border transition-colors sm:flex ${
                solid
                  ? 'border-beige-dark text-charcoal hover:border-gold hover:text-gold-dark'
                  : 'border-white/30 text-white hover:border-white'
              }`}
              aria-label={user ? 'My dashboard' : 'Login'}
            >
              <User className="h-[18px] w-[18px]" />
            </Link>
            <Button to="/consultation" variant={solid ? 'primary' : 'gold'} size="sm" className="hidden md:inline-flex">
              Book a Consultation
            </Button>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors lg:hidden ${
                solid ? 'text-charcoal hover:bg-beige/60' : 'text-white hover:bg-white/10'
              }`}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu – rendered outside <header> because the header's backdrop-blur
          would otherwise become the containing block for this fixed panel */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 overflow-y-auto bg-ivory pt-[68px] transition-all duration-500 lg:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div className="container-lux flex min-h-full flex-col pb-10 pt-6">
          <ul className="flex flex-col">
            {navLinks.map((link, i) => (
              <li
                key={link.to}
                className={`border-b border-beige transition-all duration-500 ${open ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'}`}
                style={{ transitionDelay: open ? `${80 + i * 45}ms` : '0ms' }}
              >
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `flex items-center justify-between py-4 font-serif text-3xl ${isActive ? 'text-gold-dark' : 'text-charcoal'}`
                  }
                >
                  {link.label}
                  <ArrowRight className="h-5 w-5 text-stone-light" aria-hidden="true" />
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mt-auto space-y-3 pt-10">
            <Button to="/consultation" variant="gold" size="lg" className="w-full">
              Book a Consultation
            </Button>
            <Button to={user ? '/dashboard' : '/login'} variant="outline" size="lg" className="w-full" iconLeft={User}>
              {user ? 'My Dashboard' : 'Client Login'}
            </Button>
            <a href={`tel:${siteInfo.phone.replace(/\s/g, '')}`} className="flex items-center justify-center gap-2 pt-3 text-sm text-stone">
              <Phone className="h-4 w-4" aria-hidden="true" /> {siteInfo.phone}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
