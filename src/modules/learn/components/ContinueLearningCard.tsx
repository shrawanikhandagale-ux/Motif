import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Sparkles } from 'lucide-react';
import { Tile, ProgressBar, Button, Badge } from '../../../components/ui';
import { useProgress } from '../../../hooks';
import { usePath } from '../hooks';

export const ContinueLearningCard: React.FC = () => {
  const { enrolments, completedItems } = useProgress();
  const activeEnrolment = enrolments[0];
  const { path } = usePath(activeEnrolment?.pathId || 'path-branding-01');

  const totalLessons = path ? path.stages.reduce((acc, s) => acc + s.lessons.length, 0) : 4;
  const completedCount = completedItems.filter((c) => c.type === 'lesson').length;
  const progressPercent = Math.min(Math.round((completedCount / totalLessons) * 100), 100);

  return (
    <Tile accent="none" shadow="ox" className="p-6 sm:p-8 flex flex-col justify-between space-y-6 relative overflow-hidden">
      <div className="space-y-4 relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Badge variant="oxblood" className="font-mono text-xs uppercase font-bold tracking-wider">
              Active Curriculum
            </Badge>
            <span className="font-mono text-xs opacity-75">{path?.domain || 'Branding'} · {path?.estimatedHours || 4}h Blueprint</span>
          </div>
          <span className="font-mono text-xs px-2 py-0.5 border border-[var(--line)] bg-[var(--card-subtle)] text-[var(--ink)] font-bold">
            Track 01
          </span>
        </div>

        <div>
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-[var(--ink)] tracking-tight leading-tight">
            {path?.title || 'Offscript Identity Systems'}
          </h2>
          <p className="text-sm sm:text-base opacity-85 mt-2 font-sans leading-relaxed max-w-2xl">
            {path?.description || 'Learn how to establish gritty editorial type scales and tactile zine guidelines.'}
          </p>
        </div>

        <div className="pt-2 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[var(--ox)]" />
              <span>Current Stage: Visual Architecture &amp; Type Scale</span>
            </span>
            <span className="font-bold">{progressPercent || 75}% Mastered</span>
          </div>
          <ProgressBar
            value={progressPercent || 75}
            showValue={false}
            variant="oxblood"
            size="md"
          />
        </div>
      </div>

      <div className="pt-4 border-t-2 border-[var(--line)] flex flex-wrap items-center justify-between gap-4 relative z-10">
        <div className="font-mono text-xs opacity-80">
          Next output: <strong className="font-bold text-[var(--ink)]">Risograph Separation Plate (22 min)</strong>
        </div>
        <Link to={`/learn/paths/${path?.id || 'path-branding-01'}`}>
          <Button variant="primary" size="md">
            <Play className="w-3.5 h-3.5 mr-2" />
            <span>Resume Lesson</span>
          </Button>
        </Link>
      </div>
    </Tile>
  );
};

export default ContinueLearningCard;
