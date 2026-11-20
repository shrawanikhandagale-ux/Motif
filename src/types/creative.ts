export type ProjectStatus = 'draft' | 'in_progress' | 'review' | 'completed' | 'archived';

export type SourceBriefType = 'practical_brief' | 'custom' | 'client_brief';

export type TaskStatus = 'todo' | 'in_progress' | 'blocked' | 'completed';

export type TaskPriority = 'low' | 'medium' | 'high';

export type CreativeAssetType =
  | 'identity'
  | 'graphic'
  | 'copy'
  | 'template'
  | 'moodboard'
  | 'document'
  | 'video'
  | 'code';

export type CreativeAssetStatus = 'draft' | 'ready' | 'deployed' | 'archived';

export type DocumentType =
  | 'brand_guidelines'
  | 'creative_brief'
  | 'manifesto'
  | 'spec_sheet'
  | 'copy_draft';

export type DeliverableType =
  | 'client_presentation'
  | 'marketing_package'
  | 'brand_identity'
  | 'production_master';

export type DeliverableStatus = 'pending' | 'delivered' | 'accepted' | 'rejected';

export type IntegrationCategory =
  | 'native'
  | 'external_app'
  | 'import_export'
  | 'deep_api';

export type IntegrationStatus = 'available' | 'connected' | 'auth_required' | 'planned';

export interface Project {
  id: string;
  userId?: string;
  title: string;
  department: 'create' | string;
  status: ProjectStatus;
  clientName?: string;
  briefId?: string;
  sourceBriefType?: SourceBriefType;
  tags: string[];
  summary: string;
  taskIds?: string[];
  assetIds?: string[];
  documentIds?: string[];
  deliverableIds?: string[];
  toolIntegrationIds?: string[];
  createdAt?: string;
  updatedAt: string;
}

export interface ProjectBrief {
  id: string;
  projectId: string;
  practicalBriefId?: string;
  title: string;
  prompt: string;
  context: string;
  constraints: string[];
  requiredDeliverables: string[];
  attachedResourceIds: string[];
  status: 'active' | 'fulfilled' | 'amended';
  createdAt: string;
  updatedAt: string;
}

export interface ProjectTask {
  id: string;
  projectId: string;
  briefChecklistItemId?: string;
  title: string;
  description?: string;
  assignedDepartment: 'create' | 'market' | 'manage' | 'analyze';
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectAsset {
  id: string;
  projectId: string;
  title: string;
  type: CreativeAssetType;
  department: 'create' | string;
  description?: string;
  previewText?: string;
  fileFormat: string;
  fileSizeBytes?: number;
  storagePath?: string;
  externalToolUrl?: string;
  status: CreativeAssetStatus;
  version: number;
  campaignId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectDocument {
  id: string;
  projectId: string;
  title: string;
  docType: DocumentType;
  contentMarkdown: string;
  author: string;
  status: 'draft' | 'review' | 'final';
  version: number;
  createdAt: string;
  updatedAt: string;
}

export interface Deliverable {
  id: string;
  projectId: string;
  assetId: string;
  title: string;
  deliverableType: DeliverableType;
  targetDepartment: 'market' | 'manage';
  status: DeliverableStatus;
  handoffTimestamp: string;
  acceptedTimestamp?: string;
  clientFeedback?: string;
  notes?: string;
}

export interface ToolIntegration {
  id: string;
  name: string;
  toolKey: 'canva' | 'figma' | 'penpot' | 'photopea' | 'capcut' | 'davinci' | 'github' | string;
  integrationType: IntegrationCategory;
  status: IntegrationStatus;
  capabilities: string[];
  supportedInputTypes: string[];
  supportedOutputTypes: string[];
  authConfig?: {
    authType: 'oauth2' | 'api_key' | 'webhook';
    scopes?: string[];
  };
  connectionMetadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}
