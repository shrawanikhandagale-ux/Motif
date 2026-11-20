import React, { useState } from 'react';
import { SectionHeading, Tile, Button, Sticker, Badge } from '../../../components/ui';
import { HandoffNotice } from '../../../components/shared/HandoffNotice';
import { IncomingAssetsTray } from '../components/IncomingAssetsTray';
import { NewCampaignModal } from '../components/NewCampaignModal';
import { AttachToClientModal } from '../components/AttachToClientModal';
import { Share2, Radio, Send, Calendar, Megaphone, Plus } from 'lucide-react';
import { useProgress } from '../../../hooks';
import { CampaignRecord } from '../../../types';

export const MarketPage: React.FC = () => {
  const { campaigns, clients, createCampaign, updateCampaignStatus, attachCampaignToClient } = useProgress();
  const [newModalOpen, setNewModalOpen] = useState(false);
  const [attachCampaign, setAttachCampaign] = useState<CampaignRecord | null>(null);

  const activeCount = campaigns.filter((c) => c.status === 'live').length;

  const cycleStatus = (id: string, current: CampaignRecord['status']) => {
    const sequence: CampaignRecord['status'][] = ['draft', 'planned', 'live', 'completed'];
    const nextIdx = (sequence.indexOf(current) + 1) % sequence.length;
    updateCampaignStatus(id, sequence[nextIdx]);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <SectionHeading
        as="h1"
        kicker="Department 03 · The Hub · Multi-Channel Distribution"
        title="MARKET:"
        skewWord="the hub"
        description="Put it out there with multi-channel campaigns, release drop sequences, audience telemetry, and brand positioning worksheets."
        borderBottom
        action={<Sticker variant="acid" rotation="cw">Department 03</Sticker>}
      />

      <div className="p-3 border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard-sm flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <Radio className="w-3.5 h-3.5 text-[var(--ox)] animate-pulse" />
          <span className="font-bold uppercase">Broadcast Active:</span>
          <span className="opacity-80">78.6k Reach across {campaigns.length} Active Campaigns &amp; Flash Drops</span>
        </div>
        <div className="flex items-center gap-2 font-bold">
          <span className="w-2 h-2 rounded-full bg-[var(--acid)] border border-[var(--line)]" />
          <span>{activeCount} Live Channels Broadcasting</span>
        </div>
      </div>

      <HandoffNotice toDeptName="Manage" toDeptPath="/manage" text="Campaign milestones and deliverable timelines attach directly to client retainers in Manage." />

      <IncomingAssetsTray />

      {/* Active Campaign Distribution Grids */}
      <div className="space-y-4 pt-4 border-t-2 border-[var(--line)]">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Megaphone className="w-4 h-4 text-[var(--ox)]" />
            <h2 className="font-display font-bold text-xl uppercase tracking-tight">Active Distribution Channels</h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs opacity-75">{campaigns.length} Campaigns Orchestrated</span>
            <Button variant="secondary" size="sm" onClick={() => setNewModalOpen(true)}>
              <Plus className="w-3.5 h-3.5 mr-1" />
              <span>Schedule Drop</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {campaigns.slice(0, 3).map((camp) => (
            <Tile key={camp.id} accent={camp.status === 'live' ? 'none' : 'none'} shadow="default" className="p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs text-[var(--ox)] font-bold uppercase flex items-center gap-1.5">
                    {camp.channel === 'substack' ? <Send className="w-3.5 h-3.5" /> : <Radio className="w-3.5 h-3.5" />}
                    {camp.channel}
                  </span>
                  <Badge variant={camp.status === 'live' ? 'acid' : 'electric'} className="text-[10px] uppercase font-bold text-[#171717]">
                    {camp.status}
                  </Badge>
                </div>
                <h3 className="font-display font-bold text-xl leading-snug">{camp.title}</h3>
                <p className="text-sm opacity-85 leading-relaxed">{camp.description}</p>
                {camp.clientName && (
                  <div className="font-mono text-[10px] opacity-75 text-[var(--ox)] font-bold">
                    Client: {camp.clientName}
                  </div>
                )}
              </div>
              <div className="pt-3 border-t border-[var(--line)]/20 flex items-center justify-between">
                <span className="font-mono text-xs opacity-70">{camp.reach} reach</span>
                <Button variant="primary" size="sm" onClick={() => setAttachCampaign(camp)}>
                  <Share2 className="w-3.5 h-3.5 mr-1" />
                  <span>Attach to Client</span>
                </Button>
              </div>
            </Tile>
          ))}
        </div>
      </div>

      {/* Release Cadence Schedule Matrix */}
      <div className="space-y-4 pt-4 border-t-2 border-[var(--line)]">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[var(--ox)]" />
            <h2 className="font-display font-bold text-xl uppercase tracking-tight">14-Day Release Cadence</h2>
          </div>
          <span className="font-mono text-xs opacity-75">Click status badge to cycle stage</span>
        </div>
        <div className="border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard overflow-x-auto">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="border-b-2 border-[var(--line)] bg-[var(--card-subtle)]">
                <th className="p-3 uppercase">Timing</th>
                <th className="p-3 uppercase">Channel</th>
                <th className="p-3 uppercase">Campaign Title</th>
                <th className="p-3 uppercase">Target Reach</th>
                <th className="p-3 uppercase text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y border-[var(--line)]/20">
              {campaigns.map((d) => (
                <tr key={d.id} className="hover:bg-[var(--card-subtle)] transition-colors">
                  <td className="p-3 font-bold">{d.dateNotice || 'Scheduled'}</td>
                  <td className="p-3 capitalize">{d.channel}</td>
                  <td className="p-3 font-sans font-bold text-sm">
                    {d.title} {d.clientName && <span className="opacity-60 text-xs font-normal">({d.clientName})</span>}
                  </td>
                  <td className="p-3 opacity-80">{d.reach}</td>
                  <td className="p-3 text-right">
                    <button
                      type="button"
                      onClick={() => cycleStatus(d.id, d.status)}
                      className={`px-2 py-0.5 border font-bold text-[10px] uppercase cursor-pointer hover:opacity-80 transition-opacity ${
                        d.status === 'live'
                          ? 'border-[#171717] bg-[var(--acid)] text-[#171717]'
                          : d.status === 'planned'
                          ? 'border-[var(--line)] bg-[var(--card-subtle)]'
                          : 'border-[var(--line)] opacity-60'
                      }`}
                      title="Click to cycle status"
                    >
                      {d.status}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <NewCampaignModal
        isOpen={newModalOpen}
        onClose={() => setNewModalOpen(false)}
        clients={clients}
        onCreate={(data) => createCampaign(data)}
      />

      {attachCampaign && (
        <AttachToClientModal
          campaign={attachCampaign}
          clients={clients}
          isOpen={!!attachCampaign}
          onClose={() => setAttachCampaign(null)}
          onAttach={(campId, cliId, cliName) => attachCampaignToClient(campId, cliId, cliName)}
        />
      )}
    </div>
  );
};

export default MarketPage;
