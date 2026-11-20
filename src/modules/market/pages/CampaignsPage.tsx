import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Radio, Calendar, Megaphone, Plus, Share2, Send, ArrowRight } from 'lucide-react';
import { HandoffNotice } from '../../../components/shared/HandoffNotice';
import { MarketSubNav, NewCampaignModal, AttachToClientModal } from '../components';
import { useProgress } from '../../../hooks';
import { CampaignRecord } from '../../../types';

export const CampaignsPage: React.FC = () => {
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
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="flex flex-wrap items-baseline justify-between gap-4 pb-4 border-b-2 border-[var(--line)]">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase font-bold tracking-wider opacity-70 mb-1">
            <span className="w-2.5 h-2.5 bg-[var(--elec)] border border-[var(--line)]" />
            <span>Department 03 · Multi-Channel Distribution · Cadence &amp; Drops</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-[var(--ink)] tracking-tight">
            CAMPAIGNS <span className="text-[var(--ox)] font-normal italic font-serif">distribution</span>
          </h1>
        </div>
        <div className="font-mono text-xs opacity-75 hidden sm:block text-right">
          <div>{campaigns.length} Campaigns Orchestrated</div>
          <div className="font-bold text-[var(--ink)]">BROADCAST PIPELINE</div>
        </div>
      </div>

      <MarketSubNav />

      {/* Broadcast Telemetry Strip */}
      <div className="p-3 border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard-sm flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <Radio className="w-3.5 h-3.5 text-[var(--ox)] animate-pulse" />
          <span className="font-bold uppercase">Broadcast Active:</span>
          <span className="opacity-80">78.6k Total Reach across {campaigns.length} Distribution Drops</span>
        </div>
        <div className="flex items-center gap-2 font-bold">
          <span className="w-2 h-2 rounded-full bg-[var(--acid)] border border-[var(--line)]" />
          <span>{activeCount} Live Broadcasting Channels</span>
        </div>
      </div>

      <HandoffNotice
        toDeptName="Manage"
        toDeptPath="/manage"
        text="Campaign milestones and deliverable timelines attach directly to client retainers in Manage."
      />

      {/* Active Distribution Grids */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b-2 border-[var(--line)]">
          <div className="flex items-center gap-2">
            <Megaphone className="w-4 h-4 text-[var(--ox)]" />
            <h2 className="font-display font-black text-xl text-[var(--ink)]">Active Distribution Channels</h2>
          </div>
          <button
            type="button"
            onClick={() => setNewModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 border-2 border-[#171717] bg-[var(--ink)] text-[var(--bg)] font-display font-bold text-xs hover:bg-[var(--ox)] transition-colors shadow-hard-xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Schedule Drop</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {campaigns.map((camp) => (
            <div
              key={camp.id}
              className="border-2 border-[var(--line)] bg-[var(--card-bg)] p-5 flex flex-col justify-between shadow-hard-sm hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-hard-md transition-all space-y-4"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs text-[var(--ox)] font-bold uppercase flex items-center gap-1.5">
                    {camp.channel === 'substack' ? <Send className="w-3.5 h-3.5" /> : <Radio className="w-3.5 h-3.5" />}
                    {camp.channel}
                  </span>
                  <span
                    className={`text-[10px] uppercase font-mono font-bold px-2 py-0.5 border ${
                      camp.status === 'live'
                        ? 'border-[#171717] bg-[var(--acid)] text-[#171717]'
                        : 'border-[var(--line)] bg-[var(--card-subtle)] text-[var(--ink)]'
                    }`}
                  >
                    {camp.status}
                  </span>
                </div>

                <h3 className="font-display font-extrabold text-xl leading-snug">{camp.title}</h3>
                <p className="font-sans text-xs opacity-85 leading-relaxed line-clamp-3">{camp.description}</p>

                {camp.clientName && (
                  <div className="p-1.5 border border-[var(--line)] bg-[var(--card-subtle)] font-mono text-[11px] text-[var(--ox)] font-bold">
                    Client: {camp.clientName}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-[var(--line)]/20 flex items-center justify-between">
                <span className="font-mono text-xs opacity-75">{camp.reach || '12.4k'} reach</span>
                <button
                  type="button"
                  onClick={() => setAttachCampaign(camp)}
                  className="inline-flex items-center gap-1 px-3 py-1 border border-[#171717] bg-[var(--card-subtle)] hover:bg-[var(--bg)] font-mono text-xs font-bold transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5 mr-0.5" />
                  <span>Attach to Client</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 14-Day Release Cadence Schedule Matrix */}
      <div className="space-y-3 pt-3">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b-2 border-[var(--line)]">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[var(--ox)]" />
            <h2 className="font-display font-black text-xl text-[var(--ink)]">14-Day Release Cadence</h2>
          </div>
          <span className="font-mono text-xs opacity-70">Click status badge to cycle stage</span>
        </div>

        <div className="border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard-sm overflow-x-auto">
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
                  <td className="p-3 opacity-80">{d.reach || '18.2k'}</td>
                  <td className="p-3 text-right">
                    <button
                      type="button"
                      onClick={() => cycleStatus(d.id, d.status)}
                      className={`px-2.5 py-1 border font-bold text-[10px] uppercase cursor-pointer hover:opacity-80 transition-opacity ${
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

      {/* Cross-Destination Link to Official Connections Hub */}
      <div className="p-5 border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1 max-w-xl">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-[var(--ox)]" />
            <span className="font-mono text-xs uppercase font-bold text-[var(--ox)]">Distribution Pipes</span>
          </div>
          <h3 className="font-display font-bold text-lg text-[var(--ink)]">Connections &amp; Handoff Readiness</h3>
          <p className="font-sans text-xs opacity-85 leading-relaxed">
            Manage distribution channels across Instagram, Pinterest, Substack, LinkedIn, YouTube, and Website in the dedicated Connections hub.
          </p>
        </div>
        <Link to="/market/connections">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-4 py-2 border-2 border-[#171717] bg-[var(--ink)] text-[var(--bg)] font-display font-bold text-xs hover:bg-[var(--ox)] transition-colors shadow-hard-xs cursor-pointer"
          >
            <span>Open Connections Hub</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </button>
        </Link>
      </div>

      <NewCampaignModal
        isOpen={newModalOpen}
        onClose={() => setNewModalOpen(false)}
        clients={clients}
        onCreate={(data) => createCampaign(data)}
      />

      {attachCampaign && (
        <AttachToClientModal
          isOpen={Boolean(attachCampaign)}
          campaign={attachCampaign}
          clients={clients}
          onClose={() => setAttachCampaign(null)}
          onAttach={(campaignId, clientId, clientName) => {
            attachCampaignToClient(campaignId, clientId, clientName);
          }}
        />
      )}
    </div>
  );
};

export default CampaignsPage;
