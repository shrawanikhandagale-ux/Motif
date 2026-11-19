import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Menu, Sun, Moon, Search, Bell } from 'lucide-react';
import { useTheme } from '../../app/providers/ThemeProvider';

interface TopBarProps {
  onToggleMobileMenu: () => void;
  onOpenSearch?: () => void;
}

const ROUTE_LABELS: Record<string, { title: string; kicker: string }> = {
  '/': { title: 'Overview', kicker: 'Creative OS' },
  '/home': { title: 'Workspace Home', kicker: 'Overview · Dashboard' },
  '/learn': { title: 'Learn', kicker: 'Department 01 · The Academy' },
  '/create': { title: 'Create', kicker: 'Department 02 · The Studio' },
  '/market': { title: 'Market', kicker: 'Department 03 · The Hub' },
  '/manage': { title: 'Manage', kicker: 'Department 04 · The Workspace' },
  '/analyze': { title: 'Analyze & Grow', kicker: 'Department 05 · The Engine' },
  '/dev/tokens': { title: 'Tokens Specimen', kicker: 'Developer Environment' },
  '/dev/components': { title: 'UI Components', kicker: 'Developer Environment' },
};

export const TopBar: React.FC<TopBarProps> = ({
  onToggleMobileMenu,
  onOpenSearch,
}) => {
  const { resolvedTheme, toggleTheme } = useTheme();
  const location = useLocation();
  const currentMeta = ROUTE_LABELS[location.pathname] || { title: 'MOTIF', kicker: 'Creative OS' };

  return (
    <header className="border-b-2 border-[var(--line)] bg-[var(--bg)] px-4 sm:px-6 py-3 shrink-0 flex items-center justify-between gap-4 sticky top-0 z-20">
      {/* Left: Mobile Menu Trigger + Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleMobileMenu}
          aria-label="Open navigation menu"
          className="md:hidden p-2 border-2 border-[var(--line)] bg-[var(--card-bg)] text-[var(--ink)] hover:bg-[var(--acid)] transition-colors cursor-pointer shadow-hard-sm focus-visible:outline-2 focus-visible:outline-[var(--ox)]"
        >
          <Menu className="w-5 h-5" />
        </button>

        <Link to="/" className="md:hidden font-display font-extrabold text-2xl tracking-tight text-[var(--ink)]">
          motif.
        </Link>

        <div className="hidden sm:block">
          <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-[var(--ox)] block">
            {currentMeta.kicker}
          </span>
          <h2 className="font-display font-extrabold text-lg text-[var(--ink)] leading-tight">
            {currentMeta.title}
          </h2>
        </div>
      </div>

      {/* Right: Quick Actions & Controls */}
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={onOpenSearch}
          className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 border-2 border-[var(--line)] bg-[var(--card-bg)] text-[var(--ink)] font-mono text-xs hover:bg-[var(--card-subtle)] transition-colors cursor-pointer shadow-hard-sm focus-visible:outline-2 focus-visible:outline-[var(--ox)]"
        >
          <Search className="w-3.5 h-3.5 opacity-70" />
          <span className="opacity-75">Quick find…</span>
          <kbd className="text-[10px] px-1 bg-[var(--card-subtle)] border border-[var(--line)]">⌘K</kbd>
        </button>

        <button
          type="button"
          aria-label="Notifications"
          className="p-2 border-2 border-[var(--line)] bg-[var(--card-bg)] text-[var(--ink)] hover:bg-[var(--acid)] transition-colors cursor-pointer shadow-hard-sm relative focus-visible:outline-2 focus-visible:outline-[var(--ox)]"
        >
          <Bell className="w-4 h-4" />
          <span className="w-2 h-2 rounded-full bg-[var(--ox)] border border-[var(--line)] absolute top-1 right-1" />
        </button>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="p-2 border-2 border-[var(--line)] bg-[var(--card-bg)] text-[var(--ink)] hover:bg-[var(--acid)] hover:text-[#171717] transition-colors cursor-pointer shadow-hard-sm focus-visible:outline-2 focus-visible:outline-[var(--ox)]"
        >
          {resolvedTheme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        <div className="hidden lg:flex items-center gap-2 pl-2 border-l-2 border-[var(--line)]">
          <div className="w-8 h-8 border-2 border-[var(--line)] bg-[var(--acid)] text-[#171717] font-display font-extrabold flex items-center justify-center text-xs shadow-hard-sm select-none">
            OF
          </div>
          <div className="font-mono text-xs text-[var(--ink)] leading-tight">
            <span className="font-bold block">@studio</span>
            <span className="opacity-60 text-[10px]">Offscript OS</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;

