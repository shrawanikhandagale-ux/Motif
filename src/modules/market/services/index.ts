import { CampaignRecord } from '../../../types';
import { MOCK_CAMPAIGNS } from './mock/campaigns';

export async function getCampaigns(): Promise<CampaignRecord[]> {
  return MOCK_CAMPAIGNS;
}

export async function attachToManage(_campaignTitle: string, _clientName: string): Promise<boolean> {
  return true;
}
