import React from 'react';
import { Link } from 'react-router-dom';

export const LandingFooter: React.FC = () => {
  return (
    <footer className="bg-[var(--bg)] text-[var(--ink)] py-12 px-4 sm:px-8 font-mono text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b-2 border-[var(--line)] pb-8">
        <div>
          <span className="font-display font-extrabold text-2xl tracking-tight block">motif.</span>
          <span className="opacity-70 mt-1 block">Creative Business &amp; Marketing OS · Built for the offscript</span>
        </div>

        <div className="flex flex-wrap gap-6 font-bold uppercase tracking-wider">
          <Link to="/learn" className="hover:text-[var(--ox)] transition-colors">Learn</Link>
          <Link to="/create" className="hover:text-[var(--ox)] transition-colors">Create</Link>
          <Link to="/market" className="hover:text-[var(--ox)] transition-colors">Market</Link>
          <Link to="/manage" className="hover:text-[var(--ox)] transition-colors">Manage</Link>
          <Link to="/analyze" className="hover:text-[var(--ox)] transition-colors">Analyze</Link>
          <Link to="/dev/tokens" className="hover:text-[var(--ox)] transition-colors opacity-75">Tokens</Link>
          <Link to="/dev/components" className="hover:text-[var(--ox)] transition-colors opacity-75">Components</Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 opacity-75 text-[11px]">
        <p>© 2026 MOTIF Ecosystem. All records interconnected.</p>
        <p>Next up: LEARN. Paths, briefs and the Skill Map.</p>
      </div>
    </footer>
  );
};

export default LandingFooter;

