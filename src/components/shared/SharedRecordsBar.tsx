import React from 'react';
import { SHARED_RECORD_TYPES } from '../../constants';

interface SharedRecordsBarProps {
  activeType?: string;
  onSelectType?: (type: string) => void;
  className?: string;
}

export const SharedRecordsBar: React.FC<SharedRecordsBarProps> = ({
  activeType,
  onSelectType,
  className = '',
}) => {
  return (
    <div className={`mt-6 ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-display font-extrabold text-sm uppercase tracking-wider text-[var(--ink)]">
          Shared Records (Interconnected)
        </h4>
        <span className="font-mono text-xs opacity-75 text-[var(--ink)]">
          One account · Zero retyping
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
        {SHARED_RECORD_TYPES.map((name, idx) => {
          const isSelected = activeType === name;
          const isHighlight = idx % 3 === 0;

          return (
            <button
              key={name}
              type="button"
              onClick={() => onSelectType?.(name)}
              className={`p-2.5 text-center text-xs font-bold border-2 border-[var(--line)] transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[var(--ink)] text-[var(--bg)] shadow-hard-sm'
                  : isHighlight
                  ? 'bg-[var(--elec)] text-[#171717] hover:bg-[var(--acid)]'
                  : 'bg-[var(--card-bg)] text-[var(--ink)] hover:bg-[var(--card-subtle)]'
              }`}
            >
              {name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

