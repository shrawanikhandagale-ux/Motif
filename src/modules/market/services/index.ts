import { CampaignRecord } from '../../../types';
import { storageService } from '../../../services/storage';
import { MOCK_CAMPAIGNS } from './mock/campaigns';

export async function getCampaigns(): Promise<CampaignRecord[]> {
  return MOCK_CAMPAIGNS;
}

export async function attachToManage(campaignTitle: string, clientName: string): Promise<boolean> {
  storageService.addHandoffLog(
    'market',
    'manage',
    `Attached campaign "${campaignTitle}" to client ${clientName} in Manage workspace.`
  );
  return true;
}

