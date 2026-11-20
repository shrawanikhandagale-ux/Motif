import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Eye } from 'lucide-react';
import { CreateSubNav } from '../components';
import { useProjects } from '../hooks';
import { useProgress } from '../../../hooks';

export const BriefBuilderPage: React.FC = () => {
  const navigate = useNavigate();
  const { createProject } = useProjects();
  const { clients } = useProgress();

  const [title, setTitle] = useState('Offscript Brand Manifesto & Packaging');
  const [clientName, setClientName] = useState('Sundown Streetwear Ltd');
  const [domain, setDomain] = useState('Branding');
  const [tone, setTone] = useState('Tactile Brutalist');
  const [objective, setObjective] = useState(
    'Introduce an independent streetwear label through a tactile 4-color zine and risograph packaging system without corporate compromise.'
  );
  const [deliverablesInput, setDeliverablesInput] = useState(
    '16-Page Risograph Zine, 2-Pass Vector Screenprints, Kraft Paper Hangtags'
  );
  const [savedSuccess, setSavedSuccess] = useState(false);

  const deliverables = deliverablesInput
    .split(',')
    .map((d) => d.trim())
    .filter(Boolean);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newProject = createProject({
      title: title.trim(),
      clientName: clientName.trim() || 'Independent Studio',
      summary: objective.trim() || 'Tactile studio creative production underway.',
      tags: [domain, tone, ...deliverables.slice(0, 3)],
    });

    setSavedSuccess(true);
    setTimeout(() => {
      navigate(`/create/projects/${newProject.id}`);
    }, 400);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="flex flex-wrap items-baseline justify-between gap-4 pb-4 border-b-2 border-[var(--line)]">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase font-bold tracking-wider opacity-70 mb-1">
            <span className="w-2.5 h-2.5 bg-[var(--ox)] border border-[var(--line)]" />
            <span>Interactive Generator · Rapid Studio Scaffolding</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-[var(--ink)] tracking-tight">
            BRIEF BUILDER <span className="text-[var(--ox)] font-normal italic font-serif">scaffold</span>
          </h1>
        </div>
        <div className="font-mono text-xs opacity-75 hidden sm:block text-right">
          <div>Constructor Mode</div>
          <div className="font-bold text-[var(--ink)]">REAL-TIME SPECIFICATION</div>
        </div>
      </div>

      <CreateSubNav />

      {/* 2-Column Workbench Grid (Form on Left, Live Interactive Preview on Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Brief Parameters Form (7 cols) */}
        <div className="lg:col-span-7 border-2 border-[var(--line)] bg-[var(--card-bg)] p-6 sm:p-8 shadow-hard-sm space-y-5">
          <div className="pb-3 border-b border-[var(--line)]/20">
            <h2 className="font-display font-black text-2xl text-[var(--ink)]">
              Construct Project Brief
            </h2>
            <p className="font-mono text-xs opacity-75 mt-1">
              Parameters update the interactive studio preview in real-time.
            </p>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--ink)] mb-1">
                Project Name
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Anti-Corporate Brand Book Scaffold"
                className="w-full px-3.5 py-2 border-2 border-[var(--line)] bg-[var(--bg)] font-mono text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--ox)]"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--ink)] mb-1">
                  Client / Context
                </label>
                <div className="space-y-1">
                  <select
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-[var(--line)] bg-[var(--bg)] font-mono text-xs text-[var(--ink)] focus:outline-none focus:border-[var(--ox)]"
                  >
                    <option value="Independent Studio">Independent Studio</option>
                    {clients.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name} ({c.industry})
                      </option>
                    ))}
                    <option value="Self">Self-Initiated</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--ink)] mb-1">
                  Domain Discipline
                </label>
                <select
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-[var(--line)] bg-[var(--bg)] font-mono text-xs text-[var(--ink)] focus:outline-none focus:border-[var(--ox)]"
                >
                  <option value="Branding">Branding</option>
                  <option value="Design">Design</option>
                  <option value="Marketing">Marketing</option>
                  <option value="UI/UX">UI/UX</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--ink)] mb-1">
                  Creative Tone
                </label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-[var(--line)] bg-[var(--bg)] font-mono text-xs text-[var(--ink)] focus:outline-none focus:border-[var(--ox)]"
                >
                  <option value="Tactile Brutalist">Tactile Brutalist</option>
                  <option value="Rebellious & Contrarian">Rebellious &amp; Contrarian</option>
                  <option value="Sophisticated Minimal">Sophisticated Minimal</option>
                  <option value="Underground Cult">Underground Cult</option>
                  <option value="Playful Raw">Playful Raw</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--ink)] mb-1">
                  Deliverable Tags (Comma-separated)
                </label>
                <input
                  type="text"
                  value={deliverablesInput}
                  onChange={(e) => setDeliverablesInput(e.target.value)}
                  placeholder="e.g. Risograph Zine, Type Specimen"
                  className="w-full px-3 py-2 border-2 border-[var(--line)] bg-[var(--bg)] font-mono text-xs text-[var(--ink)] focus:outline-none focus:border-[var(--ox)]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--ink)] mb-1">
                Project Objective &amp; Thesis
              </label>
              <textarea
                value={objective}
                onChange={(e) => setObjective(e.target.value)}
                rows={4}
                className="w-full p-3 border-2 border-[var(--line)] bg-[var(--bg)] font-sans text-xs sm:text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--ox)] leading-relaxed"
                required
              />
            </div>

            <div className="pt-3 border-t-2 border-[var(--line)] flex flex-wrap items-center justify-between gap-3">
              <span className="font-mono text-xs opacity-75">
                Saves directly into active studio projects ledger.
              </span>
              <button
                type="submit"
                disabled={savedSuccess}
                className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-[#171717] bg-[var(--ink)] text-[var(--bg)] font-display font-extrabold text-sm hover:bg-[var(--ox)] transition-colors shadow-hard-xs cursor-pointer"
              >
                <span>{savedSuccess ? 'Saving to Studio…' : 'Save as Studio Project →'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Live Interactive Preview Card (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between font-mono text-xs px-1">
            <span className="font-bold flex items-center gap-1.5 text-[var(--ox)]">
              <Eye className="w-3.5 h-3.5" />
              <span>LIVE WORKBENCH PREVIEW</span>
            </span>
            <span className="opacity-60 text-[10px]">SYNCED</span>
          </div>

          <div className="border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard-md overflow-hidden">
            {/* Header banner */}
            <div
              className="p-5 border-b-2 border-[var(--line)] text-[#F1EBDD] space-y-2 relative"
              style={{
                backgroundColor: '#702C35',
                backgroundImage: 'radial-gradient(circle, rgba(241,235,221,0.25) 30%, transparent 32%)',
                backgroundSize: '12px 12px',
              }}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[10px] uppercase font-bold px-2 py-0.5 border border-[#171717] bg-[#FAF7EE] text-[#171717]">
                  {domain}
                </span>
                <span className="font-mono text-[10px] uppercase font-bold text-[#F1EBDD] opacity-90">
                  Tone: {tone}
                </span>
              </div>
              <h3 className="font-display font-black text-2xl text-[#F1EBDD] tracking-tight leading-tight">
                {title || 'Untitled Project'}
              </h3>
              <span className="font-mono text-xs opacity-80 block">
                Context: {clientName || 'Independent Production'}
              </span>
            </div>

            {/* Body */}
            <div className="p-5 space-y-4">
              <div>
                <span className="font-mono text-xs uppercase font-bold text-[var(--ox)] block mb-1">
                  Objective
                </span>
                <p className="font-sans text-xs sm:text-sm opacity-90 leading-relaxed">
                  {objective || 'State what you will make and why it matters.'}
                </p>
              </div>

              <div className="p-3 border border-[var(--line)] bg-[var(--card-subtle)] space-y-2">
                <span className="font-mono text-[11px] uppercase font-bold opacity-80 block">
                  Project Deliverable Milestones ({deliverables.length})
                </span>
                <div className="space-y-1 font-mono text-xs">
                  {deliverables.length > 0 ? (
                    deliverables.map((d, i) => (
                      <div key={i} className="flex items-center gap-1.5 opacity-90">
                        <span className="w-1.5 h-1.5 bg-[var(--ox)]" />
                        <span>{d}</span>
                      </div>
                    ))
                  ) : (
                    <span className="opacity-50 text-[11px]">No deliverable tags specified</span>
                  )}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs font-mono opacity-75">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[var(--ox)]" />
                  <span>Generates Studio Asset Slots</span>
                </span>
                <span className="font-bold">Ready</span>
              </div>
            </div>
          </div>

          <div className="p-4 border-2 border-[var(--line)] bg-[var(--card-subtle)] font-mono text-xs space-y-1">
            <span className="font-bold text-[var(--ink)] block">Handoff Integration:</span>
            <p className="opacity-80 leading-normal">
              Upon saving, this brief becomes an active studio project with dedicated deliverable slots, checklist milestones, and direct deployment to Market.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BriefBuilderPage;
