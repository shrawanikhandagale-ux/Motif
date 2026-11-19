import { CoursePath } from '../../../../types';

export const MOCK_PATHS: CoursePath[] = [
  {
    id: 'path-branding-01',
    title: 'Offscript Identity Systems',
    subtitle: 'Branding beyond uniform corporate guidelines',
    category: 'Branding',
    level: 'Foundation',
    duration: '3h 40m',
    modulesCount: 5,
    completedModulesCount: 4,
    description:
      'Learn how to establish gritty editorial type scales, irreverent color contrasts, and tactile brand systems.',
    handsOffPrompt: 'Design the visual guidelines for an underground press imprint.',
  },
  {
    id: 'path-design-02',
    title: 'Anti-Template Editorial Layouts',
    subtitle: 'Breaking free from the 12-column SaaS paradigm',
    category: 'Design',
    level: 'Intermediate',
    duration: '4h 15m',
    modulesCount: 6,
    completedModulesCount: 2,
    description:
      'Master high-contrast hierarchy, offset borders, brutalist rhythm, and tactile print textures for web.',
    handsOffPrompt: 'Produce a 3-spread digital zine layout with offset halftones.',
  },
  {
    id: 'path-marketing-03',
    title: 'Guerilla Campaign Orchestration',
    subtitle: 'Organic distribution for unconventional creators',
    category: 'Marketing',
    level: 'Offscript',
    duration: '2h 50m',
    modulesCount: 4,
    completedModulesCount: 0,
    description:
      'Build drop mechanics, manifesto emails, and narrative newsletters that turn audience into cult followings.',
    handsOffPrompt: 'Draft an unannounced product drop campaign with teaser copy.',
  },
];

export const MOCK_SKILLS = [
  { name: 'Brutal Typography', level: 'Mastered', progress: 100 },
  { name: 'Tactile Color Theory', level: 'Proficient', progress: 85 },
  { name: 'Manifesto Copywriting', level: 'Practicing', progress: 60 },
  { name: 'Organic Drop Tactics', level: 'Queued', progress: 20 },
];

