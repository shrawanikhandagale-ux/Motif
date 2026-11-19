import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { DEPARTMENTS } from '../../constants';

export const DepartmentShowcase: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeDept = DEPARTMENTS[activeIdx];
  const nextDept = DEPARTMENTS[(activeIdx + 1) % DEPARTMENTS.length];

  return (
    <section id="departments" className="py-12 border-b-ink">
      <div className="mb-6">
        <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-[var(--ink)] tracking-tight">
          One idea, five departments.
        </h2>
        <p className="text-base text-[var(--ink)] opacity-80 mt-2 max-w-xl">
          Pick a department. Everything you make there travels to the next one.
        </p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard">
        {DEPARTMENTS.map((dept, idx) => {
          const isSelected = idx === activeIdx;
          const isLast = idx === DEPARTMENTS.length - 1;

          return (
            <button
              key={dept.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => setActiveIdx(idx)}
              className={`p-4 text-left cursor-pointer transition-colors border-b-2 sm:border-b-0 border-[var(--line)] ${
                !isLast ? 'md:border-r-2' : ''
              } ${
                isSelected
                  ? 'bg-[var(--ink)] text-[var(--bg)] shadow-inner'
                  : 'text-[var(--ink)] hover:bg-[var(--elec)] hover:text-[#171717]'
              } focus-visible:outline-2 focus-visible:outline-[var(--ox)]`}
            >
              <span className="font-display font-extrabold text-lg sm:text-xl uppercase block leading-tight">
                {dept.name}
              </span>
              <span className="font-mono text-xs opacity-75 block mt-1 lowercase">
                {dept.subtitle}
              </span>
            </button>
          );
        })}
      </div>

      {/* Panel */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8 border-2 border-t-0 border-[var(--line)] bg-[var(--card-bg)]">
        <div className="md:col-span-7 space-y-4">
          <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-[var(--ink)] tracking-tight">
            {activeDept.tagline}
          </h3>
          <ul className="space-y-2 text-base text-[var(--ink)] opacity-90 pl-5 list-disc marker:text-[var(--ox)]">
            {activeDept.features.map((feat) => (
              <li key={feat}>{feat}</li>
            ))}
          </ul>
          <div className="pt-4">
            <Link
              to={`/${activeDept.id}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--ink)] text-[var(--bg)] font-bold text-sm border-2 border-[var(--line)] hover:bg-[var(--ox)] transition-colors shadow-hard-sm"
            >
              <span>Launch {activeDept.name} Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="md:col-span-5 bg-[var(--acid)] text-[#171717] p-5 border-2 border-[#171717] shadow-hard-ox self-start">
          <span className="font-mono text-xs uppercase tracking-wider block font-semibold">
            hands off to {nextDept.name}
          </span>
          <p className="font-bold text-lg leading-snug mt-2">{activeDept.handoffText}</p>
        </div>
      </div>
    </section>
  );
};

