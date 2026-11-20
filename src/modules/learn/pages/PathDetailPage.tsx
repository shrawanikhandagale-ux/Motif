import React, { useState } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import {
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  FolderPlus,
  RefreshCw,
  HelpCircle,
  Map,
} from 'lucide-react';
import { Badge, Button } from '../../../components/ui';
import { usePath } from '../hooks';
import { useProgress } from '../../../hooks';

export const PathDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const fromAnalyze = searchParams.get('from') === 'analyze';
  const analyzeReason = searchParams.get('reason');

  const { path, loading } = usePath(id || '');
  const { enrolments, enrol, completedItems, completeLesson } = useProgress();

  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);

  if (loading) {
    return <div className="p-12 text-center font-mono text-sm opacity-70">Loading curriculum…</div>;
  }

  if (!path) {
    return (
      <div className="p-12 border-2 border-[var(--line)] bg-[var(--card-bg)] text-center space-y-4">
        <p className="font-mono text-sm">Curriculum track not found.</p>
        <Link to="/learn/paths">
          <Button variant="secondary" size="sm">Back to Tracks</Button>
        </Link>
      </div>
    );
  }

  const isEnrolled = enrolments.some((e) => e.pathId === path.id);
  const allLessons = path.stages.flatMap((stage) =>
    stage.lessons.map((lesson) => ({
      ...lesson,
      stageOrder: stage.order,
      stageTitle: stage.title,
    }))
  );

  const totalLessons = allLessons.length;
  const completedLessonIds = completedItems
    .filter((c) => c.type === 'lesson')
    .map((c) => c.targetId || c.id);

  const finishedCount = allLessons.filter((l) =>
    completedLessonIds.includes(l.id)
  ).length;

  const progressPercent = totalLessons > 0 ? Math.min(Math.round((finishedCount / totalLessons) * 100), 100) : 0;
  const activeLesson = allLessons[activeLessonIndex] || allLessons[0];
  const isLessonDone = activeLesson ? completedLessonIds.includes(activeLesson.id) : false;

  // Curated knowledge check question tailored to current lesson or track
  const quiz = {
    question: `In production "${path.title}", what is the primary operational rule for "${activeLesson?.title}"?`,
    options: [
      'Document the worldview in plain language before selecting typeface tokens or assets.',
      'Rely on algorithmic templates to speed up multi-channel delivery.',
      'Defer tactile contrast until post-launch client revisions.',
    ],
    correctIndex: 0,
  };

  const handleToggleComplete = () => {
    if (!activeLesson) return;
    if (!isEnrolled) {
      enrol(path.id);
    }
    completeLesson(activeLesson.id, activeLesson.skillId);
  };

  const handleNextLesson = () => {
    if (activeLessonIndex < allLessons.length - 1) {
      setActiveLessonIndex(activeLessonIndex + 1);
      setSelectedQuizOption(null);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Back button */}
      <div className="flex items-center justify-between">
        <Link
          to="/learn/paths"
          className="inline-flex items-center gap-1.5 font-mono text-xs uppercase font-bold text-[var(--ink)] hover:text-[var(--ox)] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>← All Curriculum Tracks</span>
        </Link>
        <span className="font-mono text-xs opacity-65 hidden sm:inline">
          WORKBENCH MODE
        </span>
      </div>

      {/* Closed-loop recommendation if arriving from Analyze */}
      {fromAnalyze && (
        <div className="p-4 border-2 border-[#171717] bg-[var(--acid)] text-[#171717] shadow-hard flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase font-bold text-[var(--ox)]">
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Closed-Loop Telemetry Recommendation</span>
            </div>
            <h3 className="font-display font-bold text-base">Targeted Curriculum for Live Execution Gap</h3>
            {analyzeReason && <p className="font-sans text-xs opacity-90">Reason: {analyzeReason}</p>}
          </div>
          {!isEnrolled && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => enrol(path.id)}
              className="bg-[#171717] text-[#FAF7EE] shadow-hard-xs"
            >
              <FolderPlus className="w-3.5 h-3.5 mr-1.5" />
              <span>Enrol &amp; Close Loop</span>
            </Button>
          )}
        </div>
      )}

      {/* Acid Header Banner (.c .ac) */}
      <div className="border-2 border-[var(--line)] bg-[var(--acid)] text-[#171717] p-6 sm:p-8 shadow-hard-md space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="font-mono text-xs uppercase font-bold tracking-wider text-[#171717]">
            {path.domain} · {path.level} · {path.estimatedHours}h Blueprint
          </span>
          <div className="flex items-center gap-2">
            {isEnrolled ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 border border-[#171717] bg-[#171717] text-[#FAF7EE] font-mono text-xs font-bold shadow-hard-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--acid)]" /> Enrolled
              </span>
            ) : (
              <button
                type="button"
                onClick={() => enrol(path.id)}
                className="px-3.5 py-1.5 border-2 border-[#171717] bg-[#171717] text-[#FAF7EE] font-mono text-xs font-bold hover:bg-[#171717]/90 transition-colors shadow-hard-xs cursor-pointer"
              >
                + Enrol in Track
              </button>
            )}
          </div>
        </div>

        <div>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-[#171717] tracking-tight leading-tight">
            {path.title}
          </h1>
          <p className="font-sans text-sm sm:text-base text-[#171717]/85 mt-2 max-w-3xl leading-relaxed">
            {path.description}
          </p>
        </div>

        {/* Tactical dot-matrix brutalist progress bar */}
        <div className="space-y-1.5 pt-2">
          <div className="flex items-center justify-between font-mono text-xs font-bold text-[#171717]">
            <span>{finishedCount} of {totalLessons} lessons completed</span>
            <span>{progressPercent}% Mastered</span>
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

      {/* Main Split-Screen Workbench (Left: Lesson Roster, Right: Interactive Reader) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* Left Column: Lesson Roster */}
        <div className="md:col-span-1 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b-2 border-[var(--line)]">
            <span className="font-mono text-xs font-bold uppercase tracking-wider opacity-70">
              Lesson Roster
            </span>
            <span className="font-mono text-xs opacity-60">
              {totalLessons} units
            </span>
          </div>

          <div className="space-y-1">
            {allLessons.map((lesson, idx) => {
              const done = completedLessonIds.includes(lesson.id);
              const isActive = idx === activeLessonIndex;
              const lessonNum = `0${idx + 1}`.slice(-2);

              return (
                <button
                  key={lesson.id}
                  type="button"
                  onClick={() => {
                    setActiveLessonIndex(idx);
                    setSelectedQuizOption(null);
                  }}
                  className={`w-full text-left p-3 border-2 border-[var(--line)] -mb-[2px] flex items-center justify-between gap-3 transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[var(--ink)] text-[var(--bg)] font-bold shadow-hard-sm z-10 relative'
                      : 'bg-[var(--card-bg)] text-[var(--ink)] hover:bg-[var(--elec)] hover:text-[#171717]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="font-mono text-xs opacity-75 shrink-0">
                      {lessonNum}
                    </span>
                    <span className="text-xs truncate">
                      {lesson.title}
                    </span>
                  </div>

                  <div className="shrink-0 flex items-center">
                    {done ? (
                      <span className="font-mono text-xs font-black text-[var(--ox)] bg-[#FAF7EE] px-1 border border-[#171717]">
                        ✓
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono opacity-50">
                        {lesson.durationMinutes}m
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Stage deliverables callout */}
          <div className="p-3.5 border-2 border-[var(--line)] bg-[var(--card-subtle)] space-y-2 mt-4">
            <span className="font-mono text-[10px] uppercase font-bold text-[var(--ox)] block">
              Stage Milestone Deliverables
            </span>
            {path.stages.map((stage) => (
              <div key={stage.id} className="text-xs font-mono border-t border-[var(--line)]/20 pt-1.5">
                <span className="font-bold block">Stage 0{stage.order}: {stage.title}</span>
                <span className="opacity-75 text-[11px]">→ {stage.deliverable}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Interactive Lesson Reader */}
        <div className="md:col-span-2 border-2 border-[var(--line)] bg-[var(--card-bg)] p-6 sm:p-8 shadow-hard-sm space-y-6">
          {activeLesson ? (
            <>
              {/* Header */}
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-[var(--line)]/20 mb-3">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--ox)]">
                    Lesson 0{activeLessonIndex + 1} · Stage 0{activeLesson.stageOrder}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs opacity-75">
                      {activeLesson.durationMinutes} min
                    </span>
                    <Badge variant="default" className="text-[10px] uppercase font-mono">
                      {activeLesson.format}
                    </Badge>
                  </div>
                </div>

                <h2 className="font-display font-black text-2xl sm:text-4xl text-[var(--ink)] tracking-tight leading-tight">
                  {activeLesson.title}
                </h2>

                <p className="font-sans text-sm sm:text-base opacity-90 mt-3 leading-relaxed">
                  {activeLesson.summary}
                </p>
              </div>

              {/* Key Takeaways */}
              <div className="p-4 border-2 border-[var(--line)] bg-[var(--card-subtle)] space-y-2">
                <h4 className="font-mono text-xs uppercase font-bold tracking-wider text-[var(--ink)]">
                  Key Takeaways &amp; Execution Rules
                </h4>
                <ul className="space-y-1.5 font-sans text-xs sm:text-sm opacity-90 list-disc list-inside">
                  <li>Distill the primary lesson thesis into one declarative sentence before opening design tools.</li>
                  <li>Find one real-world independent counter-example in print or underground publishing.</li>
                  <li>Directly apply these parameters to your next practical brief deliverable.</li>
                </ul>
              </div>

              {/* Knowledge Check Card (.c .el) */}
              <div className="border-2 border-[#171717] bg-[var(--elec)] text-[#171717] p-4 sm:p-5 shadow-hard-xs space-y-3">
                <div className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider">
                  <HelpCircle className="w-3.5 h-3.5 fill-current" />
                  <span>Knowledge Check</span>
                </div>

                <p className="font-sans text-xs sm:text-sm font-bold">
                  {quiz.question}
                </p>

                <div className="space-y-2 pt-1">
                  {quiz.options.map((option, optIdx) => {
                    const isSelected = selectedQuizOption === optIdx;
                    const isCorrect = optIdx === quiz.correctIndex;

                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setSelectedQuizOption(optIdx)}
                        className={`w-full text-left p-2.5 text-xs font-mono border-2 border-[#171717] transition-all cursor-pointer flex items-center justify-between gap-2 ${
                          isSelected
                            ? isCorrect
                              ? 'bg-[var(--acid)] text-[#171717] font-bold shadow-hard-xs'
                              : 'bg-[var(--ox)] text-[#FAF7EE] font-bold shadow-hard-xs'
                            : 'bg-[#FAF7EE] text-[#171717] hover:bg-[#FAF7EE]/80'
                        }`}
                      >
                        <span>{option}</span>
                        {isSelected && (
                          <span className="font-bold shrink-0">
                            {isCorrect ? '✓ Correct' : '✗ Try again'}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t-2 border-[var(--line)] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleToggleComplete}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-display font-extrabold border-2 border-[#171717] transition-all cursor-pointer ${
                      isLessonDone
                        ? 'bg-[var(--acid)] text-[#171717] shadow-hard-xs'
                        : 'bg-[var(--ink)] text-[var(--bg)] hover:bg-[var(--ox)]'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{isLessonDone ? 'Completed ✓ (Re-verify)' : 'Mark Lesson Complete'}</span>
                  </button>

                  <Link
                    to="/learn/map"
                    className="inline-flex items-center gap-1 font-mono text-xs opacity-75 hover:opacity-100 hover:underline"
                  >
                    <Map className="w-3.5 h-3.5" />
                    <span>Skill Map →</span>
                  </Link>
                </div>

                {activeLessonIndex < allLessons.length - 1 ? (
                  <button
                    type="button"
                    onClick={handleNextLesson}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-display font-extrabold border-2 border-[var(--line)] bg-[var(--card-subtle)] hover:bg-[var(--elec)] hover:text-[#171717] transition-colors cursor-pointer"
                  >
                    <span>Next Lesson</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : path.briefId ? (
                  <Link
                    to={`/learn/briefs/${path.briefId}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-display font-extrabold border-2 border-[#171717] bg-[var(--ox)] text-[#FAF7EE] shadow-hard-sm"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Start Capstone in Create →</span>
                  </Link>
                ) : null}
              </div>
            </>
          ) : (
            <p className="font-mono text-sm opacity-70">No lesson selected.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PathDetailPage;
