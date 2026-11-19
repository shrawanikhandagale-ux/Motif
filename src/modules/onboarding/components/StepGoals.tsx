import React, { useState } from 'react';
import { Check, Plus } from 'lucide-react';
import { Input, Button } from '../../../components/ui';

interface StepGoalsProps {
  selectedGoals: string[];
  onToggleGoal: (goal: string) => void;
  onAddCustomGoal: (goal: string) => void;
}

const PRESET_GOALS = [
  'Launch an independent brand or studio',
  'Publish an editorial zine or print drop',
  'Take on high-value freelance clients',
  'Master rebellious, anti-template design systems',
  'Build an organic audience without paid ads',
  'Organize business operations and client ledgers',
];

export const StepGoals: React.FC<StepGoalsProps> = ({
  selectedGoals,
  onToggleGoal,
  onAddCustomGoal,
}) => {
  const [customGoal, setCustomGoal] = useState('');

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (customGoal.trim() && !selectedGoals.includes(customGoal.trim())) {
      onAddCustomGoal(customGoal.trim());
      setCustomGoal('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="font-display font-extrabold text-2xl text-[var(--ink)]">
          What are your immediate goals?
        </h2>
        <p className="text-sm opacity-80 font-sans">
          Select what you want to accomplish first. MOTIF configures briefs and project templates around these.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {PRESET_GOALS.map((goal) => {
          const isSelected = selectedGoals.includes(goal);
          return (
            <button
              key={goal}
              type="button"
              onClick={() => onToggleGoal(goal)}
              className={`p-3.5 text-left border-2 transition-all cursor-pointer flex items-start justify-between gap-3 ${
                isSelected
                  ? 'border-[var(--line)] bg-[var(--ink)] text-[var(--bg)] shadow-hard-sm'
                  : 'border-[var(--line)] bg-[var(--card-bg)] text-[var(--ink)] hover:bg-[var(--card-subtle)]'
              }`}
            >
              <span className="text-sm font-sans font-medium leading-snug">{goal}</span>
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

      {/* Optional custom goal */}
      <form onSubmit={handleAddCustom} className="flex gap-2">
        <Input
          placeholder="Add custom creative goal…"
          value={customGoal}
          onChange={(e) => setCustomGoal(e.target.value)}
        />
        <Button type="submit" variant="secondary" size="md" className="shrink-0" disabled={!customGoal.trim()}>
          <Plus className="w-4 h-4 mr-1" />
          <span>Add</span>
        </Button>
      </form>
    </div>
  );
};

export default StepGoals;

