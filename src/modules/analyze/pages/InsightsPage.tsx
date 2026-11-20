import React from 'react';
import { SectionHeading, Sticker, Badge, Button } from '../../../components/ui';
import { AnalyzeSubNav, LoopbackInsightsSection } from '../components';
import { AlertCircle, ArrowRight, Layers, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProgress } from '../../../hooks';

export const InsightsPage: React.FC = () => {
  const { projects, campaigns, deliverables } = useProgress();

  // 1. Detect workflow stage bottleneck (motif-v2.html:129)
  const stageLabels: Record<string, string> = {
    draft: 'Concept / Draft',
    in_progress: 'Active Production',
    review: 'Client Review',
  };
  const unfinishedStages = ['draft', 'in_progress', 'review'].map((st) => ({
    stageKey: st,
    label: stageLabels[st] || st,
    count: projects.filter((p) => p.status === st).length,
  }));
  unfinishedStages.sort((a, b) => b.count - a.count);
  const worstBottleneck = unfinishedStages[0] || { label: 'Active Production', count: 0 };

  // 2. Detect studied skills not yet proven
  const deliveredProjects = projects.filter((p) => p.status === 'completed');
  const studiedUnprovenSkills = ['Editorial Design', 'Guerilla Campaign Strategy', 'Typography Systems'].filter(
    (skill) =>
      !deliveredProjects.some((p) =>
        `${p.title} ${(p.tags || []).join(' ')}`.toLowerCase().includes(skill.toLowerCase())
      )
  );

  // 3. Planned campaigns awaiting release
  const pendingCampaignsCount = campaigns.filter((c) => c.status !== 'completed').length;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <SectionHeading
        as="h1"
        kicker="Department 05 · Closed-Loop Intelligence"
        title="INSIGHTS & LOOPBACK:"
        skewWord="close the loop"
        description="Automated telemetry diagnostics identifying operational bottlenecks, unproven skill gaps, and direct links to advance."
        borderBottom
        action={
          <Sticker variant="teal" rotation="cw">
            Department 05
          </Sticker>
        }
      />

      <AnalyzeSubNav />

      {/* Dynamic Telemetry Diagnostics Cards (matches motif-v2.html:129) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight">System Telemetry Diagnostics</h2>
          <span className="font-mono text-xs opacity-75">Live Data Inferences</span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {/* Diagnostic 01: Bottleneck Detection */}
          <div className="p-6 border-2 border-[var(--line)] bg-[var(--acid)] text-[#171717] shadow-hard space-y-3">
            <div className="flex items-center justify-between gap-2 font-mono text-xs uppercase font-bold">
              <span className="flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-[#171717]" />
                Operational Bottleneck
              </span>
              <span className="opacity-80">Manage · Workflow Stage</span>
            </div>
            <h3 className="font-display font-black text-2xl sm:text-3xl leading-snug">
              Most unfinished work is sitting in “{worstBottleneck.label}”.
            </h3>
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <span className="font-mono text-xs font-bold bg-[#171717] text-[#F1EBDD] px-2.5 py-1">
                Evidence: {worstBottleneck.count} project(s) currently held in this phase
              </span>
              <Link to="/manage">
                <Button variant="primary" size="sm" className="!bg-[#171717] !text-[#F1EBDD] text-xs">
                  <span>Audit Workflow Board in Manage</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Diagnostic 02: Skill Execution Gap */}
          <div className="p-6 border-2 border-[var(--line)] bg-[var(--elec)] text-[#171717] shadow-hard space-y-3">
            <div className="flex items-center justify-between gap-2 font-mono text-xs uppercase font-bold">
              <span className="flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-[#171717]" />
                Capability Application Gap
              </span>
              <span className="opacity-80">Learn ↔ Create Sync</span>
            </div>
            <h3 className="font-display font-black text-2xl sm:text-3xl leading-snug">
              {studiedUnprovenSkills.length > 0
                ? `You’ve studied ${studiedUnprovenSkills.slice(0, 2).join(' & ')} but haven’t delivered a project using it.`
                : 'Your studied skills are currently backed by delivered studio work.'}
            </h3>
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <span className="font-mono text-xs font-bold bg-[#171717] text-[#F1EBDD] px-2.5 py-1">
                Evidence: Learned vs proven capability comparison
              </span>
              <Link to="/create/builder">
                <Button variant="primary" size="sm" className="!bg-[#171717] !text-[#F1EBDD] text-xs">
                  <span>Create Brief in Studio</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Diagnostic 03: Market Drops Pending */}
          <div className="p-6 border-2 border-[var(--line)] bg-[var(--ox)] text-[#F1EBDD] shadow-hard space-y-3">
            <div className="flex items-center justify-between gap-2 font-mono text-xs uppercase font-bold text-[#F1EBDD]">
              <span className="flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-[#F1EBDD]" />
                Distribution Pipeline
              </span>
              <span className="opacity-80">Market Drops Cadence</span>
            </div>
            <h3 className="font-display font-black text-2xl sm:text-3xl leading-snug">
              {pendingCampaignsCount} campaign drop(s) are planned and awaiting market execution.
            </h3>
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <span className="font-mono text-xs font-bold bg-[#F1EBDD] text-[#171717] px-2.5 py-1">
                Evidence: From the Campaigns &amp; Drops ledger
              </span>
              <Link to="/market/campaigns">
                <Button variant="secondary" size="sm" className="text-xs">
                  <span>Open Campaigns in Market</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Closed-Loop Learning Recommendations (matches Journey 5 tests) */}
      <LoopbackInsightsSection />

      {/* Cross-Department Synchronization Summary */}
      <div className="p-6 border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="teal" className="text-[10px] uppercase font-mono">
            Autonomous Ecosystem
          </Badge>
          <span className="font-mono text-xs opacity-75">
            5 Departments · {deliverables.length} Deliverables · {projects.length} Projects
          </span>
        </div>
        <h3 className="font-display font-bold text-lg text-[var(--ink)]">
          The Closed-Loop Creative Business &amp; Marketing Operating System
        </h3>
        <p className="font-sans text-xs sm:text-sm opacity-85 leading-relaxed max-w-3xl">
          Every deliverable completed in Manage, project authored in Create, or campaign run in Market flows telemetry straight back to Analyze &amp; Grow. When performance dips or capabilities stall, Analyze generates actionable recommendations directly into the Learn Academy.
        </p>
      </div>
    </div>
  );
};

export default InsightsPage;
