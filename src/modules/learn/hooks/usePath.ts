import { useState, useEffect } from 'react';
import { Path } from '../../../types';
import { learnService } from '../services';

export function usePath(idOrSlug?: string) {
  const [path, setPath] = useState<Path | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!idOrSlug) {
      setPath(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    learnService.getPath(idOrSlug).then((data) => {
      setPath(data);
      setLoading(false);
    });
  }, [idOrSlug]);

  return { path, loading };
}

export default usePath;

