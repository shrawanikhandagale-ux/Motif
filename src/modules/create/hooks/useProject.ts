import { useState, useEffect, useCallback, useMemo } from 'react';
import { ProjectRecord, Brief, AssetRecord } from '../../../types';
import { useProgress } from '../../../hooks';
import { learnService } from '../../learn/services';

export function useProject(projectId: string) {
  const {
    projects,
    assets: allAssets,
    updateProjectStatus,
    deleteProject,
    toggleChecklistItem: toggleItemInStore,
    isChecklistCompleted: isItemCompletedInStore,
    createAsset: createAssetInStore,
    deleteAsset: deleteAssetInStore,
    deployAssetToMarket: deployAssetInStore,
    isAssetDeployed: isAssetDeployedInStore,
  } = useProgress();

  const [brief, setBrief] = useState<Brief | null>(null);
  const [loadingBrief, setLoadingBrief] = useState(true);

  const project = projects.find((p: ProjectRecord) => p.id === projectId) || null;
  const assets = useMemo(
    () => allAssets.filter((a) => !a.projectId || a.projectId === projectId),
    [allAssets, projectId]
  );

  useEffect(() => {
    let cancelled = false;
    async function loadBrief() {
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
    }
    loadBrief();
    return () => {
      cancelled = true;
    };
  }, [project?.briefId]);

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
    (itemId: string) => isItemCompletedInStore(itemId),
    [isItemCompletedInStore]
  );

  const updateStatus = useCallback(
    (status: ProjectRecord['status']) => {
      if (project) updateProjectStatus(project.id, status);
    },
    [project, updateProjectStatus]
  );

  const createAsset = useCallback(
    (props: Partial<AssetRecord> & { title: string }) => {
      return createAssetInStore({ ...props, projectId });
    },
    [createAssetInStore, projectId]
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
    createAsset,
    deleteAsset: deleteAssetInStore,
    deployAssetToMarket: deployAssetInStore,
    isAssetDeployed: isAssetDeployedInStore,
  };
}

export default useProject;
