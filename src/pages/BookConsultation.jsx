import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CalendarCheck, CircleCheck, Clock, Mail, MapPin, Phone, User, ShieldCheck, Sparkles } from 'lucide-react';
import Hero from '../components/ui/Hero';
import Reveal from '../components/ui/Reveal';
import FormInput from '../components/ui/FormInput';
import Select from '../components/ui/Select';
import Textarea from '../components/ui/Textarea';
import Button from '../components/ui/Button';
import { budgetOptions, designStyleOptions, propertyTypeOptions, projectTypeOptions } from '../data/consultations';
import { submitConsultation } from '../services/api';
import useForm from '../hooks/useForm';
import { isEmail, isPhone, required } from '../utils/validation';
import { img } from '../utils/image';
import usePageTitle from '../hooks/usePageTitle';

const today = new Date().toISOString().split('T')[0];

const rules = {
  fullName: [[required, 'Please enter your full name.']],
  email: [
    [required, 'Please enter your email.'],
    [isEmail, 'Please enter a valid email address.'],
  ],
  phone: [
    [required, 'Please enter your phone number.'],
    [isPhone, 'Please enter a valid phone number (10–15 digits).'],
  ],
  propertyType: [[required, 'Please select your property type.']],
  projectType: [[required, 'Please select a project type.']],
  location: [[required, 'Please enter the project location.']],
  budget: [[required, 'Please select a budget range.']],
  designStyle: [[required, 'Please choose a design style.']],
  preferredDate: [
    [required, 'Please pick a preferred date.'],
    [(v) => v >= today, 'Please choose today or a future date.'],
  ],
};

// Maps service titles (from ?service=) to project type options
const serviceToProjectType = {
  'Residential Interior Design': 'Full Home Interior',
  'Living Room Design': 'Living Room',
  'Bedroom Design': 'Bedroom',
  'Kitchen Design': 'Kitchen',
  'Office Interiors': 'Office Interior',
  'Commercial Interiors': 'Commercial Space',
  '3D Interior Visualization': '3D Visualization',
};

export default function BookConsultation() {
  usePageTitle('Book a Consultation');
  const [params] = useSearchParams();
  const initial = {
    fullName: '',
    email: '',
    phone: '',
    propertyType: '',
    projectType: serviceToProjectType[params.get('service')] || '',
    location: '',
    budget: '',
    designStyle: designStyleOptions.includes(params.get('style')) ? params.get('style') : '',
    preferredDate: '',
    message: '',
  };
  const { values, errors, handleChange, validateForm, reset } = useForm(initial, rules);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setSubmitting(true);
    const res = await submitConsultation(values); // mock – no backend yet
    setSubmitting(false);
    setSubmitted({ ...values, id: res.id });
    reset();
    window.scrollTo({ top: document.getElementById('consultation-form')?.offsetTop - 100, behavior: 'smooth' });
  };

  const field = (name) => ({ name, value: values[name], onChange: handleChange, error: errors[name] });

  return (
    <>
      <Hero
        image={img('livingOpen', 2400)}
        eyebrow="Book a Consultation"
        title="Let’s design a space you will love"
        subtitle="Share a few details and one of our senior designers will reach out to plan your complimentary consultation."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Book a Consultation' }]}
      />

      <section className="section" id="consultation-form">
        <div className="container-lux grid gap-10 lg:grid-cols-3">
          {/* Sidebar */}
          <Reveal as="aside" className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[2rem] bg-charcoal p-8 text-ivory">
              <p className="eyebrow text-gold-light">What to expect</p>
              <ul className="mt-6 space-y-5">
                {[
                  { icon: Clock, t: 'A call within 24 hours', d: 'We will confirm your slot and understand your brief.' },
                  { icon: CalendarCheck, t: '60-minute consultation', d: 'At our studio, your home or online. It is complimentary.' },
                  { icon: Sparkles, t: 'Initial design direction', d: 'Ideas, mood references and a transparent estimate.' },
                ].map(({ icon: Icon, t, d }) => (
                  <li key={t} className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-gold-light">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-medium text-white">{t}</p>
                      <p className="mt-1 text-sm text-white/65">{d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-start gap-4 rounded-3xl border border-beige bg-white p-6">
              <ShieldCheck className="h-6 w-6 shrink-0 text-gold" aria-hidden="true" />
              <p className="text-sm text-stone">Your details are kept private and only used to plan your consultation.</p>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={120} className="rounded-[2rem] bg-white p-6 shadow-soft sm:p-10 lg:col-span-2">
            {submitted ? (
              <div className="py-10 text-center" role="status">
                <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <CircleCheck className="h-10 w-10" aria-hidden="true" />
                </span>
                <h2 className="mt-6 text-4xl">Thank you! Your consultation request has been received.</h2>
                <p className="mx-auto mt-4 max-w-md text-stone">
                  We will call you at <span className="text-charcoal">{submitted.phone}</span> to confirm your consultation on{' '}
                  <span className="text-charcoal">
                    {new Date(submitted.preferredDate).toLocaleDateString('en-IN', { dateStyle: 'long' })}
                  </span>
                  .
                </p>
                <dl className="mx-auto mt-8 grid max-w-md grid-cols-2 gap-4 rounded-3xl bg-cream p-6 text-left text-sm">
                  <div>
                    <dt className="text-stone">Reference</dt>
                    <dd className="font-medium">{submitted.id}</dd>
                  </div>
                  <div>
                    <dt className="text-stone">Project</dt>
                    <dd className="font-medium">{submitted.projectType}</dd>
                  </div>
                  <div>
                    <dt className="text-stone">Style</dt>
                    <dd className="font-medium">{submitted.designStyle}</dd>
                  </div>
                  <div>
                    <dt className="text-stone">Budget</dt>
                    <dd className="font-medium">{submitted.budget}</dd>
                  </div>
                </dl>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <Button to="/portfolio" variant="outline">
                    Browse our portfolio
                  </Button>
                  <Button onClick={() => setSubmitted(null)}>Book another</Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <h2 className="text-4xl">Your project details</h2>
                <p className="mt-2 text-stone">Fields marked * are required.</p>

                <fieldset className="mt-8">
                  <legend className="eyebrow mb-5">About you</legend>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <FormInput
                      label="Full Name"
                      {...field('fullName')}
                      required
                      icon={User}
                      autoComplete="name"
                      placeholder="Your full name"
                      className="sm:col-span-2"
                    />
                    <FormInput
                      label="Email"
                      type="email"
                      {...field('email')}
                      required
                      icon={Mail}
                      autoComplete="email"
                      placeholder="you@example.com"
                    />
                    <FormInput
                      label="Phone"
                      type="tel"
                      {...field('phone')}
                      required
                      icon={Phone}
                      autoComplete="tel"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </fieldset>

                <fieldset className="mt-10">
                  <legend className="eyebrow mb-5">About your project</legend>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Select
                      label="Property Type"
                      {...field('propertyType')}
                      required
                      placeholder="Select property type"
                      options={propertyTypeOptions}
                    />
                    <Select
                      label="Project Type"
                      {...field('projectType')}
                      required
                      placeholder="Select project type"
                      options={projectTypeOptions}
                    />
                    <FormInput label="Location" {...field('location')} required icon={MapPin} placeholder="e.g. Andheri West, Mumbai" />
                    <Select label="Budget" {...field('budget')} required placeholder="Select budget range" options={budgetOptions} />
                    <FormInput label="Preferred Date" type="date" min={today} {...field('preferredDate')} required />
                  </div>
                </fieldset>

                <fieldset className="mt-10">
                  <legend className="mb-3 block text-sm font-medium text-charcoal-light">
                    Design Style <span className="text-gold-dark">*</span>
                  </legend>
                  <div
                    className="grid grid-cols-2 gap-3 sm:grid-cols-3"
                    role="radiogroup"
                    aria-describedby={errors.designStyle ? 'designStyle-error' : undefined}
                  >
                    {designStyleOptions.map((s) => (
                      <label
                        key={s}
                        className={`flex cursor-pointer items-center justify-center rounded-xl border px-4 py-3 text-sm transition-all duration-200 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-gold ${
                          values.designStyle === s
                            ? 'border-gold bg-gold/10 font-medium text-gold-dark'
                            : 'border-beige-dark text-charcoal-light hover:border-gold/60'
                        }`}
                      >
                        <input
                          type="radio"
                          name="designStyle"
                          value={s}
                          checked={values.designStyle === s}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        {s}
                      </label>
                    ))}
                  </div>
                  {errors.designStyle && (
                    <p id="designStyle-error" className="mt-1.5 text-sm text-red-600" role="alert">
                      {errors.designStyle}
                    </p>
                  )}
                </fieldset>

                <Textarea
                  label="Message"
                  {...field('message')}
                  className="mt-10"
                  placeholder="Tell us about your space, your family, how you live and what you dream of…"
                />

                <Button type="submit" size="lg" className="mt-8 w-full sm:w-auto" loading={submitting}>
                  {submitting ? 'Submitting…' : 'Request Consultation'}
                </Button>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}
