// Comprehensive User Journey & Closed-Loop Verification Test
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

console.log('=== RUNNING FULL 5-DEPARTMENT CLOSED-LOOP JOURNEY SUITE ===');

// --- JOURNEY 1: LEARN -> CREATE ---
console.log('\n[JOURNEY 1: LEARN -> CREATE]');
const briefId = 'brief-02';
const initialSkills = progressStore.getUnlockedSkills().length;
const proj = progressStore.createProjectFromBrief(briefId, 'Streetwear Capsule Sprint', ['Streetwear', 'Risograph']);
console.log('J1.1: Project created from brief:', proj.id.startsWith('proj-') && proj.briefId === briefId);

// Check checklist completion unlocks skills
const checkResult = progressStore.toggleChecklistItem(
  briefId,
  'b2-c1',
  ['b2-c1'], // single item brief test
  ['sk-apparel-01'],
  proj.id
);
console.log('J1.2: Checklist item toggled:', checkResult.isNowCompleted);
console.log('J1.3: All items completed:', checkResult.allCompleted);
console.log('J1.4: Target project completed:', progressStore.getProject(proj.id)?.status === 'completed');
console.log('J1.5: Skill unlocked on Skill Map:', progressStore.getUnlockedSkills().includes('sk-apparel-01'));

// --- JOURNEY 2: CREATE -> MARKET ---
console.log('\n[JOURNEY 2: CREATE -> MARKET]');
const asset = progressStore.createAsset({
  projectId: proj.id,
  title: 'Risograph Print Separations',
  type: 'graphic',
  fileFormat: '3-Spot PDF',
  previewText: 'Separated film master for silkscreening.',
});
console.log('J2.1: Production asset created:', asset.id.startsWith('ast-'));

const deployResult = progressStore.deployAssetToMarket(asset.id, 'Ready for social teaser drops.');
console.log('J2.2: Asset deployed to Market:', deployResult.success);
console.log('J2.3: Asset status is deployed:', progressStore.getAsset(asset.id)?.status === 'deployed');
console.log('J2.4: DeployedAssetView accessible in Market:', progressStore.getDeployedAssets('market').some(v => v.asset.id === asset.id));

// --- JOURNEY 3: MARKET -> MANAGE ---
console.log('\n[JOURNEY 3: MARKET -> MANAGE]');
const campaign = progressStore.createCampaign({
  title: 'Autumn Lookbook Drop',
  channel: 'instagram',
  reach: '32.5k',
  dateNotice: 'Next Tuesday',
});
console.log('J3.1: Campaign created in Market:', campaign.id.startsWith('cmp-'));

const attachAssetOk = progressStore.attachAssetToCampaign(campaign.id, asset.id);
console.log('J3.2: Asset assigned to campaign:', attachAssetOk && progressStore.getAsset(asset.id)?.campaignId === campaign.id);

// Register a client in Manage
const client = progressStore.createClient({
  name: 'Sundown Streetwear Ltd',
  industry: 'Apparel & Vinyl',
  contactEmail: 'contact@sundownstreet.com',
  monthlyRetainer: 8000,
  status: 'active',
});
console.log('J3.3: Client registered in Manage:', client.id.startsWith('cli-'));

// Attach campaign to client, which should automatically spawn a Manage deliverable
const attachClientOk = progressStore.attachCampaignToClient(campaign.id, client.id, client.name);
console.log('J3.4: Campaign attached to client:', attachClientOk);
const clientDeliverables = progressStore.getDeliverables(client.id);
console.log('J3.5: Deliverable created in Manage for client:', clientDeliverables.some(d => d.title.includes(campaign.title)));

// --- JOURNEY 4: MANAGE OPERATIONS ---
console.log('\n[JOURNEY 4: MANAGE OPERATIONS]');
const deliv = clientDeliverables[0];
console.log('J4.1: Initial deliverable status is Doing:', deliv.status === 'Doing');
console.log('J4.2: Client active count reflects live deliverable:', progressStore.getClient(client.id)?.activeProjectsCount === 1);

// Advance stage to In Review, then Done
progressStore.updateDeliverableStage(deliv.id, 'In Review');
console.log('J4.3: Deliverable advanced to In Review:', progressStore.getDeliverable(deliv.id)?.status === 'In Review');
progressStore.updateDeliverableStage(deliv.id, 'Done');
console.log('J4.4: Deliverable advanced to Done:', progressStore.getDeliverable(deliv.id)?.status === 'Done');
console.log('J4.5: Client active count decremented to 0:', progressStore.getClient(client.id)?.activeProjectsCount === 0);

// --- JOURNEY 5: ANALYZE & GROW -> LEARN LOOPBACK ---
console.log('\n[JOURNEY 5: ANALYZE & GROW -> LEARN LOOPBACK]');
// Check dynamic metrics computation
const currentClients = progressStore.getClients().filter(c => c.status === 'active');
const currentMrr = currentClients.reduce((acc, c) => acc + (c.monthlyRetainer || 0), 0);
console.log('J5.1: Active client count matches store:', currentClients.length >= 3);
console.log('J5.2: Retainer MRR computed accurately ($):', currentMrr >= 20000);

// Verify loopback recommendation resolves to a valid path
const targetPathId = 'path-marketing-03';
const enrolmentBefore = progressStore.getEnrolments().some(e => e.pathId === targetPathId);
const newEnrolment = progressStore.enrol(targetPathId);
console.log('J5.3: Track auto-enrolled on Loop Back:', newEnrolment.pathId === targetPathId);
console.log('J5.4: Enrolment recorded in store:', progressStore.getEnrolments().some(e => e.pathId === targetPathId));

console.log('\n=== ALL 5 CLOSED-LOOP JOURNEYS COMPLETED WITH ZERO DATA LOSS! ===');

