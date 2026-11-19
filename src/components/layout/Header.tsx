import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Sparkles } from 'lucide-react';
import { useTheme } from '../../app/providers/ThemeProvider';

export const Header: React.FC = () => {
  const { resolvedTheme, toggleTheme } = useTheme();
  const location = useLocation();
  const isLanding = location.pathname === '/';

  return (
    <header className="border-b-ink py-4 px-4 sm:px-6 bg-[var(--bg)] transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Brand */}
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight text-[var(--ink)] hover:opacity-85 focus-visible:outline-2 focus-visible:outline-[var(--ox)]"
          >
            motif.
          </Link>
          <span className="hidden md:inline-block font-mono text-xs px-2.5 py-0.5 border border-[var(--line)] bg-[var(--card-bg)] text-[var(--ink)]">
            Built for the offscript
          </span>
        </div>

        {/* Right: Controls & Workspace */}
        <div className="flex items-center gap-3">
          {!isLanding && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 border border-[var(--line)] bg-[var(--card-bg)] font-mono text-xs text-[var(--ink)]">
              <span className="w-2 h-2 rounded-full bg-[var(--acid)] border border-[var(--line)] animate-pulse" />
              <span>Offscript Studio</span>
            </div>
          )}

          <Link
            to={isLanding ? '/learn' : '/'}
            className="px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-wider border-2 border-[var(--line)] bg-[var(--card-bg)] text-[var(--ink)] hover:bg-[var(--elec)] transition-colors inline-flex items-center gap-1.5 shadow-hard-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[var(--ox)]" />
            <span>{isLanding ? 'Open Workspace' : 'Overview'}</span>
          </Link>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle color theme"
            className="p-2 border-2 border-[var(--line)] bg-[var(--card-bg)] text-[var(--ink)] hover:bg-[var(--acid)] transition-colors cursor-pointer shadow-hard-sm focus-visible:outline-2 focus-visible:outline-[var(--ox)]"
          >
            {resolvedTheme === 'dark' ? (
              <Sun className="w-4 h-4 text-[#F1EBDD]" />
            ) : (
              <Moon className="w-4 h-4 text-[#171717]" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

