import { useState, useEffect } from 'react';
import { Brief } from '../../../types';
import { learnService } from '../services';

export function useBriefs() {
  const [briefs, setBriefs] = useState<Brief[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    learnService.getBriefs().then((data) => {
      setBriefs(data);
      setLoading(false);
    });
  }, []);

  return { briefs, loading };
}

export default useBriefs;

