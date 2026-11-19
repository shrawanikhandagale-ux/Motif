import React from 'react';

export interface SectionHeadingProps {
  title: string;
  skewWord?: string;
  kicker?: string;
  description?: string;
  action?: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  borderBottom?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  skewWord,
  kicker,
  description,
  action,
  as: Component = 'h2',
  borderBottom = false,
  className = '',
}) => {
  const sizeStyles = {
    h1: 'text-4xl sm:text-6xl md:text-7xl leading-[0.9]',
    h2: 'text-3xl sm:text-5xl leading-none',
    h3: 'text-2xl sm:text-3xl leading-tight',
    h4: 'text-xl sm:text-2xl leading-tight',
  };

  return (
    <div
      className={`space-y-2 ${borderBottom ? 'border-b-2 border-[var(--line)] pb-6' : ''} ${className}`}
    >
      {kicker && (
        <span className="font-mono text-xs text-[var(--ox)] uppercase tracking-wider block font-semibold">
          {kicker}
        </span>
      )}

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <Component
          className={`font-display font-extrabold tracking-tight text-[var(--ink)] ${sizeStyles[Component]}`}
        >
          <span>{title} </span>
          {skewWord && (
            <span className="inline-block transform -rotate-2 translate-x-1 text-[var(--ox)] origin-left">
              {skewWord}
            </span>
          )}
        </Component>

        {action && <div className="shrink-0">{action}</div>}
      </div>

      {description && (
        <p className="font-sans text-sm sm:text-base text-[var(--ink)] opacity-85 max-w-2xl mt-1 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;

