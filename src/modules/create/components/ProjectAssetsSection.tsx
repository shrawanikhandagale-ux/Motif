import React, { useState } from 'react';
import { ArrowUpRight, Sparkles, Check, Plus } from 'lucide-react';
import { AssetRecord } from '../../../types';
import { Badge, Button } from '../../../components/ui';
import { createService } from '../services';

interface ProjectAssetsSectionProps {
  projectId: string;
  assets: AssetRecord[];
}

export const ProjectAssetsSection: React.FC<ProjectAssetsSectionProps> = ({ projectId, assets }) => {
  const [deployedTitles, setDeployedTitles] = useState<string[]>([]);

  const handlePush = async (assetTitle: string) => {
    await createService.pushToMarket(assetTitle);
    setDeployedTitles((prev) => [...prev, assetTitle]);
  };

  const projectAssets =
    assets.length > 0
      ? assets
      : [
          {
            id: `ast-${projectId}-1`,
            title: 'Visual Identity Specimen & Token Scale',
            type: 'identity' as const,
            department: 'create' as const,
            projectId,
            previewText: 'Bricolage Grotesque 800 + Instrument Sans + 4-color high contrast scheme',
            fileFormat: 'SVG / CSS',
            updatedAt: 'Today',
          },
          {
            id: `ast-${projectId}-2`,
            title: 'Editorial Zine Imposition Plate',
            type: 'graphic' as const,
            department: 'create' as const,
            projectId,
            previewText: '16-page layout guide with 14px halftone radial dot frequency textures',
            fileFormat: 'PDF / InDesign',
            updatedAt: 'Today',
          },
        ];

  return (
    <div className="p-6 sm:p-8 border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b-2 border-[var(--line)]">
        <div>
          <span className="font-mono text-xs uppercase font-bold text-[var(--ox)] tracking-wider">
            Studio Production Canvas
          </span>
          <h2 className="font-display font-bold text-2xl text-[var(--ink)] mt-0.5">
            Generated Studio Assets
          </h2>
        </div>
        <Badge variant="electric" className="font-mono text-xs">
          {projectAssets.length} Artifacts Linked
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projectAssets.map((asset) => {
          const isDeployed = deployedTitles.includes(asset.title);

          return (
            <div
              key={asset.id}
              className="p-4 border-2 border-[var(--line)] bg-[var(--card-subtle)] space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <Badge variant="default" className="text-[10px] uppercase font-mono">
                    {asset.type}
                  </Badge>
                  <span className="font-mono text-xs opacity-75">{asset.fileFormat}</span>
                </div>
                <h3 className="font-sans font-bold text-base text-[var(--ink)]">{asset.title}</h3>
                {asset.previewText && (
                  <p className="font-sans text-xs opacity-80 leading-normal">{asset.previewText}</p>
                )}
              </div>

              <div className="pt-3 border-t border-[var(--line)]/20 flex items-center justify-between">
                <span className="font-mono text-[10px] opacity-70">{asset.id}</span>
                {isDeployed ? (
                  <span className="inline-flex items-center gap-1 font-mono text-xs text-[var(--ox)] font-bold">
                    <Check className="w-3.5 h-3.5" /> Deployed to Market
                  </span>
                ) : (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handlePush(asset.title)}
                    className="text-xs"
                  >
                    <span>Deploy to Market</span>
                    <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 border-2 border-dashed border-[var(--line)] bg-[var(--bg)] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 font-mono text-xs opacity-80">
          <Sparkles className="w-4 h-4 text-[var(--ox)]" />
          <span>Shared records synchronize across all 5 departments in real-time.</span>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => alert('New asset slot created. Upload vector or type specimen.')}
        >
          <Plus className="w-3.5 h-3.5 mr-1" />
          <span>Add Asset Slot</span>
        </Button>
      </div>
    </div>
  );
};

export default ProjectAssetsSection;

