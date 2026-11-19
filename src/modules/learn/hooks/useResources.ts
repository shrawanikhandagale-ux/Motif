import { useState, useEffect, useCallback } from 'react';
import { Resource } from '../../../types';
import { learnService } from '../services';
import { useProgress } from '../../../hooks';

export function useResources(categoryOrDomain?: string, searchQuery: string = '') {
  const { savedResourceIds, toggleSaveResource } = useProgress();
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    learnService.getResources(categoryOrDomain).then((data) => {
      let filtered = data;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        filtered = data.filter(
          (r) =>
            r.title.toLowerCase().includes(q) ||
            r.description.toLowerCase().includes(q) ||
            r.domain.toLowerCase().includes(q)
        );
      }
      setResources(filtered);
      setLoading(false);
    });
  }, [categoryOrDomain, searchQuery]);

  const toggleBookmark = useCallback(
    (id: string) => {
      return toggleSaveResource(id);
    },
    [toggleSaveResource]
  );

  const isSaved = useCallback(
    (id: string) => savedResourceIds.includes(id),
    [savedResourceIds]
  );

  return {
    resources,
    loading,
    savedIds: savedResourceIds,
    toggleBookmark,
    isSaved,
  };
}

export default useResources;
