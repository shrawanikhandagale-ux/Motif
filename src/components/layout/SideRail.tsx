import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import {
  HomeMark,
  LearnMark,
  CreateMark,
  MarketMark,
  ManageMark,
  AnalyzeMark,
} from '../shared/LinocutMarks';
import { Search, Bell, Settings } from 'lucide-react';

interface SideRailProps {
  onOpenSearch?: () => void;
}

const DEPARTMENTS = [
  {
    id: 'home',
    label: 'Home',
    path: '/home',
    mark: HomeMark,
    accentBg: 'bg-[var(--ink)] text-[var(--bg)]',
    markerBorder: 'border-l-[var(--line)]',
  },
  {
    id: 'learn',
    label: 'Learn',
    path: '/learn',
    mark: LearnMark,
    accentBg: 'bg-[var(--acid)] text-[#171717]',
    markerBorder: 'border-l-[var(--acid)]',
  },
  {
    id: 'create',
    label: 'Create',
    path: '/create',
    mark: CreateMark,
    accentBg: 'bg-[var(--ox)] text-[#F1EBDD]',
    markerBorder: 'border-l-[var(--ox)]',
  },
  {
    id: 'market',
    label: 'Market',
    path: '/market',
    mark: MarketMark,
    accentBg: 'bg-[var(--elec)] text-[#171717]',
    markerBorder: 'border-l-[var(--elec)]',
  },
  {
    id: 'manage',
    label: 'Manage',
    path: '/manage',
    mark: ManageMark,
    accentBg: 'bg-[var(--ink)] text-[#F1EBDD]',
    markerBorder: 'border-l-[var(--line)]',
  },
  {
    id: 'analyze',
    label: 'Analyze & Grow',
    path: '/analyze',
    mark: AnalyzeMark,
    accentBg: 'bg-[#477C75] text-[#F1EBDD]',
    markerBorder: 'border-l-[#477C75]',
  },
];

export const SideRail: React.FC<SideRailProps> = ({ onOpenSearch }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/home' || location.pathname === '/';

  return (
    <aside
      aria-label="Desktop Navigation"
      className="hidden md:flex flex-col w-[200px] border-r-2 border-[var(--line)] bg-[var(--card-bg)] shrink-0 h-screen sticky top-0 select-none z-30"
    >
      {/* Brand Header */}
      <div className="p-4 border-b-2 border-[var(--line)]">
        <Link
          to="/"
          className="font-display font-extrabold text-2xl tracking-tighter block text-[var(--ink)] hover:opacity-85 focus-visible:outline-2 focus-visible:outline-[var(--ox)]"
        >
          motif.
        </Link>
        <span className="font-mono text-[9px] block text-[var(--ink)] opacity-70 mt-0.5 uppercase tracking-widest">
          Creative OS
        </span>
      </div>

      {/* Departments Navigation */}
      <nav className="flex-1 overflow-y-auto p-2 space-y-1.5" aria-label="Departments">
        {DEPARTMENTS.map((dept) => {
          const Mark = dept.mark;
          const isDeptActive =
            dept.path === '/home'
              ? isHomePage
              : location.pathname.startsWith(dept.path);

          // 1. On Home: all departments show as full accent-colour blocks
          if (isHomePage) {
            return (
              <NavLink
                key={dept.path}
                to={dept.path}
                className={`flex items-center gap-2.5 px-3 py-2.5 text-xs font-display font-bold border-2 border-[var(--line)] transition-all ${dept.accentBg} shadow-hard-sm hover:translate-x-0.5`}
              >
                <Mark className="w-4 h-4 shrink-0" />
                <span className="truncate">{dept.label}</span>
              </NavLink>
            );
          }

          // 2. Inside a department: neutral department rows with slim accent marker on selected department
          return (
            <NavLink
              key={dept.path}
              to={dept.path}
              className={`flex items-center gap-2.5 px-3 py-2 text-xs font-sans transition-all border-2 ${
                isDeptActive
                  ? `border-[var(--line)] ${dept.markerBorder} border-l-4 bg-[var(--card-subtle)] text-[var(--ink)] font-bold shadow-hard-sm`
                  : 'border-transparent text-[var(--ink)] opacity-85 hover:opacity-100 hover:border-[var(--line)] hover:bg-[var(--bg)]'
              } focus-visible:outline-2 focus-visible:outline-[var(--ox)]`}
            >
              <Mark className="w-4 h-4 shrink-0" />
              <span className="truncate">{dept.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Compact Secondary Utilities */}
      <div className="p-2 border-t-2 border-[var(--line)] bg-[var(--card-subtle)] space-y-1 text-xs font-mono">
        <button
          type="button"
          onClick={onOpenSearch}
          className="w-full flex items-center justify-between px-2.5 py-1.5 border border-transparent hover:border-[var(--line)] hover:bg-[var(--card-bg)] text-[var(--ink)] transition-colors cursor-pointer text-left"
          title="Quick find (⌘K)"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 opacity-70" />
            <span>Search</span>
          </div>
          <kbd className="text-[9px] px-1 bg-[var(--card-bg)] border border-[var(--line)]">⌘K</kbd>
        </button>

        <a
          href="#notifications"
          className="flex items-center justify-between px-2.5 py-1.5 border border-transparent hover:border-[var(--line)] hover:bg-[var(--card-bg)] text-[var(--ink)] transition-colors"
        >
          <div className="flex items-center gap-2">
            <Bell className="w-3.5 h-3.5 opacity-70" />
            <span>Updates</span>
          </div>
          <span className="w-2 h-2 rounded-full bg-[var(--ox)]" />
        </a>

        <a
          href="#settings"
          className="flex items-center gap-2 px-2.5 py-1.5 border border-transparent hover:border-[var(--line)] hover:bg-[var(--card-bg)] text-[var(--ink)] transition-colors"
        >
          <Settings className="w-3.5 h-3.5 opacity-70" />
          <span>Settings</span>
        </a>
      </div>
    </aside>
  );
};

export default SideRail;
