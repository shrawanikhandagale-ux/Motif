export * from './learnService';
import { storageService } from '../../../services/storage';

export async function getSkillMap() {
  return [
    { name: 'Brutal Typography', level: 'Mastered', progress: 100 },
    { name: 'Tactile Color Theory', level: 'Proficient', progress: 85 },
    { name: 'Manifesto Copywriting', level: 'Practicing', progress: 60 },
    { name: 'Organic Drop Tactics', level: 'Queued', progress: 25 },
  ];
}

export async function startBrief(briefTitle: string): Promise<{ projectId: string; redirected: boolean }> {
  storageService.addHandoffLog(
    'learn',
    'create',
    `Started brief "${briefTitle}". New project opened in Create.`
  );
  return {
    projectId: 'proj-brief-' + Date.now(),
    redirected: true,
  };
}
