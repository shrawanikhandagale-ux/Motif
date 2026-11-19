import React, { useEffect } from 'react';
import { X, Sparkles, Lock, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Skill } from '../../../types';
import { Badge, Button } from '../../../components/ui';

interface SkillDetailDrawerProps {
  skill: Skill | null;
  isOpen: boolean;
  onClose: () => void;
  isUnlocked: boolean;
  onToggleUnlock?: (skillId: string) => void;
}

export const SkillDetailDrawer: React.FC<SkillDetailDrawerProps> = ({
  skill,
  isOpen,
  onClose,
  isUnlocked,
  onToggleUnlock,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !skill) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Skill details: ${skill.name}`}
      className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md h-full bg-[var(--bg)] border-l-2 border-[var(--line)] shadow-hard p-6 flex flex-col justify-between overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b-2 border-[var(--line)]">
            <div className="flex items-center gap-2">
              <Badge variant="oxblood">{skill.domain}</Badge>
              <Badge variant="default" className="capitalize">{skill.level}</Badge>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close panel"
              className="p-1.5 border-2 border-[var(--line)] bg-[var(--card-bg)] hover:bg-[var(--line)]/10 text-[var(--ink)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--ox)]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Title & Code */}
          <div className="space-y-1">
            <span className="font-mono text-xs opacity-75 uppercase tracking-wider">{skill.id}</span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[var(--ink)] leading-tight">
              {skill.name}
            </h2>
          </div>

          {/* Status Badge */}
          <div
            className={`p-3 border-2 border-[var(--line)] flex items-center justify-between gap-3 ${
              isUnlocked ? 'bg-[var(--acid)] text-[#171717]' : 'bg-[var(--card-bg)] text-[var(--ink)] opacity-80'
            }`}
          >
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider">
              {isUnlocked ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-[var(--ox)]" />
                  <span>Node Illuminated</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-stone-500" />
                  <span>Node Locked</span>
                </>
              )}
            </div>
            {onToggleUnlock && (
              <button
                type="button"
                onClick={() => onToggleUnlock(skill.id)}
                className="font-mono text-xs font-bold underline hover:opacity-80"
              >
                {isUnlocked ? 'Mark Locked' : 'Illuminate'}
              </button>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="font-mono text-xs uppercase tracking-wider opacity-75 font-bold">Curriculum Context</h3>
            <p className="font-sans text-sm sm:text-base leading-relaxed text-[var(--ink)] opacity-90">
              {skill.description}
            </p>
          </div>

          {/* Domain Knowledge */}
          <div className="p-4 border-2 border-[var(--line)] bg-[var(--card-subtle)] space-y-2">
            <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-[var(--ox)]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Studio Handoff Principle</span>
            </div>
            <p className="text-xs text-[var(--ink)] opacity-80 leading-normal">
              Acquiring “{skill.name}” unlocks advanced production templates in Create and allows publishing unconstrained artifacts.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t-2 border-[var(--line)] space-y-3">
          <Link to="/learn/paths" className="block" onClick={onClose}>
            <Button variant="primary" size="md" className="w-full justify-center">
              <span>View Associated Curriculum</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
          <Link to="/learn/library" className="block" onClick={onClose}>
            <Button variant="secondary" size="sm" className="w-full justify-center">
              <span>Explore Reference Library</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SkillDetailDrawer;

