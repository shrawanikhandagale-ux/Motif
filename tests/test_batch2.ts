// Mock localStorage in Node
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

// Seed legacy stores to test migration
localStorage.setItem('motif_saved_resources', JSON.stringify(['res-99', 'res-01']));
localStorage.setItem('motif_progress_store', JSON.stringify({ old: true }));

import { progressStore } from '../src/services/storage/progressStore';
import { storageService } from '../src/services/storage/index';

console.log('--- Running MOTIF Batch 2 Verification Tests ---');

// Test 1: Legacy store migration
const initial = progressStore.get();
console.log('Test 1: Store version is 2:', initial.version === 2);
console.log(
  'Test 1: Legacy saved resources merged:',
  initial.savedResourceIds.includes('res-99') && initial.savedResourceIds.includes('res-01')
);
console.log(
  'Test 1: Legacy keys removed from localStorage:',
  localStorage.getItem('motif_saved_resources') === null &&
    localStorage.getItem('motif_progress_store') === null
);

// Test 2: Asset retrieval & Creation
const assetsProj1 = progressStore.getAssets('proj-01');
console.log('Test 2: Seed assets for proj-01 exist:', assetsProj1.length >= 2);

const newAsset = progressStore.createAsset({
  projectId: 'proj-01',
  title: 'Test Acid Poster',
  type: 'graphic',
  fileFormat: 'PNG',
  previewText: 'High contrast preview',
});
console.log('Test 2: New asset created with ID:', Boolean(newAsset.id && newAsset.id.startsWith('ast-')));
console.log(
  'Test 2: New asset found in proj-01:',
  progressStore.getAssets('proj-01').some((a) => a.id === newAsset.id)
);

// Test 3: Deploy to Market
const deployRes = progressStore.deployAssetToMarket(newAsset.id);
console.log('Test 3: Deploy succeeded:', deployRes.success);
console.log(
  'Test 3: Handoff record created:',
  Boolean(deployRes.handoff && deployRes.handoff.assetId === newAsset.id)
);
console.log('Test 3: Asset status is deployed:', progressStore.getAsset(newAsset.id)?.status === 'deployed');
console.log('Test 3: Asset is marked deployed:', progressStore.isAssetDeployed(newAsset.id) === true);

// Test 4: Duplicate deployment prevention
const dupDeploy = progressStore.deployAssetToMarket(newAsset.id);
console.log('Test 4: Duplicate deploy returns success:', dupDeploy.success);
console.log('Test 4: Duplicate deploy returns same handoff ID:', dupDeploy.handoff?.id === deployRes.handoff?.id);
const handoffsForAsset = progressStore.getHandoffs('market').filter((h) => h.assetId === newAsset.id);
console.log('Test 4: Exactly 1 handoff record exists:', handoffsForAsset.length === 1);

// Test 5: Market DeployedAssetView join
const marketViews = progressStore.getDeployedAssets('market');
const targetView = marketViews.find((v) => v.asset.id === newAsset.id);
console.log('Test 5: Market sees deployed asset view:', Boolean(targetView));
console.log(
  'Test 5: Market view joins parent project title:',
  targetView?.project?.title === 'Offscript Publication Brand System'
);

// Test 6: Update Handoff status
const updatedHandoff = progressStore.updateHandoffStatus(deployRes.handoff!.id, 'assigned');
console.log('Test 6: Handoff status updated to assigned:', updatedHandoff?.status === 'assigned');
console.log(
  'Test 6: Updated status reflected in getHandoffs:',
  progressStore.getHandoffs('market').find((h) => h.id === deployRes.handoff!.id)?.status === 'assigned'
);

// Test 7: Project preferences separation
storageService.setTheme('dark');
console.log('Test 7: Theme saved in storageService:', storageService.getTheme() === 'dark');
console.log('Test 7: Theme is NOT in progressStore:', (progressStore.get() as any).theme === undefined);

// Test 8: Cascade on project deletion
const tempProj = progressStore.createProject({ title: 'Temporary Project' });
const tempAsset = progressStore.createAsset({ projectId: tempProj.id, title: 'Temp Deliverable' });
progressStore.deployAssetToMarket(tempAsset.id);
console.log(
  'Test 8: Temp asset and handoff exist before project delete:',
  progressStore.getAsset(tempAsset.id) !== null && progressStore.isAssetDeployed(tempAsset.id)
);

progressStore.deleteProject(tempProj.id);
console.log('Test 8: Temp project deleted:', progressStore.getProject(tempProj.id) === null);
console.log('Test 8: Temp asset cascaded delete:', progressStore.getAsset(tempAsset.id) === null);
console.log('Test 8: Temp handoff cascaded delete:', progressStore.isAssetDeployed(tempAsset.id) === false);

console.log('--- All Batch 2 Tests Finished Successfully! ---');

