import { useState, useEffect } from 'react';
import { Skill } from '../../../types';
import { learnService } from '../services';

export function useSkills(domain?: string) {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    learnService.getSkills(domain).then((data) => {
      setSkills(data);
      setLoading(false);
    });
  }, [domain]);

  return { skills, loading };
}

export default useSkills;

