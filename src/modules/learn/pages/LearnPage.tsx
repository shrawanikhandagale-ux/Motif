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
        kicker="Department 01 · The Academy"
        title="LEARN:"
        skewWord="the academy"
        description="Learn by making with guided curriculum paths, real briefs with tight deadlines, and an evolving Skill Map."
        borderBottom
        action={
          <Sticker variant="acid" rotation="cw">
            Department 01
          </Sticker>
        }
      />

      <LearnSubNav />

      <HandoffNotice
        toDeptName="Create"
        toDeptPath="/create"
        text="Starting any brief in Learn immediately initializes as an active studio project in Create with shared assets."
      />

      {/* Primary 3-Section Editorial Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Continue Where You Left Off */}
        <div className="lg:col-span-2">
          <ContinueLearningCard />
        </div>

        {/* Suggested Next Step */}
        <div>
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
