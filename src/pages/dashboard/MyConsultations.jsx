import { useMemo, useState } from 'react';
import { CalendarPlus } from 'lucide-react';
import DashboardHeader from '../../components/layout/DashboardHeader';
import Table from '../../components/ui/Table';
import StatusBadge from '../../components/ui/StatusBadge';
import Loading from '../../components/ui/Loading';
import Button from '../../components/ui/Button';
import { consultationStatuses } from '../../data/consultations';
import { getMyConsultations } from '../../services/api';
import useFetch from '../../hooks/useFetch';
import { formatDate } from '../../utils/format';
import usePageTitle from '../../hooks/usePageTitle';

const columns = [
  { key: 'id', header: 'Reference', render: (r) => <span className="font-medium text-charcoal">{r.id}</span> },
  { key: 'projectType', header: 'Project Type' },
  { key: 'date', header: 'Date', render: (r) => formatDate(r.date) },
  { key: 'budget', header: 'Budget' },
  { key: 'status', header: 'Status', render: (r) => <StatusBadge status={r.status} /> },
];

export default function MyConsultations() {
  usePageTitle('My Consultations');
  const { data, loading } = useFetch(getMyConsultations);
  const [status, setStatus] = useState('All');
  const rows = useMemo(() => (data || []).filter((c) => status === 'All' || c.status === status), [data, status]);

  return (
    <>
      <DashboardHeader
        title="My Consultations"
        subtitle="Track every consultation request and its status."
        actions={
          <Button to="/consultation" iconLeft={CalendarPlus}>
            New Request
          </Button>
        }
      />

      <div role="toolbar" aria-label="Filter by status" className="scrollbar-thin mb-6 flex gap-2 overflow-x-auto pb-1">
        {['All', ...consultationStatuses].map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            aria-pressed={status === s}
            className={`shrink-0 rounded-full px-4 py-2 text-sm transition ${status === s ? 'bg-charcoal text-ivory' : 'bg-white text-charcoal-light shadow-soft hover:text-gold-dark'}`}
          >
            {s}
          </button>
        ))}
      </div>

      {loading ? (
        <Loading label="Loading consultations" />
      ) : (
        <Table
          columns={columns}
          data={rows}
          caption="My consultation requests"
          emptyTitle="No consultations found"
          emptyText="Try a different status filter or book a new consultation."
        />
      )}
    </>
  );
}
