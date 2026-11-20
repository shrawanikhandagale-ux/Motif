import { progressStore } from '../storage/progressStore';
import {
  Enrolment,
  ProgressItem,
  UserProgress,
} from '../../types';

/**
 * Progress Service
 * Provides a unified domain interface for user learning progress, brief completion,
 * and skill illumination across all five departments.
 * Backed by progressStore in localStorage today, architected for Supabase integration.
 */
export const progressService = {
  getEnrolments(): Enrolment[] {
    return progressStore.getEnrolments();
  },

  enrol(pathId: string): Enrolment {
    return progressStore.enrol(pathId);
  },

  markCompleted(targetId: string, type: 'lesson' | 'brief' | 'stage' | 'resource'): ProgressItem {
    return progressStore.markCompleted(targetId, type);
  },

  isCompleted(targetId: string): boolean {
    return progressStore.isCompleted(targetId);
  },

  unlockSkills(skillIds: string[]): string[] {
    return progressStore.unlockSkills(skillIds);
  },

  getUnlockedSkills(): string[] {
    return progressStore.getUnlockedSkills();
  },

  getCompletedChecklistIds(): string[] {
    return progressStore.getCompletedChecklistIds();
  },

  isChecklistCompleted(itemId: string): boolean {
    return progressStore.isChecklistCompleted(itemId);
  },

  toggleChecklistItem(
    briefId: string,
    itemId: string,
    allBriefItemIds: string[],
    skillsUnlocked: string[] = [],
    projectId?: string
  ): { allCompleted: boolean; isNowCompleted: boolean } {
    return progressStore.toggleChecklistItem(
      briefId,
      itemId,
      allBriefItemIds,
      skillsUnlocked,
      projectId
    );
  },

  getUserProgressSummary(userId: string = 'usr-current'): UserProgress {
    const data = progressStore.get();
    return {
      id: `uprog-${userId}`,
      userId,
      totalSkillsCount: 28,
      masteredSkillsCount: data.unlockedSkills.length,
      completedPathsCount: data.enrolments.filter((e) => e.status === 'completed').length,
      activeProjectsCount: data.projects.filter((p) => p.status === 'in_progress').length,
      deployedDeliverablesCount: data.handoffs.length,
      lastActiveTimestamp: new Date().toISOString(),
    };
  },
};

export default progressService;
