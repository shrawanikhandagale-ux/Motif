import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useProgress } from '../../../hooks';
import { useSkills } from '../hooks';

export const SkillProgressList: React.FC = () => {
  const { unlockedSkills } = useProgress();
  const { skills } = useSkills();

  const domains = ['Branding', 'Design', 'Marketing', 'UI/UX'];

  return (
    <div className="border-2 border-[var(--line)] bg-[var(--card-bg)] p-5 flex flex-col justify-between shadow-hard-sm">
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-xs uppercase font-bold tracking-wider opacity-70">
            Competency Tracker
          </span>
          <span className="font-mono text-[10px] px-1.5 py-0.5 border border-[var(--line)] bg-[var(--card-subtle)] font-bold">
            {unlockedSkills.length} Unlocked
          </span>
        </div>
        <h3 className="font-display font-extrabold text-xl text-[var(--ink)] tracking-tight mb-4">
          Skill progress
        </h3>

        <div className="space-y-4">
          {domains.map((dom) => {
            const domainSkills = skills.filter((s) => s.domain === dom);
            const total = domainSkills.length || 1;
            const unlocked = domainSkills.filter((s) => unlockedSkills.includes(s.id)).length;
            const pct = Math.round((unlocked / total) * 100);

            return (
              <div key={dom} className="space-y-1">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="font-bold text-[var(--ink)]">{dom}</span>
                  <span className="opacity-75">{pct}%</span>
                </div>
                {/* Brutalist dotted background bar */}
                <div
                  className="h-3 border-2 border-[var(--line)] bg-[radial-gradient(circle,var(--ink)_35%,transparent_37%)_0_0/6px_6px] overflow-hidden"
                  role="progressbar"
                  aria-valuenow={pct}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="h-full bg-[var(--ink)] transition-all duration-500"
                    style={{ width: `${Math.max(pct, 4)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pt-5 mt-4 border-t-2 border-[var(--line)]">
        <Link
          to="/learn/map"
          className="inline-flex items-center justify-between w-full font-mono text-xs font-bold text-[var(--ink)] hover:text-[var(--ox)] group transition-colors"
        >
          <span>Explore Skill Map</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default SkillProgressList;

