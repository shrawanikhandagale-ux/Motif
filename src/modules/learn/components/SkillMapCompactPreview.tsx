import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Map, ArrowRight } from 'lucide-react';
import { Tile, Badge } from '../../../components/ui';
import { SkillNodeGraph } from './SkillNodeGraph';
import { useProgress } from '../../../hooks';

export const SkillMapCompactPreview: React.FC = () => {
  const { completedItems, unlockedSkills, projects } = useProgress();

  const completedIds = useMemo(() => {
    return completedItems
      .filter((c) => c.type === 'lesson')
      .map((c) => c.targetId || c.id);
  }, [completedItems]);

  const provenDomains = useMemo(() => {
    const set = new Set<string>();
    projects
      .filter((p) => p.status === 'completed')
      .forEach((p) => {
        const text = `${p.title} ${(p.tags || []).join(' ')}`.toLowerCase();
        if (text.includes('brand')) set.add('branding');
        if (text.includes('design') || text.includes('print')) set.add('design');
        if (text.includes('market') || text.includes('campaign')) set.add('marketing');
        if (text.includes('ui') || text.includes('ux')) set.add('ui/ux');
        if (text.includes('strategy') || text.includes('manage')) set.add('strategy');
      });
    if (set.size === 0 && projects.some((p) => p.status === 'completed')) {
      set.add('branding');
      set.add('design');
    }
    return Array.from(set);
  }, [projects]);

  const unlockedCount = Math.max(1, completedIds.length + (unlockedSkills.length > 0 ? 2 : 0));

  return (
    <Tile accent="none" shadow="default" className="p-6 flex flex-col justify-between space-y-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Badge variant="electric">Competency Constellation</Badge>
          <span className="font-mono text-xs opacity-75">{unlockedCount} of 19 Nodes Lit</span>
        </div>

        <div>
          <h3 className="font-display font-extrabold text-2xl text-[var(--ink)]">Skill Map</h3>
          <p className="text-xs font-sans opacity-85 mt-0.5">
            Interactive starburst network connecting theory to practical production execution.
          </p>
        </div>

        {/* Mini Prototype Constellation SVG */}
        <Link to="/learn/map" className="block p-2 border-2 border-[var(--line)] bg-[var(--card-subtle)]/70 hover:bg-[var(--card-subtle)] transition-colors cursor-pointer group">
          <div className="max-h-[160px] overflow-hidden flex items-center justify-center">
            <SkillNodeGraph
              completedIds={completedIds}
              unlockedSkillIds={unlockedSkills}
              provenDomains={provenDomains}
              selectedNodeId={null}
              onSelectNode={() => {}}
              mini={true}
            />
          </div>
          <div className="text-center font-mono text-[10px] text-[var(--ox)] font-bold pt-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
            ✦ Pulsing: Up Next · Ring: Proven in Studio
          </div>
        </Link>
      </div>

      <div className="pt-3 border-t border-[var(--line)]/20 flex items-center justify-between text-xs font-mono">
        <span className="opacity-75">Central YOU Node</span>
        <Link to="/learn/map" className="font-bold text-[var(--ox)] hover:underline inline-flex items-center gap-1">
          <Map className="w-3.5 h-3.5" />
          <span>Expand Full Map</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </Tile>
  );
};

export default SkillMapCompactPreview;
