import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Camera, Mail, MapPin, Pencil, Phone, User } from 'lucide-react';
import DashboardHeader from '../../components/layout/DashboardHeader';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import FormInput from '../../components/ui/FormInput';
import Textarea from '../../components/ui/Textarea';
import { mockCustomer } from '../../data/dashboard';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { updateProfile } from '../../services/api';
import useForm from '../../hooks/useForm';
import { isEmail, isPhone, required } from '../../utils/validation';
import usePageTitle from '../../hooks/usePageTitle';

const rules = {
  name: [[required, 'Name is required.']],
  email: [
    [required, 'Email is required.'],
    [isEmail, 'Please enter a valid email.'],
  ],
  phone: [[isPhone, 'Please enter a valid phone number.']],
};

export default function Profile() {
  usePageTitle('Profile');
  const { user } = useOutletContext();
  const { user: authUser, setUser } = useAuth();
  const [profile, setProfile] = useState({ ...mockCustomer, ...user });
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();
  const { values, errors, handleChange, validateForm, setValues } = useForm(profile, rules);

  const openEdit = () => {
    setValues(profile);
    setEditing(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setSaving(true);
    const updated = await updateProfile(values); // mock
    setSaving(false);
    setProfile(updated);
    if (authUser) setUser({ ...authUser, ...updated });
    setEditing(false);
    showToast('Profile updated successfully.');
  };

  const details = [
    { icon: User, label: 'Full Name', value: profile.name },
    { icon: Mail, label: 'Email', value: profile.email },
    { icon: Phone, label: 'Phone', value: profile.phone },
    { icon: MapPin, label: 'Address', value: profile.address },
  ];

  return (
    <>
      <DashboardHeader
        title="My Profile"
        subtitle="Manage your personal information."
        actions={
          <Button iconLeft={Pencil} onClick={openEdit}>
            Edit Profile
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="relative overflow-hidden rounded-3xl bg-charcoal p-8 text-center text-ivory">
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-br from-gold-dark/60 to-transparent" aria-hidden="true" />
          <div className="relative mx-auto h-32 w-32">
            <img
              src={profile.avatar}
              alt={`Profile photo of ${profile.name}`}
              className="h-full w-full rounded-full object-cover ring-4 ring-charcoal"
            />
            <button
              onClick={() => showToast('Photo upload will be available once the backend is connected.', 'info')}
              className="absolute bottom-1 right-1 flex h-9 w-9 items-center justify-center rounded-full bg-gold text-white shadow-lift transition hover:bg-gold-dark"
              aria-label="Change profile photo"
            >
              <Camera className="h-4 w-4" />
            </button>
          </div>
          <h2 className="relative mt-5 text-3xl text-white">{profile.name}</h2>
          <p className="relative mt-1 text-sm text-white/60">Client since {profile.memberSince}</p>
          <div className="relative mt-6 grid grid-cols-3 gap-2 border-t border-white/10 pt-6 text-center">
            {[
              ['3', 'Projects'],
              ['5', 'Consults'],
              ['8', 'Saved'],
            ].map(([n, l]) => (
              <div key={l}>
                <p className="font-serif text-2xl text-gold-light">{n}</p>
                <p className="text-xs text-white/60">{l}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-white p-6 shadow-soft sm:p-8 lg:col-span-2" aria-labelledby="details-heading">
          <h2 id="details-heading" className="text-3xl">
            Personal details
          </h2>
          <dl className="mt-6 divide-y divide-beige">
            {details.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex flex-col gap-1 py-5 sm:flex-row sm:items-center sm:gap-6">
                <dt className="flex w-40 shrink-0 items-center gap-3 text-sm text-stone">
                  <Icon className="h-4 w-4 text-gold" aria-hidden="true" /> {label}
                </dt>
                <dd className="text-charcoal">{value}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>

      <Modal
        open={editing}
        onClose={() => setEditing(false)}
        title="Edit Profile"
        footer={
          <>
            <Button variant="ghost" onClick={() => setEditing(false)}>
              Cancel
            </Button>
            <Button type="submit" form="profile-form" loading={saving}>
              Save Changes
            </Button>
          </>
        }
      >
        <form id="profile-form" onSubmit={handleSave} noValidate className="grid gap-5 sm:grid-cols-2">
          <FormInput
            label="Full Name"
            name="name"
            value={values.name}
            onChange={handleChange}
            error={errors.name}
            required
            className="sm:col-span-2"
          />
          <FormInput label="Email" name="email" type="email" value={values.email} onChange={handleChange} error={errors.email} required />
          <FormInput label="Phone" name="phone" type="tel" value={values.phone} onChange={handleChange} error={errors.phone} />
          <Textarea label="Address" name="address" rows={3} value={values.address} onChange={handleChange} className="sm:col-span-2" />
        </form>
      </Modal>
    </>
  );
}
