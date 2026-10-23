import { useState } from 'react';
import { Heart } from 'lucide-react';
import DashboardHeader from '../../components/layout/DashboardHeader';
import ProjectCard from '../../components/cards/ProjectCard';
import EmptyState from '../../components/ui/EmptyState';
import Button from '../../components/ui/Button';
import { projects } from '../../data/projects';
import { useToast } from '../../context/ToastContext';
import usePageTitle from '../../hooks/usePageTitle';

export default function SavedProjects() {
  usePageTitle('Saved Projects');
  const [saved, setSaved] = useState(() => projects.slice(0, 8));
  const { showToast } = useToast();

  const remove = (id) => {
    setSaved((list) => list.filter((p) => p.id !== id));
    showToast('Removed from your saved projects.', 'info');
  };

  return (
    <>
      <DashboardHeader
        title="Saved Projects"
        subtitle="Your personal inspiration board."
        actions={
          <Button to="/portfolio" variant="outline">
            Browse Portfolio
          </Button>
        }
      />
      {saved.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="No saved projects"
          text="Tap the heart on any project to keep it here for inspiration."
          action={<Button to="/portfolio">Explore Portfolio</Button>}
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {saved.map((p) => (
            <div key={p.id} className="relative">
              <ProjectCard project={p} showButton={false} />
              <button
                onClick={() => remove(p.id)}
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-rose-500 shadow-soft backdrop-blur transition hover:scale-110"
                aria-label={`Remove ${p.title} from saved projects`}
              >
                <Heart className="h-5 w-5 fill-current" />
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
