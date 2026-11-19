import { DepartmentInfo } from '../types';

export const APP_NAME = 'MOTIF';
export const APP_TAGLINE = 'Built for the offscript.';

export const DEPARTMENTS: DepartmentInfo[] = [
  {
    id: 'learn',
    name: 'Learn',
    subtitle: 'the academy',
    tagline: 'Learn by making.',
    features: [
      'Guided paths for branding, design, UI/UX and marketing',
      'A curated library to explore in any order',
      'Briefs: real prompts with a deadline',
      'A Skill Map that lights up as you build',
    ],
    handoffTo: 'create',
    handoffLabel: 'hands off to Create',
    handoffText: 'Start a brief and it opens as a project in Create.',
  },
  {
    id: 'create',
    name: 'Create',
    subtitle: 'the studio',
    tagline: 'Make the work.',
    features: [
      'Projects with moodboards and references',
      'Brand and design resources in one place',
      'Content drafts and asset library',
      'Notes that stay attached to the work',
    ],
    handoffTo: 'market',
    handoffLabel: 'hands off to Market',
    handoffText: 'Finished assets are ready to use in Market.',
  },
  {
    id: 'market',
    name: 'Market',
    subtitle: 'the hub',
    tagline: 'Put it out there.',
    features: [
      'Campaign plans built from your assets',
      'Content calendar across channels',
      'Brand positioning worksheets',
      'Social strategy templates',
    ],
    handoffTo: 'manage',
    handoffLabel: 'hands off to Manage',
    handoffText: 'Campaigns attach to the client they are for in Manage.',
  },
  {
    id: 'manage',
    name: 'Manage',
    subtitle: 'the workspace',
    tagline: 'Run the work.',
    features: [
      'Projects, tasks and boards you can drag around',
      'A light client list',
      'Collaboration with teammates and clients',
      'Your own workflow, your own layout',
    ],
    handoffTo: 'analyze',
    handoffLabel: 'hands off to Analyze & Grow',
    handoffText: 'Live campaigns report their results to Analyze & Grow.',
  },
  {
    id: 'analyze',
    name: 'Analyze',
    subtitle: '& grow',
    tagline: 'See what worked.',
    features: [
      'Campaign performance in one view',
      'Business and growth metrics',
      'Progress reports you can share',
      'Insights that point back to what to learn next',
    ],
    handoffTo: 'learn',
    handoffLabel: 'hands off to Learn',
    handoffText: 'A weak result suggests a path in Learn. The loop closes.',
  },
];

export const SHARED_RECORD_TYPES = [
  'Profiles',
  'Workspaces',
  'Projects',
  'Assets',
  'Clients',
  'Campaigns',
  'Courses',
  'Activity',
] as const;

export const TOKEN_PALETTE = [
  { name: 'Ivory', hex: '#F1EBDD', varName: '--color-ivory', desc: 'Warm editorial paper canvas' },
  { name: 'Ink', hex: '#171717', varName: '--color-ink', desc: 'High-contrast line and typography' },
  { name: 'Oxblood', hex: '#702C35', varName: '--color-oxblood', desc: 'Rebellious primary brand accent' },
  { name: 'Acid', hex: '#D9E638', varName: '--color-acid', desc: 'High-visibility energetic accent' },
  { name: 'Electric', hex: '#A8B8E8', varName: '--color-electric', desc: 'Tactile editorial accent blue' },
] as const;

