import React from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, ArrowRight } from 'lucide-react';
import { useTheme } from '../../../app/providers/ThemeProvider';

export const LandingHeader: React.FC = () => {
  const { resolvedTheme, toggleTheme } = useTheme();

  return (
    <header className="border-b-2 border-[var(--line)] bg-[var(--bg)] py-4 px-4 sm:px-8 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="font-display font-extrabold text-3xl tracking-tight text-[var(--ink)] hover:opacity-85 focus-visible:outline-2 focus-visible:outline-[var(--ox)]"
          >
            motif.
          </Link>
          <span className="hidden sm:inline-block font-mono text-xs px-2 py-0.5 border border-[var(--line)] bg-[var(--card-bg)] text-[var(--ink)]">
            v0.1 · prototype
          </span>
        </div>

        <nav aria-label="Landing Navigation" className="hidden md:flex items-center gap-6 font-mono text-xs uppercase font-bold tracking-wider">
          <a href="#what-is-motif" className="hover:text-[var(--ox)] transition-colors">What is MOTIF</a>
          <a href="#ecosystem" className="hover:text-[var(--ox)] transition-colors">Ecosystem</a>
          <a href="#showcase" className="hover:text-[var(--ox)] transition-colors">Community</a>
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 border-2 border-[var(--line)] bg-[var(--card-bg)] text-[var(--ink)] hover:bg-[var(--acid)] hover:text-[#171717] transition-colors cursor-pointer shadow-hard-sm focus-visible:outline-2 focus-visible:outline-[var(--ox)]"
          >
            {resolvedTheme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <Link
            to="/onboarding"
            className="inline-flex items-center gap-1.5 px-4 py-2 border-2 border-[#171717] bg-[var(--acid)] text-[#171717] font-display font-extrabold text-xs sm:text-sm uppercase tracking-tight shadow-hard hover:-translate-x-0.5 hover:-translate-y-0.5 transition-transform"
          >
            <span>Join MOTIF</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;

