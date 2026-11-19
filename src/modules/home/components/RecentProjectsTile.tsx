import React from 'react';
import { Link } from 'react-router-dom';
import { Folder, ArrowRight } from 'lucide-react';
import { Tile, Badge } from '../../../components/ui';

export const RecentProjectsTile: React.FC = () => {
  const projects = [
    {
      id: 'p-1',
      title: 'Offscript Issue Zero: Brand System',
      client: 'Offscript Press',
      status: 'in progress',
      assetsCount: 5,
      updated: '2h ago',
    },
    {
      id: 'p-2',
      title: 'Neon Brutalist Capsule 01',
      client: 'Kilo Apparel',
      status: 'in review',
      assetsCount: 3,
      updated: 'Yesterday',
    },
  ];

  return (
    <Tile accent="none" shadow="default" className="p-6 flex flex-col justify-between space-y-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Badge variant="electric">The Studio</Badge>
          <span className="font-mono text-xs opacity-75">Recent Work</span>
        </div>
        <h3 className="font-display font-extrabold text-2xl text-[var(--ink)]">Recent Projects</h3>

        <div className="divide-y-2 divide-[var(--line)] border-2 border-[var(--line)] bg-[var(--card-subtle)]">
          {projects.map((proj) => (
            <div key={proj.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[var(--card-bg)]">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Folder className="w-4 h-4 text-[var(--ox)]" />
                  <span className="font-display font-bold text-base text-[var(--ink)]">{proj.title}</span>
                </div>
                <div className="flex items-center gap-2 font-mono text-xs opacity-75">
                  <span>Client: {proj.client}</span>
                  <span>·</span>
                  <span>{proj.assetsCount} assets</span>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Badge variant={proj.status === 'in progress' ? 'acid' : 'subtle'}>
                  {proj.status}
                </Badge>
                <span className="font-mono text-[11px] opacity-70">{proj.updated}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-2 flex justify-between items-center text-xs font-mono">
        <span className="opacity-75">Shared with Market campaigns</span>
        <Link to="/create" className="font-bold text-[var(--ox)] hover:underline inline-flex items-center gap-1">
          <span>Open Studio Canvas</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </Tile>
  );
};

export default RecentProjectsTile;

