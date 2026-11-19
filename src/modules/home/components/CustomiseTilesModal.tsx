import React, { useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { Button } from '../../../components/ui';
import { DashboardTilesConfig } from '../../../types';

interface CustomiseTilesModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: DashboardTilesConfig;
  onToggleTile: (key: keyof DashboardTilesConfig) => void;
  onReset: () => void;
}

const TILE_OPTIONS: Array<{ key: keyof DashboardTilesConfig; label: string; desc: string }> = [
  { key: 'departmentsStrip', label: 'Five Departments Strip', desc: 'Direct access & telemetry for all 5 departments' },
  { key: 'continueLearning', label: 'Continue Learning Tile', desc: 'Active curriculum path, modules, and progress bar' },
  { key: 'upcomingTasks', label: 'Upcoming Tasks (Tickable)', desc: 'Interactive checklist of pending deliverables' },
  { key: 'recentProjects', label: 'Recent Projects Tile', desc: 'Studio project records, status pills, and client tags' },
  { key: 'skillMap', label: 'Skill Map Preview Tile', desc: 'Visual creative competency and radar metrics' },
];

export const CustomiseTilesModal: React.FC<CustomiseTilesModalProps> = ({
  isOpen,
  onClose,
  config,
  onToggleTile,
  onReset,
}) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div role="dialog" aria-modal="true" aria-label="Customise Dashboard" className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-[var(--card-bg)] text-[var(--ink)] border-2 border-[var(--line)] shadow-hard-lg z-10 p-6 space-y-6">
        <div className="flex items-center justify-between border-b-2 border-[var(--line)] pb-4">
          <div>
            <span className="font-mono text-xs text-[var(--ox)] uppercase font-bold tracking-wider block">
              Layout Preferences
            </span>
            <h2 className="font-display font-extrabold text-2xl text-[var(--ink)] leading-tight">
              Customise Dashboard
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1.5 border-2 border-[var(--line)] bg-[var(--bg)] hover:bg-[var(--acid)] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs font-mono opacity-80">
          Toggle tiles on or off. Changes persist across sessions in local storage.
        </p>

        <div className="space-y-3">
          {TILE_OPTIONS.map((opt) => {
            const isVisible = config[opt.key];
            return (
              <button
                key={opt.key}
                type="button"
                onClick={() => onToggleTile(opt.key)}
                className={`w-full p-3.5 border-2 border-[var(--line)] text-left flex items-start justify-between gap-3 transition-colors cursor-pointer ${
                  isVisible ? 'bg-[var(--bg)] shadow-hard-sm' : 'bg-[var(--card-subtle)] opacity-50'
                }`}
              >
                <div>
                  <span className="font-display font-bold text-sm block">{opt.label}</span>
                  <span className="font-mono text-xs opacity-75 mt-0.5 block">{opt.desc}</span>
                </div>
                <div
                  className={`w-5 h-5 border-2 border-[var(--line)] shrink-0 flex items-center justify-center mt-0.5 ${
                    isVisible ? 'bg-[var(--acid)] text-[#171717]' : 'bg-[var(--card-bg)]'
                  }`}
                >
                  {isVisible && <Check className="w-3.5 h-3.5" />}
                </div>
              </button>
            );
          })}
        </div>

        <div className="pt-4 border-t-2 border-[var(--line)] flex items-center justify-between gap-3">
          <Button variant="ghost" size="sm" onClick={onReset} className="font-mono text-xs">
            Reset to Default
          </Button>
          <Button variant="primary" size="md" onClick={onClose} className="font-bold">
            Save &amp; Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomiseTilesModal;
