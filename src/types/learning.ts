export type SkillDomain = 'Branding' | 'Design' | 'Marketing' | 'UI/UX' | string;

export type SkillLevel = 'foundation' | 'intermediate' | 'advanced' | 'offscript';

export type ResourceType =
  | 'course'
  | 'lesson'
  | 'tool'
  | 'specimen'
  | 'template'
  | 'guide'
  | 'video'
  | 'reading'
  | 'article'
  | 'exercise'
  | 'interactive'
  | 'documentation';

export type PublicationStatus = 'draft' | 'pending_review' | 'published' | 'archived';

export type DiscoveryMethod = 'manual_curation' | 'api_sync' | 'community_submission';

export type AvailabilityStatus = 'active' | 'broken_link' | 'deprecated' | 'restricted';

export type PricingType = 'free' | 'freemium' | 'paid';

export type ProviderType = 'official' | 'partner' | 'community' | 'oer';

export interface AttributionAndLicensing {
  providerName: string;
  license: string;
  copyrightNotice?: string;
  attributionHtml?: string;
  originalAuthor?: string;
}

export interface LearningProvider {
  id: string;
  name: string;
  slug: string;
  type: ProviderType;
  websiteUrl: string;
  logoUrl?: string;
  description: string;
  isVerified: boolean;
  supportedResourceTypes: ResourceType[];
  attributionRequirements: string;
  apiEndpoint?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LessonSourceAttribution {
  providerId: string;
  author?: string;
  licenseType: string;
  originalUrl?: string;
}

export interface Lesson {
  id: string;
  moduleId?: string;
  title: string;
  durationMinutes: number;
  format: 'reading' | 'exercise' | 'critique' | 'video' | 'interactive';
  summary: string;
  skillId?: string;
  skillIds?: string[];
  contentUri?: string;
  externalUrl?: string;
  exercisePrompt?: string;
  sourceAttribution?: LessonSourceAttribution;
}

export interface LearningModule {
  id: string;
  pathId: string;
  title: string;
  order: number;
  description?: string;
  deliverablePrompt?: string;
  lessons: Lesson[];
  estimatedMinutes: number;
}

export interface LearningPath {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  domain: SkillDomain;
  level: 'Foundation' | 'Intermediate' | 'Offscript' | SkillLevel;
  estimatedHours: number;
  providerId: string;
  description: string;
  modules: LearningModule[];
  skillIds: string[];
  practicalBriefIds: string[];
  prerequisites?: string[];
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface LearningResource {
  id: string;
  title: string;
  description: string;
  subject: SkillDomain;
  resourceType: ResourceType;
  skillIds: string[];
  difficultyLevel: SkillLevel;
  estimatedDurationMinutes: number;
  pricingType: PricingType;
  originalSourceUrl: string;
  providerId: string;
  attributionAndLicensing: AttributionAndLicensing;
  publicationStatus: PublicationStatus;
  verificationDate: string;
  discoveryMethod: DiscoveryMethod;
  contentAvailabilityStatus: AvailabilityStatus;
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Skill {
  id: string;
  name: string;
  domain: SkillDomain;
  level: SkillLevel;
  parentId?: string;
  description: string;
  criteria?: string[];
  relatedSkillIds?: string[];
}

export interface UserSkill {
  id: string;
  userId: string;
  skillId: string;
  proficiencyLevel: 'unlocked' | 'practicing' | 'proficient' | 'mastered';
  confidenceScore: number;
  unlockedAt: string;
  lastDemonstratedAt?: string;
  evidenceIds: string[];
}

export interface LearningProgress {
  id: string;
  userId: string;
  pathId: string;
  currentModuleId?: string;
  currentLessonId?: string;
  status: 'not_started' | 'active' | 'completed' | 'paused';
  progressPercentage: number;
  completedLessonIds: string[];
  completedExerciseIds: string[];
  enrolledAt: string;
  lastActiveAt: string;
  completedAt?: string;
}

export interface BriefChecklistItem {
  id: string;
  text: string;
  completed?: boolean;
}

export interface AssetSlotTemplate {
  title: string;
  type: 'identity' | 'graphic' | 'copy' | 'template' | 'moodboard';
  format: string;
}

export interface PracticalBrief {
  id: string;
  title: string;
  clientOrContext: string;
  deadlineNotice: string;
  description: string;
  constraints: string[];
  checklist: BriefChecklistItem[];
  skillsUnlocked: string[];
  pathId?: string;
  moduleId?: string;
  handoffDepartment: 'create';
  deliverableSpecs?: {
    requiredFormats: string[];
    assetSlotTemplates: AssetSlotTemplate[];
  };
  createdAt: string;
}
