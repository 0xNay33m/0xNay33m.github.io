import { useEffect } from 'react';

export function useTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} | Md Nayeem Ahmed` : 'Md Nayeem Ahmed';
  }, [title]);
}
