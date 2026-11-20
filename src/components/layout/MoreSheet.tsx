import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { X, Search, Settings, ShieldCheck, ArrowRight } from 'lucide-react';
import { ManageMark, AnalyzeMark } from '../shared/LinocutMarks';

interface MoreSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch?: () => void;
}

export const MoreSheet: React.FC<MoreSheetProps> = ({ isOpen, onClose, onOpenSearch }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="More Destinations"
      className="fixed inset-0 z-50 flex flex-col justify-end md:hidden animate-in fade-in"
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />

      {/* Sheet Container */}
      <div
        className="relative w-full bg-[var(--card-bg)] text-[var(--ink)] border-t-2 border-[var(--line)] shadow-hard-lg p-5 space-y-4 z-10 max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b-2 border-[var(--line)]">
          <div className="flex items-center gap-2">
            <span className="font-display font-extrabold text-lg uppercase tracking-tight">More Workspaces</span>
            <span className="font-mono text-[10px] px-1.5 py-0.5 border border-[var(--line)] bg-[var(--card-subtle)] font-bold">
              MOTIF OS
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close sheet"
            className="p-1 border-2 border-[var(--line)] bg-[var(--bg)] hover:bg-[var(--line)]/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Primary destinations in More: Manage & Analyze */}
        <div className="space-y-2">
          <NavLink
            to="/manage"
            onClick={onClose}
            className="flex items-center justify-between p-3.5 border-2 border-[var(--line)] bg-[var(--bg)] hover:bg-[var(--card-subtle)] transition-colors shadow-hard-sm"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 border border-[var(--line)] bg-[var(--ink)] text-[var(--bg)]">
                <ManageMark className="w-4 h-4" />
              </div>
              <div>
                <span className="font-display font-bold text-sm block">Manage</span>
                <span className="font-mono text-[10px] opacity-75">Client rosters, retainers &amp; deliverable board</span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 opacity-60" />
          </NavLink>

          <NavLink
            to="/analyze"
            onClick={onClose}
            className="flex items-center justify-between p-3.5 border-2 border-[var(--line)] bg-[var(--bg)] hover:bg-[var(--card-subtle)] transition-colors shadow-hard-sm"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 border border-[var(--line)] bg-[#477C75] text-[#F1EBDD]">
                <AnalyzeMark className="w-4 h-4" />
              </div>
              <div>
                <span className="font-display font-bold text-sm block">Analyze &amp; Grow</span>
                <span className="font-mono text-[10px] opacity-75">Campaign diagnostics &amp; loopback recommendations</span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 opacity-60" />
          </NavLink>
        </div>

        {/* Utilities */}
        <div className="pt-2 border-t border-[var(--line)]/20 grid grid-cols-2 gap-2 font-mono text-xs">
          <button
            type="button"
            onClick={() => { onClose(); onOpenSearch?.(); }}
            className="flex items-center gap-2 p-2.5 border-2 border-[var(--line)] bg-[var(--card-subtle)] hover:bg-[var(--bg)]"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search ⌘K</span>
          </button>

          <a
            href="#settings"
            onClick={onClose}
            className="flex items-center gap-2 p-2.5 border-2 border-[var(--line)] bg-[var(--card-subtle)] hover:bg-[var(--bg)]"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Settings</span>
          </a>
        </div>

        <div className="flex items-center justify-between pt-1 font-mono text-[10px] opacity-60">
          <span>MOTIF Studio OS · v2.0</span>
          <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-[var(--ox)]" /> Zero-loss sync</span>
        </div>
      </div>
    </div>
  );
};

export default MoreSheet;

