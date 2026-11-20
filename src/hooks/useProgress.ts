import { useState, useEffect, useCallback } from 'react';
import {
  Enrolment,
  ProgressItem,
  Project,
  AssetRecord,
  AssetHandoffRecord,
  DeployedAssetView,
  DepartmentId,
  HandoffStatus,
  ClientRecord,
  CampaignRecord,
  DeliverableRecord,
  DeliverableStage,
} from '../types';
import { progressStore } from '../services/storage';

export function useProgress() {
  const [enrolments, setEnrolments] = useState<Enrolment[]>(() => progressStore.getEnrolments());
  const [completedItems, setCompletedItems] = useState<ProgressItem[]>(() => progressStore.get().completedItems);
  const [unlockedSkills, setUnlockedSkills] = useState<string[]>(() => progressStore.getUnlockedSkills());
  const [projects, setProjects] = useState<Project[]>(() => progressStore.getProjects());
  const [savedResourceIds, setSavedResourceIds] = useState<string[]>(() => progressStore.getSavedResourceIds());
  const [completedChecklistIds, setCompletedChecklistIds] = useState<string[]>(() => progressStore.getCompletedChecklistIds());
  const [assets, setAssets] = useState<AssetRecord[]>(() => progressStore.getAssets());
  const [handoffs, setHandoffs] = useState<AssetHandoffRecord[]>(() => progressStore.getHandoffs());
  const [clients, setClients] = useState<ClientRecord[]>(() => progressStore.getClients());
  const [campaigns, setCampaigns] = useState<CampaignRecord[]>(() => progressStore.getCampaigns());
  const [deliverables, setDeliverables] = useState<DeliverableRecord[]>(() => progressStore.getDeliverables());

  const sync = useCallback(() => {
    const data = progressStore.get();
    setEnrolments(data.enrolments);
    setCompletedItems(data.completedItems);
    setUnlockedSkills(data.unlockedSkills);
    setProjects(data.projects);
    setSavedResourceIds(data.savedResourceIds || []);
    setCompletedChecklistIds(data.completedChecklistIds || []);
    setAssets(data.assets || []);
    setHandoffs(data.handoffs || []);
    setClients(data.clients || []);
    setCampaigns(data.campaigns || []);
    setDeliverables(data.deliverables || []);
  }, []);

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'motif_learning_progress_store') {
        sync();
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [sync]);

  const enrol = useCallback((pathId: string) => {
    const item = progressStore.enrol(pathId);
    sync();
    return item;
  }, [sync]);

  const completeLesson = useCallback((lessonId: string, skillIdToUnlock?: string) => {
    progressStore.markCompleted(lessonId, 'lesson');
    if (skillIdToUnlock) {
      progressStore.unlockSkills([skillIdToUnlock]);
    }
    sync();
  }, [sync]);

  const completeBrief = useCallback((briefId: string, skillsUnlocked: string[] = []) => {
    progressStore.markCompleted(briefId, 'brief');
    if (skillsUnlocked.length > 0) {
      progressStore.unlockSkills(skillsUnlocked);
    }
    sync();
  }, [sync]);

  const unlockSkills = useCallback((skillIds: string[]) => {
    progressStore.unlockSkills(skillIds);
    sync();
  }, [sync]);

  const isCompleted = useCallback((targetId: string) => {
    return completedItems.some((item) => item.targetId === targetId);
  }, [completedItems]);

  const isSkillUnlocked = useCallback((skillId: string) => {
    return unlockedSkills.includes(skillId);
  }, [unlockedSkills]);

  const createProjectFromBrief = useCallback(
    (briefId: string, title: string, tags: string[] = ['Brief Output']) => {
      const proj = progressStore.createProjectFromBrief(briefId, title, tags);
      sync();
      return proj;
    },
    [sync]
  );

  const toggleSaveResource = useCallback((resourceId: string) => {
    const result = progressStore.toggleSaveResource(resourceId);
    sync();
    return result;
  }, [sync]);

  const toggleChecklistItem = useCallback(
    (
      briefId: string,
      itemId: string,
      allBriefItemIds: string[],
      skillsUnlocked: string[] = [],
      projectId?: string
    ) => {
      const res = progressStore.toggleChecklistItem(
        briefId,
        itemId,
        allBriefItemIds,
        skillsUnlocked,
        projectId
      );
      sync();
      return res;
    },
    [sync]
  );

  const isChecklistCompleted = useCallback(
    (itemId: string) => {
      return completedChecklistIds.includes(itemId);
    },
    [completedChecklistIds]
  );

  const createProject = useCallback(
    (props: Partial<Project> & { title: string }) => {
      const p = progressStore.createProject(props);
      sync();
      return p;
    },
    [sync]
  );

  const updateProjectStatus = useCallback(
    (projectId: string, status: Project['status']) => {
      const p = progressStore.updateProjectStatus(projectId, status);
      sync();
      return p;
    },
    [sync]
  );

  const deleteProject = useCallback(
    (projectId: string) => {
      const ok = progressStore.deleteProject(projectId);
      sync();
      return ok;
    },
    [sync]
  );

  // Asset helpers
  const getAssets = useCallback((projectId?: string) => {
    return progressStore.getAssets(projectId);
  }, []);

  const getAsset = useCallback((id: string) => {
    return progressStore.getAsset(id);
  }, []);

  const createAsset = useCallback(
    (props: Partial<AssetRecord> & { title: string; projectId: string }) => {
      const a = progressStore.createAsset(props);
      sync();
      return a;
    },
    [sync]
  );

  const deleteAsset = useCallback(
    (id: string) => {
      const ok = progressStore.deleteAsset(id);
      sync();
      return ok;
    },
    [sync]
  );

  // Handoff helpers
  const deployAssetToMarket = useCallback(
    (assetId: string, notes?: string) => {
      const res = progressStore.deployAssetToMarket(assetId, notes);
      sync();
      return res;
    },
    [sync]
  );

  const getDeployedAssets = useCallback((toDept: DepartmentId = 'market'): DeployedAssetView[] => {
    return progressStore.getDeployedAssets(toDept);
  }, []);

  const isAssetDeployed = useCallback((assetId: string) => {
    return progressStore.isAssetDeployed(assetId);
  }, []);

  const updateHandoffStatus = useCallback(
    (handoffId: string, status: HandoffStatus) => {
      const h = progressStore.updateHandoffStatus(handoffId, status);
      sync();
      return h;
    },
    [sync]
  );

  // Client helpers
  const getClients = useCallback(() => progressStore.getClients(), []);
  const getClient = useCallback((id: string) => progressStore.getClient(id), []);
  const createClient = useCallback(
    (props: Partial<ClientRecord> & { name: string; contactEmail: string }) => {
      const c = progressStore.createClient(props);
      sync();
      return c;
    },
    [sync]
  );
  const updateClient = useCallback(
    (id: string, props: Partial<ClientRecord>) => {
      const c = progressStore.updateClient(id, props);
      sync();
      return c;
    },
    [sync]
  );
  const deleteClient = useCallback(
    (id: string) => {
      const ok = progressStore.deleteClient(id);
      sync();
      return ok;
    },
    [sync]
  );

  // Deliverable helpers
  const getDeliverables = useCallback(
    (clientId?: string) => progressStore.getDeliverables(clientId),
    []
  );
  const getDeliverable = useCallback((id: string) => progressStore.getDeliverable(id), []);
  const createDeliverable = useCallback(
    (props: Partial<DeliverableRecord> & { title: string; clientName: string }) => {
      const d = progressStore.createDeliverable(props);
      sync();
      return d;
    },
    [sync]
  );
  const updateDeliverableStage = useCallback(
    (id: string, stage: DeliverableStage) => {
      const d = progressStore.updateDeliverableStage(id, stage);
      sync();
      return d;
    },
    [sync]
  );
  const updateDeliverable = useCallback(
    (id: string, props: Partial<DeliverableRecord>) => {
      const d = progressStore.updateDeliverable(id, props);
      sync();
      return d;
    },
    [sync]
  );
  const deleteDeliverable = useCallback(
    (id: string) => {
      const ok = progressStore.deleteDeliverable(id);
      sync();
      return ok;
    },
    [sync]
  );

  // Campaign helpers
  const getCampaigns = useCallback(
    (clientId?: string) => progressStore.getCampaigns(clientId),
    []
  );
  const getCampaign = useCallback((id: string) => progressStore.getCampaign(id), []);
  const createCampaign = useCallback(
    (props: Partial<CampaignRecord> & { title: string }) => {
      const c = progressStore.createCampaign(props);
      sync();
      return c;
    },
    [sync]
  );
  const updateCampaign = useCallback(
    (id: string, props: Partial<CampaignRecord>) => {
      const c = progressStore.updateCampaign(id, props);
      sync();
      return c;
    },
    [sync]
  );
  const updateCampaignStatus = useCallback(
    (id: string, status: CampaignRecord['status']) => {
      const c = progressStore.updateCampaignStatus(id, status);
      sync();
      return c;
    },
    [sync]
  );
  const attachAssetToCampaign = useCallback(
    (campaignId: string, assetId: string) => {
      const ok = progressStore.attachAssetToCampaign(campaignId, assetId);
      sync();
      return ok;
    },
    [sync]
  );
  const attachCampaignToClient = useCallback(
    (campaignId: string, clientId: string, clientName: string) => {
      const ok = progressStore.attachCampaignToClient(campaignId, clientId, clientName);
      sync();
      return ok;
    },
    [sync]
  );

  return {
    enrolments,
    completedItems,
    unlockedSkills,
    projects,
    savedResourceIds,
    completedChecklistIds,
    assets,
    handoffs,
    clients,
    campaigns,
    deliverables,
    enrol,
    completeLesson,
    completeBrief,
    unlockSkills,
    isCompleted,
    isSkillUnlocked,
    createProjectFromBrief,
    createProject,
    updateProjectStatus,
    deleteProject,
    toggleSaveResource,
    toggleChecklistItem,
    isChecklistCompleted,
    getAssets,
    getAsset,
    createAsset,
    deleteAsset,
    deployAssetToMarket,
    getDeployedAssets,
    isAssetDeployed,
    updateHandoffStatus,
    getClients,
    getClient,
    createClient,
    updateClient,
    deleteClient,
    getDeliverables,
    getDeliverable,
    createDeliverable,
    updateDeliverableStage,
    updateDeliverable,
    deleteDeliverable,
    getCampaigns,
    getCampaign,
    createCampaign,
    updateCampaign,
    updateCampaignStatus,
    attachAssetToCampaign,
    attachCampaignToClient,
    refresh: sync,
  };
}

export default useProgress;
