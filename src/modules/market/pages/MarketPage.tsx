import React from 'react';
import { SectionHeading, Tile, Button, Sticker } from '../../../components/ui';
import { HandoffNotice } from '../../../components/shared/HandoffNotice';
import { Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const MarketPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <SectionHeading
        as="h1"
        kicker="Department 03 · The Hub"
        title="MARKET:"
        skewWord="the hub"
        description="Put it out there with multi-channel campaigns, distribution schedules, and brand positioning worksheets."
        borderBottom
        action={
          <Sticker variant="acid" rotation="cw">
            Department 03
          </Sticker>
        }
      />

      <HandoffNotice
        toDeptName="Manage"
        toDeptPath="/manage"
        text="Campaign milestones and deliverable timelines attach directly to clients in Manage."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Tile accent="none" shadow="default" className="space-y-3">
          <span className="font-mono text-xs text-[var(--ox)] font-bold uppercase">Live Campaign</span>
          <h3 className="font-display font-bold text-xl">Issue Zero Drop Sequence</h3>
          <p className="text-sm opacity-85 leading-relaxed">
            Substack manifesto announcement to 18,400 readers with a 24.8% click rate.
          </p>
          <div className="pt-2">
            <Link to="/manage">
              <Button variant="primary" size="sm">
                <Share2 className="w-3.5 h-3.5 mr-1" />
                <span>Attach to Client</span>
              </Button>
            </Link>
          </div>
        </Tile>

        <Tile accent="none" shadow="default" className="space-y-3">
          <span className="font-mono text-xs text-[var(--ox)] font-bold uppercase">Planned Drop</span>
          <h3 className="font-display font-bold text-xl">Acid Merch Flash Drop</h3>
          <p className="text-sm opacity-85 leading-relaxed">
            Targeted Instagram drop with vector separations and limited vinyl release.
          </p>
          <div className="pt-2">
            <Button variant="secondary" size="sm">Edit Schedule</Button>
          </div>
        </Tile>

        <Tile accent="electric" shadow="default" className="space-y-3">
          <span className="font-mono text-xs font-bold uppercase text-[#171717]">Reach Intelligence</span>
          <h3 className="font-display font-bold text-xl text-[#171717]">Distribution Hub</h3>
          <p className="text-xs font-mono text-[#171717] opacity-90 leading-relaxed">
            Unified audience records: 78.6k total reach across newsletters and social channels.
          </p>
        </Tile>
      </div>
    </div>
  );
};

export default MarketPage;
