import { Link, useOutletContext } from 'react-router-dom';
import { ArrowRight, CalendarPlus, Clock } from 'lucide-react';
import DashboardHeader from '../../components/layout/DashboardHeader';
import StatCard from '../../components/ui/StatCard';
import StatusBadge from '../../components/ui/StatusBadge';
import SmartImage from '../../components/ui/SmartImage';
import Button from '../../components/ui/Button';
import { customerStats, myProjects, customerActivity } from '../../data/dashboard';
import { myConsultations } from '../../data/consultations';
import { formatDate } from '../../utils/format';
import usePageTitle from '../../hooks/usePageTitle';

export default function CustomerDashboard() {
  usePageTitle('Dashboard');
  const { user } = useOutletContext();
  const active = myProjects.filter((p) => p.status !== 'Completed');
  const upcoming = myConsultations.find((c) => c.status === 'Scheduled');
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <>
      <DashboardHeader
        title={`${greeting}, ${user?.name?.split(' ')[0] || 'there'}`}
        subtitle="Here is what is happening with your spaces today."
        actions={
          <Button to="/consultation" iconLeft={CalendarPlus}>
            Book Consultation
          </Button>
        }
      />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {customerStats.map((s, i) => (
          <StatCard key={s.label} {...s} highlight={i === 0} />
        ))}
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-3">
        {/* Active projects */}
        <section className="rounded-3xl bg-white p-6 shadow-soft xl:col-span-2" aria-labelledby="active-heading">
          <div className="flex items-center justify-between">
            <h2 id="active-heading" className="text-3xl">
              Active projects
            </h2>
            <Link to="/dashboard/projects" className="link-underline flex items-center gap-1 text-sm text-gold-dark">
              View all <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <ul className="mt-6 space-y-4">
            {active.map((p) => (
              <li
                key={p.id}
                className="flex flex-col gap-4 rounded-2xl border border-beige p-4 transition hover:border-gold/50 sm:flex-row sm:items-center"
              >
                <SmartImage
                  src={p.image}
                  alt={p.name}
                  className="aspect-[16/10] w-full shrink-0 rounded-xl sm:h-20 sm:w-28 sm:aspect-auto"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium text-charcoal">{p.name}</p>
                    <StatusBadge status={p.status} />
                  </div>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-stone">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" /> {p.nextMilestone}
                  </p>
                  <div className="mt-3 flex items-center gap-3">
                    <div
                      className="h-2 flex-1 overflow-hidden rounded-full bg-cream"
                      role="progressbar"
                      aria-valuenow={p.progress}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${p.name} progress`}
                    >
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-gold-light to-gold transition-all duration-1000"
                        style={{ width: `${p.progress}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-charcoal">{p.progress}%</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Upcoming + activity */}
        <div className="space-y-6">
          {upcoming && (
            <section className="rounded-3xl bg-charcoal p-6 text-ivory" aria-labelledby="upcoming-heading">
              <p className="eyebrow text-gold-light">Next consultation</p>
              <h2 id="upcoming-heading" className="mt-3 text-3xl text-white">
                {upcoming.projectType}
              </h2>
              <p className="mt-2 text-white/70">
                {formatDate(upcoming.date, { weekday: 'long', day: 'numeric', month: 'long' })} · 11:00 AM
              </p>
              <Button to="/dashboard/consultations" variant="gold" size="sm" className="mt-6">
                View details
              </Button>
            </section>
          )}
          <section className="rounded-3xl bg-white p-6 shadow-soft" aria-labelledby="activity-heading">
            <h2 id="activity-heading" className="text-2xl">
              Recent activity
            </h2>
            <ol className="mt-5 space-y-5 border-l border-beige pl-5">
              {customerActivity.map((a) => (
                <li key={a.text} className="relative">
                  <span className="absolute -left-[25px] top-1.5 h-2.5 w-2.5 rounded-full bg-gold ring-4 ring-white" aria-hidden="true" />
                  <p className="text-sm text-charcoal-light">{a.text}</p>
                  <p className="mt-1 text-xs text-stone">{a.time}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </>
  );
}
