import React from 'react';
import { SectionHeading, Sticker, Badge, Button } from '../../../components/ui';
import { AnalyzeSubNav } from '../components';
import { Check, ArrowRight, BookOpen, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProgress } from '../../../hooks';

interface SkillAuditItem {
  id: string;
  name: string;
  category: string;
  defaultLearnedPct: number;
  matchingKeywords: string[];
}

const CORE_SKILLS: SkillAuditItem[] = [
  {
    id: 'sk-brand',
    name: 'Branding & Visual Identity',
    category: 'Design & Identity',
    defaultLearnedPct: 85,
    matchingKeywords: ['brand', 'branding', 'identity', 'visual'],
  },
  {
    id: 'sk-edit',
    name: 'Editorial & Print Design',
    category: 'Publication & Print',
    defaultLearnedPct: 70,
    matchingKeywords: ['editorial', 'print', 'publication', 'zine', 'press'],
  },
  {
    id: 'sk-camp',
    name: 'Guerilla Campaign Strategy',
    category: 'Marketing & Distribution',
    defaultLearnedPct: 60,
    matchingKeywords: ['campaign', 'marketing', 'distribution', 'growth', 'drop'],
  },
  {
    id: 'sk-ui',
    name: 'UI/UX & Digital Systems',
    category: 'Product & Interface',
    defaultLearnedPct: 45,
    matchingKeywords: ['ui', 'ux', 'interface', 'web', 'product'],
  },
  {
    id: 'sk-half',
    name: 'Halftone & Screenprint Separation',
    category: 'Production Craft',
    defaultLearnedPct: 90,
    matchingKeywords: ['halftone', 'screenprint', 'separation', 'print'],
  },
  {
    id: 'sk-type',
    name: 'Editorial Typography Systems',
    category: 'Typography & Layout',
    defaultLearnedPct: 75,
    matchingKeywords: ['type', 'typography', 'font', 'specimen'],
  },
  {
    id: 'sk-ops',
    name: 'Studio Retainer Operations',
    category: 'Business & Management',
    defaultLearnedPct: 50,
    matchingKeywords: ['operations', 'retainer', 'business', 'scope', 'contract'],
  },
  {
    id: 'sk-cont',
    name: 'Content Publishing Cadence',
    category: 'Distribution & Media',
    defaultLearnedPct: 65,
    matchingKeywords: ['content', 'social', 'cadence', 'post', 'substack'],
  },
];

export const LearningVsProvenPage: React.FC = () => {
  const { projects, unlockedSkills } = useProgress();

  const deliveredProjects = projects.filter((p) => p.status === 'completed');

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <SectionHeading
        as="h1"
        kicker="Department 05 · Capability Diagnostics"
        title="LEARNING VS PROVEN:"
        skewWord="verified skills"
        description="Direct audit comparing skills studied in Academy courses against practical execution proven by delivered client projects."
        borderBottom
        action={
          <Sticker variant="teal" rotation="cw">
            Department 05
          </Sticker>
        }
      />

      <AnalyzeSubNav />

      {/* Overview Context Card */}
      <div className="p-5 border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1 max-w-2xl">
          <div className="flex items-center gap-2">
            <Badge variant="teal" className="text-[10px] uppercase font-mono">
              Empirical Capability Audit
            </Badge>
            <span className="font-mono text-xs opacity-75">
              {deliveredProjects.length} Verified Deliveries in Studio Ledger
            </span>
          </div>
          <h2 className="font-display font-bold text-xl text-[var(--ink)]">
            Theory vs Practical Production Proof
          </h2>
          <p className="font-sans text-xs sm:text-sm opacity-85 leading-relaxed">
            In MOTIF, passing a course lesson unlocks a node in your Academy journey, but a skill is only considered <strong>PROVEN</strong> when packaged and delivered inside a real client project.
          </p>
        </div>

        <Link to="/create/builder">
          <Button variant="primary" size="md">
            <Layers className="w-4 h-4 mr-2" />
            <span>Prove a Skill in Create</span>
          </Button>
        </Link>
      </div>

      {/* Skills Comparison Grid (matches motif-v2.html:127) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {CORE_SKILLS.map((skill) => {
          // Check if skill is unlocked
          const isUnlocked = unlockedSkills.some((s) =>
            skill.matchingKeywords.some((kw) => s.toLowerCase().includes(kw))
          );
          const learnedPct = isUnlocked ? Math.min(100, skill.defaultLearnedPct + 10) : skill.defaultLearnedPct;

          // Check if proven by any delivered project
          const matchingDeliveredProject = deliveredProjects.find((p) => {
            const projText = `${p.title} ${(p.tags || []).join(' ')} ${p.summary || ''}`.toLowerCase();
            return skill.matchingKeywords.some((kw) => projText.includes(kw));
          });
          const isProven = Boolean(matchingDeliveredProject);

          return (
            <div
              key={skill.id}
              className={`p-6 border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard flex flex-col justify-between space-y-4 ${
                isProven ? 'border-l-6 border-l-[#477C75]' : ''
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] uppercase font-bold opacity-70">
                    {skill.category}
                  </span>
                  <Badge
                    variant={isProven ? 'teal' : 'default'}
                    className="font-mono text-[10px] uppercase"
                  >
                    {isProven ? 'Proven in Production' : 'Studied Only'}
                  </Badge>
                </div>

                <div>
                  <h3 className="font-display font-bold text-xl text-[var(--ink)] leading-snug">
                    {skill.name}
                  </h3>
                  <div className="font-mono text-xs opacity-75 mt-1 flex items-center justify-between">
                    <span>Learned: <strong>{learnedPct}%</strong></span>
                    <span>Status: <strong>{isProven ? 'Proven ✓' : 'Not yet proven'}</strong></span>
                  </div>
                </div>

                {/* Double Brutalist Bar (motif-v2.html:127 pattern) */}
                <div className="space-y-2 pt-1">
                  {/* Bar 1: Learned Percentage */}
                  <div className="space-y-1">
                    <div className="flex justify-between font-mono text-[10px] opacity-70">
                      <span>Academy Curriculum</span>
                      <span>{learnedPct}%</span>
                    </div>
                    <div className="h-3 w-full bg-[var(--card-subtle)] border border-[var(--line)] overflow-hidden">
                      <div
                        style={{ width: `${learnedPct}%` }}
                        className="h-full bg-[var(--acid)] transition-all"
                      />
                    </div>
                  </div>

                  {/* Bar 2: Proven Status */}
                  <div className="space-y-1">
                    <div className="flex justify-between font-mono text-[10px] opacity-70">
                      <span>Production Execution</span>
                      <span>{isProven ? '100% Proven' : '0% Pending'}</span>
                    </div>
                    <div className="h-3 w-full bg-[var(--card-subtle)] border border-[var(--line)] overflow-hidden">
                      <div
                        style={{ width: isProven ? '100%' : '0%' }}
                        className="h-full bg-[#477C75] transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Evidence & Action Link */}
              <div className="pt-3 border-t border-[var(--line)]/20 flex flex-wrap items-center justify-between gap-2">
                <div className="font-mono text-[11px]">
                  {isProven ? (
                    <span className="text-green-800 font-bold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      Proven by: {matchingDeliveredProject?.title}
                    </span>
                  ) : (
                    <span className="opacity-70">
                      Studied in Academy · Needs delivered project proof
                    </span>
                  )}
                </div>

                {isProven ? (
                  <Link to="/create">
                    <Button variant="secondary" size="sm" className="text-xs">
                      <span>View in Studio</span>
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </Link>
                ) : (
                  <Link to="/create/builder">
                    <Button variant="secondary" size="sm" className="text-xs">
                      <span>Prove in Studio</span>
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Closed-Loop Notice */}
      <div className="p-5 border-2 border-dashed border-[var(--line)] bg-[var(--card-bg)] space-y-2">
        <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#477C75]">
          <BookOpen className="w-4 h-4" />
          <span>Continuous Feedback Loop</span>
        </div>
        <p className="font-sans text-xs opacity-80 leading-relaxed">
          Unproven skills indicate opportunities to build practical work. Create a project brief in Studio targeting your unproven competencies to turn theoretical learning into commercial proof.
        </p>
      </div>
    </div>
  );
};

export default LearningVsProvenPage;
