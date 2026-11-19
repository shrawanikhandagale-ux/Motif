import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export const JoinMotifCta: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-[var(--ink)] text-[var(--bg)] border-b-2 border-[var(--line)] relative overflow-hidden">
      {/* Decorative halftone dot background */}
      <div
        className="dots-pattern absolute -left-12 -bottom-12 w-80 sm:w-96 aspect-square rounded-full pointer-events-none opacity-30 z-0"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 border-2 border-[var(--bg)] bg-[var(--ox)] text-[#F1EBDD] font-mono text-xs font-bold uppercase shadow-hard-sm">
          <Sparkles className="w-3.5 h-3.5 text-[var(--acid)]" />
          <span>No Generic SaaS Dashboards</span>
        </div>

        <h2 className="font-display font-extrabold text-5xl sm:text-7xl md:text-8xl tracking-tight leading-[0.9] max-w-4xl mx-auto">
          Ready to build for the <span className="text-[var(--acid)] inline-block transform -rotate-1">offscript?</span>
        </h2>

        <p className="max-w-xl mx-auto text-lg sm:text-xl opacity-85 font-sans leading-relaxed">
          One account. One interconnected operating system.
          Stop jumping between disconnected tools and build your creative business in one place.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-5 pt-4">
          <Link
            to="/onboarding"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--acid)] text-[#171717] font-display font-extrabold text-lg border-2 border-[#171717] shadow-[6px_6px_0_var(--bg)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-transform"
          >
            <span>Join MOTIF</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            to="/learn"
            className="inline-flex items-center gap-2 px-6 py-4 border-2 border-[var(--bg)] bg-transparent text-[var(--bg)] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[var(--bg)] hover:text-[var(--ink)] transition-colors"
          >
            <span>Browse Department Catalog →</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default JoinMotifCta;

