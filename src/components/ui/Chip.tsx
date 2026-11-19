import React from 'react';
import { X } from 'lucide-react';

export interface ChipProps extends React.HTMLAttributes<HTMLSpanElement | HTMLButtonElement> {
  variant?: 'default' | 'acid' | 'oxblood' | 'electric' | 'ink';
  selected?: boolean;
  clickable?: boolean;
  onRemove?: () => void;
  children: React.ReactNode;
}

export const Chip: React.FC<ChipProps> = ({
  variant = 'default',
  selected = false,
  clickable = false,
  onRemove,
  className = '',
  children,
  onClick,
  ...props
}) => {
  const isActionable = clickable || !!onClick;

  const variantStyles = {
    default: 'bg-[var(--card-bg)] text-[var(--ink)] border-[var(--line)]',
    acid: 'bg-[var(--acid)] text-[#171717] border-[#171717]',
    oxblood: 'bg-[var(--ox)] text-[#F1EBDD] border-[var(--line)]',
    electric: 'bg-[var(--elec)] text-[#171717] border-[#171717]',
    ink: 'bg-[var(--ink)] text-[var(--bg)] border-[var(--line)]',
  };

  const selectedStyles = selected
    ? 'bg-[var(--ink)] text-[var(--bg)] border-[var(--line)] shadow-hard-sm'
    : variantStyles[variant];

  const interactiveStyles = isActionable
    ? 'cursor-pointer hover:bg-[var(--acid)] hover:text-[#171717] hover:border-[#171717] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--ox)] focus-visible:outline-offset-1'
    : '';

  const Component = isActionable ? 'button' : 'span';

  return (
    <Component
      type={isActionable ? 'button' : undefined}
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-medium border-2 ${selectedStyles} ${interactiveStyles} ${className}`}
      {...props}
    >
      <span>{children}</span>
      {onRemove && (
        <span
          role="button"
          tabIndex={0}
          aria-label="Remove chip"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              e.stopPropagation();
              onRemove();
            }
          }}
          className="hover:opacity-75 focus-visible:outline-1 focus-visible:outline-[var(--ox)] cursor-pointer ml-0.5"
        >
          <X className="w-3 h-3" />
        </span>
      )}
    </Component>
  );
};

export default Chip;

