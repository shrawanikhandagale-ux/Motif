import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Layers, ArrowRight, CheckCircle2 } from 'lucide-react';
import { SectionHeading, Tile, Badge, Button, Chip } from '../../../components/ui';
import { LearnSubNav } from '../components';
import { usePaths } from '../hooks';
import { useProgress } from '../../../hooks';
import { SkillDomain } from '../../../types';

const DOMAIN_OPTIONS: Array<'All' | SkillDomain> = ['All', 'Branding', 'Design', 'Marketing', 'UI/UX'];

export const PathsListPage: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState<'All' | SkillDomain>('All');
  const { paths, loading } = usePaths(selectedDomain === 'All' ? undefined : selectedDomain);
  const { enrolments } = useProgress();

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <SectionHeading
        as="h1"
        kicker="Curriculum Tracks"
        title="PATHS:"
        skewWord="blueprints"
        description="Structured, production-grade sequences designed around real deliverables. No synthetic theory."
        borderBottom
      />

      <LearnSubNav />

      {/* Domain Filter Bar */}
      <div className="flex flex-wrap items-center gap-2 pt-2">
        <span className="font-mono text-xs uppercase font-bold opacity-75 mr-2">Filter Domain:</span>
        {DOMAIN_OPTIONS.map((domain) => (
          <Chip
            key={domain}
            selected={selectedDomain === domain}
            onClick={() => setSelectedDomain(domain)}
            variant="default"
          >
            {domain}
          </Chip>
        ))}
      </div>

      {/* Paths Grid */}
      {loading ? (
        <div className="p-12 text-center font-mono text-sm opacity-70">Loading curriculum tracks…</div>
      ) : paths.length === 0 ? (
        <div className="p-12 border-2 border-[var(--line)] bg-[var(--card-bg)] text-center font-mono text-sm">
          No tracks found for “{selectedDomain}”. Select another domain filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paths.map((path) => {
            const isEnrolled = enrolments.some((e) => e.pathId === path.id);

            return (
              <Tile
                key={path.id}
                accent="none"
                shadow="default"
                className="p-6 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <Badge variant="oxblood">{path.domain}</Badge>
                      <Badge variant="default">{path.level}</Badge>
                    </div>
                    {isEnrolled && (
                      <span className="inline-flex items-center gap-1 font-mono text-xs text-[var(--ox)] font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Enrolled</span>
                      </span>
                    )}
                  </div>

                  <div>
                    <h2 className="font-display font-extrabold text-2xl text-[var(--ink)] leading-snug">
                      {path.title}
                    </h2>
                    <p className="font-mono text-xs opacity-75 mt-1">{path.subtitle}</p>
                    <p className="font-sans text-sm opacity-90 mt-2 leading-relaxed">
                      {path.description}
                    </p>
                  </div>

                  {/* Metadata Chips */}
                  <div className="flex items-center gap-4 text-xs font-mono opacity-80 pt-2 border-t border-[var(--line)]/20">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{path.estimatedHours} Hours</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5" />
                      <span>{path.stages.length} Stages</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--line)]/20">
                  <Link to={`/learn/paths/${path.id}`} className="block">
                    <Button variant={isEnrolled ? 'primary' : 'secondary'} size="sm" className="w-full justify-between">
                      <span>{isEnrolled ? 'Continue Track' : 'View Curriculum'}</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </Tile>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PathsListPage;
