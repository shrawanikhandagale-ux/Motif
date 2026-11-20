import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, FolderPlus, Compass, Wrench, Sparkles } from 'lucide-react';
import { SectionHeading, Sticker, Button, Input, Chip } from '../../../components/ui';
import { HandoffNotice } from '../../../components/shared/HandoffNotice';
import { ProjectCard, NewProjectModal } from '../components';
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
    <div className="space-y-8 max-w-7xl mx-auto">
      <SectionHeading
        as="h1"
        kicker="Department 02 · The Studio · Production Workbench"
        title="CREATE:"
        skewWord="the studio"
        description="Make the work. Active studio projects, tactile moodboards, content drafts, and production asset libraries."
        borderBottom
        action={
          <Sticker variant="acid" rotation="cw">
            Department 02
          </Sticker>
        }
      />

      {/* Studio Workbench Telemetry Bar */}
      <div className="p-3 border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard-sm flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <Wrench className="w-3.5 h-3.5 text-[var(--ox)]" />
          <span className="font-bold text-[var(--ink)] uppercase">Studio Active:</span>
          <span className="opacity-80">{counts.all} Projects Registered · {counts.in_progress} Under Active Production</span>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[var(--acid)]" />
          <span className="font-bold text-[var(--ink)]">Zero-Loss Handoffs Active</span>
        </div>
      </div>

      <HandoffNotice
        toDeptName="Market"
        toDeptPath="/market"
        text="Finished assets from the studio attach directly to campaign roadmaps in Market."
      />

      {/* Control Bar */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="w-full sm:w-80">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects by title, client, tag…"
              prefixElement={<Search className="w-4 h-4" />}
            />
          </div>

          <div className="flex items-center gap-3">
            <Link to="/learn/paths">
              <Button variant="secondary" size="sm">
                <Compass className="w-4 h-4 mr-1.5" />
                <span>Explore Academy Briefs</span>
              </Button>
            </Link>
            <Button variant="primary" size="sm" onClick={() => setModalOpen(true)}>
              <FolderPlus className="w-4 h-4 mr-1.5" />
              <span>New Studio Project</span>
            </Button>
          </div>
        </div>

        {/* Filter Chips with Live Counts */}
        <div className="flex flex-wrap items-center gap-2">
          {statusFilters.map((s) => (
            <Chip
              key={s.id}
              selected={filter === s.id}
              onClick={() => setFilter(s.id)}
              variant="default"
              className="capitalize"
            >
              {s.label} ({s.count})
            </Chip>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <div className="p-12 border-2 border-[var(--line)] bg-[var(--card-bg)] text-center space-y-4 shadow-hard">
          <p className="font-mono text-sm opacity-80">No studio projects found matching current criteria.</p>
          <div className="flex justify-center gap-3">
            <Button variant="secondary" size="sm" onClick={() => { setFilter('all'); setSearchQuery(''); }}>
              Reset Filters
            </Button>
            <Button variant="primary" size="sm" onClick={() => setModalOpen(true)}>
              Create Project
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <ProjectCard key={proj.id} project={proj} />
          ))}
        </div>
      )}

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
