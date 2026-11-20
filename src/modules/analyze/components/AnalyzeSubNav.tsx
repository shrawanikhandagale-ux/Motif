import React from 'react';
import { NavLink } from 'react-router-dom';

export const AnalyzeSubNav: React.FC = () => {
  const tabs = [
    { label: 'Overview', path: '/analyze', end: true },
    { label: 'Learning vs Proven', path: '/analyze/learning', end: false },
    { label: 'Insights & Loopback', path: '/analyze/insights', end: false },
  ];

  return (
    <nav aria-label="Analyze Navigation" className="border-b-2 border-[var(--line)] mb-6 overflow-x-auto">
      <div className="flex items-end -mb-[2px]">
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            end={tab.end}
            className={({ isActive }) =>
              `px-4 sm:px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider border-2 border-[var(--line)] -mr-[2px] transition-colors whitespace-nowrap cursor-pointer select-none ${
                isActive
                  ? 'bg-[#477C75] text-[#F1EBDD] border-b-[#477C75] z-10'
                  : 'bg-[var(--bg)] text-[var(--ink)] hover:bg-[var(--card-subtle)]'
              } focus-visible:outline-2 focus-visible:outline-[#477C75]`
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default AnalyzeSubNav;

