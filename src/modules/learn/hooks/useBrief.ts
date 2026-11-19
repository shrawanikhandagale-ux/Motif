import { useState, useEffect } from 'react';
import { Brief } from '../../../types';
import { learnService } from '../services';

export function useBrief(id?: string) {
  const [brief, setBrief] = useState<Brief | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setBrief(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    learnService.getBrief(id).then((data) => {
      setBrief(data);
      setLoading(false);
    });
  }, [id]);

  return { brief, loading };
}

export default useBrief;

