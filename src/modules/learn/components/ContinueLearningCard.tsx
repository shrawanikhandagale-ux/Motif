import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { useProgress } from '../../../hooks';
import { usePath, usePaths } from '../hooks';

export const ContinueLearningCard: React.FC = () => {
  const { enrolments, completedItems } = useProgress();
  const { paths } = usePaths();

  // Find active enrolment or default to first path
  const activeEnrolment = enrolments[0];
  const activePathId = activeEnrolment?.pathId || (paths[0]?.id ?? 'path-branding-01');
  const { path } = usePath(activePathId);

  const allLessons = path ? path.stages.flatMap((s) => s.lessons) : [];
  const totalLessons = allLessons.length || 4;

  const completedLessonIds = completedItems
    .filter((c) => c.type === 'lesson')
    .map((c) => c.id);

  const completedCount = allLessons.filter((l) => completedLessonIds.includes(l.id)).length;
  const progressPercent = Math.min(Math.round((completedCount / totalLessons) * 100), 100);

  // Find first uncompleted lesson
  const nextLesson = allLessons.find((l) => !completedLessonIds.includes(l.id)) || allLessons[0];

  return (
    <div className="border-2 border-[var(--line)] bg-[var(--acid)] text-[#171717] p-6 sm:p-8 shadow-hard-md relative flex flex-col justify-between">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#171717]" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#171717]">
              Continue learning
            </span>
          </div>
          <span className="font-mono text-xs px-2 py-0.5 border border-[#171717] bg-[#171717]/10 font-bold">
            {path?.domain || 'Branding'} · {path?.estimatedHours || 4}h Blueprint
          </span>
        </div>

        <h2 className="font-display font-black text-2xl sm:text-4xl md:text-5xl text-[#171717] tracking-tight leading-tight my-2">
          {path?.title || 'Offscript Identity Systems'}
        </h2>

        {nextLesson && (
          <p className="font-mono text-xs sm:text-sm text-[#171717]/90 font-medium mt-1">
            <strong className="font-bold">Next:</strong> {nextLesson.title} ({nextLesson.durationMinutes}m {nextLesson.format})
          </p>
        )}

        {/* Tactical dot-matrix brutalist progress bar */}
        <div className="my-4 space-y-1.5">
          <div className="flex items-center justify-between font-mono text-xs text-[#171717] font-bold">
            <span>Curriculum progress</span>
            <span>{completedCount}/{totalLessons} lessons ({progressPercent}%)</span>
          </div>
          <div
            className="h-3.5 border-2 border-[#171717] bg-[radial-gradient(circle,#171717_35%,transparent_37%)_0_0/6px_6px] overflow-hidden"
            role="progressbar"
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full bg-[#171717] transition-all duration-500"
              style={{ width: `${Math.max(progressPercent, 4)}%` }}
            />
          </div>
        </div>
      </div>

      <div className="pt-4 border-t-2 border-[#171717] flex flex-wrap items-center justify-between gap-3">
        <span className="font-mono text-xs text-[#171717]/80">
          Everything completed unlocks nodes on your Skill Map.
        </span>

        <Link
          to={`/learn/paths/${path?.id || 'path-branding-01'}`}
          className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-[#171717] bg-[#171717] text-[#F1EBDD] font-display font-extrabold text-sm hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0_#171717] active:translate-x-[0px] active:translate-y-[0px] transition-all cursor-pointer"
        >
          <BookOpen className="w-4 h-4" />
          <span>Resume lesson →</span>
        </Link>
      </div>
    </div>
  );
};

export default ContinueLearningCard;
