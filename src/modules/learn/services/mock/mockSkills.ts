import { Skill, SkillDomain } from '../../../../types';

export const DOMAINS: SkillDomain[] = ['Branding', 'Design', 'Marketing', 'UI/UX'];

export const MOCK_SKILLS: Skill[] = [
  // 1. Branding (8 skills)
  { id: 'sk-br-01', name: 'Brand Core & Positioning', domain: 'Branding', level: 'foundation', description: 'Defining the uncompromised artistic worldview of an independent brand.' },
  { id: 'sk-br-02', name: 'Rebellious Tone of Voice', domain: 'Branding', level: 'intermediate', parentId: 'sk-br-01', description: 'Editorial manifesto writing and punchy unpolished copy.' },
  { id: 'sk-br-03', name: 'Positioning Manifesto', domain: 'Branding', level: 'intermediate', parentId: 'sk-br-01', description: 'Crafting 3-part contrarian value propositions.' },
  { id: 'sk-br-04', name: 'Visual Identity Architecture', domain: 'Branding', level: 'foundation', description: 'Structuring logos, lockups, and design tokens for physical and digital.' },
  { id: 'sk-br-05', name: 'High-Contrast Type Pairing', domain: 'Branding', level: 'intermediate', parentId: 'sk-br-04', description: 'Coupling heavy display grotesque headers with editorial serif and monospace.' },
  { id: 'sk-br-06', name: 'Subcultural Lore & Narrative', domain: 'Branding', level: 'advanced', parentId: 'sk-br-01', description: 'Building mythology and insider signifiers for cult followings.' },
  { id: 'sk-br-07', name: 'Packaging Systems', domain: 'Branding', level: 'advanced', parentId: 'sk-br-04', description: 'Screenprinted cardboard, kraft tags, and tactile wax finishes.' },
  { id: 'sk-br-08', name: 'Anti-Corporate Brand Books', domain: 'Branding', level: 'offscript', parentId: 'sk-br-04', description: 'Zine-style brand guideline manuals with risograph aesthetic.' },

  // 2. Design (8 skills)
  { id: 'sk-ds-01', name: 'Editorial Layout Foundations', domain: 'Design', level: 'foundation', description: 'Hierarchy, optical spacing, and oversized typographic weight.' },
  { id: 'sk-ds-02', name: 'Broken & Asymmetrical Grids', domain: 'Design', level: 'intermediate', parentId: 'sk-ds-01', description: 'Rhythmic offsets, bleeding columns, and deliberate tension.' },
  { id: 'sk-ds-03', name: 'Risograph Print Plates', domain: 'Design', level: 'intermediate', parentId: 'sk-ds-01', description: 'Dual-drum spot color channel separations for risograph printing.' },
  { id: 'sk-ds-04', name: 'Halftone Dot Matrix', domain: 'Design', level: 'foundation', parentId: 'sk-ds-01', description: 'Radial frequency masks and industrial print screen patterns.' },
  { id: 'sk-ds-05', name: 'High-Tension Color Palettes', domain: 'Design', level: 'intermediate', parentId: 'sk-ds-01', description: 'Ivory, ink, oxblood, acid yellow, and electric blue pairings.' },
  { id: 'sk-ds-06', name: 'Self-Published Zines', domain: 'Design', level: 'advanced', parentId: 'sk-ds-01', description: 'Staple-bound 16-page booklet pagination and paste-up layout.' },
  { id: 'sk-ds-07', name: 'Vector Separations', domain: 'Design', level: 'advanced', parentId: 'sk-ds-03', description: 'Apparel screen-printing vector separation and registration marks.' },
  { id: 'sk-ds-08', name: 'Wheatpaste Poster Litho', domain: 'Design', level: 'offscript', parentId: 'sk-ds-01', description: 'Large-scale format tiling for outdoor guerrilla flyposting.' },

  // 3. Marketing (7 skills)
  { id: 'sk-mk-01', name: 'Organic Creator Distribution', domain: 'Marketing', level: 'foundation', description: 'Building direct audience pipelines without algorithmic paid ad spend.' },
  { id: 'sk-mk-02', name: 'Scarcity Timing & Drops', domain: 'Marketing', level: 'intermediate', parentId: 'sk-mk-01', description: 'Flash drops, timed count-downs, and limited batch mechanics.' },
  { id: 'sk-mk-03', name: 'Cult Newsletter Dispatches', domain: 'Marketing', level: 'intermediate', parentId: 'sk-mk-01', description: 'High-open-rate narrative journalism and product release emails.' },
  { id: 'sk-mk-04', name: 'Guerilla Street Launches', domain: 'Marketing', level: 'advanced', parentId: 'sk-mk-01', description: 'Physical-to-digital QR scavenger drops and unannounced releases.' },
  { id: 'sk-mk-05', name: 'Audience Rituals & Inner Circle', domain: 'Marketing', level: 'advanced', parentId: 'sk-mk-01', description: 'Private dispatch clubs, patron credits, and VIP drop lists.' },
  { id: 'sk-mk-06', name: 'Anti-Burnout Content Cadence', domain: 'Marketing', level: 'foundation', parentId: 'sk-mk-01', description: 'High-density batching and Evergreen editorial scheduling.' },
  { id: 'sk-mk-07', name: 'Peer Cross-Pollination', domain: 'Marketing', level: 'offscript', parentId: 'sk-mk-01', description: 'Collaborative capsules, bundle swaps, and studio alliances.' },

  // 4. UI/UX (7 skills)
  { id: 'sk-ui-01', name: 'Tactile Interface Foundations', domain: 'UI/UX', level: 'foundation', description: '2px solid ink lines, flat offset shadows, and crisp tactile buttons.' },
  { id: 'sk-ui-02', name: 'Kinetic & Skewed Type', domain: 'UI/UX', level: 'intermediate', parentId: 'sk-ui-01', description: 'Dynamic tilt angles and variable font weight transitions.' },
  { id: 'sk-ui-03', name: 'Publication-Grade Web Layouts', domain: 'UI/UX', level: 'intermediate', parentId: 'sk-ui-01', description: 'Editorial desktop rails, bottom bars, and reading focus.' },
  { id: 'sk-ui-04', name: 'Hard-Border Micro-Interactions', domain: 'UI/UX', level: 'intermediate', parentId: 'sk-ui-01', description: 'Translational button presses (-2px hover, +2px active).' },
  { id: 'sk-ui-05', name: 'High-Contrast Accessibility', domain: 'UI/UX', level: 'foundation', parentId: 'sk-ui-01', description: 'WCAG AAA contrast ratios with ink and ivory backgrounds.' },
  { id: 'sk-ui-06', name: 'Web Sound Cues & Textures', domain: 'UI/UX', level: 'advanced', parentId: 'sk-ui-01', description: 'Noise filters and subtle auditory clicks on interface action.' },
  { id: 'sk-ui-07', name: 'Reduced-Motion Orchestration', domain: 'UI/UX', level: 'offscript', parentId: 'sk-ui-01', description: 'Respecting user motion accessibility with instant fallback transitions.' },
];

