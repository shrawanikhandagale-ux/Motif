import { useState, useEffect, useCallback } from 'react';
import { ProjectRecord, Brief, AssetRecord } from '../../../types';
import { useProgress } from '../../../hooks';
import { learnService } from '../../learn/services';
import { createService } from '../services';

export function useProject(projectId: string) {
  const {
    projects,
    updateProjectStatus,
    deleteProject,
    toggleChecklistItem: toggleItemInStore,
    isChecklistCompleted: isItemCompletedInStore,
  } = useProgress();

  const [brief, setBrief] = useState<Brief | null>(null);
  const [assets, setAssets] = useState<AssetRecord[]>([]);
  const [loadingBrief, setLoadingBrief] = useState(true);

  const project = projects.find((p: ProjectRecord) => p.id === projectId) || null;

  useEffect(() => {
    let cancelled = false;
    async function loadData() {
      if (!project?.briefId) {
        setBrief(null);
        setLoadingBrief(false);
      } else {
        setLoadingBrief(true);
        const b = await learnService.getBrief(project.briefId);
        if (!cancelled) {
          setBrief(b);
          setLoadingBrief(false);
        }
      }

      const a = await createService.getAssets(projectId);
      if (!cancelled) {
        setAssets(a);
      }
    }
    loadData();
    return () => {
      cancelled = true;
    };
  }, [project?.briefId, projectId]);

  const toggleChecklistItem = useCallback(
    (itemId: string) => {
      if (!brief) return { allCompleted: false, isNowCompleted: false };
      const allItemIds = brief.checklist.map((c) => c.id);
      return toggleItemInStore(
        brief.id,
        itemId,
        allItemIds,
        brief.skillsUnlocked,
        project?.id || projectId
      );
    },
    [brief, project?.id, projectId, toggleItemInStore]
  );

  const isChecklistCompleted = useCallback(
    (itemId: string) => {
      return isItemCompletedInStore(itemId);
    },
    [isItemCompletedInStore]
  );

  const updateStatus = useCallback(
    (status: ProjectRecord['status']) => {
      if (project) {
        updateProjectStatus(project.id, status);
      }
    },
    [project, updateProjectStatus]
  );

  return {
    project,
    brief,
    assets,
    loadingBrief,
    toggleChecklistItem,
    isChecklistCompleted,
    updateStatus,
    deleteProject: () => (project ? deleteProject(project.id) : false),
  };
}

export default useProject;

