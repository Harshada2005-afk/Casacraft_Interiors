import useInView from '../../hooks/useInView';
import SmartImage from './SmartImage';

/**
 * Image that is unveiled with a curtain-style clip animation on scroll.
 * The observer watches the outer wrapper: an element hidden by its own
 * clip-path never reports as "in view", so the clip lives on the inner div.
 */
export default function ImageReveal({ src, alt, className = '', imgClassName = '' }) {
  const [ref, visible] = useInView({ threshold: 0.15 });
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div className={`img-reveal h-full w-full ${visible ? 'is-visible' : ''}`}>
        <SmartImage src={src} alt={alt} className="h-full w-full" imgClassName={imgClassName} />
      </div>
    </div>
  );
}
