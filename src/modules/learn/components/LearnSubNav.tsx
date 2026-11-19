import React from 'react';
import { NavLink } from 'react-router-dom';
import { Compass, GitBranch, Map, BookMarked } from 'lucide-react';

export const LearnSubNav: React.FC = () => {
  const tabs = [
    { label: 'Overview', path: '/learn', end: true, icon: Compass },
    { label: 'Curriculum Paths', path: '/learn/paths', icon: GitBranch },
    { label: 'Skill Map', path: '/learn/map', icon: Map },
    { label: 'Resource Library', path: '/learn/library', icon: BookMarked },
  ];

  return (
    <nav aria-label="Learn Department Navigation" className="border-b-2 border-[var(--line)] bg-[var(--bg)] pb-3">
      <div className="flex flex-wrap items-center gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <NavLink
              key={tab.path}
              to={tab.path}
              end={tab.end}
              className={({ isActive }) =>
                `inline-flex items-center gap-2 px-3.5 py-2 text-xs font-mono font-bold uppercase tracking-wider border-2 transition-all ${
                  isActive
                    ? 'border-[var(--line)] bg-[var(--ink)] text-[var(--bg)] shadow-hard-sm'
                    : 'border-transparent text-[var(--ink)] hover:border-[var(--line)] hover:bg-[var(--card-bg)]'
                } focus-visible:outline-2 focus-visible:outline-[var(--ox)]`
              }
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default LearnSubNav;

