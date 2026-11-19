import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export const LandingHero: React.FC = () => {
  return (
    <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 border-b-2 border-[var(--line)] overflow-hidden">
      {/* Halftone radial pattern */}
      <div
        className="dots-pattern absolute -right-16 sm:-right-8 top-4 w-72 sm:w-[480px] aspect-square rounded-full pointer-events-none opacity-85 z-0"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 border-2 border-[var(--line)] bg-[var(--elec)] text-[#171717] font-mono text-xs font-bold uppercase mb-6 shadow-hard-sm">
          <Sparkles className="w-3.5 h-3.5 text-[var(--ox)]" />
          <span>Creative Business &amp; Marketing OS</span>
        </div>

        {/* Oversized editorial headline */}
        <h1 className="font-display font-extrabold text-5xl sm:text-7xl md:text-9xl tracking-tighter leading-[0.86] text-[var(--ink)] max-w-4xl select-none">
          <span className="block">Built</span>
          <span className="block">for the</span>
          <span className="inline-block transform -rotate-2 translate-x-2 sm:translate-x-4 text-[var(--ox)] origin-left">
            offscript.
          </span>
        </h1>

        <p className="max-w-xl text-lg sm:text-2xl text-[var(--ink)] opacity-90 mt-8 font-sans font-medium leading-snug">
          One workspace where you learn a skill, make the thing, launch it, run the work, and see what happened.
          Not by the book. Built by you.
        </p>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-4 mt-10">
          <Link
            to="/onboarding"
            className="inline-flex items-center gap-2 px-6 py-3.5 border-2 border-[var(--line)] bg-[var(--ink)] text-[var(--bg)] font-display font-extrabold text-base tracking-tight shadow-hard hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-lg transition-transform"
          >
            <span>Start Building</span>
            <ArrowRight className="w-5 h-5 text-[var(--acid)]" />
          </Link>
          <Link
            to="/learn"
            className="inline-flex items-center gap-2 px-6 py-3.5 border-2 border-[var(--line)] bg-[var(--card-bg)] text-[var(--ink)] font-mono text-xs font-bold uppercase tracking-wider shadow-hard hover:bg-[var(--card-subtle)] transition-colors"
          >
            <span>Explore Workspace →</span>
          </Link>
        </div>

        {/* Rotated Cut-and-Paste Sticker */}
        <div className="mt-12 sm:mt-0 sm:absolute sm:right-16 sm:bottom-16 z-20">
          <div className="bg-[var(--acid)] text-[#171717] px-6 py-4 font-display font-extrabold text-xl sm:text-2xl border-2 border-[#171717] shadow-[6px_6px_0_#171717] transform rotate-3 sm:rotate-6 max-w-xs leading-tight select-none">
            Idea in. Real thing out.
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingHero;

