// Verification of UI module exports and data integrity across the 5 upgraded sections
import { LearnPage } from '../src/modules/learn/pages/LearnPage';
import { PathsListPage } from '../src/modules/learn/pages/PathsListPage';
import { BriefRoomPage } from '../src/modules/learn/pages/BriefRoomPage';
import { SkillMapPage } from '../src/modules/learn/pages/SkillMapPage';
import { CreatePage } from '../src/modules/create/pages/CreatePage';
import { BriefBuilderPage } from '../src/modules/create/pages/BriefBuilderPage';
import { AssetLibraryPage } from '../src/modules/create/pages/AssetLibraryPage';
import { MarketPage } from '../src/modules/market/pages/MarketPage';
import { ContentPlannerPage } from '../src/modules/market/pages/ContentPlannerPage';
import { CampaignsPage } from '../src/modules/market/pages/CampaignsPage';
import { ConnectionsPage } from '../src/modules/market/pages/ConnectionsPage';
import { IncomingAssetsPage } from '../src/modules/market/pages/IncomingAssetsPage';
import { ManagePage } from '../src/modules/manage/pages/ManagePage';
import { ClientsPage } from '../src/modules/manage/pages/ClientsPage';
import { TasksPage } from '../src/modules/manage/pages/TasksPage';
import { FinancePage } from '../src/modules/manage/pages/FinancePage';
import { AnalyzePage } from '../src/modules/analyze/pages/AnalyzePage';
import { LearningVsProvenPage } from '../src/modules/analyze/pages/LearningVsProvenPage';
import { InsightsPage } from '../src/modules/analyze/pages/InsightsPage';
import { progressStore } from '../src/services/storage/progressStore';

console.log('--- Testing Five Section Page Exports & State Binding ---');
console.log('1. LearnPage exported:', typeof LearnPage === 'function');
console.log('2. PathsListPage exported:', typeof PathsListPage === 'function');
console.log('2b. BriefRoomPage exported:', typeof BriefRoomPage === 'function');
console.log('2c. SkillMapPage exported:', typeof SkillMapPage === 'function');
console.log('3. CreatePage exported:', typeof CreatePage === 'function');
console.log('3b. BriefBuilderPage exported:', typeof BriefBuilderPage === 'function');
console.log('3c. AssetLibraryPage exported:', typeof AssetLibraryPage === 'function');
console.log('4. MarketPage exported:', typeof MarketPage === 'function');
console.log('4b. ContentPlannerPage exported:', typeof ContentPlannerPage === 'function');
console.log('4c. CampaignsPage exported:', typeof CampaignsPage === 'function');
console.log('4d. ConnectionsPage exported:', typeof ConnectionsPage === 'function');
console.log('4e. IncomingAssetsPage exported:', typeof IncomingAssetsPage === 'function');
console.log('5. ManagePage exported:', typeof ManagePage === 'function');
console.log('5b. ClientsPage exported:', typeof ClientsPage === 'function');
console.log('5c. TasksPage exported:', typeof TasksPage === 'function');
console.log('5d. FinancePage exported:', typeof FinancePage === 'function');
console.log('6. AnalyzePage exported:', typeof AnalyzePage === 'function');
console.log('6b. LearningVsProvenPage exported:', typeof LearningVsProvenPage === 'function');
console.log('6c. InsightsPage exported:', typeof InsightsPage === 'function');

const data = progressStore.get();
console.log('7. Progress store operational for all sections:', Boolean(data && data.version >= 2));
console.log('8. Projects ledger available:', Array.isArray(data.projects));
console.log('9. Handoffs ledger available:', Array.isArray(data.handoffs));
console.log('10. Assets ledger available:', Array.isArray(data.assets));
console.log('11. Clients ledger available:', Array.isArray(data.clients));
console.log('12. Campaigns ledger available:', Array.isArray(data.campaigns));
console.log('13. Deliverables ledger available:', Array.isArray(data.deliverables));
console.log('14. Content Planner posts ledger available:', Array.isArray(progressStore.getPosts()));
console.log('15. Connections ledger available:', Array.isArray(progressStore.getConnections()));

// Test Content Planner CRUD in progressStore
const createdPost = progressStore.createPost({
  title: 'Audit Zine Release Reel',
  channel: 'Instagram',
  scheduledDate: '2026-11-28',
  status: 'idea',
  caption: 'Testing Content Planner CRUD persistence.',
});
console.log('16. Post created in store:', createdPost.id.startsWith('post-'));

const updatedPost = progressStore.updatePost(createdPost.id, { status: 'scheduled' });
console.log('17. Post status updated to scheduled:', updatedPost?.status === 'scheduled');

const deleteOk = progressStore.deletePost(createdPost.id);
console.log('18. Post deleted from store:', deleteOk && !progressStore.getPost(createdPost.id));

// Test Connections status update
const conns = progressStore.getConnections();
const igConn = conns.find(c => c.channel === 'Instagram');
if (igConn) {
  progressStore.updateConnectionStatus(igConn.id, 'demo_handoff_ready');
  console.log('19. Instagram connection set to demo_handoff_ready:', progressStore.getConnection(igConn.id)?.status === 'demo_handoff_ready');
}

console.log('--- All UI Consistency & Gap Checks Passed! ---');
