import React from 'react';
import { Chip } from '../../../components/ui';
import { Check } from 'lucide-react';

interface StepInterestsProps {
  selectedInterests: string[];
  onToggleInterest: (interest: string) => void;
}

const DEFAULT_INTERESTS = [
  'branding',
  'graphic design',
  'UI/UX',
  'marketing',
  'editorial layout',
  'typography',
  'creative direction',
  'publishing & zines',
];

export const StepInterests: React.FC<StepInterestsProps> = ({
  selectedInterests,
  onToggleInterest,
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="font-display font-extrabold text-2xl text-[var(--ink)]">
          What disciplines call to you?
        </h2>
        <p className="text-sm opacity-80 font-sans">
          Select all that fit your practice. This tailors your Learn curriculum and Studio asset library.
        </p>
      </div>

      <div className="space-y-3">
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--ink)] block">
          Creative Disciplines (Multi-select)
        </span>
        <div className="flex flex-wrap gap-2.5">
          {DEFAULT_INTERESTS.map((item) => {
            const isSelected = selectedInterests.includes(item);
            return (
              <Chip
                key={item}
                clickable
                selected={isSelected}
                onClick={() => onToggleInterest(item)}
                className={`py-2 px-3 text-xs sm:text-sm font-bold uppercase ${
                  isSelected
                    ? 'bg-[var(--ink)] text-[var(--bg)] shadow-hard-sm'
                    : 'hover:bg-[var(--elec)] hover:text-[#171717]'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  {isSelected && <Check className="w-3.5 h-3.5 text-[var(--acid)]" />}
                  <span>{item}</span>
                </div>
              </Chip>
            );
          })}
        </div>
      </div>

      <p className="font-mono text-xs opacity-70">
        You can always explore other departments and disciplines anytime without locking your workspace.
      </p>
    </div>
  );
};

export default StepInterests;

