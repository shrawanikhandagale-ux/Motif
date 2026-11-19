import { DepartmentId } from './index';

export type SkillDomain = 'Branding' | 'Design' | 'Marketing' | 'UI/UX';

export interface Skill {
  id: string;
  name: string;
  domain: SkillDomain | string;
  level: 'foundation' | 'intermediate' | 'advanced' | 'offscript';
  parentId?: string;
  description: string;
}

export interface Lesson {
  id: string;
  title: string;
  durationMinutes: number;
  format: 'reading' | 'exercise' | 'critique' | 'video';
  summary: string;
  skillId?: string;
}

export interface PathStage {
  id: string;
  title: string;
  order: number;
  description?: string;
  deliverable?: string;
  lessons: Lesson[];
}

export interface Path {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  domain: SkillDomain | string;
  level: 'Foundation' | 'Intermediate' | 'Offscript';
  estimatedHours: number;
  description: string;
  stages: PathStage[];
  skillIds: string[];
  briefId?: string;
  handsOffPrompt?: string;
}

export interface BriefChecklistItem {
  id: string;
  text: string;
  completed?: boolean;
}

export interface Brief {
  id: string;
  title: string;
  clientOrContext: string;
  deadlineNotice: string;
  description: string;
  checklist: BriefChecklistItem[];
  skillsUnlocked: string[];
  pathId?: string;
  handoffDepartment: DepartmentId;
}

export interface Resource {
  id: string;
  title: string;
  category: 'tool' | 'specimen' | 'template' | 'guide' | 'reading';
  domain: SkillDomain | string;
  urlOrFormat: string;
  description: string;
  featured?: boolean;
}

export interface Enrolment {
  id: string;
  pathId: string;
  enrolledAt: string;
  completedAt?: string;
  currentStageId?: string;
  currentLessonId?: string;
  status: 'active' | 'completed' | 'paused';
}

export interface ProgressItem {
  id: string;
  type: 'lesson' | 'brief' | 'stage' | 'resource' | 'checklist';
  targetId: string;
  completedAt: string;
}

export interface Project {
  id: string;
  title: string;
  department: DepartmentId;
  status: 'draft' | 'in_progress' | 'review' | 'completed';
  clientName?: string;
  briefId?: string;
  tags: string[];
  updatedAt: string;
  summary: string;
  assetIds?: string[];
}

