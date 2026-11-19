import { useState, useEffect, useCallback } from 'react';
import { Resource } from '../../../types';
import { learnService } from '../services';

const BOOKMARK_KEY = 'motif_saved_resources';

export function useResources(categoryOrDomain?: string, searchQuery: string = '') {
  const [resources, setResources] = useState<Resource[]>([]);
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(BOOKMARK_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
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

  const toggleBookmark = useCallback((id: string) => {
    setSavedIds((prev) => {
      const updated = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      try {
        localStorage.setItem(BOOKMARK_KEY, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  }, []);

  const isSaved = useCallback((id: string) => savedIds.includes(id), [savedIds]);

  return { resources, loading, savedIds, toggleBookmark, isSaved };
}

export default useResources;

