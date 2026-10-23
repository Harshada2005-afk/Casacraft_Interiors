import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, Phone, User, Check } from 'lucide-react';
import AuthShell from '../components/layout/AuthShell';
import FormInput from '../components/ui/FormInput';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { register } from '../services/api';
import useForm from '../hooks/useForm';
import { isEmail, isPhone, required, minLength } from '../utils/validation';
import { img } from '../utils/image';
import usePageTitle from '../hooks/usePageTitle';

const rules = {
  fullName: [
    [required, 'Please enter your full name.'],
    [minLength(3), 'Name should be at least 3 characters.'],
  ],
  email: [
    [required, 'Please enter your email.'],
    [isEmail, 'Please enter a valid email address.'],
  ],
  phone: [
    [required, 'Please enter your phone number.'],
    [isPhone, 'Please enter a valid phone number.'],
  ],
  password: [
    [required, 'Please create a password.'],
    [minLength(8), 'Password must be at least 8 characters.'],
    [(v) => /[A-Z]/.test(v) && /[0-9]/.test(v), 'Include at least one uppercase letter and one number.'],
  ],
  confirmPassword: [
    [required, 'Please confirm your password.'],
    [(v, all) => v === all.password, 'Passwords do not match.'],
  ],
  terms: [[(v) => v === true, 'Please accept the terms to continue.']],
};

export default function Register() {
  usePageTitle('Create Account');
  const { values, errors, handleChange, validateForm } = useForm(
    { fullName: '', email: '', phone: '', password: '', confirmPassword: '', terms: false },
    rules,
  );
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const checks = [
    { ok: values.password.length >= 8, label: '8+ characters' },
    { ok: /[A-Z]/.test(values.password), label: 'Uppercase letter' },
    { ok: /[0-9]/.test(values.password), label: 'Number' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    const { user } = await register(values); // mock – nothing is stored on a server
    setLoading(false);
    signIn(user);
    showToast('Your account has been created. Welcome to CasaCraft!');
    navigate('/dashboard');
  };

  return (
    <AuthShell
      image={img('livingNeutral', 1600)}
      quote="Design is not just what it looks like. It is how it makes you feel every single day."
      quoteBy="Isha Kapoor · Founder"
    >
      <p className="eyebrow">Join CasaCraft</p>
      <h1 className="mt-3 text-5xl">Create your account</h1>
      <p className="mt-3 text-stone">Track your projects, book consultations and save the spaces you love.</p>

      <form onSubmit={handleSubmit} noValidate className="mt-10 space-y-5">
        <FormInput
          label="Full Name"
          name="fullName"
          icon={User}
          value={values.fullName}
          onChange={handleChange}
          error={errors.fullName}
          autoComplete="name"
          placeholder="Your full name"
          required
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <FormInput
            label="Email"
            name="email"
            type="email"
            icon={Mail}
            value={values.email}
            onChange={handleChange}
            error={errors.email}
            autoComplete="email"
            placeholder="you@example.com"
            required
          />
          <FormInput
            label="Phone"
            name="phone"
            type="tel"
            icon={Phone}
            value={values.phone}
            onChange={handleChange}
            error={errors.phone}
            autoComplete="tel"
            placeholder="+91 98765 43210"
            required
          />
        </div>
        <FormInput
          label="Password"
          name="password"
          type="password"
          icon={Lock}
          value={values.password}
          onChange={handleChange}
          error={errors.password}
          autoComplete="new-password"
          placeholder="Create a password"
          required
        />
        <ul className="-mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs" aria-label="Password requirements">
          {checks.map((c) => (
            <li key={c.label} className={`flex items-center gap-1 ${c.ok ? 'text-emerald-600' : 'text-stone'}`}>
              <Check className="h-3.5 w-3.5" aria-hidden="true" /> {c.label}
            </li>
          ))}
        </ul>
        <FormInput
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          icon={Lock}
          value={values.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          autoComplete="new-password"
          placeholder="Repeat your password"
          required
        />

        <div>
          <label className="flex cursor-pointer items-start gap-3 text-sm text-charcoal-light">
            <input
              type="checkbox"
              name="terms"
              checked={values.terms}
              onChange={handleChange}
              className="mt-0.5 h-4 w-4 rounded accent-gold"
              aria-invalid={!!errors.terms}
            />
            I agree to the Terms of Service and Privacy Policy.
          </label>
          {errors.terms && (
            <p className="mt-1.5 text-sm text-red-600" role="alert">
              {errors.terms}
            </p>
          )}
        </div>

        <Button type="submit" size="lg" className="w-full" loading={loading}>
          {loading ? 'Creating account…' : 'Create Account'}
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-stone">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-gold-dark underline-offset-4 hover:underline">
          Login
        </Link>
      </p>
    </AuthShell>
  );
}
