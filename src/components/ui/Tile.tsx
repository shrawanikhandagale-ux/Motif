import React from 'react';

export interface TileProps extends React.HTMLAttributes<HTMLDivElement> {
  accent?: 'acid' | 'oxblood' | 'electric' | 'ivory' | 'ink' | 'none';
  tilt?: 'cw' | 'ccw' | 'slight-cw' | 'slight-ccw' | 'none';
  shadow?: 'default' | 'lg' | 'ox' | 'acid' | 'none';
  interactive?: boolean;
  children: React.ReactNode;
}

export const Tile: React.FC<TileProps> = ({
  accent = 'none',
  tilt = 'none',
  shadow = 'default',
  interactive = false,
  className = '',
  children,
  tabIndex,
  ...props
}) => {
  const tiltStyles = {
    none: 'rotate-0',
    cw: 'rotate-2',
    ccw: '-rotate-2',
    'slight-cw': 'rotate-1',
    'slight-ccw': '-rotate-1',
  };

  const accentStyles = {
    none: 'bg-[var(--card-bg)] text-[var(--ink)] border-[var(--line)]',
    acid: 'bg-[var(--acid)] text-[#171717] border-[#171717]',
    oxblood: 'bg-[var(--ox)] text-[#F1EBDD] border-[var(--line)]',
    electric: 'bg-[var(--elec)] text-[#171717] border-[#171717]',
    ink: 'bg-[var(--ink)] text-[var(--bg)] border-[var(--line)]',
    ivory: 'bg-[var(--bg)] text-[var(--ink)] border-[var(--line)]',
  };

  const shadowStyles = {
    none: '',
    default: 'shadow-hard',
    lg: 'shadow-hard-lg',
    ox: 'shadow-hard-ox',
    acid: 'shadow-hard-acid',
  };

  const interactiveStyles = interactive
    ? 'cursor-pointer transition-all duration-150 hover:-translate-y-1 hover:shadow-hard-lg focus-visible:outline-2 focus-visible:outline-[var(--ox)] focus-visible:outline-offset-2'
    : '';

  return (
    <div
      tabIndex={interactive ? (tabIndex ?? 0) : tabIndex}
      className={`border-2 p-5 ${tiltStyles[tilt]} ${accentStyles[accent]} ${shadowStyles[shadow]} ${interactiveStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Tile;

