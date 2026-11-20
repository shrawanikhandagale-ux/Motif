import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { LearnSubNav } from '../components';
import { usePaths } from '../hooks';
import { useProgress } from '../../../hooks';
import { SkillDomain } from '../../../types';

const DOMAIN_OPTIONS: Array<'All' | SkillDomain> = ['All', 'Branding', 'Design', 'Marketing', 'UI/UX'];

const DOMAIN_COLORS: Record<string, string> = {
  Branding: '#D9E638',
  Design: '#A8B8E8',
  Marketing: '#E8B4B8',
  'UI/UX': '#C5D4AF',
};

export const PathsListPage: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState<'All' | SkillDomain>('All');
  const { paths, loading } = usePaths(selectedDomain === 'All' ? undefined : selectedDomain);
  const { enrolments, completedItems, enrol } = useProgress();

  const completedLessonIds = completedItems
    .filter((c) => c.type === 'lesson')
    .map((c) => c.id);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="flex flex-wrap items-baseline justify-between gap-4 pb-4 border-b-2 border-[var(--line)]">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase font-bold tracking-wider opacity-70 mb-1">
            <span className="w-2.5 h-2.5 bg-[var(--elec)] border border-[var(--line)]" />
            <span>Curriculum Tracks · Studio Blueprints</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-[var(--ink)] tracking-tight">
            COURSES <span className="text-[var(--ox)] font-normal italic font-serif">blueprints</span>
          </h1>
        </div>
        <div className="font-mono text-xs opacity-75 hidden sm:block text-right">
          <div>{paths.length} Available Curricula</div>
          <div className="font-bold text-[var(--ink)]">OFFSCRIPT BLUEPRINTS</div>
        </div>
      </div>

      <LearnSubNav />

      {/* Domain Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard-sm">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs uppercase font-bold opacity-75 mr-2">Domain:</span>
          {DOMAIN_OPTIONS.map((domain) => {
            const isSelected = selectedDomain === domain;
            return (
              <button
                key={domain}
                type="button"
                onClick={() => setSelectedDomain(domain)}
                className={`px-3 py-1 text-xs font-mono border-2 transition-colors cursor-pointer select-none ${
                  isSelected
                    ? 'border-[#171717] bg-[var(--ink)] text-[var(--bg)] font-bold shadow-hard-sm'
                    : 'border-[var(--line)] bg-[var(--bg)] text-[var(--ink)] hover:bg-[var(--card-subtle)]'
                }`}
              >
                {domain}
              </button>
            );
          })}
        </div>
        <span className="font-mono text-xs opacity-70 hidden sm:inline">
          Showing {paths.length} {paths.length === 1 ? 'track' : 'tracks'}
        </span>
      </div>

      {/* Paths Grid */}
      {loading ? (
        <div className="p-12 text-center font-mono text-sm opacity-70 border-2 border-[var(--line)] bg-[var(--card-bg)]">
          Loading curriculum tracks…
        </div>
      ) : paths.length === 0 ? (
        <div className="p-12 border-2 border-[var(--line)] bg-[var(--card-bg)] text-center font-mono text-sm">
          No tracks found for “{selectedDomain}”. Select another domain filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paths.map((path, idx) => {
            const isEnrolled = enrolments.some((e) => e.pathId === path.id);
            const allLessons = path.stages.flatMap((s) => s.lessons);
            const totalLessons = allLessons.length;
            const completedCount = allLessons.filter((l) => completedLessonIds.includes(l.id)).length;
            const progressPct = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
            const trackNum = `0${idx + 1}`.slice(-2);
            const coverColor = DOMAIN_COLORS[path.domain] || '#D9E638';

            return (
              <div
                key={path.id}
                className="border-2 border-[var(--line)] bg-[var(--card-bg)] p-5 flex flex-col justify-between shadow-hard-sm hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-hard-md transition-all group"
              >
                <div>
                  {/* Distinctive Brutalist Cover Banner (.cov) */}
                  <div
                    className="h-28 -m-5 mb-4 border-b-2 border-[var(--line)] p-3 flex items-end justify-between overflow-hidden relative select-none"
                    style={{
                      backgroundColor: coverColor,
                      backgroundImage: 'radial-gradient(circle, rgba(23,23,23,0.35) 30%, transparent 32%)',
                      backgroundSize: '12px 12px',
                    }}
                  >
                    <span className="font-display font-black text-6xl text-[#171717] tracking-tighter leading-none select-none">
                      {trackNum}
                    </span>
                    <span className="font-mono text-[10px] font-bold uppercase px-2 py-0.5 border border-[#171717] bg-[#FAF7EE] text-[#171717] shadow-hard-xs">
                      {path.domain}
                    </span>
                  </div>

                  {/* Metadata Tag */}
                  <div className="flex items-center justify-between text-xs font-mono opacity-75 mb-2">
                    <span>{path.domain} · {path.level} · {path.estimatedHours}h</span>
                    {isEnrolled && (
                      <span className="inline-flex items-center gap-1 text-[var(--ox)] font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Enrolled
                      </span>
                    )}
                  </div>

                  {/* Course Title */}
                  <h2 className="font-display font-black text-xl text-[var(--ink)] leading-snug group-hover:text-[var(--ox)] transition-colors">
                    <Link to={`/learn/paths/${path.id}`}>
                      {path.title}
                    </Link>
                  </h2>

                  <p className="font-sans text-xs opacity-80 mt-2 leading-relaxed line-clamp-2">
                    {path.description}
                  </p>

                  {/* Progress Bar & Lessons Count */}
                  <div className="mt-4 pt-3 border-t border-[var(--line)]/30 space-y-1.5">
                    <div className="flex items-center justify-between font-mono text-[11px] opacity-80">
                      <span>{totalLessons} lessons</span>
                      <span>{progressPct}% completed</span>
                    </div>
                    <div
                      className="h-2.5 border-2 border-[var(--line)] bg-[radial-gradient(circle,var(--ink)_35%,transparent_37%)_0_0/6px_6px] overflow-hidden"
                      role="progressbar"
                      aria-valuenow={progressPct}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        className="h-full bg-[var(--ink)] transition-all duration-300"
                        style={{ width: `${Math.max(progressPct, 0)}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Card Action */}
                <div className="pt-4 mt-4 border-t-2 border-[var(--line)]">
                  <Link
                    to={`/learn/paths/${path.id}`}
                    onClick={() => {
                      if (!isEnrolled) {
                        enrol(path.id);
                      }
                    }}
                    className={`flex items-center justify-between w-full px-4 py-2 text-xs font-display font-extrabold border-2 border-[var(--line)] transition-all cursor-pointer ${
                      isEnrolled
                        ? 'bg-[var(--ink)] text-[var(--bg)] hover:bg-[var(--ox)]'
                        : 'bg-[var(--bg)] text-[var(--ink)] hover:bg-[var(--acid)] hover:text-[#171717]'
                    } shadow-hard-xs`}
                  >
                    <span>{isEnrolled ? (progressPct > 0 ? 'Continue Track →' : 'Resume Track →') : 'Start Track →'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PathsListPage;
