import { useState } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import DashboardHeader from '../../components/layout/DashboardHeader';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import FormInput from '../../components/ui/FormInput';
import Select from '../../components/ui/Select';
import Textarea from '../../components/ui/Textarea';
import EmptyState from '../../components/ui/EmptyState';
import SmartImage from '../../components/ui/SmartImage';
import { services as initialServices } from '../../data/services';
import { iconMap, getIcon } from '../../utils/icons';
import { useToast } from '../../context/ToastContext';
import useForm from '../../hooks/useForm';
import { required } from '../../utils/validation';
import { img } from '../../utils/image';
import usePageTitle from '../../hooks/usePageTitle';

const emptyService = { id: '', title: '', icon: 'Sparkles', short: '', startingPrice: '', features: '' };
const rules = {
  title: [[required, 'Service title is required.']],
  short: [[required, 'A short description is required.']],
  startingPrice: [[required, 'Starting price is required.']],
};

/** Admin service management – add, edit and delete in local state (Phase 1). */
export default function AdminServices() {
  usePageTitle('Admin · Services');
  const [items, setItems] = useState(initialServices);
  const [formOpen, setFormOpen] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const { showToast } = useToast();
  const { values, errors, handleChange, validateForm, setValues } = useForm(emptyService, rules);

  const openForm = (service) => {
    setValues(service ? { ...service, features: service.features.join(', ') } : emptyService);
    setFormOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const record = {
      ...values,
      features: values.features
        .split(',')
        .map((f) => f.trim())
        .filter(Boolean),
    };
    if (values.id) {
      setItems((list) => list.map((s) => (s.id === values.id ? { ...s, ...record } : s)));
      showToast(`“${values.title}” updated.`);
    } else {
      setItems((list) => [...list, { ...record, id: `svc-${Date.now()}`, image: img('livingSofa', 1200) }]);
      showToast(`“${values.title}” added.`);
    }
    setFormOpen(false);
  };

  const confirmDelete = () => {
    setItems((list) => list.filter((s) => s.id !== deleting.id));
    showToast(`“${deleting.title}” deleted.`, 'info');
    setDeleting(null);
  };

  return (
    <>
      <DashboardHeader
        title="Services"
        subtitle="Manage the services shown on the website."
        actions={
          <Button iconLeft={Plus} onClick={() => openForm()}>
            Add Service
          </Button>
        }
      />

      {items.length === 0 ? (
        <EmptyState
          title="No services"
          text="Add your first service to show it on the website."
          action={
            <Button iconLeft={Plus} onClick={() => openForm()}>
              Add Service
            </Button>
          }
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((s) => {
            const Icon = getIcon(s.icon);
            return (
              <article key={s.id} className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-soft">
                <div className="relative">
                  <SmartImage src={s.image} alt="" className="aspect-[16/8]" />
                  <span className="absolute -bottom-6 left-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-charcoal text-gold-light shadow-lift">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6 pt-10">
                  <h2 className="text-2xl">{s.title}</h2>
                  <p className="mt-2 flex-1 text-sm text-stone">{s.short}</p>
                  <p className="mt-4 text-sm">
                    From <span className="font-serif text-xl">{s.startingPrice}</span> · {s.features.length} features
                  </p>
                  <div className="mt-5 flex gap-2 border-t border-beige pt-5">
                    <Button variant="outline" size="sm" iconLeft={Pencil} onClick={() => openForm(s)} aria-label={`Edit ${s.title}`}>
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconLeft={Trash2}
                      className="text-rose-600 hover:bg-rose-50"
                      onClick={() => setDeleting(s)}
                      aria-label={`Delete ${s.title}`}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      <Modal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title={values.id ? 'Edit Service' : 'Add Service'}
        footer={
          <>
            <Button variant="ghost" onClick={() => setFormOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" form="service-form">
              {values.id ? 'Save Changes' : 'Add Service'}
            </Button>
          </>
        }
      >
        <form id="service-form" onSubmit={handleSave} noValidate className="grid gap-5 sm:grid-cols-2">
          <FormInput
            label="Title"
            name="title"
            value={values.title}
            onChange={handleChange}
            error={errors.title}
            required
            className="sm:col-span-2"
          />
          <Select label="Icon" name="icon" value={values.icon} onChange={handleChange} options={Object.keys(iconMap)} />
          <FormInput
            label="Starting Price"
            name="startingPrice"
            value={values.startingPrice}
            onChange={handleChange}
            error={errors.startingPrice}
            required
            placeholder="₹2 Lakh"
          />
          <Textarea
            label="Short Description"
            name="short"
            rows={3}
            value={values.short}
            onChange={handleChange}
            error={errors.short}
            required
            className="sm:col-span-2"
          />
          <FormInput
            label="Features"
            name="features"
            value={values.features}
            onChange={handleChange}
            hint="Separate features with commas."
            className="sm:col-span-2"
          />
        </form>
      </Modal>

      <Modal
        open={!!deleting}
        onClose={() => setDeleting(null)}
        title="Delete service?"
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setDeleting(null)}>
              Cancel
            </Button>
            <Button variant="danger" iconLeft={Trash2} onClick={confirmDelete}>
              Delete
            </Button>
          </>
        }
      >
        <p className="text-stone">
          “<span className="text-charcoal">{deleting?.title}</span>” will be removed. In this demo the change resets when you refresh.
        </p>
      </Modal>
    </>
  );
}
