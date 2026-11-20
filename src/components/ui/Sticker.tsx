import React from 'react';

export interface StickerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  rotation?: 'cw' | 'ccw' | 'flat';
  variant?: 'acid' | 'oxblood' | 'electric' | 'ivory' | 'teal';
  interactive?: boolean;
}

export const Sticker: React.FC<StickerProps> = ({
  children,
  rotation = 'cw',
  variant = 'acid',
  interactive = false,
  className = '',
  tabIndex,
  ...props
}) => {
  const rotationClasses = {
    cw: 'rotate-[4deg]',
    ccw: '-rotate-[3deg]',
    flat: 'rotate-0',
  };

  const variantStyles = {
    acid: 'bg-[var(--acid)] text-[#171717] border-2 border-[#171717] shadow-[5px_5px_0_#171717]',
    oxblood: 'bg-[var(--ox)] text-[#F1EBDD] border-2 border-[var(--line)] shadow-[5px_5px_0_var(--line)]',
    electric: 'bg-[var(--elec)] text-[#171717] border-2 border-[#171717] shadow-[5px_5px_0_#171717]',
    ivory: 'bg-[var(--bg)] text-[var(--ink)] border-2 border-[var(--line)] shadow-[5px_5px_0_var(--line)]',
    teal: 'bg-[#477C75] text-[#F1EBDD] border-2 border-[var(--line)] shadow-[5px_5px_0_var(--line)]',
  };

  const interactiveStyles = interactive
    ? 'cursor-pointer hover:scale-105 hover:rotate-0 transition-transform duration-150 focus-visible:outline-2 focus-visible:outline-[var(--ox)] focus-visible:outline-offset-2'
    : '';

  return (
    <div
      tabIndex={interactive ? (tabIndex ?? 0) : tabIndex}
      className={`inline-block font-display font-extrabold text-base sm:text-lg px-4 py-2 select-none ${rotationClasses[rotation]} ${variantStyles[variant]} ${interactiveStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Sticker;
