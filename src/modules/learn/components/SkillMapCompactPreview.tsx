import React from 'react';
import { Link } from 'react-router-dom';
import { Map, ArrowRight } from 'lucide-react';
import { Tile, Badge } from '../../../components/ui';
import { useProgress } from '../../../hooks';

export const SkillMapCompactPreview: React.FC = () => {
  const { unlockedSkills } = useProgress();

  const previewNodes = [
    { name: 'Brand Strategy', domain: 'Branding', unlocked: true },
    { name: 'Brutal Typography', domain: 'Branding', unlocked: true },
    { name: 'Halftone Litho', domain: 'Design', unlocked: true },
    { name: 'Scarcity Timing', domain: 'Marketing', unlocked: false },
    { name: 'Tactile Interface', domain: 'UI/UX', unlocked: false },
  ];

  return (
    <Tile accent="none" shadow="default" className="p-6 flex flex-col justify-between space-y-5">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Badge variant="electric">Competency Radar</Badge>
          <span className="font-mono text-xs opacity-75">{unlockedSkills.length} of 30 Lit</span>
        </div>

        <div>
          <h3 className="font-display font-extrabold text-2xl text-[var(--ink)]">Skill Map Preview</h3>
          <p className="text-sm opacity-85 mt-1">
            Visual graph that illuminates as you complete lessons and ship briefs into Create.
          </p>
        </div>

        {/* Mini Node Visualizer */}
        <div className="p-3 border-2 border-[var(--line)] bg-[var(--card-subtle)] flex flex-wrap gap-2">
          {previewNodes.map((n) => (
            <div
              key={n.name}
              className={`px-2.5 py-1 text-xs font-mono border-2 flex items-center gap-1.5 ${
                n.unlocked
                  ? 'border-[#171717] bg-[var(--acid)] text-[#171717] font-bold shadow-hard-sm'
                  : 'border-[var(--line)] bg-[var(--card-bg)] text-[var(--ink)] opacity-60'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${n.unlocked ? 'bg-[var(--ox)] animate-pulse' : 'bg-gray-400'}`} />
              <span>{n.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-3 border-t border-[var(--line)]/20 flex items-center justify-between text-xs font-mono">
        <span className="opacity-75">Interactive Node Graph</span>
        <Link to="/learn/map" className="font-bold text-[var(--ox)] hover:underline inline-flex items-center gap-1">
          <Map className="w-3.5 h-3.5" />
          <span>Explore Skill Map</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </Tile>
  );
};

export default SkillMapCompactPreview;

