import React from 'react';

export interface ConstellationNode {
  id: string;
  skillId: string;
  spokeIndex: number;
  nodeIndex: number;
  label: string;
  pathId: string;
  pathTitle: string;
  domain: 'Branding' | 'Design' | 'UI/UX' | 'Marketing' | 'Strategy';
  description: string;
  x: number;
  y: number;
  isDone: boolean;
  status: 'on' | 'nx' | 'lk';
  isProven: boolean;
}

interface SkillNodeGraphProps {
  completedIds: string[];
  unlockedSkillIds: string[];
  provenDomains: string[];
  selectedNodeId: string | null;
  onSelectNode: (node: ConstellationNode) => void;
  flashedNodeId?: string | null;
  mini?: boolean;
}

interface RawNodeDef {
  id: string;
  skillId: string;
  label: string;
  pathId: string;
  pathTitle: string;
  domain: 'Branding' | 'Design' | 'UI/UX' | 'Marketing' | 'Strategy';
  description: string;
}

const SPOKES: { domain: ConstellationNode['domain']; pathId: string; pathTitle: string; nodes: RawNodeDef[] }[] = [
  {
    domain: 'Branding',
    pathId: 'path-branding-01',
    pathTitle: 'Offscript Identity Systems',
    nodes: [
      { id: 'les-br-101', skillId: 'sk-br-01', label: 'Anti-Corporate Manifesto', pathId: 'path-branding-01', pathTitle: 'Offscript Identity Systems', domain: 'Branding', description: 'Why conventional branding guidelines fail independent creators.' },
      { id: 'les-br-102', skillId: 'sk-br-02', label: 'Voice Calibration', pathId: 'path-branding-01', pathTitle: 'Offscript Identity Systems', domain: 'Branding', description: 'Writing in punchy, declarative sentences without corporate jargon.' },
      { id: 'les-br-201', skillId: 'sk-br-05', label: 'Type Pairings', pathId: 'path-branding-01', pathTitle: 'Offscript Identity Systems', domain: 'Branding', description: 'Pairing Bricolage Grotesque 800 with DM Mono 400.' },
      { id: 'les-br-202', skillId: 'sk-br-04', label: 'Token Architecture', pathId: 'path-branding-01', pathTitle: 'Offscript Identity Systems', domain: 'Branding', description: 'Establishing ivory, ink, oxblood, and acid palettes.' },
    ],
  },
  {
    domain: 'Design',
    pathId: 'path-design-02',
    pathTitle: 'Anti-Template Layouts',
    nodes: [
      { id: 'les-ds-101', skillId: 'sk-ds-01', label: 'Optical Hierarchy', pathId: 'path-design-02', pathTitle: 'Anti-Template Layouts', domain: 'Design', description: 'Hierarchy, optical spacing, and oversized typographic tension.' },
      { id: 'les-ds-102', skillId: 'sk-ds-02', label: 'Asymmetrical Grids', pathId: 'path-design-02', pathTitle: 'Anti-Template Layouts', domain: 'Design', description: 'Rhythmic offsets, bleeding columns, and deliberate tension.' },
      { id: 'les-ds-201', skillId: 'sk-ds-03', label: 'Risograph Plates', pathId: 'path-design-02', pathTitle: 'Anti-Template Layouts', domain: 'Design', description: 'Dual-drum spot color channel separations for risograph printing.' },
      { id: 'les-ds-202', skillId: 'sk-ds-04', label: 'Halftone Dot Matrix', pathId: 'path-design-02', pathTitle: 'Anti-Template Layouts', domain: 'Design', description: 'Radial frequency masks and industrial print screen patterns.' },
    ],
  },
  {
    domain: 'UI/UX',
    pathId: 'path-branding-01',
    pathTitle: 'Tactile Interface Systems',
    nodes: [
      { id: 'les-ui-101', skillId: 'sk-ui-01', label: 'Tactile Foundations', pathId: 'path-branding-01', pathTitle: 'Tactile Interface Systems', domain: 'UI/UX', description: '2px solid ink lines, flat offset shadows, and tactile buttons.' },
      { id: 'les-ui-102', skillId: 'sk-ui-02', label: 'Kinetic Skew Type', pathId: 'path-branding-01', pathTitle: 'Tactile Interface Systems', domain: 'UI/UX', description: 'Dynamic tilt angles and variable font weight transitions.' },
      { id: 'les-ui-201', skillId: 'sk-ui-03', label: 'Publication Rails', pathId: 'path-branding-01', pathTitle: 'Tactile Interface Systems', domain: 'UI/UX', description: 'Editorial desktop rails, bottom bars, and reading focus.' },
      { id: 'les-ui-202', skillId: 'sk-ui-04', label: 'Hard-Border Physics', pathId: 'path-branding-01', pathTitle: 'Tactile Interface Systems', domain: 'UI/UX', description: 'Translational button presses (-2px hover, +2px active).' },
    ],
  },
  {
    domain: 'Marketing',
    pathId: 'path-marketing-03',
    pathTitle: 'Guerrilla Campaign Strategy',
    nodes: [
      { id: 'les-mk-101', skillId: 'sk-mk-01', label: 'Organic Distribution', pathId: 'path-marketing-03', pathTitle: 'Guerrilla Campaign Strategy', domain: 'Marketing', description: 'Building direct audience pipelines without algorithmic paid ad spend.' },
      { id: 'les-mk-102', skillId: 'sk-mk-02', label: 'Scarcity Timing', pathId: 'path-marketing-03', pathTitle: 'Guerrilla Campaign Strategy', domain: 'Marketing', description: 'Flash drops, timed count-downs, and limited batch mechanics.' },
      { id: 'les-mk-201', skillId: 'sk-mk-03', label: 'Newsletter Dispatches', pathId: 'path-marketing-03', pathTitle: 'Guerrilla Campaign Strategy', domain: 'Marketing', description: 'High-open-rate narrative journalism and release dispatches.' },
      { id: 'les-mk-202', skillId: 'sk-mk-04', label: 'Guerrilla Flyposting', pathId: 'path-marketing-03', pathTitle: 'Guerrilla Campaign Strategy', domain: 'Marketing', description: 'Physical-to-digital QR scavenger drops and street flyposting.' },
    ],
  },
  {
    domain: 'Strategy',
    pathId: 'path-marketing-03',
    pathTitle: 'Creative Studio Governance',
    nodes: [
      { id: 'les-bs-101', skillId: 'sk-bs-01', label: 'Retainer Governance', pathId: 'path-marketing-03', pathTitle: 'Creative Studio Governance', domain: 'Strategy', description: 'Structuring monthly milestone scopes and retainer billing.' },
      { id: 'les-bs-102', skillId: 'sk-bs-02', label: 'Delivery Contracts', pathId: 'path-marketing-03', pathTitle: 'Creative Studio Governance', domain: 'Strategy', description: 'Commercial production handoffs and client sign-off loops.' },
      { id: 'les-bs-201', skillId: 'sk-bs-03', label: 'Closed-Loop Telemetry', pathId: 'path-marketing-03', pathTitle: 'Creative Studio Governance', domain: 'Strategy', description: 'Connecting creative deliveries back to Academy learning.' },
    ],
  },
];

// Cross-branch interdisciplinary synergy bridges
const CROSS_BRANCH_BRIDGES: [string, string][] = [
  ['les-ds-201', 'les-br-202'], // Risograph ↔ Token Architecture
  ['les-mk-102', 'les-bs-101'], // Scarcity Timing ↔ Retainer Governance
  ['les-ui-201', 'les-ds-102'], // Publication Rails ↔ Asymmetrical Grids
];

export const SkillNodeGraph: React.FC<SkillNodeGraphProps> = ({
  completedIds,
  unlockedSkillIds,
  provenDomains,
  selectedNodeId,
  onSelectNode,
  flashedNodeId,
  mini = false,
}) => {
  // Center of constellation
  const cx = 320;
  const cy = 260;

  // Build nodes with polar geometry
  const nodes: ConstellationNode[] = [];
  const nodesById: Record<string, ConstellationNode> = {};

  SPOKES.forEach((spoke, spokeIdx) => {
    let prevDone = true;

    spoke.nodes.forEach((rawNode, k) => {
      // Polar angle: 72 degrees per spoke starting from -90deg (top) with subtle alternation
      const angleDeg = -90 + 72 * spokeIdx + (k % 2 ? 9 : -9);
      const angleRad = (angleDeg * Math.PI) / 180;
      const r = 84 + k * 46;

      const x = cx + r * Math.cos(angleRad);
      const y = cy + r * Math.sin(angleRad);

      const isDone =
        completedIds.includes(rawNode.id) ||
        unlockedSkillIds.includes(rawNode.skillId) ||
        (spokeIdx === 0 && k === 0); // Default first node unlocked for foundation onboarding

      let status: 'on' | 'nx' | 'lk' = 'lk';
      if (isDone) {
        status = 'on';
      } else if (prevDone) {
        status = 'nx';
      } else {
        status = 'lk';
      }

      // Check if domain is proven by delivered project
      const isProven = isDone && provenDomains.includes(spoke.domain.toLowerCase());

      const nodeObj: ConstellationNode = {
        ...rawNode,
        spokeIndex: spokeIdx,
        nodeIndex: k,
        x,
        y,
        isDone,
        status,
        isProven,
      };

      nodes.push(nodeObj);
      nodesById[rawNode.id] = nodeObj;

      prevDone = isDone;
    });
  });

  // Build edges
  interface Edge {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    isLit: boolean;
    isCross: boolean;
    delay: number;
  }
  const edges: Edge[] = [];

  // Spoke radial lines
  nodes.forEach((n, i) => {
    const parent = n.nodeIndex > 0 ? nodesById[SPOKES[n.spokeIndex].nodes[n.nodeIndex - 1].id] : null;
    const x1 = parent ? parent.x : cx;
    const y1 = parent ? parent.y : cy;
    const isParentDone = parent ? parent.isDone : true;
    const isLit = isParentDone && n.isDone;

    edges.push({
      x1,
      y1,
      x2: n.x,
      y2: n.y,
      isLit,
      isCross: false,
      delay: 0.15 + i * 0.04,
    });
  });

  // Cross-branch bridges
  CROSS_BRANCH_BRIDGES.forEach(([fromId, toId], i) => {
    const a = nodesById[fromId];
    const b = nodesById[toId];
    if (a && b) {
      edges.push({
        x1: a.x,
        y1: a.y,
        x2: b.x,
        y2: b.y,
        isLit: a.isDone && b.isDone,
        isCross: true,
        delay: 0.6 + i * 0.1,
      });
    }
  });

  return (
    <div className="w-full relative select-none">
      <svg
        viewBox="0 0 640 520"
        role="img"
        aria-label="Skill map constellation"
        className="w-full h-auto block skill-map-svg"
      >
        {/* Background Orbit Guide Rings */}
        {!mini && (
          <g opacity="0.12" stroke="var(--line)" fill="none" strokeDasharray="3 4">
            <circle cx={cx} cy={cy} r="84" />
            <circle cx={cx} cy={cy} r="130" />
            <circle cx={cx} cy={cy} r="176" />
            <circle cx={cx} cy={cy} r="222" />
          </g>
        )}

        {/* Connecting Edges */}
        {edges.map((e, idx) => (
          <line
            key={`edge-${idx}`}
            x1={e.x1}
            y1={e.y1}
            x2={e.x2}
            y2={e.y2}
            className={`ed ${e.isLit ? 'lt' : 'dm'}`}
            style={{ animationDelay: `${e.delay}s` }}
          />
        ))}

        {/* Central YOU Node */}
        <g className="node-g on" style={{ '--delay': '0s' } as React.CSSProperties}>
          <circle
            cx={cx}
            cy={cy}
            r={mini ? 18 : 30}
            className="main-circle"
            style={{ fill: 'var(--ink)' }}
          />
          {!mini && (
            <text
              x={cx}
              y={cy + 4}
              textAnchor="middle"
              style={{ fill: 'var(--bg)', stroke: 'none', fontSize: '12px', fontWeight: 800 }}
            >
              YOU
            </text>
          )}
        </g>

        {/* Starburst Constellation Nodes */}
        {nodes.map((n, i) => {
          const isSelected = selectedNodeId === n.id;
          const isFlashed = flashedNodeId === n.id;
          const delaySec = 0.2 + i * 0.04;
          const labelWords = n.label.split(' ').slice(0, 2).join(' ');

          return (
            <g
              key={n.id}
              onClick={() => onSelectNode(n)}
              className={`node-g ${n.status} ${isSelected ? 'selected' : ''} ${isFlashed ? 'fl' : ''}`}
              style={{ '--delay': `${delaySec}s` } as React.CSSProperties}
            >
              {/* Proven Skill Outer Red Ring */}
              {n.isProven && (
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={mini ? 12 : 21}
                  className="pr-ring"
                />
              )}

              {/* Node Circle */}
              <circle
                cx={n.x}
                cy={n.y}
                r={mini ? 7 : 14}
                className="main-circle"
              />

              {/* Node Text Label */}
              {!mini && (
                <text
                  x={n.x}
                  y={n.y + (n.y > cy ? 26 : -18)}
                  textAnchor="middle"
                  style={{ pointerEvents: 'none' }}
                >
                  {labelWords}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default SkillNodeGraph;
