import { CampaignRecord } from '../../../../types';

export const MOCK_CAMPAIGNS: CampaignRecord[] = [
  {
    id: 'camp-01',
    title: 'Offscript Issue Zero Drop Sequence',
    channel: 'substack',
    status: 'live',
    clientName: 'Offscript Press',
    metrics: {
      reach: '18,400 reads',
      engagement: '24.8% click rate',
      conversion: '1,420 zines pre-ordered',
    },
  },
  {
    id: 'camp-02',
    title: 'Halftone Apparel Flash Release',
    channel: 'instagram',
    status: 'planned',
    clientName: 'Kilo Apparel',
    metrics: {
      reach: 'Est. 45,000 views',
      engagement: 'Est. 8.2%',
      conversion: 'Est. 300 orders',
    },
  },
  {
    id: 'camp-03',
    title: 'Creative Rebel Manifesto Dispatch',
    channel: 'email',
    status: 'completed',
    clientName: 'Internal',
    metrics: {
      reach: '5,200 creators',
      engagement: '68% open rate',
      conversion: '480 signups',
    },
  },
];

