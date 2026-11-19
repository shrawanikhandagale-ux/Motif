export * from './learnService';

export async function getSkillMap() {
  return [
    { name: 'Brutal Typography', level: 'Mastered', progress: 100 },
    { name: 'Tactile Color Theory', level: 'Proficient', progress: 85 },
    { name: 'Manifesto Copywriting', level: 'Practicing', progress: 60 },
    { name: 'Organic Drop Tactics', level: 'Queued', progress: 25 },
  ];
}

export async function startBrief(_briefTitle: string): Promise<{ projectId: string; redirected: boolean }> {
  return {
    projectId: 'proj-brief-' + Date.now(),
    redirected: true,
  };
}
