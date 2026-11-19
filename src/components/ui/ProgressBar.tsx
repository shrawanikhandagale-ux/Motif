import React from 'react';

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  variant?: 'oxblood' | 'acid' | 'ink' | 'electric';
  size?: 'sm' | 'md' | 'lg';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  showValue = false,
  variant = 'oxblood',
  size = 'md',
  className = '',
  ...props
}) => {
  const percentage = Math.min(Math.max(Math.round((value / max) * 100), 0), 100);

  const sizeStyles = {
    sm: 'h-3',
    md: 'h-5',
    lg: 'h-7',
  };

  const dotPatterns = {
    oxblood: 'bg-[radial-gradient(circle,var(--ox)_38%,transparent_40%)] bg-[length:12px_12px] bg-[var(--card-bg)]',
    acid: 'bg-[radial-gradient(circle,#171717_38%,transparent_40%)] bg-[length:12px_12px] bg-[var(--acid)]',
    ink: 'bg-[radial-gradient(circle,var(--line)_38%,transparent_40%)] bg-[length:12px_12px] bg-[var(--card-bg)]',
    electric: 'bg-[radial-gradient(circle,#171717_38%,transparent_40%)] bg-[length:12px_12px] bg-[var(--elec)]',
  };

  return (
    <div className={`w-full space-y-1.5 font-mono ${className}`} {...props}>
      {(label || showValue) && (
        <div className="flex justify-between text-xs text-[var(--ink)] font-bold">
          {label && <span>{label}</span>}
          {showValue && <span className="opacity-80">{percentage}%</span>}
        </div>
      )}

      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label || 'Progress'}
        className={`w-full border-2 border-[var(--line)] bg-[var(--card-subtle)] ${sizeStyles[size]} relative overflow-hidden`}
      >
        <div
          className={`h-full border-r-2 border-[var(--line)] transition-all duration-300 ${dotPatterns[variant]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;

