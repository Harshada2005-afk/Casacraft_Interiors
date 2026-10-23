import { useEffect, useMemo, useState } from 'react';
import { Eye, Mail, Search } from 'lucide-react';
import DashboardHeader from '../../components/layout/DashboardHeader';
import Table from '../../components/ui/Table';
import StatusBadge from '../../components/ui/StatusBadge';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import Loading from '../../components/ui/Loading';
import { consultationStatuses } from '../../data/consultations';
import { getAdminConsultations } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import useFetch from '../../hooks/useFetch';
import { formatDate } from '../../utils/format';
import usePageTitle from '../../hooks/usePageTitle';

/** Admin consultation management with frontend-only status changes. */
export default function AdminConsultations() {
  usePageTitle('Admin · Consultations');
  const { data, loading } = useFetch(getAdminConsultations);
  const [rows, setRows] = useState([]);
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');
  const [viewing, setViewing] = useState(null);
  const { showToast } = useToast();

  useEffect(() => {
    if (data) setRows(data);
  }, [data]);

  const updateStatus = (id, status) => {
    setRows((list) => list.map((r) => (r.id === id ? { ...r, status } : r)));
    showToast(`${id} marked as ${status}.`);
  };

  const filtered = useMemo(
    () =>
      rows.filter(
        (r) =>
          (filter === 'All' || r.status === filter) && `${r.customer} ${r.projectType} ${r.id}`.toLowerCase().includes(query.toLowerCase()),
      ),
    [rows, filter, query],
  );

  const counts = useMemo(() => Object.fromEntries(consultationStatuses.map((s) => [s, rows.filter((r) => r.status === s).length])), [rows]);

  const columns = [
    {
      key: 'customer',
      header: 'Customer',
      render: (r) => (
        <span className="block text-left">
          <span className="block font-medium text-charcoal">{r.customer}</span>
          <span className="text-xs text-stone">{r.id}</span>
        </span>
      ),
    },
    { key: 'projectType', header: 'Project Type' },
    { key: 'date', header: 'Date', render: (r) => formatDate(r.date) },
    { key: 'budget', header: 'Budget' },
    {
      key: 'status',
      header: 'Status',
      render: (r) => (
        <select
          value={r.status}
          onChange={(e) => updateStatus(r.id, e.target.value)}
          className="rounded-full border border-beige-dark bg-white px-3 py-1.5 text-xs focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
          aria-label={`Status for ${r.customer}`}
        >
          {consultationStatuses.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      className: 'text-right',
      render: (r) => (
        <button
          onClick={() => setViewing(r)}
          className="rounded-full p-2 text-stone transition hover:bg-cream hover:text-charcoal"
          aria-label={`View request from ${r.customer}`}
        >
          <Eye className="h-4 w-4" />
        </button>
      ),
    },
  ];

  return (
    <>
      <DashboardHeader title="Consultations" subtitle="Review requests and update their status." />

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {consultationStatuses.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(filter === s ? 'All' : s)}
            aria-pressed={filter === s}
            className={`rounded-2xl p-4 text-left transition ${filter === s ? 'bg-charcoal text-ivory' : 'bg-white shadow-soft hover:-translate-y-0.5'}`}
          >
            <p className={`text-xs ${filter === s ? 'text-gold-light' : 'text-stone'}`}>{s}</p>
            <p className="mt-1 font-serif text-3xl">{counts[s] ?? 0}</p>
          </button>
        ))}
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search customer or reference…"
            className="field rounded-full pl-11"
            aria-label="Search consultations"
          />
        </div>
        {filter !== 'All' && (
          <Button variant="ghost" size="sm" onClick={() => setFilter('All')}>
            Clear “{filter}” filter
          </Button>
        )}
      </div>

      {loading ? (
        <Loading label="Loading consultations" />
      ) : (
        <Table columns={columns} data={filtered} caption="Consultation requests" emptyTitle="No consultations match" />
      )}

      <Modal open={!!viewing} onClose={() => setViewing(null)} title={`Request ${viewing?.id || ''}`}>
        {viewing && (
          <div className="space-y-6">
            <dl className="grid grid-cols-2 gap-4">
              {[
                ['Customer', viewing.customer],
                ['Email', viewing.email],
                ['Project Type', viewing.projectType],
                ['Budget', viewing.budget],
                ['Preferred Date', formatDate(viewing.date)],
                ['Status', <StatusBadge key="s" status={rows.find((r) => r.id === viewing.id)?.status} />],
              ].map(([k, v]) => (
                <div key={k} className="rounded-2xl bg-cream p-4">
                  <dt className="text-xs uppercase tracking-wider text-stone">{k}</dt>
                  <dd className="mt-1 break-words text-sm font-medium">{v}</dd>
                </div>
              ))}
            </dl>
            <Button href={`mailto:${viewing.email}`} variant="outline" iconLeft={Mail}>
              Email customer
            </Button>
          </div>
        )}
      </Modal>
    </>
  );
}
