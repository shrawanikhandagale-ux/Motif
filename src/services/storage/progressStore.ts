import {
  Enrolment,
  ProgressItem,
  Project,
  AssetRecord,
  AssetHandoffRecord,
  DeployedAssetView,
  DepartmentId,
  HandoffStatus,
} from '../../types';
import { MOCK_ASSETS } from '../../modules/create/services/mock/projects';

export interface ProgressData {
  version: number;
  enrolments: Enrolment[];
  completedItems: ProgressItem[];
  unlockedSkills: string[];
  projects: Project[];
  savedResourceIds: string[];
  completedChecklistIds: string[];
  assets: AssetRecord[];
  handoffs: AssetHandoffRecord[];
}

const STORAGE_KEY = 'motif_learning_progress_store';
const CURRENT_VERSION = 2;

const DEFAULT_PROGRESS: ProgressData = {
  version: CURRENT_VERSION,
  enrolments: [
    {
      id: 'enrol-1',
      pathId: 'path-branding-01',
      enrolledAt: '2026-11-15T10:00:00Z',
      currentStageId: 'stg-br-2',
      currentLessonId: 'les-br-201',
      status: 'active',
    },
  ],
  completedItems: [
    { id: 'prog-1', type: 'lesson', targetId: 'les-br-101', completedAt: '2026-11-15T10:30:00Z' },
    { id: 'prog-2', type: 'lesson', targetId: 'les-br-102', completedAt: '2026-11-15T11:15:00Z' },
    { id: 'prog-chk-1', type: 'checklist', targetId: 'b1-c1', completedAt: '2026-11-15T11:30:00Z' },
    { id: 'prog-chk-2', type: 'checklist', targetId: 'b1-c2', completedAt: '2026-11-15T12:00:00Z' },
  ],
  unlockedSkills: ['sk-br-01', 'sk-br-02', 'sk-ds-04'],
  projects: [
    {
      id: 'proj-01',
      title: 'Offscript Publication Brand System',
      department: 'create',
      status: 'in_progress',
      clientName: 'Offscript Press',
      briefId: 'brief-01',
      tags: ['Identity', 'Editorial', 'Type Specimen'],
      updatedAt: 'Today',
      summary: 'Brand guidelines, typography specimen, and voice manifesto for an independent publisher.',
    },
    {
      id: 'proj-02',
      title: 'Neon Brutalist Merch Line',
      department: 'create',
      status: 'review',
      clientName: 'Kilo Apparel',
      briefId: 'brief-02',
      tags: ['Apparel', 'Screen Print', 'Acid Palette'],
      updatedAt: 'Yesterday',
      summary: '16-page risograph publication layout, halftone patterns, and sticker sheets.',
    },
  ],
  savedResourceIds: ['res-01', 'res-06', 'res-16'],
  completedChecklistIds: ['b1-c1', 'b1-c2'],
  assets: MOCK_ASSETS,
  handoffs: [],
};

function readStore(): ProgressData {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    // Check for legacy external stores to migrate or prune
    let legacySavedIds: string[] = [];
    const legacySaved = localStorage.getItem('motif_saved_resources');
    if (legacySaved) {
      try {
        const parsed = JSON.parse(legacySaved);
        if (Array.isArray(parsed)) legacySavedIds = parsed;
      } catch {}
      localStorage.removeItem('motif_saved_resources');
    }

    if (localStorage.getItem('motif_progress_store')) {
      localStorage.removeItem('motif_progress_store');
    }

    if (!raw) {
      const initialData: ProgressData = {
        ...DEFAULT_PROGRESS,
        savedResourceIds: Array.from(new Set([...DEFAULT_PROGRESS.savedResourceIds, ...legacySavedIds])),
      };
      writeStore(initialData);
      return initialData;
    }

    const parsed = JSON.parse(raw);
    const savedMerged = Array.from(
      new Set([
        ...(Array.isArray(parsed.savedResourceIds) ? parsed.savedResourceIds : DEFAULT_PROGRESS.savedResourceIds),
        ...legacySavedIds,
      ])
    );

    const data: ProgressData = {
      version: CURRENT_VERSION,
      projects: Array.isArray(parsed.projects) ? parsed.projects : DEFAULT_PROGRESS.projects,
      completedChecklistIds: Array.isArray(parsed.completedChecklistIds)
        ? parsed.completedChecklistIds
        : DEFAULT_PROGRESS.completedChecklistIds,
      completedItems: Array.isArray(parsed.completedItems)
        ? parsed.completedItems
        : DEFAULT_PROGRESS.completedItems,
      unlockedSkills: Array.isArray(parsed.unlockedSkills)
        ? parsed.unlockedSkills
        : DEFAULT_PROGRESS.unlockedSkills,
      enrolments: Array.isArray(parsed.enrolments)
        ? parsed.enrolments
        : DEFAULT_PROGRESS.enrolments,
      savedResourceIds: savedMerged,
      assets: Array.isArray(parsed.assets) && parsed.assets.length > 0 ? parsed.assets : DEFAULT_PROGRESS.assets,
      handoffs: Array.isArray(parsed.handoffs) ? parsed.handoffs : [],
    };

    // If migrating from v1 or unversioned, persist upgraded state
    if (parsed.version !== CURRENT_VERSION || legacySavedIds.length > 0) {
      writeStore(data);
    }

    return data;
  } catch {
    return DEFAULT_PROGRESS;
  }
}

function writeStore(data: ProgressData): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

export const progressStore = {
  get: readStore,
  save: writeStore,

  getEnrolments(): Enrolment[] {
    return readStore().enrolments;
  },

  enrol(pathId: string): Enrolment {
    const data = readStore();
    const existing = data.enrolments.find((e) => e.pathId === pathId);
    if (existing) return existing;

    const newEnrolment: Enrolment = {
      id: `enrol-${Date.now()}`,
      pathId,
      enrolledAt: new Date().toISOString(),
      status: 'active',
    };
    data.enrolments.push(newEnrolment);
    writeStore(data);
    return newEnrolment;
  },

  markCompleted(targetId: string, type: 'lesson' | 'brief' | 'stage' | 'resource'): ProgressItem {
    const data = readStore();
    const existing = data.completedItems.find((c) => c.targetId === targetId);
    if (existing) return existing;

    const newItem: ProgressItem = {
      id: `prog-${Date.now()}`,
      type,
      targetId,
      completedAt: new Date().toISOString(),
    };
    data.completedItems.push(newItem);
    writeStore(data);
    return newItem;
  },

  isCompleted(targetId: string): boolean {
    return readStore().completedItems.some((c) => c.targetId === targetId);
  },

  unlockSkills(skillIds: string[]): string[] {
    const data = readStore();
    const updated = Array.from(new Set([...data.unlockedSkills, ...skillIds]));
    data.unlockedSkills = updated;
    writeStore(data);
    return updated;
  },

  getUnlockedSkills(): string[] {
    return readStore().unlockedSkills;
  },

  saveProject(project: Project): Project {
    const data = readStore();
    const idx = data.projects.findIndex((p) => p.id === project.id);
    if (idx >= 0) {
      data.projects[idx] = project;
    } else {
      data.projects.unshift(project);
    }
    writeStore(data);
    return project;
  },

  getProjects(): Project[] {
    return readStore().projects;
  },

  getProject(id: string): Project | null {
    return readStore().projects.find((p) => p.id === id) || null;
  },

  createProject(props: Partial<Project> & { title: string }): Project {
    const data = readStore();
    const newProj: Project = {
      id: props.id || `proj-${Date.now()}`,
      title: props.title,
      department: 'create',
      status: props.status || 'in_progress',
      clientName: props.clientName || 'Independent Studio',
      briefId: props.briefId,
      tags: props.tags && props.tags.length > 0 ? props.tags : ['Studio Output'],
      updatedAt: 'Just now',
      summary: props.summary || 'Studio production underway.',
      assetIds: props.assetIds || [],
    };
    data.projects.unshift(newProj);
    writeStore(data);
    return newProj;
  },

  createProjectFromBrief(briefId: string, title: string, tags: string[] = ['Brief Output']): Project {
    const data = readStore();
    const existing = data.projects.find((p) => p.briefId === briefId);
    if (existing) {
      return existing;
    }

    const newProj: Project = {
      id: `proj-${Date.now()}`,
      title,
      department: 'create',
      status: 'in_progress',
      briefId,
      tags,
      updatedAt: 'Just now',
      summary: `Created from brief ${briefId}.`,
      assetIds: [],
    };
    data.projects.unshift(newProj);
    writeStore(data);
    return newProj;
  },

  updateProjectStatus(projectId: string, status: Project['status']): Project | null {
    const data = readStore();
    const proj = data.projects.find((p) => p.id === projectId);
    if (!proj) return null;
    proj.status = status;
    proj.updatedAt = 'Just now';
    writeStore(data);
    return proj;
  },

  deleteProject(projectId: string): boolean {
    const data = readStore();
    const initialLen = data.projects.length;
    data.projects = data.projects.filter((p) => p.id !== projectId);
    data.assets = data.assets.filter((a) => a.projectId !== projectId);
    data.handoffs = data.handoffs.filter((h) => h.projectId !== projectId);
    writeStore(data);
    return data.projects.length < initialLen;
  },

  getCompletedChecklistIds(): string[] {
    return readStore().completedChecklistIds || [];
  },

  isChecklistCompleted(itemId: string): boolean {
    return (readStore().completedChecklistIds || []).includes(itemId);
  },

  toggleChecklistItem(
    briefId: string,
    itemId: string,
    allBriefItemIds: string[],
    skillsUnlocked: string[] = [],
    projectId?: string
  ): { allCompleted: boolean; isNowCompleted: boolean } {
    const data = readStore();
    const list = data.completedChecklistIds || [];
    const isNowCompleted = !list.includes(itemId);

    if (isNowCompleted) {
      data.completedChecklistIds = Array.from(new Set([...list, itemId]));
      if (!data.completedItems.some((c) => c.targetId === itemId && c.type === 'checklist')) {
        data.completedItems.push({
          id: `prog-chk-${Date.now()}-${itemId}`,
          type: 'checklist',
          targetId: itemId,
          completedAt: new Date().toISOString(),
        });
      }
    } else {
      data.completedChecklistIds = list.filter((id) => id !== itemId);
      data.completedItems = data.completedItems.filter(
        (c) => !(c.type === 'checklist' && c.targetId === itemId)
      );
    }

    const allCompleted =
      allBriefItemIds.length > 0 &&
      allBriefItemIds.every((id) => data.completedChecklistIds.includes(id));

    const targetProject = projectId
      ? data.projects.find((p) => p.id === projectId)
      : data.projects.find((p) => p.briefId === briefId);

    if (allCompleted) {
      if (!data.completedItems.some((c) => c.targetId === briefId && c.type === 'brief')) {
        data.completedItems.push({
          id: `prog-brief-${Date.now()}`,
          type: 'brief',
          targetId: briefId,
          completedAt: new Date().toISOString(),
        });
      }
      if (skillsUnlocked.length > 0) {
        data.unlockedSkills = Array.from(new Set([...data.unlockedSkills, ...skillsUnlocked]));
      }
      if (targetProject) {
        targetProject.status = 'completed';
        targetProject.updatedAt = 'Just now';
      }
    } else {
      data.completedItems = data.completedItems.filter(
        (c) => !(c.type === 'brief' && c.targetId === briefId)
      );
      if (targetProject && targetProject.status === 'completed') {
        targetProject.status = 'in_progress';
        targetProject.updatedAt = 'Just now';
      }
    }

    writeStore(data);
    return { allCompleted, isNowCompleted };
  },

  getSavedResourceIds(): string[] {
    return readStore().savedResourceIds || [];
  },

  toggleSaveResource(resourceId: string): boolean {
    const data = readStore();
    const list = data.savedResourceIds || [];
    const exists = list.includes(resourceId);
    if (exists) {
      data.savedResourceIds = list.filter((id) => id !== resourceId);
    } else {
      data.savedResourceIds = [...list, resourceId];
    }
    writeStore(data);
    return !exists;
  },

  // ------------------- Asset Records -------------------

  getAssets(projectId?: string): AssetRecord[] {
    const assets = readStore().assets || [];
    if (!projectId) return assets;
    return assets.filter((a) => !a.projectId || a.projectId === projectId);
  },

  getAsset(id: string): AssetRecord | null {
    return (readStore().assets || []).find((a) => a.id === id) || null;
  },

  saveAsset(asset: AssetRecord): AssetRecord {
    const data = readStore();
    const idx = data.assets.findIndex((a) => a.id === asset.id);
    if (idx >= 0) {
      data.assets[idx] = asset;
    } else {
      data.assets.push(asset);
    }
    writeStore(data);
    return asset;
  },

  createAsset(props: Partial<AssetRecord> & { title: string; projectId: string }): AssetRecord {
    const data = readStore();
    const newAsset: AssetRecord = {
      id: props.id || `ast-${Date.now()}`,
      projectId: props.projectId,
      title: props.title,
      type: props.type || 'identity',
      department: 'create',
      description: props.description || '',
      previewText: props.previewText || '',
      fileFormat: props.fileFormat || 'SVG / Specimen',
      status: props.status || 'ready',
      createdAt: props.createdAt || new Date().toISOString(),
      updatedAt: 'Just now',
      campaignId: props.campaignId,
    };
    data.assets.push(newAsset);
    writeStore(data);
    return newAsset;
  },

  deleteAsset(id: string): boolean {
    const data = readStore();
    const initLen = data.assets.length;
    data.assets = data.assets.filter((a) => a.id !== id);
    data.handoffs = data.handoffs.filter((h) => h.assetId !== id);
    writeStore(data);
    return data.assets.length < initLen;
  },

  // ------------------- Handoff Records -------------------

  deployAssetToMarket(
    assetId: string,
    notes?: string
  ): { success: boolean; handoff?: AssetHandoffRecord; error?: string } {
    const data = readStore();
    const asset = data.assets.find((a) => a.id === assetId);
    if (!asset) {
      return { success: false, error: `Asset ${assetId} not found.` };
    }

    const project = data.projects.find((p) => p.id === asset.projectId);
    if (!project) {
      return { success: false, error: `Parent project ${asset.projectId} not found.` };
    }

    const existingHandoff = data.handoffs.find(
      (h) => h.assetId === assetId && h.toDepartment === 'market' && h.status !== 'archived'
    );
    if (existingHandoff) {
      return { success: true, handoff: existingHandoff };
    }

    const newHandoff: AssetHandoffRecord = {
      id: `hnd-${Date.now()}`,
      assetId: asset.id,
      projectId: asset.projectId,
      fromDepartment: 'create',
      toDepartment: 'market',
      status: 'available',
      deployedAt: new Date().toISOString(),
      notes: notes || `Deployed from project “${project.title}” for campaign integration.`,
    };

    asset.status = 'deployed';
    asset.updatedAt = 'Just now';

    data.handoffs.unshift(newHandoff);
    writeStore(data);

    return { success: true, handoff: newHandoff };
  },

  getHandoffs(toDept?: DepartmentId, statusFilter?: HandoffStatus): AssetHandoffRecord[] {
    const list = readStore().handoffs || [];
    return list.filter((h) => {
      if (toDept && h.toDepartment !== toDept) return false;
      if (statusFilter && h.status !== statusFilter) return false;
      return true;
    });
  },

  getDeployedAssets(toDept: DepartmentId = 'market'): DeployedAssetView[] {
    const data = readStore();
    const handoffs = (data.handoffs || []).filter((h) => h.toDepartment === toDept);
    return handoffs.map((handoff) => {
      const asset = data.assets.find((a) => a.id === handoff.assetId) || {
        id: handoff.assetId,
        projectId: handoff.projectId,
        title: 'Archived Asset',
        type: 'identity' as const,
        department: 'create' as const,
        fileFormat: 'Unknown',
        status: 'deployed' as const,
        createdAt: handoff.deployedAt,
        updatedAt: handoff.deployedAt,
      };
      const project = data.projects.find((p) => p.id === handoff.projectId);
      return { handoff, asset, project };
    });
  },

  isAssetDeployed(assetId: string): boolean {
    return (readStore().handoffs || []).some(
      (h) => h.assetId === assetId && h.status !== 'archived'
    );
  },

  updateHandoffStatus(handoffId: string, status: HandoffStatus): AssetHandoffRecord | null {
    const data = readStore();
    const handoff = data.handoffs.find((h) => h.id === handoffId);
    if (!handoff) return null;
    handoff.status = status;
    writeStore(data);
    return handoff;
  },
};

export default progressStore;
