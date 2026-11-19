import { ProjectRecord, AssetRecord } from '../../../types';
import { progressStore, storageService } from '../../../services/storage';
import { MOCK_ASSETS } from './mock/projects';

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
    if (!projectId) return MOCK_ASSETS;
    return MOCK_ASSETS.filter((a) => !a.projectId || a.projectId === projectId);
  },

  async pushToMarket(assetTitle: string): Promise<boolean> {
    storageService.addHandoffLog(
      'create',
      'market',
      `Sent asset "${assetTitle}" to Market for campaign assembly.`
    );
    return true;
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
  pushToMarket,
} = createService;

export default createService;

