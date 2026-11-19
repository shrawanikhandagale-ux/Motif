import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Trash2, Compass } from 'lucide-react';
import { Tile, Badge, Button } from '../../../components/ui';
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
      <div className="p-12 border-2 border-[var(--line)] bg-[var(--card-bg)] text-center space-y-4 max-w-xl mx-auto my-12">
        <h2 className="font-display font-bold text-2xl">Project Not Found</h2>
        <p className="font-mono text-sm opacity-80">This studio project may have been archived or removed.</p>
        <Link to="/create"><Button variant="primary" size="sm">Back to Studio</Button></Link>
      </div>
    );
  }

  const handleDelete = () => {
    if (confirm(`Are you sure you want to remove project “${project.title}”?`)) {
      deleteProject();
      navigate('/create');
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <Link
          to="/create"
          className="inline-flex items-center gap-1.5 font-mono text-xs uppercase font-bold text-[var(--ink)] hover:text-[var(--ox)]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Studio Projects</span>
        </Link>
        <button
          type="button"
          onClick={handleDelete}
          className="font-mono text-xs text-red-600 hover:underline inline-flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Delete Project</span>
        </button>
      </div>

      {/* Project Meta Card */}
      <div className="p-6 sm:p-8 border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-[var(--ox)] uppercase tracking-wider">
              {project.clientName || 'Independent Production'}
            </span>
            <span className="opacity-40">·</span>
            <span className="font-mono text-xs opacity-75 inline-flex items-center gap-1">
              <Clock className="w-3 h-3" /> {project.updatedAt}
            </span>
          </div>

          {/* Status selector */}
          <div className="flex items-center gap-1.5">
            {(['in_progress', 'review', 'completed'] as ProjectRecord['status'][]).map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => updateStatus(st)}
                className={`px-2.5 py-1 text-xs font-mono border-2 uppercase font-bold transition-all ${
                  project.status === st
                    ? 'border-[#171717] bg-[var(--acid)] text-[#171717] shadow-hard-sm'
                    : 'border-[var(--line)] bg-[var(--card-bg)] text-[var(--ink)] hover:bg-[var(--line)]/10'
                }`}
              >
                {st.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[var(--ink)] leading-tight">
            {project.title}
          </h1>
          <p className="font-sans text-base opacity-90 mt-2 leading-relaxed">{project.summary}</p>
        </div>

        <div className="flex flex-wrap gap-2 pt-2 border-t border-[var(--line)]/20">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="electric" className="font-mono text-xs">{tag}</Badge>
          ))}
        </div>
      </div>

      <HandoffNotice
        toDeptName="Market"
        toDeptPath="/market"
        text="Once studio checklist milestones are met, deploy these finished assets directly to campaign roadmaps."
      />

      {/* Primary: The Brief's Checklist */}
      {loadingBrief ? (
        <div className="p-8 border-2 border-[var(--line)] bg-[var(--card-bg)] font-mono text-sm text-center opacity-70">
          Loading attached creative brief checklist…
        </div>
      ) : brief ? (
        <ProjectChecklist
          brief={brief}
          isItemCompleted={isChecklistCompleted}
          onToggleItem={toggleChecklistItem}
        />
      ) : (
        <Tile accent="none" shadow="default" className="p-6 space-y-3">
          <span className="font-mono text-xs uppercase font-bold text-[var(--ox)]">Self-Initiated Studio Work</span>
          <h3 className="font-display font-bold text-xl">No Creative Brief Attached</h3>
          <p className="font-sans text-sm opacity-85 leading-relaxed">
            This project was created directly in the studio. You can also start projects from guided academy briefs in Learn to unlock skill map masteries.
          </p>
          <Link to="/learn/paths" className="inline-block pt-2">
            <Button variant="secondary" size="sm">
              <Compass className="w-4 h-4 mr-1.5" />
              <span>Browse Academy Briefs</span>
            </Button>
          </Link>
        </Tile>
      )}

      {/* Production Canvas Assets */}
      <ProjectAssetsSection projectId={project.id} assets={assets} />
    </div>
  );
};

export default ProjectDetailPage;
