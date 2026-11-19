import { useState, useEffect, useCallback } from 'react';
import { Enrolment, ProgressItem, Project } from '../types';
import { progressStore } from '../services/storage';

export function useProgress() {
  const [enrolments, setEnrolments] = useState<Enrolment[]>(() => progressStore.getEnrolments());
  const [completedItems, setCompletedItems] = useState<ProgressItem[]>(() => progressStore.get().completedItems);
  const [unlockedSkills, setUnlockedSkills] = useState<string[]>(() => progressStore.getUnlockedSkills());
  const [projects, setProjects] = useState<Project[]>(() => progressStore.getProjects());

  const [savedResourceIds, setSavedResourceIds] = useState<string[]>(() => progressStore.getSavedResourceIds());
  const [completedChecklistIds, setCompletedChecklistIds] = useState<string[]>(() => progressStore.getCompletedChecklistIds());

  const sync = useCallback(() => {
    const data = progressStore.get();
    setEnrolments(data.enrolments);
    setCompletedItems(data.completedItems);
    setUnlockedSkills(data.unlockedSkills);
    setProjects(data.projects);
    setSavedResourceIds(data.savedResourceIds || []);
    setCompletedChecklistIds(data.completedChecklistIds || []);
  }, []);

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'motif_learning_progress_store') {
        sync();
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [sync]);

  const enrol = useCallback((pathId: string) => {
    const item = progressStore.enrol(pathId);
    sync();
    return item;
  }, [sync]);

  const completeLesson = useCallback((lessonId: string, skillIdToUnlock?: string) => {
    progressStore.markCompleted(lessonId, 'lesson');
    if (skillIdToUnlock) {
      progressStore.unlockSkills([skillIdToUnlock]);
    }
    sync();
  }, [sync]);

  const completeBrief = useCallback((briefId: string, skillsUnlocked: string[] = []) => {
    progressStore.markCompleted(briefId, 'brief');
    if (skillsUnlocked.length > 0) {
      progressStore.unlockSkills(skillsUnlocked);
    }
    sync();
  }, [sync]);

  const unlockSkills = useCallback((skillIds: string[]) => {
    progressStore.unlockSkills(skillIds);
    sync();
  }, [sync]);

  const isCompleted = useCallback((targetId: string) => {
    return completedItems.some((item) => item.targetId === targetId);
  }, [completedItems]);

  const isSkillUnlocked = useCallback((skillId: string) => {
    return unlockedSkills.includes(skillId);
  }, [unlockedSkills]);

  const createProjectFromBrief = useCallback(
    (briefId: string, title: string, tags: string[] = ['Brief Output']) => {
      const proj = progressStore.createProjectFromBrief(briefId, title, tags);
      sync();
      return proj;
    },
    [sync]
  );

  const toggleSaveResource = useCallback((resourceId: string) => {
    const result = progressStore.toggleSaveResource(resourceId);
    sync();
    return result;
  }, [sync]);

  const toggleChecklistItem = useCallback(
    (
      briefId: string,
      itemId: string,
      allBriefItemIds: string[],
      skillsUnlocked: string[] = [],
      projectId?: string
    ) => {
      const res = progressStore.toggleChecklistItem(
        briefId,
        itemId,
        allBriefItemIds,
        skillsUnlocked,
        projectId
      );
      sync();
      return res;
    },
    [sync]
  );

  const isChecklistCompleted = useCallback(
    (itemId: string) => {
      return completedChecklistIds.includes(itemId);
    },
    [completedChecklistIds]
  );

  const createProject = useCallback(
    (props: Partial<Project> & { title: string }) => {
      const p = progressStore.createProject(props);
      sync();
      return p;
    },
    [sync]
  );

  const updateProjectStatus = useCallback(
    (projectId: string, status: Project['status']) => {
      const p = progressStore.updateProjectStatus(projectId, status);
      sync();
      return p;
    },
    [sync]
  );

  const deleteProject = useCallback(
    (projectId: string) => {
      const ok = progressStore.deleteProject(projectId);
      sync();
      return ok;
    },
    [sync]
  );

  return {
    enrolments,
    completedItems,
    unlockedSkills,
    projects,
    savedResourceIds,
    completedChecklistIds,
    enrol,
    completeLesson,
    completeBrief,
    unlockSkills,
    isCompleted,
    isSkillUnlocked,
    createProjectFromBrief,
    createProject,
    updateProjectStatus,
    deleteProject,
    toggleSaveResource,
    toggleChecklistItem,
    isChecklistCompleted,
    refresh: sync,
  };
}

export default useProgress;

