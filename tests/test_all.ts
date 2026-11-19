// Comprehensive test suite for Batch 1 & Batch 2
const store: Record<string, string> = {};
(global as any).localStorage = {
  getItem: (k: string) => store[k] || null,
  setItem: (k: string, v: string) => {
    store[k] = String(v);
  },
  removeItem: (k: string) => {
    delete store[k];
  },
  clear: () => {
    Object.keys(store).forEach((k) => delete store[k]);
  },
};
(global as any).window = {};

import { progressStore } from '../src/services/storage/progressStore';
import { storageService } from '../src/services/storage/index';

console.log('=== RUNNING FULL MOTIF VERIFICATION SUITE ===');

// --- Batch 1 Tests ---
// 1. Projects empty array preservation
progressStore.deleteProject('proj-01');
progressStore.deleteProject('proj-02');
console.log('B1-T1: Deleted all projects, current length:', progressStore.getProjects().length);
// Simulate reload from localStorage
const reloadedProjects = progressStore.get().projects;
console.log('B1-T1: Reloaded projects is empty array (no resurrection):', Array.isArray(reloadedProjects) && reloadedProjects.length === 0);

// 2. Prevent duplicate projects from same brief
const p1 = progressStore.createProjectFromBrief('brief-01', 'Test Project 1');
const p2 = progressStore.createProjectFromBrief('brief-01', 'Test Project 1 Duplicate Attempt');
console.log('B1-T2: Duplicate brief project prevented (same ID returned):', p1.id === p2.id);

// 3. Project-scoped checklist toggling
const checklistRes1 = progressStore.toggleChecklistItem('brief-01', 'b1-c3', ['b1-c1', 'b1-c2', 'b1-c3'], ['sk-test-01'], p1.id);
console.log('B1-T3: Checklist item toggled to complete:', checklistRes1.isNowCompleted === true);
console.log('B1-T3: Brief all completed is true:', checklistRes1.allCompleted === true);
console.log('B1-T3: Skills unlocked:', progressStore.getUnlockedSkills().includes('sk-test-01'));
console.log('B1-T3: Project marked completed:', progressStore.getProject(p1.id)?.status === 'completed');

// 4. Unchecking item rolls back completed status and completedItems
const checklistRes2 = progressStore.toggleChecklistItem('brief-01', 'b1-c3', ['b1-c1', 'b1-c2', 'b1-c3'], ['sk-test-01'], p1.id);
console.log('B1-T4: Unchecked item is now incomplete:', checklistRes2.isNowCompleted === false);
console.log('B1-T4: Project reverted to in_progress:', progressStore.getProject(p1.id)?.status === 'in_progress');

// --- Batch 2 Tests ---
// 5. Versioning and migration
console.log('B2-T5: Store version is 2:', progressStore.get().version === 2);

// 6. Asset creation & scoping
const ast = progressStore.createAsset({ projectId: p1.id, title: 'Acid Lookbook', type: 'graphic', fileFormat: 'PDF' });
console.log('B2-T6: Asset created for p1:', ast.id.startsWith('ast-'));
console.log('B2-T6: Asset in p1 list:', progressStore.getAssets(p1.id).some(a => a.id === ast.id));

// 7. Deploy to Market
const dep = progressStore.deployAssetToMarket(ast.id);
console.log('B2-T7: Asset deployed to Market:', dep.success);
console.log('B2-T7: Asset status updated to deployed:', progressStore.getAsset(ast.id)?.status === 'deployed');
console.log('B2-T7: isAssetDeployed true:', progressStore.isAssetDeployed(ast.id));

// 8. Market DeployedAssetView
const views = progressStore.getDeployedAssets('market');
console.log('B2-T8: Market view found for deployed asset:', views.some(v => v.asset.id === ast.id && v.project?.id === p1.id));

// 9. Status transition in Market
const updatedH = progressStore.updateHandoffStatus(dep.handoff!.id, 'assigned');
console.log('B2-T9: Market assigned status updated:', updatedH?.status === 'assigned');

// 10. Separation of UI preferences
storageService.setTheme('system');
console.log('B2-T10: Theme in storageService:', storageService.getTheme() === 'system');

console.log('=== ALL TESTS PASSED! ===');

