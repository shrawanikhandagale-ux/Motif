import React from 'react';
import { ExternalLink } from 'lucide-react';

export const CommunityShowcase: React.FC = () => {
  const showcaseItems = [
    {
      title: 'Issue Zero: Anti-Template Zine',
      creator: 'Offscript Press',
      deptUsed: 'Learn → Create → Market',
      stat: '1,420 Pre-orders',
      accent: 'acid',
      desc: '16-page risograph publication with custom brutal typography specimen and offset halftone plates.',
    },
    {
      title: 'Neon Halftone Capsule 01',
      creator: 'Kilo Apparel',
      deptUsed: 'Create → Market → Manage',
      stat: 'Sold out in 3h',
      accent: 'electric',
      desc: 'Screen-printed streetwear merchandise with vector color separations and packaging stickers.',
    },
    {
      title: 'The Underground Audio Imprint',
      creator: 'Sundown Records',
      deptUsed: 'Full 5-Dept Loop',
      stat: '18.4k Listeners',
      accent: 'oxblood',
      desc: 'Digital vinyl distribution, subscriber manifesto dispatches, and subscriber growth telemetry.',
    },
  ];

  return (
    <section id="showcase" className="py-16 sm:py-24 border-b-2 border-[var(--line)] bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--ox)] font-bold block mb-1">
              Field Work
            </span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[var(--ink)] tracking-tight">
              Community Showcase.
            </h2>
            <p className="text-base text-[var(--ink)] opacity-85 mt-2 max-w-xl">
              Independent publications, subversive apparel, and cult campaigns built entirely with MOTIF.
            </p>
          </div>
          <span className="font-mono text-xs px-3 py-1.5 border-2 border-[var(--line)] bg-[var(--card-bg)] text-[var(--ink)] shadow-hard-sm self-start sm:self-auto">
            3 Featured Drops
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {showcaseItems.map((item) => (
            <div
              key={item.title}
              className="border-2 border-[var(--line)] bg-[var(--card-bg)] p-6 shadow-hard flex flex-col justify-between space-y-6"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-[var(--ox)]">{item.creator}</span>
                  <span className="px-2 py-0.5 border border-[var(--line)] bg-[var(--card-subtle)]">
                    {item.stat}
                  </span>
                </div>
                <h3 className="font-display font-extrabold text-2xl text-[var(--ink)] leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm opacity-85 leading-relaxed">{item.desc}</p>
              </div>

              <div className="pt-4 border-t border-[var(--line)]/20 flex items-center justify-between text-xs font-mono">
                <span className="opacity-75">{item.deptUsed}</span>
                <span className="inline-flex items-center gap-1 font-bold text-[var(--ox)] hover:underline cursor-pointer">
                  <span>View Case</span>
                  <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunityShowcase;

