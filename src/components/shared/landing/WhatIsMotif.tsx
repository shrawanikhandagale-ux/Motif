import React from 'react';
import { Sparkles, Layers, RefreshCw } from 'lucide-react';

export const WhatIsMotif: React.FC = () => {
  const pillars = [
    {
      icon: Sparkles,
      title: 'Publication Personality',
      description:
        'Tactile typography, 2px ink borders, and halftone dots. Designed like an underground independent magazine, not a generic sterile SaaS dashboard.',
      badge: 'Editorial Design',
    },
    {
      icon: Layers,
      title: 'Unified Records',
      description:
        'One account, one workspace, shared records. Every asset you design, client you onboard, and campaign you launch exists in a single connected ledger.',
      badge: 'Zero Retyping',
    },
    {
      icon: RefreshCw,
      title: 'The Closed Feedback Loop',
      description:
        'Learn a craft, make the work, market it, manage the client, and analyze the numbers. Performance insights loop right back into what to learn next.',
      badge: '5 Departments',
    },
  ];

  return (
    <section id="what-is-motif" className="py-16 sm:py-24 border-b-2 border-[var(--line)] bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        <div className="max-w-3xl space-y-4">
          <span className="font-mono text-xs uppercase tracking-wider text-[var(--ox)] font-bold block">
            The Manifesto
          </span>
          <h2 className="font-display font-extrabold text-4xl sm:text-6xl tracking-tight text-[var(--ink)] leading-tight">
            What is MOTIF?
          </h2>
          <p className="font-sans text-lg sm:text-xl text-[var(--ink)] opacity-90 leading-relaxed font-normal">
            MOTIF is a <b>Creative Business &amp; Marketing OS</b> built for those who go offscript.
            We combined the irreverent spirit of an independent art publication with the ruthless utility of a professional workspace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="border-2 border-[var(--line)] bg-[var(--card-bg)] p-6 shadow-hard flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 border-2 border-[var(--line)] bg-[var(--acid)] text-[#171717] flex items-center justify-center font-bold shadow-hard-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-[11px] font-bold px-2 py-0.5 border border-[var(--line)] bg-[var(--card-subtle)]">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="font-display font-extrabold text-2xl text-[var(--ink)]">{item.title}</h3>
                  <p className="text-sm opacity-85 leading-relaxed">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhatIsMotif;

