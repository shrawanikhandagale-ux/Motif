import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';
import { useProgress } from '../../../hooks';
import { MOCK_BRIEFS } from '../services/mock/mockBriefs';

export const SuggestedNextStep: React.FC = () => {
  const { projects } = useProgress();
  const brief = MOCK_BRIEFS[0];

  // Check if a project already spawned from this brief
  const hasProject = projects.some((p) => p.briefId === brief.id);

  return (
    <div className="border-2 border-[var(--line)] bg-[var(--elec)] text-[#171717] p-5 flex flex-col justify-between shadow-hard-sm">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Upcoming practical brief</span>
          </div>
          <span className="font-mono text-[10px] px-1.5 py-0.5 border border-[#171717] bg-[#171717] text-[#FAF7EE] font-bold">
            {brief.deadlineNotice || 'Priority'}
          </span>
        </div>

        <h3 className="font-display font-extrabold text-xl text-[#171717] tracking-tight leading-snug mb-2">
          {brief.title}
        </h3>

        <p className="text-xs font-sans text-[#171717]/85 leading-relaxed mb-4">
          {brief.description}
        </p>

        <div className="p-2.5 border border-[#171717]/40 bg-[#171717]/5 text-xs font-mono space-y-1">
          <div className="flex items-center justify-between">
            <span className="opacity-75">Context:</span>
            <span className="font-bold truncate max-w-[180px]">{brief.clientOrContext}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="opacity-75">Deliverables:</span>
            <span className="font-bold">{brief.checklist.length} checklist items</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="opacity-75">Unlocks:</span>
            <span className="font-bold">{brief.skillsUnlocked.length} skill nodes</span>
          </div>
        </div>
      </div>

      <div className="pt-4 mt-4 border-t-2 border-[#171717] flex items-center justify-between">
        <div className="flex items-center gap-1 font-mono text-[11px] text-[#171717]/80">
          <Sparkles className="w-3 h-3 text-[var(--ox)]" />
          <span>Handoff to Create</span>
        </div>

        <Link
          to={`/learn/briefs/${brief.id}`}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 border-2 border-[#171717] bg-[#171717] text-[#FAF7EE] font-display font-bold text-xs hover:bg-[#171717]/90 transition-colors shadow-hard-sm"
        >
          <span>{hasProject ? 'View Brief' : 'Open Brief'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};

export default SuggestedNextStep;
