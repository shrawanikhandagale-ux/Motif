import React from 'react';
import { Link } from 'react-router-dom';
import { CheckSquare, Square, Sparkles, Map, CheckCircle2 } from 'lucide-react';
import { Brief } from '../../../types';
import { Badge, ProgressBar, Sticker } from '../../../components/ui';

interface ProjectChecklistProps {
  brief: Brief;
  isItemCompleted: (itemId: string) => boolean;
  onToggleItem: (itemId: string) => void;
}

export const ProjectChecklist: React.FC<ProjectChecklistProps> = ({
  brief,
  isItemCompleted,
  onToggleItem,
}) => {
  const total = brief.checklist.length;
  const doneCount = brief.checklist.filter((item) => isItemCompleted(item.id)).length;
  const allDone = total > 0 && doneCount === total;
  const progressPercent = Math.min(Math.round((doneCount / total) * 100), 100);

  return (
    <div className="p-6 sm:p-8 border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b-2 border-[var(--line)]">
        <div>
          <span className="font-mono text-xs uppercase font-bold text-[var(--ox)] tracking-wider">
            Connected Creative Brief
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[var(--ink)] mt-0.5">
            {brief.title}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="oxblood">{brief.deadlineNotice}</Badge>
          <Badge variant="default" className="font-mono text-xs">
            {doneCount}/{total} Complete
          </Badge>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5">
        <ProgressBar
          value={progressPercent}
          label={`Brief Completion: ${progressPercent}%`}
          showValue
          variant={allDone ? 'acid' : 'oxblood'}
          size="md"
        />
      </div>

      {/* Completed celebration banner */}
      {allDone && (
        <div className="p-5 border-2 border-[#171717] bg-[var(--acid)] text-[#171717] shadow-hard flex flex-wrap items-center justify-between gap-4 animate-in fade-in">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[var(--ox)]" />
              <h3 className="font-display font-extrabold text-lg sm:text-xl">
                Brief Completed · Competencies Illuminated!
              </h3>
            </div>
            <p className="font-sans text-xs sm:text-sm font-medium opacity-90 max-w-xl">
              All deliverable requirements satisfied. The associated competencies are now illuminated on your Skill Map.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Sticker variant="oxblood" rotation="cw">100% Shipped</Sticker>
            <Link
              to="/learn/map"
              className="inline-flex items-center gap-1.5 px-3 py-2 border-2 border-[#171717] bg-[#171717] text-[#F1EBDD] font-mono text-xs font-bold uppercase hover:bg-[var(--ox)] transition-colors shadow-hard-sm"
            >
              <Map className="w-3.5 h-3.5" />
              <span>View On Skill Map</span>
            </Link>
          </div>
        </div>
      )}

      {/* Interactive Checklist Items */}
      <div className="space-y-2.5">
        <span className="font-mono text-xs uppercase font-bold opacity-75 block">
          Required Deliverable Milestones (Tick every item to complete brief):
        </span>

        {brief.checklist.map((item) => {
          const checked = isItemCompleted(item.id);

          return (
            <button
              key={item.id}
              type="button"
              role="checkbox"
              aria-checked={checked}
              onClick={() => onToggleItem(item.id)}
              className={`w-full text-left p-3.5 border-2 transition-all flex items-center gap-3.5 ${
                checked
                  ? 'border-[var(--line)] bg-[var(--card-subtle)] text-[var(--ink)]'
                  : 'border-[var(--line)] bg-[var(--bg)] hover:border-[var(--ox)] text-[var(--ink)]'
              } focus-visible:outline-2 focus-visible:outline-[var(--ox)]`}
            >
              {checked ? (
                <CheckSquare className="w-5 h-5 text-[var(--ox)] shrink-0" />
              ) : (
                <Square className="w-5 h-5 opacity-40 shrink-0" />
              )}
              <span
                className={`font-sans text-sm sm:text-base leading-snug ${
                  checked ? 'line-through opacity-60' : 'font-medium'
                }`}
              >
                {item.text}
              </span>
            </button>
          );
        })}
      </div>

      {/* Skills unlocked footer */}
      <div className="pt-4 border-t border-[var(--line)]/20 flex flex-wrap items-center gap-2">
        <span className="font-mono text-xs font-bold opacity-80 mr-1 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-[var(--ox)]" />
          <span>Competencies bound to this brief:</span>
        </span>
        {brief.skillsUnlocked.map((sId) => (
          <Badge
            key={sId}
            variant={allDone ? 'acid' : 'electric'}
            className="font-mono text-xs"
          >
            {sId} {allDone && '★ Illuminated'}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default ProjectChecklist;

