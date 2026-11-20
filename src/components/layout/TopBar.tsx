import React from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, Search, Bell } from 'lucide-react';
import { useTheme } from '../../app/providers/ThemeProvider';

interface TopBarProps {
  onOpenSearch?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onOpenSearch }) => {
  const { resolvedTheme, toggleTheme } = useTheme();

  return (
    <header className="border-b-2 border-[var(--line)] bg-[var(--bg)] px-4 sm:px-6 py-2.5 shrink-0 flex items-center justify-between gap-4 sticky top-0 z-20 select-none">
      {/* Left: Mobile brand mark (desktop is in sidebar) */}
      <div className="flex items-center gap-3">
        <Link
          to="/"
          className="md:hidden font-display font-extrabold text-2xl tracking-tighter text-[var(--ink)]"
        >
          motif.
        </Link>
        <span className="hidden md:inline font-mono text-[10px] uppercase font-bold tracking-wider opacity-60">
          Studio Workstation
        </span>
      </div>

      {/* Right: Minimal utility controls (Search, Updates, Theme, Profile) */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onOpenSearch}
          className="flex items-center gap-2 px-3 py-1.5 border-2 border-[var(--line)] bg-[var(--card-bg)] text-[var(--ink)] font-mono text-xs hover:bg-[var(--card-subtle)] transition-colors cursor-pointer shadow-hard-sm"
          title="Quick search (⌘K)"
        >
          <Search className="w-3.5 h-3.5 opacity-70" />
          <span className="hidden sm:inline opacity-75">Search…</span>
          <kbd className="text-[10px] px-1 bg-[var(--card-subtle)] border border-[var(--line)]">⌘K</kbd>
        </button>

        <a
          href="#notifications"
          aria-label="Notifications"
          className="p-1.5 sm:p-2 border-2 border-[var(--line)] bg-[var(--card-bg)] text-[var(--ink)] hover:bg-[var(--acid)] transition-colors cursor-pointer shadow-hard-sm relative flex items-center justify-center"
        >
          <Bell className="w-4 h-4" />
          <span className="w-2 h-2 rounded-full bg-[var(--ox)] border border-[var(--line)] absolute top-1 right-1" />
        </a>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="p-1.5 sm:p-2 border-2 border-[var(--line)] bg-[var(--card-bg)] text-[var(--ink)] hover:bg-[var(--acid)] hover:text-[#171717] transition-colors cursor-pointer shadow-hard-sm flex items-center justify-center"
        >
          {resolvedTheme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        <div className="flex items-center gap-2 pl-2 border-l-2 border-[var(--line)]">
          <div className="w-7 h-7 sm:w-8 sm:h-8 border-2 border-[var(--line)] bg-[var(--acid)] text-[#171717] font-display font-extrabold flex items-center justify-center text-xs shadow-hard-sm select-none">
            OF
          </div>
          <div className="hidden sm:block font-mono text-xs text-[var(--ink)] leading-tight">
            <span className="font-bold block text-[11px]">@studio</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
