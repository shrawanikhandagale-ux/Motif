import React from 'react';
import { HandoffNotice } from '../../../components/shared/HandoffNotice';
import {
  LearnSubNav,
  ContinueLearningCard,
  SuggestedNextStep,
  SkillProgressList,
  RecentlyAddedList,
} from '../components';

export const LearnPage: React.FC = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Editorial Department Header */}
      <div className="flex flex-wrap items-baseline justify-between gap-4 pb-4 border-b-2 border-[var(--line)]">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase font-bold tracking-wider opacity-70 mb-1">
            <span className="w-2.5 h-2.5 bg-[var(--acid)] border border-[var(--line)]" />
            <span>Department 01 · The Academy</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-[var(--ink)] tracking-tight">
            LEARN <span className="text-[var(--ox)] font-normal italic font-serif">the desk</span>
          </h1>
        </div>
        <div className="font-mono text-xs opacity-75 hidden sm:block text-right">
          <div>Learn by making. Ship into Create.</div>
          <div className="font-bold text-[var(--ink)]">OFFSCRIPT CURRICULUM</div>
        </div>
      </div>

      {/* Segmented Connected Tabs (Desk | Courses | Skill Map | Vault) */}
      <LearnSubNav />

      {/* Wide Continue Learning Feature Card */}
      <ContinueLearningCard />

      {/* 3-Column Balanced Desk Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        <SkillProgressList />
        <SuggestedNextStep />
        <RecentlyAddedList />
      </div>

      {/* Cross-Department Handoff Notice */}
      <HandoffNotice
        toDeptName="Create"
        toDeptPath="/create"
        text="Executing any brief in Learn immediately initializes as an active studio project in Create with persistent assets."
      />
    </div>
  );
};

export default LearnPage;
