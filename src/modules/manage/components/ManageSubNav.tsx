import React from 'react';
import { NavLink } from 'react-router-dom';

export const ManageSubNav: React.FC = () => {
  const tabs = [
    { label: 'Workflow Board', path: '/manage', end: true },
    { label: 'Clients', path: '/manage/clients', end: false },
    { label: 'Tasks & Deliverables', path: '/manage/tasks', end: false },
    { label: 'Finance & Retainers', path: '/manage/finance', end: false },
  ];

  return (
    <nav aria-label="Manage Navigation" className="border-b-2 border-[var(--line)] mb-6 overflow-x-auto">
      <div className="flex items-end -mb-[2px]">
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            end={tab.end}
            className={({ isActive }) =>
              `px-4 sm:px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider border-2 border-[var(--line)] -mr-[2px] transition-colors whitespace-nowrap cursor-pointer select-none ${
                isActive
                  ? 'bg-[var(--ink)] text-[var(--bg)] border-b-[var(--ink)] z-10'
                  : 'bg-[var(--bg)] text-[var(--ink)] hover:bg-[var(--card-subtle)]'
              } focus-visible:outline-2 focus-visible:outline-[var(--ox)]`
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default ManageSubNav;

