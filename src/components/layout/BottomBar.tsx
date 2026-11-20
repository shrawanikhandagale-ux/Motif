import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { HomeMark, LearnMark, CreateMark, MarketMark } from '../shared/LinocutMarks';
import { MoreHorizontal } from 'lucide-react';

interface BottomBarProps {
  onOpenMore?: () => void;
  isMoreOpen?: boolean;
}

export const BottomBar: React.FC<BottomBarProps> = ({ onOpenMore, isMoreOpen }) => {
  const location = useLocation();
  const isMoreActive =
    isMoreOpen ||
    location.pathname.startsWith('/manage') ||
    location.pathname.startsWith('/analyze');

  const items = [
    { label: 'Home', path: '/home', Mark: HomeMark, exact: true },
    { label: 'Learn', path: '/learn', Mark: LearnMark, exact: false },
    { label: 'Create', path: '/create', Mark: CreateMark, exact: false },
    { label: 'Market', path: '/market', Mark: MarketMark, exact: false },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-30 border-t-2 border-[var(--line)] bg-[var(--card-bg)] shadow-[0_-4px_0_var(--shadow-color)]"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="grid grid-cols-5 divide-x-2 divide-[var(--line)]">
        {items.map((item) => {
          const Mark = item.Mark;
          const isActive = item.exact
            ? location.pathname === item.path || location.pathname === '/'
            : location.pathname.startsWith(item.path);

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center py-2 px-1 text-center transition-colors ${
                isActive
                  ? 'bg-[var(--ink)] text-[var(--bg)] font-bold'
                  : 'text-[var(--ink)] hover:bg-[var(--elec)] hover:text-[#171717]'
              } focus-visible:outline-2 focus-visible:outline-[var(--ox)]`}
            >
              <Mark className="w-4 h-4 shrink-0" />
              <span className="text-[10px] font-mono mt-1 tracking-tight truncate w-full block">
                {item.label}
              </span>
            </NavLink>
          );
        })}

        {/* 5th Destination: More (Manage, Analyze & Grow, Utilities) */}
        <button
          type="button"
          onClick={onOpenMore}
          aria-label="Open More destinations"
          className={`flex flex-col items-center justify-center py-2 px-1 text-center transition-colors cursor-pointer ${
            isMoreActive
              ? 'bg-[var(--ink)] text-[var(--bg)] font-bold'
              : 'text-[var(--ink)] hover:bg-[var(--elec)] hover:text-[#171717]'
          } focus-visible:outline-2 focus-visible:outline-[var(--ox)]`}
        >
          <MoreHorizontal className="w-4 h-4 shrink-0" />
          <span className="text-[10px] font-mono mt-1 tracking-tight truncate w-full block">
            More
          </span>
        </button>
      </div>
    </nav>
  );
};

export default BottomBar;
