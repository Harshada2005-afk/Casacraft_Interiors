import { Link } from 'react-router-dom';
import { ArrowRight, Plus } from 'lucide-react';
import DashboardHeader from '../../components/layout/DashboardHeader';
import StatCard from '../../components/ui/StatCard';
import StatusBadge from '../../components/ui/StatusBadge';
import Table from '../../components/ui/Table';
import Button from '../../components/ui/Button';
import BarChart from '../../components/charts/BarChart';
import LineChart from '../../components/charts/LineChart';
import DonutChart from '../../components/charts/DonutChart';
import { adminStats, monthlyConsultations, monthlyRevenue, projectsByCategory, recentMessages } from '../../data/dashboard';
import { allConsultations } from '../../data/consultations';
import { formatDate } from '../../utils/format';
import usePageTitle from '../../hooks/usePageTitle';

const columns = [
  { key: 'customer', header: 'Customer', render: (r) => <span className="font-medium text-charcoal">{r.customer}</span> },
  { key: 'projectType', header: 'Project Type' },
  { key: 'date', header: 'Date', render: (r) => formatDate(r.date) },
  { key: 'status', header: 'Status', render: (r) => <StatusBadge status={r.status} /> },
];

export default function AdminDashboard() {
  usePageTitle('Admin Dashboard');

  return (
    <>
      <DashboardHeader
        title="Studio Overview"
        subtitle="A snapshot of projects, clients and enquiries."
        actions={
          <Button to="/admin/projects" iconLeft={Plus}>
            Add Project
          </Button>
        }
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {adminStats.map((s, i) => (
          <StatCard key={s.label} {...s} highlight={i === 0} />
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3 [&>*]:min-w-0">
        <section className="rounded-3xl bg-white p-6 shadow-soft lg:col-span-2" aria-labelledby="chart-consultations">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-2">
            <div>
              <h2 id="chart-consultations" className="text-2xl">
                Consultation requests
              </h2>
              <p className="text-sm text-stone">Last 6 months</p>
            </div>
            <p className="text-sm font-medium text-emerald-600">+35% vs last month</p>
          </div>
          <BarChart data={monthlyConsultations} title="Monthly consultation requests" />
        </section>

        <section className="rounded-3xl bg-white p-6 shadow-soft" aria-labelledby="chart-category">
          <h2 id="chart-category" className="mb-6 text-2xl">
            Projects by category
          </h2>
          <DonutChart data={projectsByCategory} title="Projects by category" />
        </section>

        <section className="rounded-3xl bg-white p-6 shadow-soft lg:col-span-2" aria-labelledby="chart-revenue">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-2">
            <div>
              <h2 id="chart-revenue" className="text-2xl">
                Revenue
              </h2>
              <p className="text-sm text-stone">In ₹ lakh, last 6 months</p>
            </div>
            <p className="font-serif text-3xl">₹71L</p>
          </div>
          <LineChart data={monthlyRevenue} title="Monthly revenue in lakh rupees" prefix="₹" suffix="L" />
        </section>

        <section className="rounded-3xl bg-white p-6 shadow-soft" aria-labelledby="messages-heading">
          <h2 id="messages-heading" className="text-2xl">
            Recent messages
          </h2>
          <ul className="mt-5 space-y-5">
            {recentMessages.map((m) => (
              <li key={m.name} className="flex gap-3">
                <img src={m.avatar} alt="" className="h-10 w-10 shrink-0 rounded-full object-cover" loading="lazy" />
                <div className="min-w-0">
                  <p className="flex items-baseline justify-between gap-2 text-sm">
                    <span className="font-medium text-charcoal">{m.name}</span>
                    <span className="shrink-0 text-xs text-stone">{m.time}</span>
                  </p>
                  <p className="truncate text-sm text-stone">{m.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="mt-8" aria-labelledby="recent-heading">
        <div className="mb-4 flex items-center justify-between">
          <h2 id="recent-heading" className="text-3xl">
            Latest consultations
          </h2>
          <Link to="/admin/consultations" className="link-underline flex items-center gap-1 text-sm text-gold-dark">
            Manage <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <Table columns={columns} data={allConsultations.slice(0, 5)} caption="Latest consultation requests" />
      </section>
    </>
  );
}
