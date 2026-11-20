import React from 'react';

interface MarkProps {
  className?: string;
}

export const HomeMark: React.FC<MarkProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" className={className} aria-hidden="true">
    <polygon points="10,2 18,8 18,18 2,18 2,8" fill="currentColor" fillOpacity="0.15" stroke="currentColor" />
    <line x1="6" y1="18" x2="6" y2="11" />
    <line x1="14" y1="18" x2="14" y2="11" />
    <line x1="6" y1="11" x2="14" y2="11" />
  </svg>
);

export const LearnMark: React.FC<MarkProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" className={className} aria-hidden="true">
    <path d="M3 5l7-3 7 3v9l-7 3-7-3V5z" fill="currentColor" fillOpacity="0.15" stroke="currentColor" />
    <line x1="10" y1="2" x2="10" y2="17" />
    <line x1="5.5" y1="9" x2="8.5" y2="10" />
    <line x1="14.5" y1="9" x2="11.5" y2="10" />
  </svg>
);

export const CreateMark: React.FC<MarkProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" className={className} aria-hidden="true">
    <path d="M10 2L3 17h14L10 2z" fill="currentColor" fillOpacity="0.15" stroke="currentColor" />
    <circle cx="10" cy="7" r="1.5" fill="currentColor" />
    <line x1="5.5" y1="13" x2="14.5" y2="13" />
    <line x1="10" y1="13" x2="10" y2="17" strokeWidth="2.5" />
  </svg>
);

export const MarketMark: React.FC<MarkProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" className={className} aria-hidden="true">
    <polygon points="3,7 9,5 9,15 3,13" fill="currentColor" fillOpacity="0.15" stroke="currentColor" />
    <path d="M13 6.5c1.8 1.2 1.8 5.8 0 7" />
    <path d="M16 4.5c3 2.5 3 8.5 0 11" />
    <line x1="9" y1="10" x2="3" y2="10" />
  </svg>
);

export const ManageMark: React.FC<MarkProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" className={className} aria-hidden="true">
    <rect x="2" y="3" width="16" height="14" fill="currentColor" fillOpacity="0.15" stroke="currentColor" />
    <line x1="10" y1="3" x2="10" y2="17" />
    <line x1="2" y1="8" x2="18" y2="8" />
    <rect x="4.5" y="11" width="3" height="2" fill="currentColor" />
    <rect x="12.5" y="11" width="3" height="2" fill="currentColor" />
  </svg>
);

export const AnalyzeMark: React.FC<MarkProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" className={className} aria-hidden="true">
    <circle cx="4" cy="15" r="2.2" fill="currentColor" />
    <circle cx="10" cy="5" r="2.2" fill="currentColor" />
    <circle cx="16" cy="11" r="2.2" fill="currentColor" />
    <line x1="5.8" y1="13.2" x2="8.5" y2="7" />
    <line x1="11.5" y1="6.8" x2="14.2" y2="9.5" />
    <line x1="14.2" y1="12.2" x2="6" y2="15" strokeDasharray="2,2" />
  </svg>
);

