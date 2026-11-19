import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, CheckCircle2, ArrowLeft, Play, Sparkles, FolderPlus } from 'lucide-react';
import { SectionHeading, Tile, Badge, Button, ProgressBar } from '../../../components/ui';
import { usePath } from '../hooks';
import { useProgress } from '../../../hooks';

export const PathDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { path, loading } = usePath(id || '');
  const { enrolments, enrol, completedItems, completeLesson } = useProgress();

  if (loading) return <div className="p-12 text-center font-mono text-sm opacity-70">Loading curriculum…</div>;

  if (!path) {
    return (
      <div className="p-12 border-2 border-[var(--line)] bg-[var(--card-bg)] text-center space-y-4">
        <p className="font-mono text-sm">Curriculum track not found.</p>
        <Link to="/learn/paths"><Button variant="secondary" size="sm">Back to Tracks</Button></Link>
      </div>
    );
  }

  const isEnrolled = enrolments.some((e) => e.pathId === path.id);
  const totalLessons = path.stages.reduce((acc, s) => acc + s.lessons.length, 0);
  const finishedCount = path.stages.reduce(
    (acc, s) => acc + s.lessons.filter((l) => completedItems.some((c) => c.targetId === l.id)).length, 0
  );
  const progressPercent = Math.min(Math.round((finishedCount / totalLessons) * 100), 100);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <Link to="/learn/paths" className="inline-flex items-center gap-1.5 font-mono text-xs uppercase font-bold text-[var(--ink)] hover:text-[var(--ox)]">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to All Curriculum Tracks</span>
      </Link>

      {/* Header Banner */}
      <div className="p-6 sm:p-8 border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Badge variant="oxblood">{path.domain}</Badge>
            <Badge variant="default">{path.level}</Badge>
            <span className="font-mono text-xs opacity-75 inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {path.estimatedHours} Hours
            </span>
          </div>
          <div>
            {isEnrolled ? (
              <Badge variant="acid" className="text-[#171717] font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-[var(--ox)]" /> Active Enrolment
              </Badge>
            ) : (
              <Button variant="primary" size="md" onClick={() => enrol(path.id)}>
                <FolderPlus className="w-4 h-4 mr-2" /> Enrol in Track
              </Button>
            )}
          </div>
        </div>

        <div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[var(--ink)] tracking-tight">{path.title}</h1>
          <p className="font-mono text-sm opacity-80 mt-1">{path.subtitle}</p>
          <p className="font-sans text-base opacity-90 mt-3 leading-relaxed max-w-3xl">{path.description}</p>
        </div>

        {isEnrolled && (
          <div className="pt-2">
            <ProgressBar value={progressPercent} label={`Track progress: ${progressPercent}% completed`} showValue variant="oxblood" size="md" />
          </div>
        )}
      </div>

      {/* Stages List */}
      <div className="space-y-6">
        <SectionHeading as="h2" kicker="Syllabus" title="CURRICULUM" skewWord="stages" description="What you will construct at each milestone." />

        {path.stages.map((stage) => (
          <Tile key={stage.id} accent="none" shadow="default" className="p-6 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b-2 border-[var(--line)]">
              <div>
                <span className="font-mono text-xs uppercase font-bold text-[var(--ox)] tracking-wider">Stage 0{stage.order}</span>
                <h3 className="font-display font-bold text-2xl text-[var(--ink)]">{stage.title}</h3>
              </div>
              {stage.deliverable && (
                <div className="p-2 border-2 border-[var(--line)] bg-[var(--acid)] text-[#171717] font-mono text-xs font-bold flex items-center gap-1.5 shadow-hard-sm">
                  <Sparkles className="w-3.5 h-3.5 text-[var(--ox)]" />
                  <span>Output: {stage.deliverable}</span>
                </div>
              )}
            </div>

            <div className="space-y-3">
              {stage.lessons.map((lesson) => {
                const done = completedItems.some((c) => c.targetId === lesson.id);
                return (
                  <div key={lesson.id} className="p-3.5 border-2 border-[var(--line)] bg-[var(--card-subtle)] flex flex-wrap items-center justify-between gap-3">
                    <div className="space-y-1 max-w-lg">
                      <div className="flex items-center gap-2">
                        <Badge variant="default" className="text-[10px] uppercase font-mono">{lesson.format}</Badge>
                        <span className="font-mono text-xs opacity-75">{lesson.durationMinutes} min</span>
                      </div>
                      <h4 className="font-sans font-bold text-sm sm:text-base text-[var(--ink)]">{lesson.title}</h4>
                      <p className="font-sans text-xs opacity-80 leading-normal">{lesson.summary}</p>
                    </div>
                    <div>
                      {done ? (
                        <span className="inline-flex items-center gap-1 font-mono text-xs font-bold text-[var(--ox)]">
                          <CheckCircle2 className="w-4 h-4" /> Completed
                        </span>
                      ) : (
                        <Button variant="secondary" size="sm" onClick={() => completeLesson(lesson.id, lesson.skillId)}>
                          <Play className="w-3 h-3 mr-1.5" /> Mark Done
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Tile>
        ))}
      </div>

      {/* Capstone Brief Callout */}
      {path.briefId && (
        <div className="p-6 border-2 border-[var(--line)] bg-[var(--electric)]/20 shadow-hard flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="font-mono text-xs uppercase font-bold text-[var(--ox)]">Hands-on Capstone</span>
            <h3 className="font-display font-bold text-xl text-[var(--ink)] mt-0.5">Ready to put this into practice?</h3>
            <p className="font-sans text-xs sm:text-sm opacity-85 mt-1">{path.handsOffPrompt || 'Execute the creative brief and export your deliverables.'}</p>
          </div>
          <Link to={`/learn/briefs/${path.briefId}`}>
            <Button variant="primary" size="md"><span>Open Creative Brief</span></Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default PathDetailPage;
