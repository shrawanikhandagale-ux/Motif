import React from 'react';
import { Skill } from '../../../types';

interface SkillNodeGraphProps {
  skills: Skill[];
  unlockedSkills: string[];
  selectedSkillId: string | null;
  onSelectSkill: (skill: Skill) => void;
}

// Fixed coordinates layout for the 30 skills across 4 domain clusters
const NODE_COORDINATES: Record<string, { x: number; y: number }> = {
  // Branding Cluster (x: 80 - 380, y: 70 - 240)
  'sk-br-01': { x: 120, y: 120 },
  'sk-br-02': { x: 260, y: 80 },
  'sk-br-03': { x: 260, y: 140 },
  'sk-br-04': { x: 120, y: 220 },
  'sk-br-05': { x: 260, y: 200 },
  'sk-br-06': { x: 380, y: 110 },
  'sk-br-07': { x: 380, y: 170 },
  'sk-br-08': { x: 380, y: 230 },

  // Design Cluster (x: 520 - 820, y: 70 - 240)
  'sk-ds-01': { x: 540, y: 120 },
  'sk-ds-02': { x: 670, y: 80 },
  'sk-ds-03': { x: 670, y: 140 },
  'sk-ds-04': { x: 540, y: 220 },
  'sk-ds-05': { x: 670, y: 200 },
  'sk-ds-06': { x: 800, y: 90 },
  'sk-ds-07': { x: 800, y: 150 },
  'sk-ds-08': { x: 800, y: 220 },

  // Marketing Cluster (x: 80 - 380, y: 340 - 520)
  'sk-mk-01': { x: 120, y: 380 },
  'sk-mk-02': { x: 250, y: 340 },
  'sk-mk-03': { x: 250, y: 400 },
  'sk-mk-04': { x: 250, y: 460 },
  'sk-mk-05': { x: 380, y: 360 },
  'sk-mk-06': { x: 380, y: 420 },
  'sk-mk-07': { x: 380, y: 480 },

  // UI/UX Cluster (x: 520 - 820, y: 340 - 520)
  'sk-ui-01': { x: 540, y: 380 },
  'sk-ui-02': { x: 670, y: 340 },
  'sk-ui-03': { x: 670, y: 400 },
  'sk-ui-04': { x: 670, y: 460 },
  'sk-ui-05': { x: 800, y: 350 },
  'sk-ui-06': { x: 800, y: 410 },
  'sk-ui-07': { x: 800, y: 470 },
};

export const SkillNodeGraph: React.FC<SkillNodeGraphProps> = ({
  skills,
  unlockedSkills,
  selectedSkillId,
  onSelectSkill,
}) => {
  return (
    <div className="w-full border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard overflow-x-auto relative">
      <svg
        viewBox="0 0 920 560"
        className="w-full min-w-[760px] h-[520px] select-none font-mono"
      >
        {/* Domain Cluster Labels */}
        <text x="120" y="45" fill="var(--ox)" fontWeight="bold" fontSize="12" letterSpacing="0.1em">01. BRANDING DOMAIN</text>
        <text x="540" y="45" fill="var(--ox)" fontWeight="bold" fontSize="12" letterSpacing="0.1em">02. DESIGN DOMAIN</text>
        <text x="120" y="315" fill="var(--ox)" fontWeight="bold" fontSize="12" letterSpacing="0.1em">03. MARKETING DOMAIN</text>
        <text x="540" y="315" fill="var(--ox)" fontWeight="bold" fontSize="12" letterSpacing="0.1em">04. UI/UX DOMAIN</text>

        {/* Connection Lines */}
        {skills.map((skill) => {
          if (!skill.parentId) return null;
          const parentCoord = NODE_COORDINATES[skill.parentId];
          const childCoord = NODE_COORDINATES[skill.id];
          if (!parentCoord || !childCoord) return null;

          const isUnlocked = unlockedSkills.includes(skill.id);

          return (
            <line
              key={`line-${skill.id}`}
              x1={parentCoord.x}
              y1={parentCoord.y}
              x2={childCoord.x}
              y2={childCoord.y}
              stroke={isUnlocked ? 'var(--ox)' : 'var(--line)'}
              strokeWidth={isUnlocked ? 2.5 : 1.5}
              strokeDasharray={isUnlocked ? undefined : '3,3'}
              opacity={isUnlocked ? 0.9 : 0.35}
            />
          );
        })}

        {/* Nodes */}
        {skills.map((skill) => {
          const coord = NODE_COORDINATES[skill.id] || { x: 100, y: 100 };
          const isUnlocked = unlockedSkills.includes(skill.id);
          const isSelected = selectedSkillId === skill.id;

          return (
            <g
              key={skill.id}
              transform={`translate(${coord.x}, ${coord.y})`}
              onClick={() => onSelectSkill(skill)}
              className="cursor-pointer transition-transform hover:scale-110"
              role="button"
              tabIndex={0}
              aria-label={`${skill.name} (${isUnlocked ? 'Unlocked' : 'Locked'})`}
            >
              {/* Node Card / Badge */}
              <rect
                x="-55"
                y="-18"
                width="110"
                height="36"
                rx="0"
                fill={isSelected ? 'var(--ink)' : isUnlocked ? 'var(--acid)' : 'var(--bg)'}
                stroke={isSelected ? 'var(--ox)' : 'var(--line)'}
                strokeWidth={isSelected ? 3 : 2}
              />
              {/* Status Indicator Dot */}
              <circle
                cx="-42"
                cy="0"
                r="4"
                fill={isUnlocked ? 'var(--ox)' : '#888'}
              />
              {/* Node Label */}
              <text
                x="-32"
                y="4"
                fill={isSelected ? 'var(--bg)' : '#171717'}
                fontSize="9"
                fontWeight="bold"
                className="pointer-events-none uppercase"
              >
                {skill.name.slice(0, 14)}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default SkillNodeGraph;

