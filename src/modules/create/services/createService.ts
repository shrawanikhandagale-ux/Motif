import { ProjectRecord, AssetRecord, AssetHandoffRecord } from '../../../types';
import { progressStore } from '../../../services/storage';

/**
 * Create Service
 * Asynchronous service functions for projects and assets in Department 02 (The Studio).
 * State is synchronized through progressStore in localStorage, ready for Supabase replacement.
 */
export const createService = {
  async getProjects(statusFilter?: string): Promise<ProjectRecord[]> {
    const list = progressStore.getProjects();
    if (!statusFilter || statusFilter === 'all') return list;
    return list.filter((p) => p.status === statusFilter);
  },

  async getProject(id: string): Promise<ProjectRecord | null> {
    return progressStore.getProject(id);
  },

  async createProject(props: Partial<ProjectRecord> & { title: string }): Promise<ProjectRecord> {
    return progressStore.createProject(props);
  },

  async createProjectFromBrief(briefId: string, title: string, tags?: string[]): Promise<ProjectRecord> {
    return progressStore.createProjectFromBrief(briefId, title, tags);
  },

  async updateProjectStatus(projectId: string, status: ProjectRecord['status']): Promise<ProjectRecord | null> {
    return progressStore.updateProjectStatus(projectId, status);
  },

  async deleteProject(projectId: string): Promise<boolean> {
    return progressStore.deleteProject(projectId);
  },

  async getAssets(projectId?: string): Promise<AssetRecord[]> {
    return progressStore.getAssets(projectId);
  },

  async getAsset(id: string): Promise<AssetRecord | null> {
    return progressStore.getAsset(id);
  },

  async createAsset(props: Partial<AssetRecord> & { title: string; projectId: string }): Promise<AssetRecord> {
    return progressStore.createAsset(props);
  },

  async deleteAsset(id: string): Promise<boolean> {
    return progressStore.deleteAsset(id);
  },

  async deployAsset(
    assetId: string,
    notes?: string
  ): Promise<{ success: boolean; handoff?: AssetHandoffRecord; error?: string }> {
    return progressStore.deployAssetToMarket(assetId, notes);
  },

  async pushToMarket(assetIdOrTitle: string): Promise<boolean> {
    // Locate asset either by id or by title
    const all = progressStore.getAssets();
    const asset = all.find((a) => a.id === assetIdOrTitle || a.title === assetIdOrTitle);
    if (asset) {
      const res = progressStore.deployAssetToMarket(asset.id);
      return res.success;
    }
    return false;
  },
};

export const {
  getProjects,
  getProject,
  createProject,
  createProjectFromBrief,
  updateProjectStatus,
  deleteProject,
  getAssets,
  getAsset,
  createAsset,
  deleteAsset,
  deployAsset,
  pushToMarket,
} = createService;

export default createService;
