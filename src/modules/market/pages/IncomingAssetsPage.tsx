import React from 'react';
import { MarketSubNav } from '../components/MarketSubNav';
import { IncomingAssetsTray } from '../components/IncomingAssetsTray';
import { HandoffNotice } from '../../../components/shared/HandoffNotice';

export const IncomingAssetsPage: React.FC = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="flex flex-wrap items-baseline justify-between gap-4 pb-4 border-b-2 border-[var(--line)]">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase font-bold tracking-wider opacity-70 mb-1">
            <span className="w-2.5 h-2.5 bg-[var(--elec)] border border-[var(--line)]" />
            <span>Department 03 · Incoming Studio Deliverables · Cross-Department Handoff</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-[var(--ink)] tracking-tight">
            DELIVERABLES <span className="text-[var(--ox)] font-normal italic font-serif">handoff</span>
          </h1>
        </div>
        <div className="font-mono text-xs opacity-75 hidden sm:block text-right">
          <div>Pipeline Ingestion</div>
          <div className="font-bold text-[var(--ink)]">VERIFIED STUDIO ARTIFACTS</div>
        </div>
      </div>

      <MarketSubNav />

      <HandoffNotice
        toDeptName="Manage"
        toDeptPath="/manage"
        text="Incoming studio deliverables can be packaged into active marketing campaigns or pushed directly to client review in Manage."
      />

      <IncomingAssetsTray />
    </div>
  );
};

export default IncomingAssetsPage;

