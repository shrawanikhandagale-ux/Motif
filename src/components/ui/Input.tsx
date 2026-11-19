import React, { forwardRef } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  prefixElement?: React.ReactNode;
  suffixElement?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      hint,
      error,
      prefixElement,
      suffixElement,
      className = '',
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? `input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    return (
      <div className="w-full space-y-1.5 font-sans">
        {label && (
          <label
            htmlFor={inputId}
            className="block font-mono text-xs font-bold uppercase tracking-wider text-[var(--ink)]"
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {prefixElement && (
            <div className="absolute left-3 flex items-center pointer-events-none text-[var(--ink)] opacity-70">
              {prefixElement}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={`w-full border-2 ${
              error ? 'border-[var(--ox)] bg-[var(--ox)]/5' : 'border-[var(--line)] bg-[var(--card-bg)]'
            } text-[var(--ink)] font-sans text-sm px-3.5 py-2.5 transition-colors placeholder:text-[var(--ink)]/40 focus:outline-2 focus:outline-[var(--ox)] focus:outline-offset-1 disabled:opacity-50 disabled:cursor-not-allowed ${
              prefixElement ? 'pl-9' : ''
            } ${suffixElement ? 'pr-9' : ''} ${className}`}
            {...props}
          />

          {suffixElement && (
            <div className="absolute right-3 flex items-center text-[var(--ink)] opacity-70">
              {suffixElement}
            </div>
          )}
        </div>

        {error ? (
          <p className="font-mono text-xs text-[var(--ox)] font-bold">{error}</p>
        ) : hint ? (
          <p className="font-mono text-xs text-[var(--ink)] opacity-70">{hint}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;

