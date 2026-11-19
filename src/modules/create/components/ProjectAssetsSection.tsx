import React, { useState } from 'react';
import { ArrowUpRight, Sparkles, Check, Plus, X } from 'lucide-react';
import { AssetRecord, AssetType } from '../../../types';
import { Badge, Button } from '../../../components/ui';
import { useProgress } from '../../../hooks';

interface ProjectAssetsSectionProps {
  projectId: string;
  assets: AssetRecord[];
}

export const ProjectAssetsSection: React.FC<ProjectAssetsSectionProps> = ({ projectId, assets }) => {
  const { deployAssetToMarket, isAssetDeployed, createAsset } = useProgress();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<AssetType>('identity');
  const [newFormat, setNewFormat] = useState('SVG / Vector');
  const [newPreview, setNewPreview] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    createAsset({
      projectId,
      title: newTitle.trim(),
      type: newType,
      fileFormat: newFormat.trim() || 'SVG / Specimen',
      previewText: newPreview.trim() || 'Studio production deliverable.',
      status: 'ready',
    });
    setNewTitle('');
    setNewPreview('');
    setShowAddForm(false);
  };

  return (
    <div className="p-6 sm:p-8 border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b-2 border-[var(--line)]">
        <div>
          <span className="font-mono text-xs uppercase font-bold text-[var(--ox)] tracking-wider">Studio Production Canvas</span>
          <h2 className="font-display font-bold text-2xl text-[var(--ink)] mt-0.5">Generated Studio Assets</h2>
        </div>
        <Badge variant="electric" className="font-mono text-xs">{assets.length} Artifacts Linked</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {assets.map((asset) => {
          const deployed = isAssetDeployed(asset.id) || asset.status === 'deployed';
          return (
            <div key={asset.id} className="p-4 border-2 border-[var(--line)] bg-[var(--card-subtle)] space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <Badge variant="default" className="text-[10px] uppercase font-mono">{asset.type}</Badge>
                  <span className="font-mono text-xs opacity-75">{asset.fileFormat}</span>
                </div>
                <h3 className="font-sans font-bold text-base text-[var(--ink)]">{asset.title}</h3>
                {asset.previewText && <p className="font-sans text-xs opacity-80 leading-normal">{asset.previewText}</p>}
              </div>
              <div className="pt-3 border-t border-[var(--line)]/20 flex items-center justify-between">
                <span className="font-mono text-[10px] opacity-70">{asset.id}</span>
                {deployed ? (
                  <span className="inline-flex items-center gap-1 font-mono text-xs text-[var(--ox)] font-bold">
                    <Check className="w-3.5 h-3.5" /> Deployed to Market
                  </span>
                ) : (
                  <Button variant="secondary" size="sm" onClick={() => deployAssetToMarket(asset.id)} className="text-xs">
                    <span>Deploy to Market</span>
                    <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {showAddForm ? (
        <form onSubmit={handleCreate} className="p-4 border-2 border-[var(--line)] bg-[var(--bg)] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-sm uppercase">Add Studio Deliverable</h3>
            <button type="button" onClick={() => setShowAddForm(false)} className="opacity-70 hover:opacity-100"><X className="w-4 h-4" /></button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input type="text" placeholder="Asset title (e.g. Acid Vinyl Mockup)" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="px-3 py-2 border-2 border-[var(--line)] bg-[var(--card-bg)] text-xs font-mono" required />
            <input type="text" placeholder="Format (e.g. SVG / OTF / PDF)" value={newFormat} onChange={(e) => setNewFormat(e.target.value)} className="px-3 py-2 border-2 border-[var(--line)] bg-[var(--card-bg)] text-xs font-mono" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
            <select value={newType} onChange={(e) => setNewType(e.target.value as AssetType)} className="px-3 py-2 border-2 border-[var(--line)] bg-[var(--card-bg)] text-xs font-mono">
              <option value="identity">Identity</option>
              <option value="graphic">Graphic</option>
              <option value="copy">Copy</option>
              <option value="template">Template</option>
              <option value="moodboard">Moodboard</option>
            </select>
            <input type="text" placeholder="Brief preview or description" value={newPreview} onChange={(e) => setNewPreview(e.target.value)} className="px-3 py-2 border-2 border-[var(--line)] bg-[var(--card-bg)] text-xs font-mono" />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" size="sm" type="button" onClick={() => setShowAddForm(false)}>Cancel</Button>
            <Button variant="primary" size="sm" type="submit">Save Asset Slot</Button>
          </div>
        </form>
      ) : (
        <div className="p-4 border-2 border-dashed border-[var(--line)] bg-[var(--bg)] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-mono text-xs opacity-80">
            <Sparkles className="w-4 h-4 text-[var(--ox)]" />
            <span>Shared records synchronize across all 5 departments in real-time.</span>
          </div>
          <Button variant="secondary" size="sm" onClick={() => setShowAddForm(true)}>
            <Plus className="w-3.5 h-3.5 mr-1" />
            <span>Add Asset Slot</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProjectAssetsSection;
