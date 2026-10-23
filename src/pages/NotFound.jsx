import { ArrowLeft } from 'lucide-react';
import Hero from '../components/ui/Hero';
import Button from '../components/ui/Button';
import { img } from '../utils/image';
import usePageTitle from '../hooks/usePageTitle';

export default function NotFound() {
  usePageTitle('Page not found');
  return (
    <Hero
      image={img('livingCalm', 2400)}
      fullHeight
      eyebrow="Error 404"
      title="This room doesn’t exist… yet."
      subtitle="The page you are looking for has moved or never existed. Let’s get you back somewhere beautiful."
    >
      <div className="flex flex-wrap gap-4">
        <Button to="/" variant="gold" size="lg" iconLeft={ArrowLeft}>
          Back to Home
        </Button>
        <Button to="/portfolio" variant="light" size="lg">
          View Portfolio
        </Button>
      </div>
    </Hero>
  );
}
