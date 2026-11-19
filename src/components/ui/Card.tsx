import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  shadow?: boolean | 'ox' | 'acid';
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  shadow = false,
  className = '',
  ...props
}) => {
  let shadowClass = '';
  if (shadow === true) shadowClass = 'shadow-hard';
  else if (shadow === 'ox') shadowClass = 'shadow-hard-ox';
  else if (shadow === 'acid') shadowClass = 'shadow-hard-acid';

  return (
    <div
      className={`border-2 border-[var(--line)] bg-[var(--card-bg)] text-[var(--ink)] ${shadowClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

