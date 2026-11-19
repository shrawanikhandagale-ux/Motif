import { useState, useEffect } from 'react';
import { Path } from '../../../types';
import { learnService } from '../services';

export function usePaths(domain?: string) {
  const [paths, setPaths] = useState<Path[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    learnService.getPaths(domain).then((data) => {
      setPaths(data);
      setLoading(false);
    });
  }, [domain]);

  return { paths, loading };
}

export default usePaths;

