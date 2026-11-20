import { progressStore } from '../storage/progressStore';
import {
  Project,
  ProjectRecord,
  AssetRecord,
  AssetHandoffRecord,
  DeployedAssetView,
  DepartmentId,
  HandoffStatus,
} from '../../types';

/**
 * Projects Service
 * Unified domain interface for projects, assets, briefs, and deliverable handoffs.
 * Currently backed by progressStore, ready for Supabase replacement.
 */
export const projectService = {
  getProjects(statusFilter?: string): ProjectRecord[] {
    const list = progressStore.getProjects();
    if (!statusFilter || statusFilter === 'all') return list;
    return list.filter((p) => p.status === statusFilter);
  },

  getProject(id: string): ProjectRecord | null {
    return progressStore.getProject(id);
  },

  createProject(props: Partial<ProjectRecord> & { title: string }): ProjectRecord {
    return progressStore.createProject(props);
  },

  createProjectFromBrief(briefId: string, title: string, tags?: string[]): ProjectRecord {
    return progressStore.createProjectFromBrief(briefId, title, tags);
  },

  updateProjectStatus(projectId: string, status: Project['status']): ProjectRecord | null {
    return progressStore.updateProjectStatus(projectId, status);
  },

  deleteProject(projectId: string): boolean {
    return progressStore.deleteProject(projectId);
  },

  getAssets(projectId?: string): AssetRecord[] {
    return progressStore.getAssets(projectId);
  },

  getAsset(id: string): AssetRecord | null {
    return progressStore.getAsset(id);
  },

  createAsset(props: Partial<AssetRecord> & { title: string; projectId: string }): AssetRecord {
    return progressStore.createAsset(props);
  },

  deleteAsset(id: string): boolean {
    return progressStore.deleteAsset(id);
  },

  deployAssetToMarket(
    assetId: string,
    notes?: string
  ): { success: boolean; handoff?: AssetHandoffRecord; error?: string } {
    return progressStore.deployAssetToMarket(assetId, notes);
  },

  getHandoffs(toDept?: DepartmentId, statusFilter?: HandoffStatus): AssetHandoffRecord[] {
    return progressStore.getHandoffs(toDept, statusFilter);
  },

  getDeployedAssets(toDept: DepartmentId = 'market'): DeployedAssetView[] {
    return progressStore.getDeployedAssets(toDept);
  },

  isAssetDeployed(assetId: string): boolean {
    return progressStore.isAssetDeployed(assetId);
  },

  updateHandoffStatus(handoffId: string, status: HandoffStatus): AssetHandoffRecord | null {
    return progressStore.updateHandoffStatus(handoffId, status);
  },
};

export default projectService;

