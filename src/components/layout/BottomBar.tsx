import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BookOpen, PenTool, Megaphone, Briefcase, BarChart3 } from 'lucide-react';

export const BottomBar: React.FC = () => {
  const items = [
    { label: 'Home', path: '/home', icon: Home },
    { label: 'Learn', path: '/learn', icon: BookOpen },
    { label: 'Create', path: '/create', icon: PenTool },
    { label: 'Market', path: '/market', icon: Megaphone },
    { label: 'Manage', path: '/manage', icon: Briefcase },
    { label: 'Analyze', path: '/analyze', icon: BarChart3 },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-30 border-t-2 border-[var(--line)] bg-[var(--card-bg)] shadow-[0_-4px_0_var(--shadow-color)]"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="grid grid-cols-6 divide-x-2 divide-[var(--line)]">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/home'}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center py-2 px-1 text-center transition-colors ${
                  isActive
                    ? 'bg-[var(--ink)] text-[var(--bg)] font-bold'
                    : 'text-[var(--ink)] hover:bg-[var(--elec)] hover:text-[#171717]'
                } focus-visible:outline-2 focus-visible:outline-[var(--ox)]`
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="text-[10px] font-mono mt-1 tracking-tight truncate w-full block">
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomBar;

