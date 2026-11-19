import React from 'react';
import { useTheme } from './providers/ThemeProvider';
import { Sun, Moon, Sparkles } from 'lucide-react';
import { TOKEN_PALETTE } from '../constants';

export const DevTokensPage: React.FC = () => {
  const { resolvedTheme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] p-4 sm:p-8 font-sans space-y-10 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="border-b-ink pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[var(--acid)] text-[#171717] font-mono text-xs font-bold uppercase mb-2 border border-[#171717]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>MOTIF Design Foundation</span>
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl tracking-tight leading-none">
            Design Tokens
          </h1>
          <p className="font-mono text-xs opacity-75 mt-2">
            Route: /dev/tokens · Active Theme: <b className="uppercase">{resolvedTheme}</b>
          </p>
        </div>
        <button
          type="button"
          onClick={toggleTheme}
          className="self-start sm:self-auto px-4 py-2 border-2 border-[var(--line)] bg-[var(--card-bg)] text-[var(--ink)] font-mono text-xs font-bold uppercase tracking-wider shadow-hard hover:bg-[var(--acid)] hover:text-[#171717] transition-all cursor-pointer inline-flex items-center gap-2"
        >
          {resolvedTheme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          <span>Toggle Theme ({resolvedTheme === 'dark' ? 'Light' : 'Dark'})</span>
        </button>
      </div>

      {/* 01. Brand Palette */}
      <section className="space-y-4">
        <h2 className="font-display font-extrabold text-2xl tracking-tight">01. Brand Palette</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {TOKEN_PALETTE.map((c) => (
            <div key={c.name} className="border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard p-3 space-y-3">
              <div className="h-20 w-full border-2 border-[var(--line)] flex items-end p-2" style={{ backgroundColor: c.hex }}>
                <span className="font-mono text-xs font-bold px-1.5 py-0.5 bg-black/80 text-white">{c.hex}</span>
              </div>
              <div>
                <h3 className="font-display font-extrabold text-lg leading-tight">{c.name}</h3>
                <code className="font-mono text-xs block text-[var(--ox)] font-bold">{c.varName}</code>
                <p className="text-xs opacity-80 mt-1">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 02. Type System */}
      <section className="space-y-4">
        <h2 className="font-display font-extrabold text-2xl tracking-tight">02. Type System</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border-2 border-[var(--line)] bg-[var(--card-bg)] p-5 shadow-hard space-y-2">
            <span className="font-mono text-xs text-[var(--ox)] font-bold uppercase block">Display · Bricolage Grotesque 800</span>
            <div className="font-display font-extrabold text-3xl tracking-tight leading-tight">
              Built for the <span className="inline-block transform -rotate-2 text-[var(--ox)]">offscript.</span>
            </div>
            <p className="text-xs font-mono opacity-75">Tight tracking, oversized editorial headings, slight skew.</p>
          </div>
          <div className="border-2 border-[var(--line)] bg-[var(--card-bg)] p-5 shadow-hard space-y-2">
            <span className="font-mono text-xs text-[var(--ox)] font-bold uppercase block">Body · Instrument Sans 400/600</span>
            <p className="text-base leading-relaxed opacity-90">
              “One workspace where you learn a skill, make the thing, launch it, run the work and see what happened.”
            </p>
            <p className="text-xs font-mono opacity-75">Typographic apostrophes, high legibility, calm reading.</p>
          </div>
          <div className="border-2 border-[var(--line)] bg-[var(--card-bg)] p-5 shadow-hard space-y-2">
            <span className="font-mono text-xs text-[var(--ox)] font-bold uppercase block">Metadata · DM Mono 400/500</span>
            <div className="font-mono text-xs space-y-1 bg-[var(--card-subtle)] p-2.5 border border-[var(--line)]">
              <div>STATUS: LIVE</div>
              <div>COORDINATES: 40.7128° N, 74.0060° W</div>
              <div>RECORDS_SHARED: 8/8</div>
            </div>
            <p className="text-xs font-mono opacity-75">Tags, status badges, timestamps, labels.</p>
          </div>
        </div>
      </section>

      {/* 03. Textures & Hard Shadows */}
      <section className="space-y-4">
        <h2 className="font-display font-extrabold text-2xl tracking-tight">03. Textures &amp; Hard Shadows</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="border-2 border-[var(--line)] bg-[var(--card-bg)] p-3 shadow-hard space-y-2">
            <span className="font-mono text-xs font-bold uppercase block">Halftone Dots (.halftone-dots)</span>
            <div className="h-24 w-full border-2 border-[var(--line)] halftone-dots" />
            <p className="text-xs font-mono opacity-75">14px radial dot matrix</p>
          </div>
          <div className="border-2 border-[var(--line)] bg-[var(--card-bg)] p-3 shadow-hard space-y-2">
            <span className="font-mono text-xs font-bold uppercase block">Masked (.halftone-dots-masked)</span>
            <div className="h-24 w-full border-2 border-[var(--line)] halftone-dots-masked bg-[var(--bg)]" />
            <p className="text-xs font-mono opacity-75">115deg gradient fade mask</p>
          </div>
          <div className="border-2 border-[var(--line)] bg-[var(--card-bg)] p-3 shadow-hard space-y-2">
            <span className="font-mono text-xs font-bold uppercase block">Grain (.grain-overlay)</span>
            <div className="h-24 w-full border-2 border-[var(--line)] grain-overlay bg-[var(--card-subtle)] flex items-center justify-center font-display font-bold">
              Tactile Noise
            </div>
            <p className="text-xs font-mono opacity-75">Subtle print paper texture</p>
          </div>
          <div className="hard-shadow-tile-interactive p-3 space-y-2">
            <span className="font-mono text-xs font-bold uppercase block">Interactive Tile</span>
            <div className="h-24 w-full border-2 border-[var(--line)] bg-[var(--elec)] text-[#171717] flex items-center justify-center font-display font-extrabold">
              Hover &amp; Click Me
            </div>
            <p className="text-xs font-mono opacity-75">Translates -2px on hover</p>
          </div>
        </div>
      </section>

      {/* 04. Rotated Stickers */}
      <section className="space-y-4 pb-10">
        <h2 className="font-display font-extrabold text-2xl tracking-tight">04. Rotated Stickers &amp; Offsets</h2>
        <div className="p-6 border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard-lg flex flex-wrap items-center gap-4">
          <div className="rotated-sticker-acid">Idea in. Real thing out.</div>
          <div className="rotated-sticker-oxblood">Hands off to Create →</div>
          <div className="rotated-sticker-electric">MOTIF · Offscript v0.1</div>
          <div className="rotated-sticker bg-[var(--card-subtle)] text-[var(--ink)]">2px Ink Borders</div>
        </div>
      </section>
    </div>
  );
};

export default DevTokensPage;
