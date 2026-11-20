import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Trash2, Compass } from 'lucide-react';
import { HandoffNotice } from '../../../components/shared/HandoffNotice';
import { ProjectChecklist, ProjectAssetsSection } from '../components';
import { useProject } from '../hooks';
import { ProjectRecord } from '../../../types';

export const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    project,
    brief,
    assets,
    loadingBrief,
    toggleChecklistItem,
    isChecklistCompleted,
    updateStatus,
    deleteProject,
  } = useProject(id || '');


  if (!project) {
    return (
      <div className="p-12 border-2 border-[var(--line)] bg-[var(--card-bg)] text-center space-y-4 max-w-xl mx-auto my-12 shadow-hard">
        <h2 className="font-display font-black text-2xl">Project Not Found</h2>
        <p className="font-mono text-sm opacity-80">This studio project may have been archived or removed.</p>
        <Link
          to="/create"
          className="inline-flex items-center gap-2 px-4 py-2 border-2 border-[#171717] bg-[var(--ink)] text-[var(--bg)] font-display font-bold text-xs"
        >
          Back to Studio Roster
        </Link>
      </div>
    );
  }

  const handleDelete = () => {
    if (confirm(`Are you sure you want to remove project “${project.title}”?`)) {
      deleteProject();
      navigate('/create');
    }
  };

  const stages: Array<{ id: ProjectRecord['status']; label: string; pct: number }> = [
    { id: 'in_progress', label: 'In Progress', pct: 40 },
    { id: 'review', label: 'Review', pct: 75 },
    { id: 'completed', label: 'Delivered', pct: 100 },
  ];

  const currentStage = stages.find((s) => s.id === project.status) || stages[0];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Return & Danger Controls */}
      <div className="flex items-center justify-between">
        <Link
          to="/create"
          className="inline-flex items-center gap-1.5 font-mono text-xs uppercase font-bold text-[var(--ink)] hover:text-[var(--ox)] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>← Studio Roster</span>
        </Link>
        <button
          type="button"
          onClick={handleDelete}
          className="font-mono text-xs text-red-600 hover:underline inline-flex items-center gap-1 cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Delete Project</span>
        </button>
      </div>

      {/* Primary Project Hero Card (.c .ox styling) */}
      <div className="border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard-md p-6 sm:p-8 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold px-2 py-0.5 border border-[var(--line)] bg-[var(--card-subtle)] text-[var(--ox)] uppercase tracking-wider">
              {project.clientName || 'Independent Production'}
            </span>
            <span className="opacity-40">·</span>
            <span className="font-mono text-xs opacity-75 inline-flex items-center gap-1">
              <Clock className="w-3 h-3" /> Updated {project.updatedAt}
            </span>
          </div>

          <span className="font-mono text-xs opacity-60">ID: {project.id}</span>
        </div>

        <div>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-[var(--ink)] tracking-tight leading-tight">
            {project.title}
          </h1>
          <p className="font-sans text-sm sm:text-base opacity-90 mt-2 leading-relaxed max-w-3xl">
            {project.summary}
          </p>
        </div>

        {/* Interactive Stage Selector Buttons from prototype (motif-v2.html:106) */}
        <div className="pt-3 border-t border-[var(--line)]/20 space-y-2">
          <div className="flex items-center justify-between font-mono text-xs">
            <span className="font-bold opacity-80 uppercase tracking-wider">Studio Stage (Click to move):</span>
            <span className="font-bold text-[var(--ox)]">{currentStage.label} ({currentStage.pct}%)</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {stages.map((st) => {
              const isActive = project.status === st.id;
              return (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => updateStatus(st.id)}
                  className={`px-3 py-1.5 text-xs font-mono font-bold uppercase border-2 transition-all cursor-pointer ${
                    isActive
                      ? 'border-[#171717] bg-[var(--ink)] text-[var(--bg)] shadow-hard-xs'
                      : 'border-[var(--line)] bg-[var(--bg)] text-[var(--ink)] hover:bg-[var(--card-subtle)]'
                  }`}
                >
                  {st.label} {isActive && '✓'}
                </button>
              );
            })}
          </div>

          {/* Dot-matrix brutalist progress bar */}
          <div
            className="h-3 border-2 border-[var(--line)] bg-[radial-gradient(circle,var(--ink)_35%,transparent_37%)_0_0/6px_6px] overflow-hidden mt-2"
            role="progressbar"
            aria-valuenow={currentStage.pct}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full bg-[var(--ox)] transition-all duration-500"
              style={{ width: `${currentStage.pct}%` }}
            />
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[var(--line)]/20">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] px-2 py-0.5 border border-[var(--line)] bg-[var(--bg)] text-[var(--ink)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <HandoffNotice
        toDeptName="Market"
        toDeptPath="/market"
        text="Once studio checklist milestones are met, deploy these finished assets directly to campaign roadmaps in Market."
      />

      {/* Primary: The Brief's Checklist or Self-Initiated Canvas */}
      {loadingBrief ? (
        <div className="p-8 border-2 border-[var(--line)] bg-[var(--card-bg)] font-mono text-sm text-center opacity-70">
          Loading connected creative brief checklist…
        </div>
      ) : brief ? (
        <ProjectChecklist
          brief={brief}
          isItemCompleted={isChecklistCompleted}
          onToggleItem={toggleChecklistItem}
        />
      ) : (
        <div className="border-2 border-[var(--line)] bg-[var(--card-bg)] p-6 sm:p-8 shadow-hard-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--line)]/20">
            <div>
              <span className="font-mono text-xs uppercase font-bold text-[var(--ox)] block">
                Self-Initiated Studio Production
              </span>
              <h3 className="font-display font-extrabold text-xl text-[var(--ink)] mt-0.5">
                Creative Notes &amp; Tactical Parameters
              </h3>
            </div>
            <span className="font-mono text-xs opacity-75">Unconstrained Canvas</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
            <div className="p-3.5 border border-[var(--line)] bg-[var(--card-subtle)] space-y-1.5">
              <span className="font-bold block text-[var(--ink)]">Tactile Typography Rules:</span>
              <p className="opacity-80 leading-normal">
                Header: Bricolage Grotesque 800 with tight optical tracking.<br />
                Body / Meta: DM Mono 400 with 2px ink borders.
              </p>
            </div>
            <div className="p-3.5 border border-[var(--line)] bg-[var(--card-subtle)] space-y-1.5">
              <span className="font-bold block text-[var(--ink)]">Contrast Token Hierarchy:</span>
              <p className="opacity-80 leading-normal">
                Primary: Ink (#171717) and Ivory (#F1EBDD).<br />
                Accents: Oxblood (#702C35), Acid (#D9E638), Electric (#A8B8E8).
              </p>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs font-mono">
            <span className="opacity-75">Need guided requirements and skill unlocking?</span>
            <Link
              to="/learn/briefs"
              className="inline-flex items-center gap-1 font-bold text-[var(--ox)] hover:underline"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Browse Academy Briefs →</span>
            </Link>
          </div>
        </div>
      )}

      {/* Production Canvas Assets Section */}
      <ProjectAssetsSection projectId={project.id} assets={assets} />
    </div>
  );
};

export default ProjectDetailPage;
