import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { DepartmentNav } from './DepartmentNav';

export const Shell: React.FC = () => {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--ink)] transition-colors selection:bg-[var(--acid)] selection:text-[#171717]">
      <Header />
      {!isLanding && <DepartmentNav />}

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 focus:outline-none">
        <Outlet />
      </main>

      <footer className="border-t-ink py-6 px-4 sm:px-6 bg-[var(--bg)]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-[var(--ink)] opacity-85">
          <p>MOTIF · Built for the offscript · 5 Interconnected Departments</p>
          <p className="flex items-center gap-2">
            <span>Next up: LEARN</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--ox)]" />
            <span>Skill Map & Briefs</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

