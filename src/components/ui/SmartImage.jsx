import { useState } from 'react';
import { ImageIcon } from 'lucide-react';

/**
 * Lazy-loaded image that fades in when ready and shows an elegant
 * placeholder if the image fails to load.
 */
export default function SmartImage({ src, alt, className = '', imgClassName = '', eager = false, ...props }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-beige to-cream ${className}`}>
      {failed ? (
        <div className="absolute inset-0 flex items-center justify-center text-stone" role="img" aria-label={alt}>
          <ImageIcon className="h-8 w-8" aria-hidden="true" />
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`h-full w-full object-cover transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'} ${imgClassName}`}
          {...props}
        />
      )}
    </div>
  );
}
