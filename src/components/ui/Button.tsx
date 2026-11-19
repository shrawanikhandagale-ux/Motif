import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'acid' | 'oxblood' | 'electric' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-bold tracking-tight cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-100 focus-visible:outline-2 focus-visible:outline-[var(--ox)] focus-visible:outline-offset-2';

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs font-mono',
    md: 'px-5 py-2.5 text-sm font-sans',
    lg: 'px-6 py-3.5 text-base font-sans font-bold',
  };

  const variantStyles = {
    primary:
      'border-2 border-[var(--line)] bg-[var(--ink)] text-[var(--bg)] shadow-hard hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-lg active:translate-x-0.5 active:translate-y-0.5 active:shadow-hard-sm',
    secondary:
      'border-2 border-[var(--line)] bg-[var(--card-bg)] text-[var(--ink)] shadow-hard hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-lg active:translate-x-0.5 active:translate-y-0.5 active:shadow-hard-sm hover:bg-[var(--card-subtle)]',
    ghost:
      'border-2 border-transparent bg-transparent text-[var(--ink)] hover:border-[var(--line)] hover:bg-[var(--card-subtle)] active:translate-x-0.5 active:translate-y-0.5',
    acid:
      'border-2 border-[#171717] bg-[var(--acid)] text-[#171717] shadow-hard hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-lg active:translate-x-0.5 active:translate-y-0.5',
    oxblood:
      'border-2 border-[var(--line)] bg-[var(--ox)] text-[#F1EBDD] shadow-hard hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-lg active:translate-x-0.5 active:translate-y-0.5',
    electric:
      'border-2 border-[#171717] bg-[var(--elec)] text-[#171717] shadow-hard hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-lg active:translate-x-0.5 active:translate-y-0.5',
    outline:
      'border-2 border-[var(--line)] bg-transparent text-[var(--ink)] hover:bg-[var(--card-subtle)] active:translate-x-0.5 active:translate-y-0.5',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
