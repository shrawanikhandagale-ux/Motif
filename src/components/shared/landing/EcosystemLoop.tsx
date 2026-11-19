import React from 'react';
import { ArrowRight, RefreshCw } from 'lucide-react';

export const EcosystemLoop: React.FC = () => {
  const steps = [
    { step: '01', dept: 'Learn', role: 'The Academy', desc: 'Pick a path or open a brief. It defines the creative prompt and constraints.' },
    { step: '02', dept: 'Create', role: 'The Studio', desc: 'The brief opens in Create as a project canvas with moodboards and assets.' },
    { step: '03', dept: 'Market', role: 'The Hub', desc: 'Finished assets feed directly into distribution plans and newsletter drops.' },
    { step: '04', dept: 'Manage', role: 'The Workspace', desc: 'Campaigns attach to client contracts and deliverables in the ledger.' },
    { step: '05', dept: 'Analyze', role: '& Grow', desc: 'Performance telemetry shows what resonated and what underperformed.' },
  ];

  return (
    <section id="ecosystem" className="py-16 sm:py-24 border-b-2 border-[var(--line)] bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--ox)] font-bold block mb-1">
              Architecture &amp; Interconnection
            </span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[var(--ink)] tracking-tight">
              How the ecosystem works.
            </h2>
            <p className="text-base text-[var(--ink)] opacity-85 mt-2 max-w-xl">
              Learn → Create → Market → Manage → Analyze. Not 5 siloed apps, but one continuous feedback loop.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 border-2 border-[var(--line)] bg-[var(--acid)] text-[#171717] font-mono text-xs font-bold shadow-hard-sm">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Closed Loop Workflow</span>
          </div>
        </div>

        {/* 5-Step Loop Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {steps.map((s, idx) => (
            <div
              key={s.step}
              className="border-2 border-[var(--line)] bg-[var(--card-bg)] p-5 shadow-hard flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold px-1.5 py-0.5 bg-[var(--ink)] text-[var(--bg)]">
                    {s.step}
                  </span>
                  {idx < steps.length - 1 ? (
                    <ArrowRight className="w-4 h-4 text-[var(--ox)]" />
                  ) : (
                    <RefreshCw className="w-4 h-4 text-[var(--ox)]" />
                  )}
                </div>
                <h3 className="font-display font-extrabold text-2xl text-[var(--ink)] leading-tight">
                  {s.dept}
                </h3>
                <span className="font-mono text-xs text-[var(--ox)] font-semibold block">
                  {s.role}
                </span>
                <p className="text-xs opacity-85 leading-relaxed pt-1">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Feedback Closure Banner */}
        <div className="border-2 border-[var(--line)] bg-[var(--elec)] text-[#171717] p-6 shadow-hard flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="font-mono text-xs uppercase font-bold tracking-wider block opacity-75">
              Closing the Creative Loop
            </span>
            <p className="font-display font-extrabold text-xl sm:text-2xl mt-1 text-[#171717]">
              “A weak result in Analyze suggests a path in Learn. The loop closes.”
            </p>
          </div>
          <span className="font-mono text-xs font-bold px-3 py-1.5 border-2 border-[#171717] bg-[var(--bg)] text-[var(--ink)] shrink-0 self-start sm:self-auto">
            Zero Disconnects
          </span>
        </div>
      </div>
    </section>
  );
};

export default EcosystemLoop;

