import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Send, Clock } from 'lucide-react';
import Logo from '../ui/Logo';
import SocialIcons from '../ui/SocialIcons';
import { footerQuickLinks, siteInfo } from '../../data/site';
import { services } from '../../data/services';
import { isEmail } from '../../utils/validation';
import { subscribeNewsletter } from '../../services/api';
import { useToast } from '../../context/ToastContext';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!isEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setLoading(true);
    await subscribeNewsletter(email);
    setLoading(false);
    setEmail('');
    showToast('Thank you for subscribing! Inspiration is on its way.');
  };

  return (
    <footer className="bg-charcoal text-white/70">
      <div className="container-lux grid gap-12 py-20 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo light />
          <p className="mt-6 max-w-sm leading-relaxed">{siteInfo.description}</p>
          <SocialIcons socials={siteInfo.socials} className="mt-8" />
        </div>

        <div className="lg:col-span-2">
          <h3 className="mb-5 font-sans text-sm font-medium uppercase tracking-[0.2em] text-white">Quick Links</h3>
          <ul className="space-y-3">
            {footerQuickLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-gold-light">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h3 className="mb-5 font-sans text-sm font-medium uppercase tracking-[0.2em] text-white">Services</h3>
          <ul className="space-y-3">
            {services.map((s) => (
              <li key={s.id}>
                <Link to={`/services#${s.id}`} className="transition-colors hover:text-gold-light">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2 lg:col-span-3">
          <h3 className="mb-5 font-sans text-sm font-medium uppercase tracking-[0.2em] text-white">Contact</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
              {siteInfo.address}
            </li>
            <li>
              <a href={`tel:${siteInfo.phone.replace(/\s/g, '')}`} className="flex gap-3 transition-colors hover:text-gold-light">
                <Phone className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                {siteInfo.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${siteInfo.email}`} className="flex gap-3 break-all transition-colors hover:text-gold-light">
                <Mail className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                {siteInfo.email}
              </a>
            </li>
            <li className="flex gap-3">
              <Clock className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
              Mon – Sat, 10 AM – 7 PM
            </li>
          </ul>

          <form onSubmit={handleSubscribe} className="mt-8" noValidate>
            <label htmlFor="newsletter" className="mb-3 block text-sm font-medium text-white">
              Join our newsletter
            </label>
            <div className="flex rounded-full border border-white/15 bg-white/5 p-1.5 focus-within:border-gold">
              <input
                id="newsletter"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="min-w-0 flex-1 bg-transparent px-4 text-sm text-white placeholder:text-white/40 focus:outline-none"
                aria-invalid={!!error}
                aria-describedby={error ? 'newsletter-error' : undefined}
              />
              <button
                type="submit"
                disabled={loading}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold text-white transition hover:bg-gold-dark disabled:opacity-60"
                aria-label="Subscribe"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            {error && (
              <p id="newsletter-error" className="mt-2 text-xs text-red-300" role="alert">
                {error}
              </p>
            )}
          </form>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-lux flex flex-col items-center justify-between gap-4 py-6 text-sm sm:flex-row">
          <p>© {new Date().getFullYear()} CasaCraft Interiors. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/admin/login" className="transition-colors hover:text-gold-light">
              Admin
            </Link>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="transition-colors hover:text-gold-light"
            >
              Back to top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
