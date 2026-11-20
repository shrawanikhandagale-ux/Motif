import { DepartmentId } from './index';

export type ActivityType =
  | 'completed_lesson'
  | 'submitted_brief'
  | 'created_project'
  | 'updated_checklist'
  | 'deployed_asset'
  | 'launched_campaign'
  | 'attached_client'
  | 'analyzed_metrics';

export type EntityType =
  | 'lesson'
  | 'brief'
  | 'project'
  | 'asset'
  | 'campaign'
  | 'client'
  | 'deliverable';

export interface UserActivity {
  id: string;
  userId: string;
  department: DepartmentId;
  activityType: ActivityType;
  entityType: EntityType;
  entityId: string;
  summary: string;
  metadata?: Record<string, unknown>;
  timestamp: string;
}

export type ContentSourceType =
  | 'internal_curation'
  | 'hubspot_academy'
  | 'google_skillshop'
  | 'meta_blueprint'
  | 'canva_design_school'
  | 'figma_resources'
  | 'openlearn'
  | 'mit_ocw'
  | 'youtube_data_api';

export type SourceAuthType = 'none' | 'api_key' | 'oauth2' | 'rss_feed';

export type SyncStatus = 'idle' | 'syncing' | 'error' | 'disabled';

export interface ContentSource {
  id: string;
  name: string;
  sourceType: ContentSourceType;
  baseUrl: string;
  apiVersion?: string;
  authType: SourceAuthType;
  lastSyncAt?: string;
  syncStatus: SyncStatus;
  isAutomated: boolean;
  syncFrequencyHours: number;
}

export type LicenseType =
  | 'CC-BY'
  | 'CC-BY-SA'
  | 'CC-BY-NC'
  | 'PublicDomain'
  | 'ProprietaryOpenAccess'
  | 'CopyrightedEditorial';

export interface ResourceMetadata {
  id: string;
  resourceId: string;
  authorOrInstructor: string;
  publisher: string;
  licenseType: LicenseType;
  language: string;
  originalPublishDate?: string;
  lastVerifiedAt: string;
  canonicalUrl: string;
  technicalRequirements?: string[];
  tags: string[];
}

export interface UserProgress {
  id: string;
  userId: string;
  totalSkillsCount: number;
  masteredSkillsCount: number;
  completedPathsCount: number;
  activeProjectsCount: number;
  deployedDeliverablesCount: number;
  lastActiveTimestamp: string;
}

export type EvidenceType =
  | 'brief_deliverable'
  | 'project_asset'
  | 'external_certificate'
  | 'quiz_score'
  | 'published_campaign';

export type VerificationStatus = 'self_verified' | 'automated_check' | 'mentor_reviewed';

export interface SkillEvidence {
  id: string;
  userId: string;
  skillId: string;
  evidenceType: EvidenceType;
  sourceEntityId: string;
  sourceEntityType: 'deliverable' | 'asset' | 'certificate' | 'campaign';
  verificationStatus: VerificationStatus;
  timestamp: string;
  evidenceUri?: string;
  notes?: string;
}

