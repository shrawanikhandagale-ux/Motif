import React from 'react';
import { SectionHeading, Sticker } from '../../../components/ui';
import { HandoffNotice } from '../../../components/shared/HandoffNotice';
import {
  LearnSubNav,
  ContinueLearningCard,
  SuggestedNextStep,
  SkillMapCompactPreview,
} from '../components';

export const LearnPage: React.FC = () => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <SectionHeading
        as="h1"
        kicker="Department 01 · The Academy · Volume I"
        title="LEARN:"
        skewWord="the academy"
        description="Learn by making with guided curriculum tracks, real briefs with firm deadlines, and an evolving Skill Map that illuminates as you ship."
        borderBottom
        action={
          <Sticker variant="acid" rotation="cw">
            Department 01
          </Sticker>
        }
      />

      <LearnSubNav />

      {/* Academy Dispatch Manifesto Strip */}
      <div className="p-3 border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard-sm flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-[var(--ox)] border border-[var(--line)]" />
          <span className="font-bold text-[var(--ink)] uppercase">Academy Rule 01:</span>
          <span className="opacity-80">Do not study theory you cannot immediately execute. Every track produces tangible work.</span>
        </div>
        <span className="opacity-60 text-[10px] hidden sm:inline">OFFSCRIPT ED. 2026</span>
      </div>

      <HandoffNotice
        toDeptName="Create"
        toDeptPath="/create"
        text="Starting any brief in Learn immediately initializes as an active studio project in Create with shared assets."
      />

      {/* Primary 3-Section Editorial Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        <div className="lg:col-span-2 flex flex-col">
          <ContinueLearningCard />
        </div>
        <div className="flex flex-col">
          <SuggestedNextStep />
        </div>
      </div>

      {/* Skill Map Preview Strip */}
      <div className="w-full">
        <SkillMapCompactPreview />
      </div>
    </div>
  );
};

export default LearnPage;
