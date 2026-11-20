import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowUpRight, Check, PackageCheck } from 'lucide-react';
import { CreateSubNav } from '../components';
import { useProgress } from '../../../hooks';
import { AssetType } from '../../../types';
import { HandoffNotice } from '../../../components/shared/HandoffNotice';

const ASSET_TYPES: Array<'All' | AssetType> = ['All', 'identity', 'graphic', 'copy', 'template', 'moodboard'];

const COVER_COLORS = ['#702C35', '#A8B8E8', '#D9E638', '#477C75'];

export const AssetLibraryPage: React.FC = () => {
  const { assets, projects, deployAssetToMarket, isAssetDeployed } = useProgress();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'All' | AssetType>('All');

  const filteredAssets = useMemo(() => {
    return assets.filter((a) => {
      if (selectedType !== 'All' && a.type !== selectedType) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const p = projects.find((proj) => proj.id === a.projectId);
        return (
          a.title.toLowerCase().includes(q) ||
          a.fileFormat.toLowerCase().includes(q) ||
          a.type.toLowerCase().includes(q) ||
          (p && p.title.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [assets, selectedType, searchQuery, projects]);

  const deployedCount = assets.filter((a) => isAssetDeployed(a.id) || a.status === 'deployed').length;
  const readyCount = assets.length - deployedCount;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="flex flex-wrap items-baseline justify-between gap-4 pb-4 border-b-2 border-[var(--line)]">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase font-bold tracking-wider opacity-70 mb-1">
            <span className="w-2.5 h-2.5 bg-[var(--ox)] border border-[var(--line)]" />
            <span>Studio Production Ledger · Deliverable Artifacts</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-[var(--ink)] tracking-tight">
            ASSET LIBRARY <span className="text-[var(--ox)] font-normal italic font-serif">artifacts</span>
          </h1>
        </div>
        <div className="font-mono text-xs opacity-75 hidden sm:block text-right">
          <div>{assets.length} Production Artifacts · {deployedCount} Deployed</div>
          <div className="font-bold text-[var(--ink)]">CROSS-DEPARTMENT LEDGER</div>
        </div>
      </div>

      <CreateSubNav />

      {/* Telemetry Strip */}
      <div className="p-3 border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard-sm flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <PackageCheck className="w-3.5 h-3.5 text-[var(--ox)]" />
          <span className="font-bold uppercase">Studio Ledger:</span>
          <span className="opacity-80">
            {assets.length} Total Deliverable Artifacts ({readyCount} Ready in Studio, {deployedCount} Deployed to Market)
          </span>
        </div>
        <div className="flex items-center gap-2 font-bold">
          <span className="w-2 h-2 rounded-full bg-[var(--acid)] border border-[var(--line)]" />
          <span>Syncing with Department 03 (Market)</span>
        </div>
      </div>

      <HandoffNotice
        toDeptName="Market"
        toDeptPath="/market"
        text="Deploying any artifact from this ledger registers it in Market's Incoming Deliverables tray and prepares it for campaign roadmaps."
      />

      {/* Search & Type Filter Bar */}
      <div className="p-4 border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search assets by title, format, type, project…"
              className="w-full pl-9 pr-4 py-2 border-2 border-[var(--line)] bg-[var(--bg)] font-mono text-xs text-[var(--ink)] placeholder:opacity-50 focus:outline-none focus:border-[var(--ox)]"
            />
            <Search className="w-4 h-4 opacity-50 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          <span className="font-mono text-xs opacity-70 hidden sm:inline">
            Showing {filteredAssets.length} of {assets.length} artifacts
          </span>
        </div>

        {/* Type Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="font-mono text-xs uppercase font-bold opacity-70 mr-1">Type:</span>
          {ASSET_TYPES.map((type) => {
            const isSelected = selectedType === type;
            return (
              <button
                key={type}
                type="button"
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1 text-xs font-mono border-2 transition-colors cursor-pointer select-none capitalize ${
                  isSelected
                    ? 'border-[#171717] bg-[var(--ink)] text-[var(--bg)] font-bold shadow-hard-xs'
                    : 'border-[var(--line)] bg-[var(--bg)] text-[var(--ink)] hover:bg-[var(--card-subtle)]'
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>
      </div>

      {/* Assets Grid */}
      {filteredAssets.length === 0 ? (
        <div className="p-12 border-2 border-[var(--line)] bg-[var(--card-bg)] text-center font-mono text-sm space-y-3">
          <p className="opacity-75">No studio artifacts found matching criteria.</p>
          <Link
            to="/create"
            className="inline-flex items-center gap-1 font-bold text-[var(--ox)] hover:underline"
          >
            <span>Open Studio Projects →</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredAssets.map((asset, idx) => {
            const project = projects.find((p) => p.id === asset.projectId);
            const deployed = isAssetDeployed(asset.id) || asset.status === 'deployed';
            const color = COVER_COLORS[idx % COVER_COLORS.length];
            const extension = asset.fileFormat.split('/')[0].trim().replace('.', '');

            return (
              <div
                key={asset.id}
                className="border-2 border-[var(--line)] bg-[var(--card-bg)] p-4 flex flex-col justify-between shadow-hard-sm hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-hard-md transition-all group"
              >
                <div>
                  {/* File Type Banner (.cov) from prototype */}
                  <div
                    className="h-20 -m-4 mb-3 border-b-2 border-[var(--line)] p-2.5 flex items-end justify-between overflow-hidden relative select-none"
                    style={{
                      backgroundColor: color,
                      backgroundImage: 'radial-gradient(circle, rgba(23,23,23,0.3) 30%, transparent 32%)',
                      backgroundSize: '10px 10px',
                    }}
                  >
                    <span className="font-display font-black text-4xl text-[#171717] tracking-tight leading-none">
                      .{extension.slice(0, 4)}
                    </span>
                    <span className="font-mono text-[9px] font-bold uppercase px-1.5 py-0.5 border border-[#171717] bg-[#FAF7EE] text-[#171717]">
                      v{(idx % 3) + 1}.0
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono opacity-75 mb-1.5">
                    <span className="uppercase font-bold">{asset.type}</span>
                    <span>{asset.fileFormat}</span>
                  </div>

                  <h3 className="font-display font-extrabold text-base text-[var(--ink)] leading-snug group-hover:text-[var(--ox)] transition-colors">
                    {asset.title}
                  </h3>

                  {project && (
                    <Link
                      to={`/create/projects/${project.id}`}
                      className="font-mono text-[11px] text-[var(--ox)] hover:underline block truncate mt-1"
                    >
                      From: {project.title}
                    </Link>
                  )}

                  {asset.previewText && (
                    <p className="font-sans text-xs opacity-80 mt-2 leading-relaxed line-clamp-2">
                      {asset.previewText}
                    </p>
                  )}
                </div>

                <div className="pt-3 mt-3 border-t border-[var(--line)]/20 flex items-center justify-between">
                  <span className="font-mono text-[10px] opacity-60">{asset.id}</span>
                  {deployed ? (
                    <span className="inline-flex items-center gap-1 font-mono text-[11px] text-[var(--ox)] font-bold">
                      <Check className="w-3 h-3" /> Deployed
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => deployAssetToMarket(asset.id)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 border border-[#171717] bg-[var(--ink)] text-[var(--bg)] font-display font-bold text-[11px] hover:bg-[var(--ox)] transition-colors shadow-hard-xs cursor-pointer"
                    >
                      <span>Deploy</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AssetLibraryPage;
