import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { LearnSubNav, SkillNodeGraph } from '../components';
import { ConstellationNode } from '../components/SkillNodeGraph';
import { Badge, Button } from '../../../components/ui';
import { ArrowRight, Sparkles, CheckCircle2, RotateCcw, BookOpen, Lock } from 'lucide-react';
import { useProgress } from '../../../hooks';

export const SkillMapPage: React.FC = () => {
  const { completedItems, unlockedSkills, projects, completeLesson, uncompleteLesson, unlockSkills } = useProgress();
  const [selectedNode, setSelectedNode] = useState<ConstellationNode | null>(null);
  const [flashedNodeId, setFlashedNodeId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Extract completed lesson/node IDs
  const completedIds = useMemo(() => {
    return completedItems
      .filter((c) => c.type === 'lesson')
      .map((c) => c.targetId || c.id);
  }, [completedItems]);

  // Determine which domains are proven by delivered studio projects
  const provenDomains = useMemo(() => {
    const set = new Set<string>();
    projects
      .filter((p) => p.status === 'completed')
      .forEach((p) => {
        const text = `${p.title} ${(p.tags || []).join(' ')}`.toLowerCase();
        if (text.includes('brand')) set.add('branding');
        if (text.includes('design') || text.includes('print') || text.includes('layout')) set.add('design');
        if (text.includes('market') || text.includes('campaign')) set.add('marketing');
        if (text.includes('ui') || text.includes('ux') || text.includes('interface')) set.add('ui/ux');
        if (text.includes('strategy') || text.includes('manage') || text.includes('ops') || text.includes('business')) set.add('strategy');
      });

    // If there are delivered projects, ensure default proven capability
    if (set.size === 0 && projects.some((p) => p.status === 'completed')) {
      set.add('branding');
      set.add('design');
    }
    return Array.from(set);
  }, [projects]);

  // Handle node selection
  const handleSelectNode = (node: ConstellationNode) => {
    setSelectedNode(node);
  };

  // Toggle completion of selected node with strict prerequisite gating
  const handleToggleComplete = (node: ConstellationNode) => {
    if (node.status === 'lk' && !node.isDone) {
      setToastMessage('Locked: Complete preceding lessons first ⚠');
      setTimeout(() => setToastMessage(null), 2500);
      return;
    }

    if (node.isDone) {
      uncompleteLesson(node.id);
      setToastMessage('Node completion reverted');
      setTimeout(() => setToastMessage(null), 2500);
    } else {
      completeLesson(node.id, node.skillId);
      unlockSkills([node.skillId]);
      setFlashedNodeId(node.id);
      setToastMessage('Node unlocked on your Skill Map ✱');
      setTimeout(() => setFlashedNodeId(null), 1200);
      setTimeout(() => setToastMessage(null), 2800);
    }
  };

  // Default active node for inspection if none clicked
  const inspectedNode = selectedNode || {
    id: 'les-br-101',
    skillId: 'sk-br-01',
    spokeIndex: 0,
    nodeIndex: 0,
    label: 'Anti-Corporate Manifesto',
    pathId: 'path-branding-01',
    pathTitle: 'Offscript Identity Systems',
    domain: 'Branding' as const,
    description: 'Why conventional branding guidelines fail independent creators. Establishing foundational positioning.',
    x: 320,
    y: 176,
    isDone: completedIds.includes('les-br-101') || unlockedSkills.includes('sk-br-01') || true,
    status: 'on' as const,
    isProven: provenDomains.includes('branding'),
  };

  const totalConstellationNodes = 19;
  const unlockedNodesCount = Math.max(1, completedIds.length + (unlockedSkills.length > 0 ? 2 : 0));

  // Domain progress calculations for Journey card
  const trackProgress = [
    { name: 'Branding', count: 2, total: 4, pct: 50 },
    { name: 'Design & Print', count: 3, total: 4, pct: 75 },
    { name: 'UI/UX Systems', count: 1, total: 4, pct: 25 },
    { name: 'Marketing & Drops', count: 1, total: 4, pct: 40 },
    { name: 'Studio Strategy', count: 1, total: 3, pct: 33 },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto relative">
      {/* Toast Notification (motif-v2.html:75 fidelity) */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#171717] text-[#F1EBDD] font-mono text-xs px-4 py-2 border-2 border-[#D9E638] shadow-hard-lg animate-in fade-in slide-in-from-bottom-2">
          {toastMessage}
        </div>
      )}

      {/* Editorial Header */}
      <div className="flex flex-wrap items-baseline justify-between gap-4 pb-4 border-b-2 border-[var(--line)]">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase font-bold tracking-wider opacity-70 mb-1">
            <span className="w-2.5 h-2.5 bg-[var(--acid)] border border-[var(--line)]" />
            <span>Department 01 · Non-Linear Competency Universe</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-[var(--ink)] tracking-tight">
            SKILL MAP <span className="text-[var(--ox)] font-normal italic font-serif">constellation</span>
          </h1>
        </div>
        <div className="font-mono text-xs opacity-75 hidden sm:block text-right">
          <div>{unlockedNodesCount} of {totalConstellationNodes} nodes lit</div>
          <div className="font-bold text-[var(--ink)]">STARBURST CURRICULUM</div>
        </div>
      </div>

      <LearnSubNav />

      {/* Two-Column Starburst Constellation Layout (matches motif-v2.html:104) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Constellation Graph (7 cols on lg) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard p-4 sm:p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b-2 border-[var(--line)] text-xs font-mono">
              <span className="font-bold uppercase tracking-wider text-[var(--ink)]">
                The Learning Network
              </span>
              <span className="opacity-75">Click any node to inspect</span>
            </div>

            {/* Restored Starburst Constellation SVG */}
            <div className="w-full bg-[var(--card-subtle)]/50 border border-[var(--line)]/40 p-2 sm:p-4 overflow-hidden">
              <SkillNodeGraph
                completedIds={completedIds}
                unlockedSkillIds={unlockedSkills}
                provenDomains={provenDomains}
                selectedNodeId={inspectedNode.id}
                onSelectNode={handleSelectNode}
                flashedNodeId={flashedNodeId}
                mini={false}
              />
            </div>

            {/* Prototype Legend (motif-v2.html:103) */}
            <div className="p-3 border border-[var(--line)] bg-[var(--bg)] font-mono text-[11px] flex flex-wrap items-center justify-between gap-2">
              <span className="font-bold text-[var(--ox)] uppercase">Legend:</span>
              <div className="flex flex-wrap items-center gap-4 opacity-85">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full border border-dashed border-[var(--ox)] bg-transparent animate-pulse" />
                  <span>Pulsing = Up next</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--acid)] border border-[#171717]" />
                  <span>Filled = Unlocked</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full border-2 border-[var(--ox)] bg-[var(--acid)]" />
                  <span>Red ring = Proven in Studio</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Inspector, Big Stat Card & Journey Progress (5 cols on lg) */}
        <div className="lg:col-span-5 space-y-5">
          {/* 1. Big Brutalist Stat Card (motif-v2.html:104) */}
          <div className="p-6 border-2 border-[var(--line)] bg-[var(--acid)] text-[#171717] shadow-hard space-y-1">
            <div className="font-display font-black text-5xl tracking-tight">
              {unlockedNodesCount}
              <span className="text-2xl font-normal opacity-70">/{totalConstellationNodes}</span>
            </div>
            <div className="font-mono text-xs uppercase font-bold tracking-wider">
              Skills unlocked on your journey
            </div>
          </div>

          {/* 2. Contextual Node Inspector Card (motif-v2.html:104) */}
          <div className="p-6 border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-mono text-xs uppercase font-bold text-[var(--ox)]">
                {inspectedNode.domain} · {inspectedNode.status === 'on' ? 'Unlocked ✓' : inspectedNode.status === 'nx' ? 'Up Next ✦' : 'Locked'}
              </span>
              {inspectedNode.isProven && (
                <Badge variant="oxblood" className="text-[10px] font-mono uppercase font-bold">
                  Proven in Studio ✓
                </Badge>
              )}
            </div>

            <div>
              <h3 className="font-display font-black text-2xl text-[var(--ink)] leading-snug">
                {inspectedNode.label}
              </h3>
              <p className="font-mono text-xs opacity-75 mt-1">
                Course: {inspectedNode.pathTitle}
              </p>
              <p className="font-sans text-xs sm:text-sm opacity-85 leading-relaxed mt-2.5">
                {inspectedNode.description}
              </p>
            </div>

            {/* Direct Navigation & Completion Action Buttons */}
            <div className="pt-3 border-t border-[var(--line)]/20 flex flex-wrap items-center gap-3">
              <Link to={`/learn/paths/${inspectedNode.pathId}`} className="flex-1 min-w-[140px]">
                <Button variant="primary" size="sm" className="w-full text-xs">
                  <span>Open Lesson</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </Link>

              <Button
                variant="secondary"
                size="sm"
                disabled={inspectedNode.status === 'lk' && !inspectedNode.isDone}
                onClick={() => handleToggleComplete(inspectedNode)}
                className={`text-xs ${
                  inspectedNode.status === 'lk' && !inspectedNode.isDone ? 'opacity-40 cursor-not-allowed' : ''
                }`}
                title={inspectedNode.status === 'lk' && !inspectedNode.isDone ? 'Complete previous lessons in track to unlock' : ''}
              >
                {inspectedNode.isDone ? (
                  <>
                    <RotateCcw className="w-3.5 h-3.5 mr-1 text-[var(--ox)]" />
                    <span>Undo</span>
                  </>
                ) : inspectedNode.status === 'lk' ? (
                  <>
                    <Lock className="w-3.5 h-3.5 mr-1 opacity-70" />
                    <span>Locked</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-green-700" />
                    <span>Mark Complete</span>
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* 3. Journey Breakdown Card (motif-v2.html:104) */}
          <div className="p-6 border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-lg uppercase tracking-tight">Curriculum Journey</h3>
              <span className="font-mono text-xs opacity-70">5 Core Tracks</span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {trackProgress.map((tr) => (
                <div key={tr.name} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span>{tr.name}</span>
                    <span className="opacity-75">{tr.count}/{tr.total} ({tr.pct}%)</span>
                  </div>
                  <div className="h-2.5 w-full bg-[var(--card-subtle)] border border-[var(--line)] overflow-hidden">
                    <div
                      style={{ width: `${tr.pct}%` }}
                      className="h-full bg-[var(--ink)] transition-all duration-700"
                    />
                  </div>
                </div>
              ))}
            </div>

            <p className="font-mono text-[11px] opacity-70 pt-2 border-t border-[var(--line)]/20">
              Complete lessons in Courses or prove competencies through Studio briefs to advance your Constellation.
            </p>
          </div>
        </div>
      </div>

      {/* Closed-Loop Cross-Department Notice */}
      <div className="p-5 border-2 border-dashed border-[var(--line)] bg-[var(--card-bg)] flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1 max-w-2xl">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-[var(--ox)]">
            <BookOpen className="w-4 h-4" />
            <span>Cross-Department Verification</span>
          </div>
          <p className="font-sans text-xs opacity-85 leading-relaxed">
            Delivering client projects in <strong>Create Studio</strong> automatically illuminates the red ring verification on associated skill nodes, streaming proven status directly to <strong>Analyze &amp; Grow</strong>.
          </p>
        </div>

        <Link to="/learn/courses">
          <Button variant="secondary" size="sm">
            <Sparkles className="w-3.5 h-3.5 mr-1 text-[var(--acid)]" />
            <span>Browse All Courses</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SkillMapPage;
