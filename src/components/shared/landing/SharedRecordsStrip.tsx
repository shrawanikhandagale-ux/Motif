import React from 'react';
import { SHARED_RECORD_TYPES } from '../../../constants';

export const SharedRecordsStrip: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 border-b-2 border-[var(--line)] bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="max-w-2xl space-y-2">
          <span className="font-mono text-xs uppercase tracking-wider text-[var(--ox)] font-bold block">
            Shared Ledger
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-[var(--ink)] tracking-tight">
            What travels between them.
          </h2>
          <p className="text-base text-[var(--ink)] opacity-85 leading-relaxed">
            The departments share one account and one set of records, so nothing gets retyped across your workflow.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {SHARED_RECORD_TYPES.map((record, idx) => {
            const isElectric = idx % 3 === 0;
            return (
              <div
                key={record}
                className={`p-4 border-2 border-[var(--line)] font-display font-bold text-center text-sm transition-transform hover:-translate-y-1 ${
                  isElectric
                    ? 'bg-[var(--elec)] text-[#171717] shadow-hard-ox'
                    : 'bg-[var(--card-bg)] text-[var(--ink)] shadow-hard'
                }`}
              >
                <span className="block font-mono text-[10px] opacity-70 mb-1">0{idx + 1}</span>
                <span className="text-base font-extrabold tracking-tight">{record}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SharedRecordsStrip;

