import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, FolderPlus, Wrench, Sparkles, BookOpen, Layers } from 'lucide-react';
import { HandoffNotice } from '../../../components/shared/HandoffNotice';
import { ProjectCard, NewProjectModal, CreateSubNav } from '../components';
import { useProjects, ProjectStatusFilter } from '../hooks';

export const CreatePage: React.FC = () => {
  const { projects, allProjects, filter, setFilter, searchQuery, setSearchQuery, createProject } = useProjects();
  const [modalOpen, setModalOpen] = useState(false);

  const counts = {
    all: allProjects.length,
    in_progress: allProjects.filter((p) => p.status === 'in_progress').length,
    review: allProjects.filter((p) => p.status === 'review').length,
    completed: allProjects.filter((p) => p.status === 'completed').length,
  };

  const statusFilters: Array<{ id: ProjectStatusFilter; label: string; count: number }> = [
    { id: 'all', label: 'All Projects', count: counts.all },
    { id: 'in_progress', label: 'In Progress', count: counts.in_progress },
    { id: 'review', label: 'In Review', count: counts.review },
    { id: 'completed', label: 'Completed', count: counts.completed },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="flex flex-wrap items-baseline justify-between gap-4 pb-4 border-b-2 border-[var(--line)]">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase font-bold tracking-wider opacity-70 mb-1">
            <span className="w-2.5 h-2.5 bg-[var(--ox)] border border-[var(--line)]" />
            <span>Department 02 · The Studio · Creative Operations</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-[var(--ink)] tracking-tight">
            CREATE <span className="text-[var(--ox)] font-normal italic font-serif">the studio</span>
          </h1>
        </div>
        <div className="font-mono text-xs opacity-75 hidden sm:block text-right">
          <div>{counts.all} Projects Registered · {counts.in_progress} Under Active Production</div>
          <div className="font-bold text-[var(--ink)]">TACTILE WORKBENCH</div>
        </div>
      </div>

      <CreateSubNav />

      {/* Studio Workbench Telemetry Bar */}
      <div className="p-3 border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard-sm flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <Wrench className="w-3.5 h-3.5 text-[var(--ox)]" />
          <span className="font-bold text-[var(--ink)] uppercase">Studio Roster:</span>
          <span className="opacity-80">
            {counts.all} Projects ({counts.in_progress} In Progress, {counts.review} Review, {counts.completed} Completed)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[var(--ox)]" />
          <span className="font-bold text-[var(--ink)]">Zero-Loss Asset Pipeline Active</span>
        </div>
      </div>

      <HandoffNotice
        toDeptName="Market"
        toDeptPath="/market"
        text="Finished studio assets deploy directly to campaign distribution sequences and client retainers in Market."
      />

      {/* Search & Control Filter Bar */}
      <div className="p-4 border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, client, tag…"
              className="w-full pl-9 pr-4 py-2 border-2 border-[var(--line)] bg-[var(--bg)] font-mono text-xs text-[var(--ink)] placeholder:opacity-50 focus:outline-none focus:border-[var(--ox)]"
            />
            <Search className="w-4 h-4 opacity-50 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/create/builder"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border-2 border-[var(--line)] bg-[var(--card-subtle)] font-mono text-xs font-bold hover:bg-[var(--bg)] transition-colors cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5 text-[var(--ox)]" />
              <span>Brief Builder</span>
            </Link>

            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 border-2 border-[#171717] bg-[var(--ink)] text-[var(--bg)] font-display font-extrabold text-xs hover:bg-[var(--ox)] transition-colors shadow-hard-xs cursor-pointer"
            >
              <FolderPlus className="w-3.5 h-3.5" />
              <span>+ New Project</span>
            </button>
          </div>
        </div>

        {/* Status Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="font-mono text-xs uppercase font-bold opacity-70 mr-1">Status:</span>
          {statusFilters.map((s) => {
            const isSelected = filter === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setFilter(s.id)}
                className={`px-3 py-1 text-xs font-mono border-2 transition-colors cursor-pointer select-none capitalize ${
                  isSelected
                    ? 'border-[#171717] bg-[var(--ink)] text-[var(--bg)] font-bold shadow-hard-xs'
                    : 'border-[var(--line)] bg-[var(--bg)] text-[var(--ink)] hover:bg-[var(--card-subtle)]'
                }`}
              >
                {s.label} ({s.count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Grid with Dashed '+ New Project' card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Iconic Dashed '+ New Project' card from prototype */}
        <div
          onClick={() => setModalOpen(true)}
          className="border-2 border-dashed border-[var(--line)] bg-[var(--card-bg)] hover:bg-[var(--card-subtle)] p-6 min-h-[240px] flex flex-col items-center justify-center cursor-pointer transition-all shadow-hard-xs group select-none text-center"
        >
          <div className="w-12 h-12 border-2 border-[var(--line)] bg-[var(--bg)] group-hover:bg-[var(--ox)] group-hover:text-[#F1EBDD] flex items-center justify-center transition-colors mb-3 shadow-hard-xs">
            <FolderPlus className="w-5 h-5" />
          </div>
          <h3 className="font-display font-extrabold text-lg text-[var(--ink)]">＋ New Studio Project</h3>
          <p className="font-mono text-xs opacity-65 mt-1 max-w-[200px]">
            Initialize self-directed creative production
          </p>
        </div>

        {projects.map((proj, idx) => (
          <ProjectCard key={proj.id} project={proj} index={idx} />
        ))}
      </div>

      {/* Academy Brief Room Handoff Callout */}
      <div className="p-5 border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard-sm flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-[var(--ox)] uppercase">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Need Structured Direction?</span>
          </div>
          <p className="font-sans text-xs sm:text-sm opacity-85">
            Turn real client prompts and practical briefs from the Academy into active studio projects to illuminate skill map nodes.
          </p>
        </div>
        <Link
          to="/learn/briefs"
          className="inline-flex items-center gap-1.5 px-4 py-2 border-2 border-[var(--line)] bg-[var(--card-subtle)] font-mono text-xs font-bold hover:bg-[var(--ox)] hover:text-[#F1EBDD] transition-colors shadow-hard-xs whitespace-nowrap"
        >
          <span>Browse Brief Room →</span>
        </Link>
      </div>

      {/* New Project Modal */}
      <NewProjectModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={(data) => createProject(data)}
      />
    </div>
  );
};

export default CreatePage;
