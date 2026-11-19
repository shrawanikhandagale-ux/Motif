import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'acid' | 'oxblood' | 'electric' | 'subtle';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  className = '',
}) => {
  const variantStyles = {
    default: 'bg-[var(--card-bg)] text-[var(--ink)] border-[var(--line)]',
    acid: 'bg-[var(--acid)] text-[#171717] border-[#171717]',
    oxblood: 'bg-[var(--ox)] text-[#F1EBDD] border-[var(--line)]',
    electric: 'bg-[var(--elec)] text-[#171717] border-[#171717]',
    subtle: 'bg-transparent text-[var(--ink)] border-[var(--line)] opacity-80',
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-xs font-mono tracking-tight border ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

