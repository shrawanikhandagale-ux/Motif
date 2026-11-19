import React, { useState } from 'react';
import { SectionHeading, Sticker, Badge } from '../../../components/ui';
import { LearnSubNav, SkillNodeGraph, SkillDetailDrawer } from '../components';
import { useSkills } from '../hooks';
import { useProgress } from '../../../hooks';
import { Skill } from '../../../types';

export const SkillMapPage: React.FC = () => {
  const { skills, loading } = useSkills();
  const { unlockedSkills, unlockSkills } = useProgress();
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  const litCount = unlockedSkills.length;
  const totalCount = skills.length || 30;
  const completionPercentage = Math.round((litCount / totalCount) * 100);

  const handleSelectSkill = (skill: Skill) => {
    setSelectedSkill(skill);
  };

  const handleCloseDrawer = () => {
    setSelectedSkill(null);
  };

  const handleToggleUnlock = (skillId: string) => {
    if (!unlockedSkills.includes(skillId)) {
      unlockSkills([skillId]);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <SectionHeading
        as="h1"
        kicker="Competency Network"
        title="SKILL MAP:"
        skewWord="constellation"
        description="Non-linear tree of 30 interconnected abilities across Branding, Design, Marketing, and UI/UX."
        borderBottom
        action={
          <Sticker variant="acid" rotation="ccw">
            {completionPercentage}% Lit
          </Sticker>
        }
      />

      <LearnSubNav />

      {/* Legend & Stats Bar */}
      <div className="p-4 border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Badge variant="oxblood">30 Masteries</Badge>
          <span className="font-mono text-xs opacity-85">
            <b>{litCount}</b> of <b>{totalCount}</b> nodes illuminated ({completionPercentage}%)
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 bg-[var(--acid)] border border-[#171717] inline-block shadow-hard-sm" />
            <span>Illuminated</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 bg-[var(--card-subtle)] border border-[var(--line)] inline-block" />
            <span>Locked</span>
          </div>
        </div>
      </div>

      {/* SVG Node Graph */}
      {loading ? (
        <div className="p-12 text-center font-mono text-sm opacity-70">Constructing constellation graph…</div>
      ) : (
        <div className="space-y-2">
          <p className="font-mono text-xs opacity-75">
            Click any node in the constellation to inspect its syllabus, prerequisites, and studio handoff criteria:
          </p>
          <SkillNodeGraph
            skills={skills}
            unlockedSkills={unlockedSkills}
            selectedSkillId={selectedSkill?.id || null}
            onSelectSkill={handleSelectSkill}
          />
        </div>
      )}

      {/* Side Panel Drawer */}
      <SkillDetailDrawer
        skill={selectedSkill}
        isOpen={Boolean(selectedSkill)}
        onClose={handleCloseDrawer}
        isUnlocked={Boolean(selectedSkill && unlockedSkills.includes(selectedSkill.id))}
        onToggleUnlock={handleToggleUnlock}
      />
    </div>
  );
};

export default SkillMapPage;

