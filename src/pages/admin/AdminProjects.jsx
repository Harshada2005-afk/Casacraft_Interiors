import { useEffect, useMemo, useState } from 'react';
import { Eye, Pencil, Plus, Search, Trash2, ExternalLink } from 'lucide-react';
import DashboardHeader from '../../components/layout/DashboardHeader';
import Table from '../../components/ui/Table';
import StatusBadge from '../../components/ui/StatusBadge';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import FormInput from '../../components/ui/FormInput';
import Select from '../../components/ui/Select';
import Loading from '../../components/ui/Loading';
import SmartImage from '../../components/ui/SmartImage';
import { projectCategories } from '../../data/projects';
import { designStyleOptions } from '../../data/consultations';
import { projectStatuses } from '../../data/dashboard';
import { getAdminProjects } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import useFetch from '../../hooks/useFetch';
import useForm from '../../hooks/useForm';
import { required } from '../../utils/validation';
import { img } from '../../utils/image';
import usePageTitle from '../../hooks/usePageTitle';

const emptyProject = { id: '', title: '', category: '', location: '', style: '', status: 'Planning', image: '' };
const rules = {
  title: [[required, 'Project name is required.']],
  category: [[required, 'Choose a category.']],
  location: [[required, 'Location is required.']],
  style: [[required, 'Choose a style.']],
};

/** Admin project management – all changes live in component state only (Phase 1). */
export default function AdminProjects() {
  usePageTitle('Admin · Projects');
  const { data, loading } = useFetch(getAdminProjects);
  const [rows, setRows] = useState([]);
  const [query, setQuery] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [viewing, setViewing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const { showToast } = useToast();
  const { values, errors, handleChange, validateForm, setValues } = useForm(emptyProject, rules);

  useEffect(() => {
    if (data) setRows(data);
  }, [data]);

  const filtered = useMemo(
    () => rows.filter((r) => `${r.title} ${r.location} ${r.category} ${r.style}`.toLowerCase().includes(query.toLowerCase())),
    [rows, query],
  );

  const openForm = (project = emptyProject) => {
    setValues(project);
    setFormOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (values.id) {
      setRows((list) => list.map((r) => (r.id === values.id ? values : r)));
      showToast(`“${values.title}” updated.`);
    } else {
      const created = { ...values, id: `new-${Date.now()}`, image: img('livingSofa', 600) };
      setRows((list) => [created, ...list]);
      showToast(`“${values.title}” added.`);
    }
    setFormOpen(false);
  };

  const confirmDelete = () => {
    setRows((list) => list.filter((r) => r.id !== deleting.id));
    showToast(`“${deleting.title}” deleted.`, 'info');
    setDeleting(null);
  };

  const iconBtn = 'rounded-full p-2 text-stone transition hover:bg-cream hover:text-charcoal';
  const columns = [
    {
      key: 'title',
      header: 'Project',
      render: (r) => (
        <span className="flex items-center gap-3 text-left">
          <SmartImage src={r.image} alt="" className="hidden h-11 w-14 shrink-0 rounded-lg md:block" />
          <span className="font-medium text-charcoal">{r.title}</span>
        </span>
      ),
    },
    { key: 'category', header: 'Category' },
    { key: 'location', header: 'Location' },
    { key: 'style', header: 'Style' },
    { key: 'status', header: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    {
      key: 'actions',
      header: 'Actions',
      className: 'text-right',
      render: (r) => (
        <span className="inline-flex gap-1">
          <button className={iconBtn} onClick={() => setViewing(r)} aria-label={`View ${r.title}`}>
            <Eye className="h-4 w-4" />
          </button>
          <button className={iconBtn} onClick={() => openForm(r)} aria-label={`Edit ${r.title}`}>
            <Pencil className="h-4 w-4" />
          </button>
          <button
            className={`${iconBtn} hover:bg-rose-50 hover:text-rose-600`}
            onClick={() => setDeleting(r)}
            aria-label={`Delete ${r.title}`}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </span>
      ),
    },
  ];

  return (
    <>
      <DashboardHeader
        title="Projects"
        subtitle={`${rows.length} projects in the portfolio`}
        actions={
          <Button iconLeft={Plus} onClick={() => openForm()}>
            Add Project
          </Button>
        }
      />

      <div className="relative mb-6 max-w-sm">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone" aria-hidden="true" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search projects…"
          className="field rounded-full pl-11"
          aria-label="Search projects"
        />
      </div>

      {loading ? (
        <Loading label="Loading projects" />
      ) : (
        <Table columns={columns} data={filtered} caption="Projects" emptyTitle="No projects match your search" />
      )}

      {/* Add / Edit */}
      <Modal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title={values.id ? 'Edit Project' : 'Add Project'}
        footer={
          <>
            <Button variant="ghost" onClick={() => setFormOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" form="project-form">
              {values.id ? 'Save Changes' : 'Add Project'}
            </Button>
          </>
        }
      >
        <form id="project-form" onSubmit={handleSave} noValidate className="grid gap-5 sm:grid-cols-2">
          <FormInput
            label="Project Name"
            name="title"
            value={values.title}
            onChange={handleChange}
            error={errors.title}
            required
            className="sm:col-span-2"
          />
          <Select
            label="Category"
            name="category"
            value={values.category}
            onChange={handleChange}
            error={errors.category}
            required
            placeholder="Select category"
            options={projectCategories.filter((c) => c !== 'All')}
          />
          <Select
            label="Design Style"
            name="style"
            value={values.style}
            onChange={handleChange}
            error={errors.style}
            required
            placeholder="Select style"
            options={designStyleOptions}
          />
          <FormInput label="Location" name="location" value={values.location} onChange={handleChange} error={errors.location} required />
          <Select label="Status" name="status" value={values.status} onChange={handleChange} options={projectStatuses} />
        </form>
      </Modal>

      {/* View */}
      <Modal open={!!viewing} onClose={() => setViewing(null)} title={viewing?.title} size="lg">
        {viewing && (
          <div className="space-y-6">
            <SmartImage src={viewing.image?.replace('w=1600', 'w=1200')} alt={viewing.title} className="aspect-[16/9] rounded-2xl" />
            <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                ['Category', viewing.category],
                ['Style', viewing.style],
                ['Location', viewing.location],
                ['Status', <StatusBadge key="s" status={viewing.status} />],
              ].map(([k, v]) => (
                <div key={k} className="rounded-2xl bg-cream p-4">
                  <dt className="text-xs uppercase tracking-wider text-stone">{k}</dt>
                  <dd className="mt-2 text-sm font-medium">{v}</dd>
                </div>
              ))}
            </dl>
            {!viewing.id.startsWith('new-') && (
              <Button to={`/portfolio/${viewing.id}`} variant="outline" icon={ExternalLink} target="_blank">
                Open public page
              </Button>
            )}
          </div>
        )}
      </Modal>

      {/* Delete confirmation */}
      <Modal
        open={!!deleting}
        onClose={() => setDeleting(null)}
        title="Delete project?"
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setDeleting(null)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDelete} iconLeft={Trash2}>
              Delete
            </Button>
          </>
        }
      >
        <p className="text-stone">
          “<span className="text-charcoal">{deleting?.title}</span>” will be removed from the list. In this demo the change resets when you
          refresh.
        </p>
      </Modal>
    </>
  );
}
