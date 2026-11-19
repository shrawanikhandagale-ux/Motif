import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';

export const LandingHero: React.FC = () => {
  return (
    <div className="relative py-12 sm:py-16 overflow-hidden border-b-ink">
      {/* Halftone dot pattern background */}
      <div
        className="dots-pattern absolute -right-12 -top-6 w-72 sm:w-96 md:w-[460px] aspect-square rounded-full pointer-events-none opacity-70 z-0"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 border-2 border-[var(--line)] bg-[var(--acid)] text-[#171717] font-mono text-xs font-bold uppercase mb-6 shadow-hard-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Creative Business &amp; Marketing OS</span>
        </div>

        <h1 className="font-display font-extrabold text-5xl sm:text-7xl md:text-8xl tracking-tighter text-[var(--ink)] leading-[0.88] select-none">
          <span className="block">Built</span>
          <span className="block">for the</span>
          <span className="inline-block transform -rotate-2 translate-x-2 text-[var(--ox)]">
            offscript.
          </span>
        </h1>

        <p className="max-w-xl text-lg sm:text-xl text-[var(--ink)] opacity-90 mt-6 leading-relaxed font-sans">
          One workspace where you learn a skill, make the thing, launch it, run the work, and see what happened.
          Not by the book. Built by you.
        </p>

        <div className="flex flex-wrap items-center gap-4 mt-8">
          <Link to="/learn">
            <Button variant="primary" size="lg" className="text-base font-extrabold">
              <span>Enter Workspace</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <a
            href="#departments"
            className="px-5 py-3 text-sm font-mono font-bold uppercase border-2 border-[var(--line)] bg-transparent text-[var(--ink)] hover:bg-[var(--card-subtle)] transition-colors inline-flex items-center"
          >
            Explore 5 Departments ↓
          </a>
        </div>
      </div>

      {/* Editorial Cut-and-Paste Sticker */}
      <div className="mt-8 sm:mt-0 sm:absolute sm:right-8 sm:bottom-12 z-20">
        <div className="bg-[var(--acid)] text-[#171717] px-5 py-3 font-display font-extrabold text-lg sm:text-xl border-2 border-[#171717] shadow-[6px_6px_0_#171717] transform rotate-3 sm:rotate-6 max-w-xs">
          Idea in. Real thing out.
        </div>
      </div>
    </div>
  );
};

