import { useState } from 'react';
import { Clock, Mail, MapPin, Phone, Send, CircleCheck } from 'lucide-react';
import Hero from '../components/ui/Hero';
import Reveal from '../components/ui/Reveal';
import FormInput from '../components/ui/FormInput';
import Textarea from '../components/ui/Textarea';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import { siteInfo } from '../data/site';
import { submitContactForm } from '../services/api';
import useForm from '../hooks/useForm';
import { isEmail, isPhone, required, minLength } from '../utils/validation';
import { img } from '../utils/image';
import usePageTitle from '../hooks/usePageTitle';

const initial = { name: '', email: '', phone: '', subject: '', message: '' };
const rules = {
  name: [[required, 'Please enter your name.']],
  email: [
    [required, 'Please enter your email.'],
    [isEmail, 'Please enter a valid email address.'],
  ],
  phone: [[(v) => !v || isPhone(v), 'Please enter a valid phone number.']],
  subject: [[required, 'Please choose a subject.']],
  message: [
    [required, 'Please write a message.'],
    [minLength(10), 'Your message should be at least 10 characters.'],
  ],
};

export default function Contact() {
  usePageTitle('Contact');
  const { values, errors, handleChange, validateForm, reset } = useForm(initial, rules);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setSubmitting(true);
    await submitContactForm(values); // mock – nothing leaves the browser
    setSubmitting(false);
    setSent(true);
    reset();
  };

  const info = [
    { icon: Phone, label: 'Phone', value: siteInfo.phone, href: `tel:${siteInfo.phone.replace(/\s/g, '')}` },
    { icon: Mail, label: 'Email', value: siteInfo.email, href: `mailto:${siteInfo.email}` },
    { icon: MapPin, label: 'Studio Address', value: siteInfo.address },
  ];

  return (
    <>
      <Hero
        image={img('officeLounge', 2400)}
        eyebrow="Contact Us"
        title="Let’s talk about your space"
        subtitle="Visit our studio, give us a call or send a message. We usually reply within one business day."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Contact' }]}
      />

      <section className="section">
        <div className="container-lux grid gap-10 lg:grid-cols-5 [&>*]:min-w-0">
          {/* Contact information */}
          <Reveal className="space-y-6 lg:col-span-2">
            {info.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex gap-5 rounded-3xl bg-white p-6 shadow-soft">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cream text-gold-dark">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-wider text-stone">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      className="mt-1 block break-all text-lg sm:break-words text-charcoal transition-colors hover:text-gold-dark"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="mt-1 text-lg text-charcoal">{value}</p>
                  )}
                </div>
              </div>
            ))}
            <div className="rounded-3xl bg-charcoal p-6 text-ivory">
              <p className="flex items-center gap-3 text-xs uppercase tracking-wider text-gold-light">
                <Clock className="h-4 w-4" aria-hidden="true" /> Working Hours
              </p>
              <dl className="mt-4 space-y-3">
                {siteInfo.hours.map((h) => (
                  <div key={h.days} className="flex justify-between gap-4 border-b border-white/10 pb-3 text-sm last:border-0 last:pb-0">
                    <dt className="text-white/70">{h.days}</dt>
                    <dd>{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          {/* Contact form */}
          <Reveal delay={120} className="rounded-[2rem] bg-white p-6 shadow-soft sm:p-10 lg:col-span-3">
            {sent ? (
              <div className="flex h-full flex-col items-center justify-center py-12 text-center" role="status">
                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <CircleCheck className="h-10 w-10" aria-hidden="true" />
                </span>
                <h2 className="mt-6 text-4xl">Message sent!</h2>
                <p className="mt-3 max-w-sm text-stone">
                  Thank you for reaching out. A member of our design team will get back to you within 24 hours.
                </p>
                <Button variant="outline" className="mt-8" onClick={() => setSent(false)}>
                  Send another message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <h2 className="text-4xl">Send us a message</h2>
                <p className="mt-2 text-stone">Fields marked * are required.</p>
                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  <FormInput
                    label="Name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    error={errors.name}
                    required
                    autoComplete="name"
                    placeholder="Your full name"
                  />
                  <FormInput
                    label="Email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    error={errors.email}
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                  />
                  <FormInput
                    label="Phone"
                    name="phone"
                    type="tel"
                    value={values.phone}
                    onChange={handleChange}
                    error={errors.phone}
                    autoComplete="tel"
                    placeholder="+91 98765 43210"
                  />
                  <Select
                    label="Subject"
                    name="subject"
                    value={values.subject}
                    onChange={handleChange}
                    error={errors.subject}
                    required
                    placeholder="Choose a subject"
                    options={['New project enquiry', 'Consultation question', 'Partnership', 'Careers', 'Other']}
                  />
                  <Textarea
                    label="Message"
                    name="message"
                    value={values.message}
                    onChange={handleChange}
                    error={errors.message}
                    required
                    className="sm:col-span-2"
                    placeholder="Tell us a little about your space…"
                  />
                </div>
                <Button type="submit" size="lg" className="mt-8 w-full sm:w-auto" loading={submitting} icon={Send}>
                  {submitting ? 'Sending…' : 'Send Message'}
                </Button>
              </form>
            )}
          </Reveal>
        </div>

        {/* Map placeholder */}
        <Reveal className="container-lux mt-16">
          <div className="relative overflow-hidden rounded-[2rem]">
            <img src={img('villaFacade', 2000)} alt="" aria-hidden="true" loading="lazy" className="h-72 w-full object-cover md:h-96" />
            <div className="absolute inset-0 flex items-center justify-center bg-charcoal/50">
              <div className="mx-5 max-w-md rounded-3xl bg-ivory p-8 text-center shadow-lift">
                <MapPin className="mx-auto h-8 w-8 text-gold" aria-hidden="true" />
                <p className="mt-3 font-serif text-2xl">Visit our Bandra studio</p>
                <p className="mt-2 text-sm text-stone">{siteInfo.address}</p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteInfo.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline mt-4 inline-block text-sm font-medium text-gold-dark"
                >
                  Get directions
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
