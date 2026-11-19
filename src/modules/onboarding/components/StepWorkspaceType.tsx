import React from 'react';
import { WorkspaceType } from '../../../types';
import { Check } from 'lucide-react';

interface StepWorkspaceTypeProps {
  selectedTypes: WorkspaceType[];
  onToggleType: (type: WorkspaceType) => void;
}

const WORKSPACE_TYPES: Array<{ id: WorkspaceType; label: string; desc: string }> = [
  { id: 'student', label: 'Student', desc: 'Learning design and creative foundations' },
  { id: 'beginner', label: 'Beginner', desc: 'Exploring skills from scratch without corporate baggage' },
  { id: 'freelancer', label: 'Freelancer', desc: 'Direct client commissions, scopes, and deliveries' },
  { id: 'independent creator', label: 'Independent Creator', desc: 'Running self-directed drops, prints, and products' },
  { id: 'professional', label: 'Professional', desc: 'Senior in-house designer or marketing operator' },
  { id: 'business', label: 'Business', desc: 'Brand founder or small direct-to-consumer venture' },
  { id: 'agency', label: 'Agency', desc: 'Small creative studio managing multi-client accounts' },
];

export const StepWorkspaceType: React.FC<StepWorkspaceTypeProps> = ({
  selectedTypes,
  onToggleType,
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="font-display font-extrabold text-2xl text-[var(--ink)]">
          How do you work?
        </h2>
        <p className="text-sm opacity-80 font-sans">
          MOTIF rejects rigid SaaS categories. Select any combination that describes you, or leave blank to skip.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {WORKSPACE_TYPES.map((item) => {
          const isSelected = selectedTypes.includes(item.id);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onToggleType(item.id)}
              className={`p-3.5 text-left border-2 transition-all cursor-pointer flex items-start justify-between gap-3 ${
                isSelected
                  ? 'border-[var(--line)] bg-[var(--ink)] text-[var(--bg)] shadow-hard-sm'
                  : 'border-[var(--line)] bg-[var(--card-bg)] text-[var(--ink)] hover:bg-[var(--card-subtle)]'
              }`}
            >
              <div>
                <span className="font-display font-bold text-base block leading-tight capitalize">
                  {item.label}
                </span>
                <span className="text-xs opacity-75 mt-1 block font-mono">
                  {item.desc}
                </span>
              </div>
              <div
                className={`w-5 h-5 border-2 border-[var(--line)] shrink-0 flex items-center justify-center mt-0.5 ${
                  isSelected ? 'bg-[var(--acid)] text-[#171717]' : 'bg-[var(--card-bg)]'
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5" />}
              </div>
            </button>
          );
        })}
      </div>

      <div className="p-3 border border-[var(--line)] bg-[var(--card-subtle)] text-xs font-mono opacity-80">
        💡 Multi-select enabled: creators often wear multiple hats. You are not locked into one identity.
      </div>
    </div>
  );
};

export default StepWorkspaceType;

