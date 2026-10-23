import { useState } from 'react';
import DashboardHeader from '../../components/layout/DashboardHeader';
import Button from '../../components/ui/Button';
import { useToast } from '../../context/ToastContext';
import usePageTitle from '../../hooks/usePageTitle';

const options = [
  { key: 'email', title: 'Email updates', text: 'Project milestones and consultation reminders.' },
  { key: 'sms', title: 'SMS notifications', text: 'Site visit and appointment alerts on your phone.' },
  { key: 'newsletter', title: 'Design newsletter', text: 'Monthly inspiration from the CasaCraft journal.' },
  { key: 'offers', title: 'Offers & events', text: 'Invitations to studio events and seasonal offers.' },
];

function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={`relative h-7 w-12 shrink-0 rounded-full transition-colors duration-300 ${checked ? 'bg-gold' : 'bg-beige-dark'}`}
    >
      <span
        className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all duration-300 ${checked ? 'left-6' : 'left-1'}`}
      />
    </button>
  );
}

export default function AccountSettings() {
  usePageTitle('Settings');
  const [prefs, setPrefs] = useState({ email: true, sms: true, newsletter: false, offers: false });
  const { showToast } = useToast();

  return (
    <>
      <DashboardHeader title="Settings" subtitle="Choose how we keep in touch with you." />
      <section className="max-w-3xl rounded-3xl bg-white p-6 shadow-soft sm:p-8">
        <h2 className="text-3xl">Notifications</h2>
        <ul className="mt-6 divide-y divide-beige">
          {options.map((o) => (
            <li key={o.key} className="flex items-center justify-between gap-6 py-5">
              <div>
                <p className="font-medium text-charcoal">{o.title}</p>
                <p className="mt-1 text-sm text-stone">{o.text}</p>
              </div>
              <Toggle checked={prefs[o.key]} label={o.title} onChange={() => setPrefs((p) => ({ ...p, [o.key]: !p[o.key] }))} />
            </li>
          ))}
        </ul>
        <Button className="mt-6" onClick={() => showToast('Your preferences have been saved.')}>
          Save Preferences
        </Button>
      </section>
    </>
  );
}
