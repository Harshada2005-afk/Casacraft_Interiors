import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, ArrowRight } from 'lucide-react';
import AuthShell from '../components/layout/AuthShell';
import FormInput from '../components/ui/FormInput';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { login } from '../services/api';
import useForm from '../hooks/useForm';
import { isEmail, required } from '../utils/validation';
import { img } from '../utils/image';
import usePageTitle from '../hooks/usePageTitle';

const rules = {
  email: [
    [required, 'Please enter your email.'],
    [isEmail, 'Please enter a valid email address.'],
  ],
  password: [[required, 'Please enter your password.']],
};

export default function Login() {
  usePageTitle('Login');
  const { values, errors, handleChange, validateForm } = useForm({ email: '', password: '', remember: true }, rules);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetError, setResetError] = useState('');
  const { signIn } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    const { user } = await login(values); // mock: any valid email + password works
    setLoading(false);
    signIn(user);
    showToast(`Welcome back, ${user.name.split(' ')[0]}!`);
    navigate('/dashboard');
  };

  const handleReset = (e) => {
    e.preventDefault();
    if (!isEmail(resetEmail)) {
      setResetError('Please enter a valid email address.');
      return;
    }
    setForgotOpen(false);
    setResetEmail('');
    setResetError('');
    showToast('If an account exists, a reset link has been sent (demo).', 'info');
  };

  return (
    <AuthShell
      image={img('bedroomLux', 1600)}
      quote="Our home finally feels like us. Logging in to see each update was the best part of the journey."
      quoteBy="Priya Sharma · New Delhi"
    >
      <p className="eyebrow">Client Portal</p>
      <h1 className="mt-3 text-5xl">Welcome back</h1>
      <p className="mt-3 text-stone">Sign in to follow your projects, consultations and saved inspiration.</p>

      <form onSubmit={handleSubmit} noValidate className="mt-10 space-y-5">
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
        />
        <div className="relative">
          <FormInput
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            icon={Lock}
            value={values.password}
            onChange={handleChange}
            error={errors.password}
            autoComplete="current-password"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            className="absolute right-3 top-[38px] rounded-full p-1.5 text-stone transition hover:text-charcoal"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex cursor-pointer items-center gap-2 text-charcoal-light">
            <input
              type="checkbox"
              name="remember"
              checked={values.remember}
              onChange={handleChange}
              className="h-4 w-4 rounded accent-gold"
            />
            Remember me
          </label>
          <button type="button" onClick={() => setForgotOpen(true)} className="link-underline text-gold-dark">
            Forgot Password?
          </button>
        </div>

        <Button type="submit" size="lg" className="w-full" loading={loading} icon={ArrowRight}>
          {loading ? 'Signing in…' : 'Login'}
        </Button>
      </form>

      <div className="my-8 flex items-center gap-4 text-xs uppercase tracking-widest text-stone">
        <span className="h-px flex-1 bg-beige-dark" /> New here? <span className="h-px flex-1 bg-beige-dark" />
      </div>
      <Button to="/register" variant="outline" size="lg" className="w-full">
        Create Account
      </Button>

      <p className="mt-8 rounded-2xl bg-cream p-4 text-center text-xs text-stone">
        Demo mode: any valid email and password will sign you in.{' '}
        <Link to="/admin/login" className="text-gold-dark underline">
          Admin login
        </Link>
      </p>

      <Modal open={forgotOpen} onClose={() => setForgotOpen(false)} title="Reset your password" size="sm">
        <form onSubmit={handleReset} noValidate>
          <p className="mb-5 text-stone">Enter your email and we will send you a link to reset your password.</p>
          <FormInput
            label="Email"
            name="resetEmail"
            type="email"
            icon={Mail}
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            error={resetError}
            placeholder="you@example.com"
          />
          <Button type="submit" className="mt-6 w-full">
            Send reset link
          </Button>
        </form>
      </Modal>
    </AuthShell>
  );
}
