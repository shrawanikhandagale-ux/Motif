import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, FileText } from 'lucide-react';
import { ProjectRecord } from '../../../types';
import { useProgress } from '../../../hooks';

interface ProjectCardProps {
  project: ProjectRecord;
  index?: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const { completedChecklistIds } = useProgress();

  const hasBrief = Boolean(project.briefId);
  const isCompleted = project.status === 'completed';
  const trackNum = index !== undefined ? `0${index + 1}`.slice(-2) : undefined;

  const statusLabel = project.status.replace('_', ' ');

  return (
    <div className="border-2 border-[var(--line)] bg-[var(--card-bg)] p-5 flex flex-col justify-between shadow-hard-sm hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-hard-md transition-all group">
      <div>
        {/* Cover banner if index is present */}
        {trackNum && (
          <div
            className="h-24 -m-5 mb-4 border-b-2 border-[var(--line)] p-3 flex items-end justify-between overflow-hidden relative select-none"
            style={{
              backgroundColor: '#702C35',
              backgroundImage: 'radial-gradient(circle, rgba(241,235,221,0.25) 30%, transparent 32%)',
              backgroundSize: '12px 12px',
            }}
          >
            <span className="font-display font-black text-5xl text-[#F1EBDD] tracking-tighter leading-none select-none">
              {trackNum}
            </span>
            <span className="font-mono text-[10px] font-bold uppercase px-2 py-0.5 border border-[#171717] bg-[#FAF7EE] text-[#171717] shadow-hard-xs">
              {project.clientName || 'Studio Project'}
            </span>
          </div>
        )}

        {/* Header row */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 mb-2 border-b border-[var(--line)]/20">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className={`font-mono text-[10px] uppercase font-bold px-2 py-0.5 border ${
                isCompleted
                  ? 'border-[#171717] bg-[var(--acid)] text-[#171717]'
                  : project.status === 'review'
                  ? 'border-[#171717] bg-[var(--elec)] text-[#171717]'
                  : 'border-[var(--line)] bg-[var(--card-subtle)] text-[var(--ink)]'
              }`}
            >
              {statusLabel}
            </span>
            {hasBrief && (
              <span className="font-mono text-[10px] uppercase px-1.5 py-0.5 border border-[var(--line)] bg-[var(--bg)] opacity-80 inline-flex items-center gap-1">
                <FileText className="w-3 h-3 text-[var(--ox)]" /> Brief Attached
              </span>
            )}
          </div>
          <span className="font-mono text-xs opacity-75 inline-flex items-center gap-1">
            <Clock className="w-3 h-3" /> {project.updatedAt}
          </span>
        </div>

        {/* Title & Client */}
        <div>
          {project.clientName && !trackNum && (
            <span className="font-mono text-xs text-[var(--ox)] uppercase font-bold tracking-wider block">
              {project.clientName}
            </span>
          )}
          <h3 className="font-display font-extrabold text-xl text-[var(--ink)] leading-snug group-hover:text-[var(--ox)] transition-colors">
            <Link to={`/create/projects/${project.id}`}>
              {project.title}
            </Link>
          </h3>
          <p className="font-sans text-xs opacity-85 mt-2 leading-relaxed line-clamp-3">
            {project.summary}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-3">
          {project.tags.map((t) => (
            <span
              key={t}
              className="font-mono text-[10px] px-1.5 py-0.5 border border-[var(--line)] bg-[var(--bg)] text-[var(--ink)]"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Deliverable checklist hint */}
        {hasBrief && (
          <div className="p-2.5 border border-[var(--line)] bg-[var(--card-subtle)] space-y-1.5 mt-3">
            <div className="flex items-center justify-between font-mono text-[11px]">
              <span className="font-bold opacity-80">Deliverable Checklist</span>
              <span className="opacity-75">{isCompleted ? '100% Shipped' : 'Milestones in Progress'}</span>
            </div>
            <div
              className="h-2 border border-[var(--line)] bg-[var(--card-bg)] overflow-hidden"
              role="progressbar"
              aria-valuenow={isCompleted ? 100 : completedChecklistIds.length > 0 ? 60 : 30}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="h-full bg-[var(--ox)] transition-all duration-300"
                style={{ width: `${isCompleted ? 100 : completedChecklistIds.length > 0 ? 60 : 30}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="pt-4 mt-4 border-t-2 border-[var(--line)] flex items-center justify-between">
        <span className="font-mono text-xs opacity-60">{project.id}</span>
        <Link
          to={`/create/projects/${project.id}`}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 border-2 border-[var(--line)] bg-[var(--ink)] text-[var(--bg)] font-display font-bold text-xs hover:bg-[var(--ox)] transition-colors shadow-hard-xs cursor-pointer"
        >
          <span>Open Studio</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
