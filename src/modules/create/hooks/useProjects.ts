import { useState, useMemo } from 'react';
import { ProjectRecord } from '../../../types';
import { useProgress } from '../../../hooks';

export type ProjectStatusFilter = 'all' | 'in_progress' | 'review' | 'completed';

export function useProjects(initialFilter: ProjectStatusFilter = 'all') {
  const { projects, createProject, deleteProject, updateProjectStatus } = useProgress();
  const [filter, setFilter] = useState<ProjectStatusFilter>(initialFilter);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = useMemo(() => {
    return projects.filter((p: ProjectRecord) => {
      if (filter !== 'all' && p.status !== filter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          (p.clientName && p.clientName.toLowerCase().includes(q)) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.summary.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [projects, filter, searchQuery]);

  return {
    projects: filteredProjects,
    allProjects: projects,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    createProject,
    deleteProject,
    updateProjectStatus,
  };
}

export default useProjects;

