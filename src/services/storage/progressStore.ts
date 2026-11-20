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
  ContentPostRecord,
  ConnectionRecord,
  ConnectionStatus,
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
  clients: ClientRecord[];
  campaigns: CampaignRecord[];
  deliverables: DeliverableRecord[];
  posts: ContentPostRecord[];
  connections: ConnectionRecord[];
}

const STORAGE_KEY = 'motif_learning_progress_store';
const CURRENT_VERSION = 3;

const DEFAULT_CLIENTS: ClientRecord[] = [
  {
    id: 'cli-01',
    name: 'Offscript Press',
    industry: 'Independent Publishing',
    status: 'active',
    activeProjectsCount: 2,
    contactEmail: 'editor@offscriptpress.org',
    monthlyRetainer: 7500,
    notes: 'Primary publishing partner. Bi-monthly publication releases and brand system maintenance.',
  },
  {
    id: 'cli-02',
    name: 'Kilo Apparel',
    industry: 'Streetwear & Goods',
    status: 'active',
    activeProjectsCount: 1,
    contactEmail: 'ops@kiloapparel.co',
    monthlyRetainer: 6700,
    notes: 'Seasonal capsule drops and screenprint asset pipelines.',
  },
  {
    id: 'cli-03',
    name: 'Sundown Records',
    industry: 'Vinyl Imprint',
    status: 'lead',
    activeProjectsCount: 0,
    contactEmail: 'a-and-r@sundownrecs.fm',
    monthlyRetainer: 0,
    notes: 'Prospective vinyl imprint rebrand and cassette tape packaging scope.',
  },
];

const DEFAULT_CAMPAIGNS: CampaignRecord[] = [
  {
    id: 'cmp-01',
    title: 'Issue Zero Drop Sequence',
    channel: 'substack',
    status: 'live',
    dateNotice: 'Today · 18:00',
    reach: '18.4k',
    clientName: 'Offscript Press',
    clientId: 'cli-01',
    description: 'Substack manifesto announcement to 18,400 readers with 24.8% click rate.',
    metrics: {
      reach: '18.4k',
      engagement: '24.8%',
      conversion: '5.2%',
    },
  },
  {
    id: 'cmp-02',
    title: 'Acid Merch Flash Drop',
    channel: 'instagram',
    status: 'planned',
    dateNotice: 'In 2 Days',
    reach: '24.8k',
    clientName: 'Kilo Apparel',
    clientId: 'cli-02',
    description: 'Targeted Instagram carousel drop with vector separations and limited vinyl release.',
    metrics: {
      reach: '24.8k',
      engagement: '19.2%',
      conversion: '4.1%',
    },
  },
  {
    id: 'cmp-03',
    title: 'Typography Token Specimen Thread',
    channel: 'x',
    status: 'draft',
    dateNotice: 'Friday',
    reach: '35.4k',
    clientName: 'Offscript Press',
    clientId: 'cli-01',
    description: 'Deep-dive microblogging thread showcasing variable font metrics and editorial specimens.',
    metrics: {
      reach: '35.4k',
      engagement: '14.5%',
      conversion: '3.8%',
    },
  },
];

const DEFAULT_DELIVERABLES: DeliverableRecord[] = [
  {
    id: 'del-01',
    title: 'Editorial Type Specimen Sign-off',
    clientId: 'cli-01',
    clientName: 'Offscript Press',
    projectId: 'proj-01',
    status: 'Done',
    dueDate: '2026-11-18',
    notes: 'Approved by lead typographer. Deployed to production CDN.',
    createdAt: '2026-11-15T10:00:00Z',
    updatedAt: '2026-11-18T16:30:00Z',
  },
  {
    id: 'del-02',
    title: 'Drop Campaign Content Schedule',
    clientId: 'cli-01',
    clientName: 'Offscript Press',
    projectId: 'proj-01',
    status: 'In Review',
    dueDate: '2026-11-22',
    notes: '14-day copy blocks submitted for editorial sign-off.',
    createdAt: '2026-11-16T11:00:00Z',
    updatedAt: '2026-11-19T09:15:00Z',
  },
  {
    id: 'del-03',
    title: 'Acid Halftone Separations',
    clientId: 'cli-02',
    clientName: 'Kilo Apparel',
    projectId: 'proj-02',
    status: 'Doing',
    dueDate: '2026-11-25',
    notes: 'Screenprint 3-color separations with 45lpi dot frequency.',
    createdAt: '2026-11-17T14:20:00Z',
    updatedAt: '2026-11-20T10:00:00Z',
  },
  {
    id: 'del-04',
    title: 'Contract & Retainer Scope',
    clientId: 'cli-03',
    clientName: 'Sundown Records',
    status: 'Queued',
    dueDate: '2026-12-01',
    notes: 'Drafting initial discovery scope for winter vinyl release.',
    createdAt: '2026-11-19T15:00:00Z',
    updatedAt: '2026-11-19T15:00:00Z',
  },
];

const DEFAULT_POSTS: ContentPostRecord[] = [
  { id: 'post-1', title: 'Brand story reel', channel: 'Instagram', scheduledDate: '2026-11-12', status: 'published', caption: 'Behind the process of the Offscript typography specimens.', campaignTitle: 'Salt & Ember launch' },
  { id: 'post-2', title: 'Moodboard pin drop', channel: 'Pinterest', scheduledDate: '2026-11-18', status: 'published', caption: 'Tactile paper stocks and industrial halftone textures.', campaignTitle: 'Salt & Ember launch' },
  { id: 'post-3', title: 'Teaser carousel sequence', channel: 'Instagram', scheduledDate: '2026-11-24', status: 'scheduled', caption: 'Something is coming. ✱ First look at the risograph zine plates.', campaignTitle: 'Zine pre-order push' },
  { id: 'post-4', title: 'Zine preview dispatch', channel: 'Newsletter', scheduledDate: '2026-11-26', status: 'in_review', caption: 'Early subscriber look into the 16-page risograph run.', campaignTitle: 'Zine pre-order push' },
  { id: 'post-5', title: 'Launch day announcement', channel: 'Instagram', scheduledDate: '2026-11-30', status: 'idea', caption: 'The drop is live. Limited batch run of 200 copies.' },
  { id: 'post-6', title: 'Behind the scenes printing litho', channel: 'YouTube', scheduledDate: '2026-12-03', status: 'idea', caption: 'Screenprinting vector separations at the studio.' },
];

const DEFAULT_CONNECTIONS: ConnectionRecord[] = [
  { id: 'conn-1', channel: 'Instagram', name: 'Instagram', status: 'demo_handoff_ready', handleOrUrl: '@motif.studio', notes: 'Handoff ready for carousel and reel export assets.' },
  { id: 'conn-2', channel: 'Pinterest', name: 'Pinterest', status: 'demo_handoff_ready', handleOrUrl: 'pinterest.com/motif_curated', notes: 'Asset handoff ready for high-resolution moodboard pins.' },
  { id: 'conn-3', channel: 'Newsletter', name: 'Substack / Newsletter', status: 'connected', handleOrUrl: 'motif.substack.com', notes: 'Verified RSS / direct publication dispatch channel.' },
  { id: 'conn-4', channel: 'LinkedIn', name: 'LinkedIn Company', status: 'disconnected', handleOrUrl: 'linkedin.com/company/motif-os', notes: 'No active session. Reconnect required.' },
  { id: 'conn-5', channel: 'YouTube', name: 'YouTube Channel', status: 'unavailable', handleOrUrl: 'youtube.com/@motif', notes: 'Video publishing requires authenticated Google Cloud API quota.' },
  { id: 'conn-6', channel: 'Website', name: 'Direct Website Webhook', status: 'disconnected', handleOrUrl: 'https://motif.build/webhooks/market', notes: 'Webhook endpoint awaiting SSL handshake.' },
];

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
  clients: DEFAULT_CLIENTS,
  campaigns: DEFAULT_CAMPAIGNS,
  deliverables: DEFAULT_DELIVERABLES,
  posts: DEFAULT_POSTS,
  connections: DEFAULT_CONNECTIONS,
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
      clients: Array.isArray(parsed.clients) && parsed.clients.length > 0 ? parsed.clients : DEFAULT_CLIENTS,
      campaigns: Array.isArray(parsed.campaigns) && parsed.campaigns.length > 0 ? parsed.campaigns : DEFAULT_CAMPAIGNS,
      deliverables:
        Array.isArray(parsed.deliverables) && parsed.deliverables.length > 0
          ? parsed.deliverables
          : DEFAULT_DELIVERABLES,
      posts:
        Array.isArray(parsed.posts) && parsed.posts.length > 0
          ? parsed.posts
          : DEFAULT_POSTS,
      connections:
        Array.isArray(parsed.connections) && parsed.connections.length > 0
          ? parsed.connections
          : DEFAULT_CONNECTIONS,
    };

    // If migrating from v1/v2 or unversioned, persist upgraded state
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

  unmarkCompleted(targetId: string): boolean {
    const data = readStore();
    const initialLen = data.completedItems.length;
    data.completedItems = data.completedItems.filter((c) => c.targetId !== targetId && c.id !== targetId);
    if (data.completedItems.length !== initialLen) {
      writeStore(data);
      return true;
    }
    return false;
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
    data.deliverables = data.deliverables.filter((d) => d.projectId !== projectId);
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

  // ------------------- Client Records -------------------

  getClients(): ClientRecord[] {
    return readStore().clients || [];
  },

  getClient(id: string): ClientRecord | null {
    return (readStore().clients || []).find((c) => c.id === id) || null;
  },

  createClient(props: Partial<ClientRecord> & { name: string; contactEmail: string }): ClientRecord {
    const data = readStore();
    const newClient: ClientRecord = {
      id: props.id || `cli-${Date.now()}`,
      name: props.name.trim(),
      industry: props.industry?.trim() || 'Creative Studio',
      status: props.status || 'active',
      activeProjectsCount: props.activeProjectsCount ?? 0,
      contactEmail: props.contactEmail.trim(),
      monthlyRetainer: props.monthlyRetainer ?? 0,
      notes: props.notes?.trim() || '',
    };
    data.clients.push(newClient);
    writeStore(data);
    return newClient;
  },

  updateClient(id: string, props: Partial<ClientRecord>): ClientRecord | null {
    const data = readStore();
    const idx = data.clients.findIndex((c) => c.id === id);
    if (idx < 0) return null;
    data.clients[idx] = { ...data.clients[idx], ...props };
    writeStore(data);
    return data.clients[idx];
  },

  deleteClient(id: string): boolean {
    const data = readStore();
    const initLen = data.clients.length;
    data.clients = data.clients.filter((c) => c.id !== id);
    writeStore(data);
    return data.clients.length < initLen;
  },

  // ------------------- Deliverable Records -------------------

  getDeliverables(clientId?: string): DeliverableRecord[] {
    const list = readStore().deliverables || [];
    if (!clientId) return list;
    return list.filter((d) => d.clientId === clientId);
  },

  getDeliverable(id: string): DeliverableRecord | null {
    return (readStore().deliverables || []).find((d) => d.id === id) || null;
  },

  createDeliverable(props: Partial<DeliverableRecord> & { title: string; clientName: string }): DeliverableRecord {
    const data = readStore();
    const client = data.clients.find(
      (c) => c.id === props.clientId || c.name.toLowerCase() === props.clientName.toLowerCase()
    );
    const clientId = client?.id || props.clientId || `cli-${Date.now()}`;
    const clientName = client?.name || props.clientName;

    const newDeliverable: DeliverableRecord = {
      id: props.id || `del-${Date.now()}`,
      title: props.title.trim(),
      clientId,
      clientName,
      projectId: props.projectId,
      assetId: props.assetId,
      status: props.status || 'Queued',
      dueDate: props.dueDate || '2026-12-01',
      notes: props.notes || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    data.deliverables.push(newDeliverable);

    // Sync client active deliverable count
    if (client) {
      client.activeProjectsCount = data.deliverables.filter(
        (d) => d.clientId === client.id && d.status !== 'Done'
      ).length;
    }

    writeStore(data);
    return newDeliverable;
  },

  updateDeliverableStage(id: string, stage: DeliverableStage): DeliverableRecord | null {
    const data = readStore();
    const deliv = data.deliverables.find((d) => d.id === id);
    if (!deliv) return null;
    deliv.status = stage;
    deliv.updatedAt = new Date().toISOString();

    // Recompute client active counts
    const client = data.clients.find((c) => c.id === deliv.clientId);
    if (client) {
      client.activeProjectsCount = data.deliverables.filter(
        (d) => d.clientId === client.id && d.status !== 'Done'
      ).length;
    }

    writeStore(data);
    return deliv;
  },

  updateDeliverable(id: string, props: Partial<DeliverableRecord>): DeliverableRecord | null {
    const data = readStore();
    const idx = data.deliverables.findIndex((d) => d.id === id);
    if (idx < 0) return null;
    data.deliverables[idx] = {
      ...data.deliverables[idx],
      ...props,
      updatedAt: new Date().toISOString(),
    };
    writeStore(data);
    return data.deliverables[idx];
  },

  deleteDeliverable(id: string): boolean {
    const data = readStore();
    const initLen = data.deliverables.length;
    data.deliverables = data.deliverables.filter((d) => d.id !== id);
    writeStore(data);
    return data.deliverables.length < initLen;
  },

  // ------------------- Campaign Records -------------------

  getCampaigns(clientId?: string): CampaignRecord[] {
    const list = readStore().campaigns || [];
    if (!clientId) return list;
    return list.filter((c) => c.clientId === clientId);
  },

  getCampaign(id: string): CampaignRecord | null {
    return (readStore().campaigns || []).find((c) => c.id === id) || null;
  },

  createCampaign(props: Partial<CampaignRecord> & { title: string }): CampaignRecord {
    const data = readStore();
    const newCamp: CampaignRecord = {
      id: props.id || `cmp-${Date.now()}`,
      title: props.title.trim(),
      channel: props.channel || 'substack',
      status: props.status || 'draft',
      dateNotice: props.dateNotice || 'Scheduled',
      reach: props.reach || '10.0k',
      clientId: props.clientId,
      clientName: props.clientName,
      assetIds: props.assetIds || [],
      description: props.description || 'Targeted multi-channel broadcast campaign.',
      metrics: props.metrics || {
        reach: props.reach || '10.0k',
        engagement: '18.0%',
        conversion: '3.5%',
      },
    };
    data.campaigns.unshift(newCamp);
    writeStore(data);
    return newCamp;
  },

  updateCampaign(id: string, props: Partial<CampaignRecord>): CampaignRecord | null {
    const data = readStore();
    const idx = data.campaigns.findIndex((c) => c.id === id);
    if (idx < 0) return null;
    data.campaigns[idx] = { ...data.campaigns[idx], ...props };
    writeStore(data);
    return data.campaigns[idx];
  },

  updateCampaignStatus(id: string, status: CampaignRecord['status']): CampaignRecord | null {
    const data = readStore();
    const camp = data.campaigns.find((c) => c.id === id);
    if (!camp) return null;
    camp.status = status;
    writeStore(data);
    return camp;
  },

  attachAssetToCampaign(campaignId: string, assetId: string): boolean {
    const data = readStore();
    const camp = data.campaigns.find((c) => c.id === campaignId);
    const asset = data.assets.find((a) => a.id === assetId);
    if (!camp || !asset) return false;

    if (!camp.assetIds) camp.assetIds = [];
    if (!camp.assetIds.includes(assetId)) {
      camp.assetIds.push(assetId);
    }
    asset.campaignId = campaignId;

    // Also update any matching handoffs
    const handoff = data.handoffs.find((h) => h.assetId === assetId && h.toDepartment === 'market');
    if (handoff) {
      handoff.status = 'assigned';
      handoff.campaignId = campaignId;
    }

    writeStore(data);
    return true;
  },

  attachCampaignToClient(campaignId: string, clientId: string, clientName: string): boolean {
    const data = readStore();
    const camp = data.campaigns.find((c) => c.id === campaignId);
    if (!camp) return false;
    camp.clientId = clientId;
    camp.clientName = clientName;

    // Create a corresponding deliverable in Manage if one does not already exist
    const exists = data.deliverables.some(
      (d) => d.clientId === clientId && d.title.includes(camp.title)
    );
    if (!exists) {
      data.deliverables.push({
        id: `del-${Date.now()}`,
        title: `${camp.title} Execution`,
        clientId,
        clientName,
        status: 'Doing',
        dueDate: '2026-11-30',
        notes: `Attached from Market distribution campaign (${camp.channel}).`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      const client = data.clients.find((c) => c.id === clientId);
      if (client) {
        client.activeProjectsCount = data.deliverables.filter(
          (d) => d.clientId === client.id && d.status !== 'Done'
        ).length;
      }
    }

    writeStore(data);
    return true;
  },

  // --- CONTENT PLANNER METHODS (motif-v2.html:112 fidelity) ---
  getPosts(): ContentPostRecord[] {
    return readStore().posts || [];
  },

  getPost(id: string): ContentPostRecord | null {
    return readStore().posts.find((p) => p.id === id) || null;
  },

  createPost(props: Omit<ContentPostRecord, 'id'> & { id?: string }): ContentPostRecord {
    const data = readStore();
    const newPost: ContentPostRecord = {
      id: props.id || `post-${Date.now()}`,
      title: props.title,
      channel: props.channel,
      scheduledDate: props.scheduledDate || '2026-11-20',
      status: props.status || 'idea',
      caption: props.caption || '',
      campaignId: props.campaignId,
      campaignTitle: props.campaignTitle,
      projectId: props.projectId,
      projectTitle: props.projectTitle,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    data.posts.push(newPost);
    writeStore(data);
    return newPost;
  },

  updatePost(id: string, updates: Partial<ContentPostRecord>): ContentPostRecord | null {
    const data = readStore();
    const idx = data.posts.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    data.posts[idx] = {
      ...data.posts[idx],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    writeStore(data);
    return data.posts[idx];
  },

  deletePost(id: string): boolean {
    const data = readStore();
    const initialLen = data.posts.length;
    data.posts = data.posts.filter((p) => p.id !== id);
    if (data.posts.length !== initialLen) {
      writeStore(data);
      return true;
    }
    return false;
  },

  // --- CONNECTIONS METHODS (motif-v2.html:119 fidelity) ---
  getConnections(): ConnectionRecord[] {
    return readStore().connections || [];
  },

  getConnection(id: string): ConnectionRecord | null {
    return readStore().connections.find((c) => c.id === id) || null;
  },

  updateConnectionStatus(id: string, status: ConnectionStatus): ConnectionRecord | null {
    const data = readStore();
    const idx = data.connections.findIndex((c) => c.id === id);
    if (idx === -1) return null;
    data.connections[idx] = {
      ...data.connections[idx],
      status,
      lastHandoffAt: status === 'demo_handoff_ready' || status === 'connected' ? new Date().toISOString() : data.connections[idx].lastHandoffAt,
    };
    writeStore(data);
    return data.connections[idx];
  },
};

export default progressStore;
