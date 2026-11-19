import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Sparkles, CheckSquare, Square, Rocket, ShieldAlert, BookOpen, CheckCircle2, Map } from 'lucide-react';
import { Badge, Button } from '../../../components/ui';
import { useBrief, useResources } from '../hooks';
import { useProgress } from '../../../hooks';

export const BriefDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { brief, loading } = useBrief(id || '');
  const { resources } = useResources();
  const { projects, createProjectFromBrief, toggleChecklistItem, isChecklistCompleted } = useProgress();

  if (loading) return <div className="p-12 text-center font-mono text-sm opacity-70">Loading creative brief…</div>;

  if (!brief) {
    return (
      <div className="p-12 border-2 border-[var(--line)] bg-[var(--card-bg)] text-center space-y-4">
        <p className="font-mono text-sm">Creative brief not found.</p>
        <Link to="/learn/paths"><Button variant="secondary" size="sm">Back to Academy</Button></Link>
      </div>
    );
  }

  const existingProject = projects.find((p) => p.briefId === brief.id);
  const allItemIds = brief.checklist.map((c) => c.id);
  const doneCount = brief.checklist.filter((i) => isChecklistCompleted(i.id)).length;
  const allDone = brief.checklist.length > 0 && doneCount === brief.checklist.length;

  const handleToggleCheck = (itemId: string) => {
    toggleChecklistItem(brief.id, itemId, allItemIds, brief.skillsUnlocked, existingProject?.id);
  };

  const handleStartInCreate = () => {
    const project = createProjectFromBrief(brief.id, brief.title, ['Studio Brief', brief.clientOrContext]);
    navigate(`/create/projects/${project.id}`);
  };

  const attachedResources = resources.slice(0, 3);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <Link to="/learn" className="inline-flex items-center gap-1.5 font-mono text-xs uppercase font-bold text-[var(--ink)] hover:text-[var(--ox)]">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Academy</span>
      </Link>

      {/* Header & Prompt */}
      <div className="p-6 sm:p-8 border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Badge variant="oxblood">Creative Brief</Badge>
          <span className="font-mono text-xs font-bold text-[var(--ox)] inline-flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>{brief.deadlineNotice}</span>
          </span>
        </div>
        <div>
          <span className="font-mono text-xs opacity-75 uppercase tracking-wider">{brief.clientOrContext}</span>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[var(--ink)] mt-1">{brief.title}</h1>
          <p className="font-sans text-base opacity-90 mt-3 leading-relaxed">{brief.description}</p>
        </div>
        <div className="pt-3 border-t border-[var(--line)]/20 flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs font-bold opacity-80 mr-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[var(--ox)]" /> Unlocks on delivery:
          </span>
          {brief.skillsUnlocked.map((sId) => (
            <Badge key={sId} variant={allDone ? 'acid' : 'electric'} className="font-mono text-xs">
              {sId} {allDone && '★ Illuminated'}
            </Badge>
          ))}
        </div>
      </div>

      {/* Completion Banner */}
      {allDone && (
        <div className="p-4 border-2 border-[#171717] bg-[var(--acid)] text-[#171717] shadow-hard flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-mono text-xs font-bold">
            <CheckCircle2 className="w-4 h-4 text-[var(--ox)] shrink-0" />
            <span>All deliverable requirements satisfied. Competencies illuminated!</span>
          </div>
          <Link to="/learn/map" className="font-mono text-xs font-bold underline inline-flex items-center gap-1">
            <Map className="w-3.5 h-3.5" /> View Skill Map
          </Link>
        </div>
      )}

      {/* Constraints */}
      <div className="p-6 border-2 border-[var(--line)] bg-[var(--card-subtle)] space-y-3">
        <div className="flex items-center gap-2 font-mono text-xs font-bold text-[var(--ox)] uppercase">
          <ShieldAlert className="w-4 h-4" />
          <span>Strict Creative Constraints</span>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm font-sans opacity-85">
          <li>• Max 2 type families; tight optical tracking on heavy weights.</li>
          <li>• Tactile ink borders (2px solid); zero blurred drop shadows.</li>
          <li>• High-contrast palette; no synthetic unearned gradients.</li>
          <li>• Authentic tone: reject corporate jargon and defensive caveats.</li>
        </ul>
      </div>

      {/* Unified Checklist */}
      <div className="p-6 border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-bold text-xl text-[var(--ink)]">Deliverable Checklist</h2>
          <span className="font-mono text-xs opacity-75">{doneCount}/{brief.checklist.length} Completed</span>
        </div>
        <div className="space-y-2.5">
          {brief.checklist.map((item) => {
            const isChecked = isChecklistCompleted(item.id);
            return (
              <button
                key={item.id}
                type="button"
                role="checkbox"
                aria-checked={isChecked}
                onClick={() => handleToggleCheck(item.id)}
                className={`w-full text-left p-3.5 border-2 transition-all flex items-center gap-3.5 ${
                  isChecked ? 'border-[var(--line)] bg-[var(--card-subtle)] text-[var(--ink)]' : 'border-[var(--line)] bg-[var(--bg)] hover:border-[var(--ox)] text-[var(--ink)]'
                }`}
              >
                {isChecked ? <CheckSquare className="w-5 h-5 text-[var(--ox)] shrink-0" /> : <Square className="w-5 h-5 opacity-40 shrink-0" />}
                <span className={`text-sm font-sans ${isChecked ? 'line-through opacity-60' : 'text-[var(--ink)] font-medium'}`}>{item.text}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Resources */}
      <div className="p-6 border-2 border-[var(--line)] bg-[var(--card-bg)] space-y-3">
        <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase opacity-80">
          <BookOpen className="w-4 h-4 text-[var(--ox)]" />
          <span>Curated Reference Pack</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {attachedResources.map((res) => (
            <div key={res.id} className="p-3 border-2 border-[var(--line)] bg-[var(--card-subtle)] space-y-1">
              <span className="font-mono text-[10px] uppercase opacity-75">{res.category}</span>
              <h3 className="font-sans font-bold text-xs truncate">{res.title}</h3>
              <p className="text-[11px] opacity-75 line-clamp-2">{res.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-6 border-2 border-[var(--line)] bg-[var(--acid)] text-[#171717] shadow-hard flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-extrabold text-xl">{existingProject ? 'Studio Project Active' : 'Ready to execute in Studio?'}</h2>
          <p className="font-sans text-xs sm:text-sm opacity-90 mt-0.5">
            {existingProject ? `Connected to “${existingProject.title}” in Department 02.` : 'Spawns an active project in Create with connected asset records.'}
          </p>
        </div>
        <Button variant="primary" size="md" onClick={handleStartInCreate} className="bg-[#171717] text-[#F1EBDD]">
          <Rocket className="w-4 h-4 mr-2" />
          <span>{existingProject ? 'Open in Create' : 'Start in Create'}</span>
        </Button>
      </div>
    </div>
  );
};

export default BriefDetailPage;
