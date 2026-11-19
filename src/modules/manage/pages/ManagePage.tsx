import React from 'react';
import { SectionHeading, Tile, Button, Sticker } from '../../../components/ui';
import { HandoffNotice } from '../../../components/shared/HandoffNotice';
import { BarChart2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ManagePage: React.FC = () => {
  return (
    <div className="space-y-8">
      <SectionHeading
        as="h1"
        kicker="Department 04 · The Workspace"
        title="MANAGE:"
        skewWord="the workspace"
        description="Run the work with draggable deliverables, unified client records, and a custom workflow ledger."
        borderBottom
        action={
          <Sticker variant="acid" rotation="cw">
            Department 04
          </Sticker>
        }
      />

      <HandoffNotice
        toDeptName="Analyze & Grow"
        toDeptPath="/analyze"
        text="Live client campaigns and completed scopes stream directly into Analyze & Grow metrics."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Tile accent="none" shadow="default" className="space-y-3">
          <span className="font-mono text-xs text-[var(--ox)] font-bold uppercase">Client Roster</span>
          <h3 className="font-display font-bold text-xl">Offscript Press</h3>
          <p className="text-sm opacity-85 leading-relaxed">
            Independent publishing imprint. 2 active deliverables under contract.
          </p>
          <div className="pt-2">
            <Link to="/analyze">
              <Button variant="primary" size="sm">
                <BarChart2 className="w-3.5 h-3.5 mr-1" />
                <span>Stream to Analyze</span>
              </Button>
            </Link>
          </div>
        </Tile>

        <Tile accent="none" shadow="default" className="space-y-3">
          <span className="font-mono text-xs text-[var(--ox)] font-bold uppercase">Deliverables</span>
          <h3 className="font-display font-bold text-xl">Active Board</h3>
          <div className="font-mono text-xs space-y-1 opacity-85">
            <div>✓ Type Specimen: Done</div>
            <div>⚡ Drop Sequence: In Review</div>
            <div>○ Separations: Doing</div>
          </div>
        </Tile>

        <Tile accent="oxblood" shadow="default" className="space-y-3">
          <span className="font-mono text-xs font-bold uppercase text-[#F1EBDD]">Business Ledger</span>
          <h3 className="font-display font-bold text-xl text-[#F1EBDD]">Retainer Status</h3>
          <p className="text-xs font-mono text-[#F1EBDD] opacity-90 leading-relaxed">
            $14.2k/mo active retainers across 2 clients with zero scope creep.
          </p>
        </Tile>
      </div>
    </div>
  );
};

export default ManagePage;
