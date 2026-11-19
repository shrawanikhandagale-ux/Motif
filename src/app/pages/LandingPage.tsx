import React from 'react';
import { LandingHeader } from '../../components/shared/landing/LandingHeader';
import { LandingHero } from '../../components/shared/landing/LandingHero';
import { LandingTicker } from '../../components/shared/landing/LandingTicker';
import { WhatIsMotif } from '../../components/shared/landing/WhatIsMotif';
import { DepartmentTabs } from '../../components/shared/landing/DepartmentTabs';
import { EcosystemLoop } from '../../components/shared/landing/EcosystemLoop';
import { SharedRecordsStrip } from '../../components/shared/landing/SharedRecordsStrip';
import { CommunityShowcase } from '../../components/shared/landing/CommunityShowcase';
import { JoinMotifCta } from '../../components/shared/landing/JoinMotifCta';
import { LandingFooter } from '../../components/shared/landing/LandingFooter';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] flex flex-col selection:bg-[var(--acid)] selection:text-[#171717]">
      <LandingHeader />
      <main className="flex-1">
        <LandingHero />
        <LandingTicker />
        <WhatIsMotif />
        <DepartmentTabs />
        <EcosystemLoop />
        <SharedRecordsStrip />
        <CommunityShowcase />
        <JoinMotifCta />
      </main>
      <LandingFooter />
    </div>
  );
};

export default LandingPage;

