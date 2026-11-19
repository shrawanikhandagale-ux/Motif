import React from 'react';

export interface TabItem {
  id: string;
  label: string;
  subtitle?: string;
  badge?: string;
}

export interface TabBarProps {
  tabs: TabItem[];
  activeTabId: string;
  onChange: (tabId: string) => void;
  ariaLabel?: string;
  variant?: 'grid' | 'inline';
  className?: string;
}

export const TabBar: React.FC<TabBarProps> = ({
  tabs,
  activeTabId,
  onChange,
  ariaLabel = 'Navigation Tabs',
  variant = 'grid',
  className = '',
}) => {
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIndex = (index + 1) % tabs.length;
      onChange(tabs[nextIndex].id);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIndex = (index - 1 + tabs.length) % tabs.length;
      onChange(tabs[prevIndex].id);
    }
  };

  const containerClass =
    variant === 'grid'
      ? 'grid border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard'
      : 'flex flex-wrap border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard';

  const gridColsClass =
    variant === 'grid'
      ? tabs.length === 5
        ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-5'
        : tabs.length === 4
        ? 'grid-cols-2 sm:grid-cols-4'
        : tabs.length === 3
        ? 'grid-cols-1 sm:grid-cols-3'
        : 'grid-cols-2'
      : '';

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={`${containerClass} ${gridColsClass} ${className}`}
    >
      {tabs.map((tab, idx) => {
        const isSelected = tab.id === activeTabId;
        const isLast = idx === tabs.length - 1;

        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isSelected}
            tabIndex={isSelected ? 0 : -1}
            onClick={() => onChange(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            className={`p-3.5 sm:p-4 text-left transition-colors cursor-pointer border-b-2 sm:border-b-0 border-[var(--line)] ${
              !isLast ? 'border-r-2' : ''
            } ${
              isSelected
                ? 'bg-[var(--ink)] text-[var(--bg)] shadow-inner'
                : 'text-[var(--ink)] hover:bg-[var(--elec)] hover:text-[#171717]'
            } focus-visible:outline-2 focus-visible:outline-[var(--ox)] focus-visible:outline-offset-[-3px]`}
          >
            <div className="flex items-center justify-between gap-1">
              <span className="font-display font-extrabold text-lg sm:text-xl uppercase tracking-tight block leading-tight">
                {tab.label}
              </span>
              {tab.badge && (
                <span className="font-mono text-[10px] px-1.5 py-0.5 border border-current">
                  {tab.badge}
                </span>
              )}
            </div>
            {tab.subtitle && (
              <span className="font-mono text-xs opacity-75 block mt-1 tracking-normal lowercase">
                {tab.subtitle}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default TabBar;

