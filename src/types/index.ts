import { Project } from './learn';
export * from './learn';

export type DepartmentId = 'learn' | 'create' | 'market' | 'manage' | 'analyze';

export interface DepartmentInfo {
  id: DepartmentId;
  name: string;
  subtitle: string;
  tagline: string;
  features: string[];
  handoffTo: DepartmentId;
  handoffLabel: string;
  handoffText: string;
}

export type WorkspaceType =
  | 'student'
  | 'beginner'
  | 'freelancer'
  | 'independent creator'
  | 'professional'
  | 'business'
  | 'agency';

export type CreativeInterest = 'branding' | 'graphic design' | 'UI/UX' | 'marketing' | string;

export interface Profile {
  id: string;
  name: string;
  handle: string;
  bio: string;
  interests: CreativeInterest[];
  goals: string[];
  workspaceTypes: WorkspaceType[];
  createdAt: string;
  completedOnboarding: boolean;
}

export interface UserProfile extends Profile {
  role?: string;
  avatarUrl?: string;
}

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  plan: 'free' | 'pro' | 'studio';
  membersCount: number;
}

export type ProjectRecord = Project;

export type AssetType = 'identity' | 'graphic' | 'copy' | 'template' | 'moodboard';
export type AssetStatus = 'draft' | 'ready' | 'deployed' | 'archived';
export type HandoffStatus = 'available' | 'assigned' | 'archived';

export interface AssetRecord {
  id: string;
  projectId: string;
  title: string;
  type: AssetType;
  department: DepartmentId;
  description?: string;
  previewText?: string;
  fileFormat: string;
  status: AssetStatus;
  createdAt: string;
  updatedAt: string;
  campaignId?: string;
}

export interface AssetHandoffRecord {
  id: string;
  assetId: string;
  projectId: string;
  fromDepartment: DepartmentId;
  toDepartment: DepartmentId;
  status: HandoffStatus;
  deployedAt: string;
  campaignId?: string;
  notes?: string;
}

export interface DeployedAssetView {
  handoff: AssetHandoffRecord;
  asset: AssetRecord;
  project?: Project;
}

export interface ClientRecord {
  id: string;
  name: string;
  industry: string;
  status: 'lead' | 'active' | 'archived';
  activeProjectsCount: number;
  contactEmail: string;
}

export interface CampaignRecord {
  id: string;
  title: string;
  channel: 'instagram' | 'email' | 'substack' | 'x' | 'multi';
  status: 'planned' | 'live' | 'completed';
  clientName?: string;
  metrics?: {
    reach: string;
    engagement: string;
    conversion: string;
  };
}

export interface CoursePath {
  id: string;
  title: string;
  subtitle: string;
  category: 'Branding' | 'Design' | 'UI/UX' | 'Marketing' | 'Business';
  level: 'Foundation' | 'Intermediate' | 'Offscript';
  duration: string;
  modulesCount: number;
  completedModulesCount: number;
  description: string;
  handsOffPrompt: string;
}

export interface MetricInsight {
  id: string;
  headline: string;
  stat: string;
  departmentOrigin: DepartmentId;
  suggestedAction: string;
  recommendPathId?: string;
}

export interface DashboardTilesConfig {
  departmentsStrip: boolean;
  continueLearning: boolean;
  recentProjects: boolean;
  upcomingTasks: boolean;
  skillMap: boolean;
}

export interface DashboardTask {
  id: string;
  title: string;
  department: string;
  dueDate: string;
  completed: boolean;
}

