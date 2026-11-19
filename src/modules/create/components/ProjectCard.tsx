import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, FileText } from 'lucide-react';
import { Tile, Badge, Button, ProgressBar } from '../../../components/ui';
import { ProjectRecord } from '../../../types';
import { useProgress } from '../../../hooks';

interface ProjectCardProps {
  project: ProjectRecord;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { completedChecklistIds } = useProgress();

  const getStatusBadgeVariant = (status: ProjectRecord['status']) => {
    switch (status) {
      case 'completed':
        return 'acid';
      case 'review':
        return 'electric';
      case 'in_progress':
        return 'oxblood';
      default:
        return 'default';
    }
  };

  // Approximate brief completion if connected
  const hasBrief = Boolean(project.briefId);
  const isCompleted = project.status === 'completed';

  return (
    <Tile accent="none" shadow="default" className="p-6 flex flex-col justify-between space-y-5">
      <div className="space-y-4">
        {/* Header row */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <Badge variant={getStatusBadgeVariant(project.status)} className="capitalize font-mono text-xs">
              {project.status.replace('_', ' ')}
            </Badge>
            {hasBrief && (
              <Badge variant="default" className="font-mono text-[10px] uppercase">
                <FileText className="w-3 h-3 mr-1" /> Brief Attached
              </Badge>
            )}
          </div>
          <span className="font-mono text-xs opacity-75 inline-flex items-center gap-1">
            <Clock className="w-3 h-3" /> {project.updatedAt}
          </span>
        </div>

        {/* Title & Client */}
        <div>
          {project.clientName && (
            <span className="font-mono text-xs text-[var(--ox)] uppercase font-bold tracking-wider">
              {project.clientName}
            </span>
          )}
          <h3 className="font-display font-extrabold text-2xl text-[var(--ink)] leading-snug mt-0.5">
            {project.title}
          </h3>
          <p className="font-sans text-sm opacity-85 mt-2 leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tags.map((t) => (
            <Badge key={t} variant="electric" className="text-[10px] font-mono">
              {t}
            </Badge>
          ))}
        </div>

        {/* Brief checklist hint if connected */}
        {hasBrief && (
          <div className="p-3 border-2 border-[var(--line)] bg-[var(--card-subtle)] space-y-1.5">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="font-bold opacity-80">Deliverable Checklist</span>
              <span className="opacity-75">{isCompleted ? '100% Complete' : 'In Progress'}</span>
            </div>
            <ProgressBar
              value={isCompleted ? 100 : completedChecklistIds.length > 0 ? 50 : 25}
              variant={isCompleted ? 'acid' : 'oxblood'}
              size="sm"
            />
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-[var(--line)]/20 flex items-center justify-between">
        <span className="font-mono text-xs opacity-75">{project.id}</span>
        <Link to={`/create/projects/${project.id}`}>
          <Button variant="primary" size="sm">
            <span>Open Studio</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </Link>
      </div>
    </Tile>
  );
};

export default ProjectCard;
