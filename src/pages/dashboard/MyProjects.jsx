import { Eye, MapPin, User } from 'lucide-react';
import { useState } from 'react';
import DashboardHeader from '../../components/layout/DashboardHeader';
import StatusBadge from '../../components/ui/StatusBadge';
import SmartImage from '../../components/ui/SmartImage';
import Loading from '../../components/ui/Loading';
import EmptyState from '../../components/ui/EmptyState';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import { getMyProjects } from '../../services/api';
import useFetch from '../../hooks/useFetch';
import usePageTitle from '../../hooks/usePageTitle';

export default function MyProjects() {
  usePageTitle('My Projects');
  const { data: projects, loading } = useFetch(getMyProjects);
  const [selected, setSelected] = useState(null);

  return (
    <>
      <DashboardHeader title="My Projects" subtitle="Follow the progress of every space we are designing for you." />

      {loading && <Loading variant="cards" count={3} label="Loading your projects" />}
      {!loading && !projects?.length && (
        <EmptyState
          title="No projects yet"
          text="Book a consultation to start your first project."
          action={<Button to="/consultation">Book Consultation</Button>}
        />
      )}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects?.map((p) => (
          <article
            key={p.id}
            className="group overflow-hidden rounded-3xl bg-white shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift"
          >
            <div className="relative">
              <SmartImage
                src={p.image}
                alt={p.name}
                className="aspect-[16/10]"
                imgClassName="transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute left-4 top-4">
                <StatusBadge status={p.status} />
              </span>
            </div>
            <div className="p-6">
              <h2 className="text-2xl leading-snug">{p.name}</h2>
              <p className="mt-2 flex items-center gap-1.5 text-sm text-stone">
                <MapPin className="h-4 w-4 text-gold" aria-hidden="true" /> {p.location}
              </p>
              <div className="mt-5">
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-stone">Progress</span>
                  <span className="font-medium">{p.progress}%</span>
                </div>
                <div
                  className="h-2 overflow-hidden rounded-full bg-cream"
                  role="progressbar"
                  aria-valuenow={p.progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${p.name} progress`}
                >
                  <div className="h-full rounded-full bg-gradient-to-r from-gold-light to-gold" style={{ width: `${p.progress}%` }} />
                </div>
              </div>
              <Button variant="outline" size="sm" className="mt-6 w-full" iconLeft={Eye} onClick={() => setSelected(p)}>
                View Project
              </Button>
            </div>
          </article>
        ))}
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.name} size="lg">
        {selected && (
          <div className="space-y-6">
            <SmartImage src={selected.image} alt={selected.name} className="aspect-[16/9] rounded-2xl" />
            <dl className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-cream p-4">
                <dt className="text-xs uppercase tracking-wider text-stone">Status</dt>
                <dd className="mt-2">
                  <StatusBadge status={selected.status} />
                </dd>
              </div>
              <div className="rounded-2xl bg-cream p-4">
                <dt className="text-xs uppercase tracking-wider text-stone">Designer</dt>
                <dd className="mt-2 flex items-center gap-2 font-medium">
                  <User className="h-4 w-4 text-gold" aria-hidden="true" />
                  {selected.designer}
                </dd>
              </div>
              <div className="rounded-2xl bg-cream p-4">
                <dt className="text-xs uppercase tracking-wider text-stone">Progress</dt>
                <dd className="mt-2 font-serif text-3xl">{selected.progress}%</dd>
              </div>
            </dl>
            <p className="text-stone">
              <span className="font-medium text-charcoal">Next milestone:</span> {selected.nextMilestone}
            </p>
          </div>
        )}
      </Modal>
    </>
  );
}
