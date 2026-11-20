import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, Sparkles, CheckCircle2, Rocket } from 'lucide-react';
import { LearnSubNav } from '../components';
import { useBriefs } from '../hooks';
import { useProgress } from '../../../hooks';
import { Brief, SkillDomain } from '../../../types';
import { HandoffNotice } from '../../../components/shared/HandoffNotice';

const DOMAIN_OPTIONS: Array<'All' | SkillDomain> = ['All', 'Branding', 'Design', 'Marketing', 'UI/UX'];

function getBriefDomain(brief: Brief): SkillDomain {
  if (brief.skillsUnlocked.some((s) => s.startsWith('sk-br'))) return 'Branding';
  if (brief.skillsUnlocked.some((s) => s.startsWith('sk-ds'))) return 'Design';
  if (brief.skillsUnlocked.some((s) => s.startsWith('sk-mk'))) return 'Marketing';
  if (brief.skillsUnlocked.some((s) => s.startsWith('sk-ui'))) return 'UI/UX';
  return 'Branding';
}

export const BriefRoomPage: React.FC = () => {
  const { briefs, loading } = useBriefs();
  const { projects } = useProgress();
  const [selectedDomain, setSelectedDomain] = useState<'All' | SkillDomain>('All');

  const filteredBriefs = useMemo(() => {
    return briefs.filter((b) => {
      if (selectedDomain === 'All') return true;
      return getBriefDomain(b) === selectedDomain;
    });
  }, [briefs, selectedDomain]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="flex flex-wrap items-baseline justify-between gap-4 pb-4 border-b-2 border-[var(--line)]">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase font-bold tracking-wider opacity-70 mb-1">
            <span className="w-2.5 h-2.5 bg-[var(--elec)] border border-[var(--line)]" />
            <span>Studio Handoff Catalogue · Practical Briefs</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-[var(--ink)] tracking-tight">
            BRIEF ROOM <span className="text-[var(--ox)] font-normal italic font-serif">catalogue</span>
          </h1>
        </div>
        <div className="font-mono text-xs opacity-75 hidden sm:block text-right">
          <div>{briefs.length} Production Briefs</div>
          <div className="font-bold text-[var(--ink)]">OFFSCRIPT SPECIFICATIONS</div>
        </div>
      </div>

      <LearnSubNav />

      {/* Domain Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard-sm">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs uppercase font-bold opacity-75 mr-2">Filter Domain:</span>
          {DOMAIN_OPTIONS.map((domain) => {
            const isSelected = selectedDomain === domain;
            return (
              <button
                key={domain}
                type="button"
                onClick={() => setSelectedDomain(domain)}
                className={`px-3 py-1 text-xs font-mono border-2 transition-colors cursor-pointer select-none ${
                  isSelected
                    ? 'border-[#171717] bg-[var(--ink)] text-[var(--bg)] font-bold shadow-hard-sm'
                    : 'border-[var(--line)] bg-[var(--bg)] text-[var(--ink)] hover:bg-[var(--card-subtle)]'
                }`}
              >
                {domain}
              </button>
            );
          })}
        </div>
        <span className="font-mono text-xs opacity-70 hidden sm:inline">
          Showing {filteredBriefs.length} of {briefs.length} briefs
        </span>
      </div>

      {/* Briefs Grid */}
      {loading ? (
        <div className="p-12 text-center font-mono text-sm opacity-70 border-2 border-[var(--line)] bg-[var(--card-bg)]">
          Loading studio brief catalogue…
        </div>
      ) : filteredBriefs.length === 0 ? (
        <div className="p-12 border-2 border-[var(--line)] bg-[var(--card-bg)] text-center font-mono text-sm">
          No briefs found for “{selectedDomain}”. Select another domain filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBriefs.map((brief) => {
            const domain = getBriefDomain(brief);
            const activeProject = projects.find((p) => p.briefId === brief.id);

            return (
              <div
                key={brief.id}
                className="border-2 border-[var(--line)] bg-[var(--card-bg)] p-5 flex flex-col justify-between shadow-hard-sm hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-hard-md transition-all group"
              >
                <div className="space-y-3">
                  {/* Top Bar: Context and Deadline */}
                  <div className="flex items-center justify-between gap-2 pb-2 border-b border-[var(--line)]/20">
                    <span className="font-mono text-[10px] uppercase font-bold px-2 py-0.5 border border-[var(--line)] bg-[var(--card-subtle)] text-[var(--ink)]">
                      {domain}
                    </span>
                    <span className="font-mono text-xs font-bold text-[var(--ox)] inline-flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{brief.deadlineNotice}</span>
                    </span>
                  </div>

                  <div>
                    <span className="font-mono text-[11px] opacity-75 block truncate">
                      {brief.clientOrContext}
                    </span>
                    <h2 className="font-display font-black text-xl text-[var(--ink)] leading-snug mt-1 group-hover:text-[var(--ox)] transition-colors">
                      <Link to={`/learn/briefs/${brief.id}`}>
                        {brief.title}
                      </Link>
                    </h2>
                    <p className="font-sans text-xs opacity-85 mt-2 leading-relaxed line-clamp-3">
                      {brief.description}
                    </p>
                  </div>

                  {/* Objective & Deliverables snippet */}
                  <div className="p-2.5 border border-[var(--line)] bg-[var(--card-subtle)] text-xs font-mono space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="opacity-75">Deliverables:</span>
                      <span className="font-bold">{brief.checklist.length} checklist items</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="opacity-75">Handoff:</span>
                      <span className="font-bold uppercase text-[var(--ox)]">→ Department 02 (Create)</span>
                    </div>
                  </div>

                  {/* Skills Unlocked Badges */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="font-mono text-[10px] font-bold opacity-70 mr-1 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[var(--ox)]" /> Unlocks:
                    </span>
                    {brief.skillsUnlocked.map((sId) => (
                      <span
                        key={sId}
                        className="font-mono text-[10px] px-1.5 py-0.5 border border-[var(--line)] bg-[var(--bg)] text-[var(--ink)]"
                      >
                        {sId}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 mt-4 border-t-2 border-[var(--line)]">
                  {activeProject ? (
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-[var(--ox)]">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Active in Create
                      </span>
                      <Link
                        to={`/learn/briefs/${brief.id}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 border-2 border-[var(--line)] bg-[var(--ink)] text-[var(--bg)] font-display font-bold text-xs hover:bg-[var(--ox)] transition-colors shadow-hard-xs cursor-pointer"
                      >
                        <span>Open Brief</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  ) : (
                    <Link
                      to={`/learn/briefs/${brief.id}`}
                      className="flex items-center justify-between w-full px-4 py-2 border-2 border-[var(--line)] bg-[var(--bg)] text-[var(--ink)] font-display font-extrabold text-xs hover:bg-[var(--acid)] hover:text-[#171717] transition-all shadow-hard-xs cursor-pointer"
                    >
                      <span className="inline-flex items-center gap-1.5">
                        <Rocket className="w-3.5 h-3.5" />
                        <span>Inspect &amp; Start Brief</span>
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Handoff Notice */}
      <HandoffNotice
        toDeptName="Create"
        toDeptPath="/create"
        text="Launching any brief creates a synchronized project record in Create and seeds deliverable slots."
      />
    </div>
  );
};

export default BriefRoomPage;

