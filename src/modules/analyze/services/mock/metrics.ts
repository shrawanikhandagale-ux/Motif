import { MetricInsight } from '../../../../types';

export const MOCK_METRICS = [
  { label: 'Total Audience Reach', value: '78.6k', change: '+32%', status: 'positive' },
  { label: 'Active Retainers', value: '2 Clients', change: '$14.2k/mo', status: 'positive' },
  { label: 'Conversion Velocity', value: '4.8%', change: '-0.6%', status: 'warning' },
  { label: 'Skill Modules Cleared', value: '6 of 15', change: '40% mapped', status: 'neutral' },
];

export const MOCK_INSIGHTS: MetricInsight[] = [
  {
    id: 'ins-01',
    headline: 'Conversion Dip on Streetwear Drop Sequence',
    stat: '-0.6% this week',
    departmentOrigin: 'market',
    suggestedAction:
      'The drop copy lacked high-urgency hook triggers. Revisit curriculum on Guerilla Campaign Orchestration.',
    recommendPathId: 'path-marketing-03',
  },
  {
    id: 'ins-02',
    headline: 'Exceptional Readership on Offscript Manifesto',
    stat: '68% Open Rate',
    departmentOrigin: 'create',
    suggestedAction:
      'Editorial style specimen resonated strongly. Recommended: Package typography system into a commercial digital asset.',
    recommendPathId: 'path-branding-01',
  },
];

