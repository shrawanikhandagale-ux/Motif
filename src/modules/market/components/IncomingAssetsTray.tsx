import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PackageCheck, ArrowUpRight, Clock, Eye, X, Check, Share2 } from 'lucide-react';
import { Badge, Button, Tile } from '../../../components/ui';
import { useProgress } from '../../../hooks';
import { DeployedAssetView } from '../../../types';

export const IncomingAssetsTray: React.FC = () => {
  const {
    getDeployedAssets,
    campaigns,
    attachAssetToCampaign,
    createDeliverable,
  } = useProgress();
  const deployedViews = getDeployedAssets('market');
  const [selectedView, setSelectedView] = useState<DeployedAssetView | null>(null);
  const [selectedCampaignId, setSelectedCampaignId] = useState(campaigns[0]?.id || '');
  const [pushedDeliverable, setPushedDeliverable] = useState(false);

  const handleAssign = () => {
    if (!selectedView || !selectedCampaignId) return;
    attachAssetToCampaign(selectedCampaignId, selectedView.asset.id);
    setSelectedView(null);
  };

  const handlePushToManage = () => {
    if (!selectedView) return;
    const clientName = selectedView.project?.clientName || 'Independent Studio';
    createDeliverable({
      title: `${selectedView.asset.title} Final Review`,
      clientName,
      status: 'In Review',
      assetId: selectedView.asset.id,
      notes: `Pushed from deployed studio asset: ${selectedView.asset.fileFormat}.`,
    });
    setPushedDeliverable(true);
    setTimeout(() => {
      setPushedDeliverable(false);
      setSelectedView(null);
    }, 1200);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b-2 border-[var(--line)]">
        <div className="flex items-center gap-2">
          <PackageCheck className="w-5 h-5 text-[var(--ox)]" />
          <h2 className="font-display font-bold text-xl uppercase tracking-tight">Incoming Studio Deliverables</h2>
        </div>
        <Badge variant="electric" className="font-mono text-xs">{deployedViews.length} Available for Campaigns</Badge>
      </div>

      {deployedViews.length === 0 ? (
        <Tile accent="none" shadow="default" className="p-8 text-center space-y-3">
          <span className="font-mono text-xs font-bold uppercase text-[var(--ox)]">Creative Handoff Pipeline</span>
          <h3 className="font-display font-bold text-xl">No Deployed Studio Assets Yet</h3>
          <p className="font-sans text-sm opacity-80 max-w-lg mx-auto leading-relaxed">
            When creative milestones in <strong className="font-bold">Create Studio</strong> are finished, deploy them to Market to assemble distribution drops, social packages, and pitch kits.
          </p>
          <div className="pt-2">
            <Link to="/create">
              <Button variant="secondary" size="sm">
                <span>Open Create Studio</span>
                <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </div>
        </Tile>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {deployedViews.map(({ handoff, asset, project }) => {
            const assignedCampaign = campaigns.find((c) => c.id === asset.campaignId || c.id === handoff.campaignId);
            return (
              <div key={handoff.id} className="p-4 border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="default" className="text-[10px] font-mono uppercase">{asset.type}</Badge>
                    <span className={`text-[10px] font-mono uppercase px-1.5 py-0.5 border ${
                      assignedCampaign
                        ? 'border-[#171717] bg-[var(--acid)] text-[#171717] font-bold'
                        : 'border-[var(--line)] bg-[var(--card-subtle)] text-[var(--ink)]'
                    }`}>
                      {assignedCampaign ? 'Assigned' : handoff.status}
                    </span>
                  </div>
                  <h3 className="font-sans font-bold text-base text-[var(--ink)] leading-snug">{asset.title}</h3>
                  <div className="font-mono text-xs opacity-75">
                    <span>From: </span>
                    <span className="font-bold text-[var(--ink)]">{project?.title || handoff.projectId}</span>
                  </div>
                  {assignedCampaign && (
                    <div className="p-1.5 border border-[var(--line)] bg-[var(--card-subtle)] font-mono text-[10px] text-[var(--ox)] font-bold">
                      Linked: {assignedCampaign.title}
                    </div>
                  )}
                  {asset.previewText && <p className="font-sans text-xs opacity-80 line-clamp-2 leading-relaxed">{asset.previewText}</p>}
                </div>

                <div className="pt-3 border-t border-[var(--line)]/20 flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] opacity-70 inline-flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {new Date(handoff.deployedAt).toLocaleDateString()}
                  </span>
                  <Button variant="secondary" size="sm" onClick={() => setSelectedView({ handoff, asset, project })} className="text-xs px-2 py-1">
                    <Eye className="w-3.5 h-3.5 mr-1" /> Inspect &amp; Assign
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {selectedView && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="w-full max-w-lg border-2 border-[var(--line)] bg-[var(--card-bg)] text-[var(--ink)] shadow-hard-lg p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-3 border-b-2 border-[var(--line)] pb-3">
              <div>
                <span className="font-mono text-[10px] uppercase text-[var(--ox)] font-bold">Deliverable Integration</span>
                <h3 className="font-display font-bold text-2xl mt-0.5">{selectedView.asset.title}</h3>
              </div>
              <button type="button" onClick={() => setSelectedView(null)} className="p-1 hover:bg-[var(--line)]/10" aria-label="Close"><X className="w-5 h-5" /></button>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 border border-[var(--line)] bg-[var(--card-subtle)] space-y-1">
                <div><span className="opacity-60">Source Project: </span><strong>{selectedView.project?.title || selectedView.handoff.projectId}</strong></div>
                <div><span className="opacity-60">Client / Imprint: </span><strong>{selectedView.project?.clientName || 'Independent Studio'}</strong></div>
                <div><span className="opacity-60">Deliverable Format: </span><strong>{selectedView.asset.fileFormat}</strong></div>
              </div>

              <div className="space-y-1.5 pt-2">
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--ink)]">
                  Assign to Campaign Distribution
                </label>
                <select
                  value={selectedCampaignId}
                  onChange={(e) => setSelectedCampaignId(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-[var(--line)] bg-[var(--bg)] text-xs font-mono"
                >
                  {campaigns.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title} ({c.channel})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {pushedDeliverable && (
              <div className="p-2.5 border-2 border-[#171717] bg-[var(--acid)] text-[#171717] font-mono text-xs font-bold flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[var(--ox)]" />
                <span>Pushed directly to Manage deliverables board!</span>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[var(--line)]">
              <div className="flex gap-2">
                <Button variant="primary" size="sm" onClick={handleAssign}>
                  Assign to Campaign
                </Button>
                <Button variant="secondary" size="sm" onClick={handlePushToManage} disabled={pushedDeliverable}>
                  <Share2 className="w-3.5 h-3.5 mr-1" />
                  <span>Send to Manage</span>
                </Button>
              </div>
              <Button variant="secondary" size="sm" onClick={() => setSelectedView(null)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncomingAssetsTray;
