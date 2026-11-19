import { Path } from '../../../../types';

export const MOCK_PATHS: Path[] = [
  {
    id: 'path-branding-01',
    slug: 'offscript-identity-systems',
    title: 'Offscript Identity Systems',
    subtitle: 'Branding beyond uniform corporate guidelines',
    domain: 'Branding',
    level: 'Foundation',
    estimatedHours: 4,
    description: 'Master gritty editorial typography, contrarian tone of voice, and tactile visual systems for underground brands.',
    briefId: 'brief-01',
    handsOffPrompt: 'Design the visual identity and packaging for an independent coffee collective.',
    skillIds: ['sk-br-01', 'sk-br-02', 'sk-br-04', 'sk-br-05'],
    stages: [
      {
        id: 'stg-br-1',
        title: 'Core Worldview & Voice',
        order: 1,
        deliverable: 'Worldview Manifesto & Brand Tone Specimen Sheet',
        lessons: [
          { id: 'les-br-101', title: 'The Anti-Corporate Manifesto', durationMinutes: 20, format: 'reading', summary: 'Why conventional branding guidelines fail independent creators.', skillId: 'sk-br-01' },
          { id: 'les-br-102', title: 'Tone of Voice Calibration', durationMinutes: 30, format: 'exercise', summary: 'Writing in punchy, declarative sentences without corporate jargon.', skillId: 'sk-br-02' },
        ],
      },
      {
        id: 'stg-br-2',
        title: 'Visual Architecture & Type',
        order: 2,
        deliverable: 'Two-Font Pairing Scale & 4-Color Token Architecture',
        lessons: [
          { id: 'les-br-201', title: 'Heavy Grotesque & Monospace Pairings', durationMinutes: 35, format: 'exercise', summary: 'Pairing Bricolage Grotesque 800 with DM Mono 400.', skillId: 'sk-br-05' },
          { id: 'les-br-202', title: 'High-Contrast Token Systems', durationMinutes: 25, format: 'critique', summary: 'Establishing ivory, ink, oxblood, and acid palettes.', skillId: 'sk-br-04' },
        ],
      },
    ],
  },
  {
    id: 'path-design-02',
    slug: 'anti-template-editorial-layouts',
    title: 'Anti-Template Editorial Layouts',
    subtitle: 'Breaking free from the 12-column SaaS paradigm',
    domain: 'Design',
    level: 'Intermediate',
    estimatedHours: 5,
    description: 'Craft high-contrast asymmetrical grids, risograph plates, and halftone frequency textures for print and web.',
    briefId: 'brief-02',
    handsOffPrompt: 'Produce a 16-page risograph zine layout with dual-tone separations.',
    skillIds: ['sk-ds-01', 'sk-ds-02', 'sk-ds-03', 'sk-ds-04'],
    stages: [
      {
        id: 'stg-ds-1',
        title: 'Grids with Tension',
        order: 1,
        deliverable: 'Asymmetrical Editorial Grid & 14px Halftone Matrix Sheet',
        lessons: [
          { id: 'les-ds-101', title: 'Asymmetrical Rhythm & Offsets', durationMinutes: 25, format: 'reading', summary: 'Using intentional whitespace and hard borders to lead the eye.', skillId: 'sk-ds-02' },
          { id: 'les-ds-102', title: 'Halftone Dot Matrix Manipulation', durationMinutes: 35, format: 'exercise', summary: 'Generating 14px radial frequency dots and linear mask gradients.', skillId: 'sk-ds-04' },
        ],
      },
      {
        id: 'stg-ds-2',
        title: 'Physical Print & Zines',
        order: 2,
        deliverable: '16-Page Risograph Imposition Layout & Color Separations',
        lessons: [
          { id: 'les-ds-201', title: 'Risograph Drum Channel Separations', durationMinutes: 40, format: 'video', summary: 'Preparing spot colors for two-pass riso printing.', skillId: 'sk-ds-03' },
          { id: 'les-ds-202', title: 'Imposition and Paste-Up Anatomy', durationMinutes: 30, format: 'exercise', summary: 'Folding, stitching, and pagination for 16-page publications.', skillId: 'sk-ds-06' },
        ],
      },
    ],
  },
  {
    id: 'path-marketing-03',
    slug: 'guerilla-campaign-orchestration',
    title: 'Guerilla Campaign Orchestration',
    subtitle: 'Organic distribution for unconventional creators',
    domain: 'Marketing',
    level: 'Offscript',
    estimatedHours: 4,
    description: 'Build organic drop mechanics, manifesto emails, and narrative newsletters that turn audience into cult followings.',
    briefId: 'brief-03',
    handsOffPrompt: 'Orchestrate a 48-hour flash drop sequence with unannounced teaser copy.',
    skillIds: ['sk-mk-01', 'sk-mk-02', 'sk-mk-03', 'sk-mk-04'],
    stages: [
      {
        id: 'stg-mk-1',
        title: 'Drop Dynamics & Scarcity',
        order: 1,
        deliverable: '48-Hour Drop Blueprint & High-Open Narrative Dispatch',
        lessons: [
          { id: 'les-mk-101', title: 'The Anatomy of a Flash Release', durationMinutes: 30, format: 'reading', summary: 'Scarcity clocks, batch numbering, and physical exclusivity.', skillId: 'sk-mk-02' },
          { id: 'les-mk-102', title: 'Cult Dispatch Copywriting', durationMinutes: 35, format: 'exercise', summary: 'Writing narrative emails with 60%+ open rates.', skillId: 'sk-mk-03' },
        ],
      },
      {
        id: 'stg-mk-2',
        title: 'Physical-to-Digital Street Launches',
        order: 2,
        deliverable: 'Street Launch Poster Matrix with Encrypted Cipher Codes',
        lessons: [
          { id: 'les-mk-201', title: 'Flyposting & Cipher Scavengers', durationMinutes: 40, format: 'critique', summary: 'Guerrilla posters in key creative districts linking to private domains.', skillId: 'sk-mk-04' },
        ],
      },
    ],
  },
];

