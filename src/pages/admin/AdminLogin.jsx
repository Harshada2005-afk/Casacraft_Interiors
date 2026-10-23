import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ShieldCheck } from 'lucide-react';
import AuthShell from '../../components/layout/AuthShell';
import FormInput from '../../components/ui/FormInput';
import Button from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { adminLogin } from '../../services/api';
import useForm from '../../hooks/useForm';
import { isEmail, required } from '../../utils/validation';
import { img } from '../../utils/image';
import usePageTitle from '../../hooks/usePageTitle';

const rules = {
  email: [
    [required, 'Please enter your admin email.'],
    [isEmail, 'Please enter a valid email address.'],
  ],
  password: [[required, 'Please enter your password.']],
};

/** Admin sign-in screen. UI only – there is no real authentication in Phase 1. */
export default function AdminLogin() {
  usePageTitle('Admin Login');
  const { values, errors, handleChange, validateForm } = useForm({ email: 'admin@casacraftinteriors.com', password: '' }, rules);
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    const { user } = await adminLogin(values);
    setLoading(false);
    signIn(user);
    showToast('Signed in to the admin studio.');
    navigate('/admin');
  };

  return (
    <AuthShell
      dark
      image={img('officeOpen', 1600)}
      quote="Every great space starts with a well-run studio."
      quoteBy="CasaCraft Admin Studio"
    >
      <div className="rounded-[2rem] bg-ivory p-8 shadow-lift sm:p-10">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-charcoal text-gold-light">
          <ShieldCheck className="h-7 w-7" aria-hidden="true" />
        </span>
        <h1 className="mt-6 text-4xl">Admin Login</h1>
        <p className="mt-2 text-stone">Restricted area for CasaCraft studio staff.</p>

        <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
          <FormInput
            label="Admin Email"
            name="email"
            type="email"
            icon={Mail}
            value={values.email}
            onChange={handleChange}
            error={errors.email}
            autoComplete="username"
          />
          <FormInput
            label="Password"
            name="password"
            type="password"
            icon={Lock}
            value={values.password}
            onChange={handleChange}
            error={errors.password}
            autoComplete="current-password"
            placeholder="••••••••"
          />
          <Button type="submit" size="lg" className="w-full" loading={loading}>
            {loading ? 'Verifying…' : 'Sign in to Dashboard'}
          </Button>
        </form>
        <p className="mt-6 text-center text-xs text-stone">Demo mode: enter any password to continue.</p>
      </div>
    </AuthShell>
  );
}
