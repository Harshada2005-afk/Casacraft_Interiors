import { useEffect } from 'react';

/** Sets the browser tab title for the current page. */
export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | CasaCraft Interiors` : 'CasaCraft Interiors | Beautiful Spaces. Thoughtfully Designed.';
  }, [title]);
}
