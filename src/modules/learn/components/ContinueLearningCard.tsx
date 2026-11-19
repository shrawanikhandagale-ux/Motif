import React from 'react';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
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
    <Tile accent="none" shadow="default" className="p-6 flex flex-col justify-between space-y-5">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Badge variant="oxblood">Active Path</Badge>
          <span className="font-mono text-xs opacity-75">{path?.domain || 'Branding'} · {path?.estimatedHours || 4}h</span>
        </div>

        <div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[var(--ink)] tracking-tight">
            {path?.title || 'Offscript Identity Systems'}
          </h2>
          <p className="text-sm opacity-85 mt-1 font-sans leading-relaxed">
            {path?.description || 'Learn how to establish gritty editorial type scales and tactile zine guidelines.'}
          </p>
        </div>

        <div className="pt-2">
          <ProgressBar
            value={progressPercent || 75}
            label={`Progress: ${progressPercent || 75}% completed`}
            showValue
            variant="oxblood"
            size="md"
          />
        </div>
      </div>

      <div className="pt-4 border-t border-[var(--line)]/20 flex flex-wrap items-center justify-between gap-3">
        <span className="font-mono text-xs opacity-80">
          Current stage: <b>Visual Architecture &amp; Type</b>
        </span>
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

