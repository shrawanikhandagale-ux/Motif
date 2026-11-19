import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, FolderPlus, Compass } from 'lucide-react';
import { SectionHeading, Sticker, Button, Input, Chip } from '../../../components/ui';
import { HandoffNotice } from '../../../components/shared/HandoffNotice';
import { ProjectCard, NewProjectModal } from '../components';
import { useProjects, ProjectStatusFilter } from '../hooks';

const STATUS_FILTERS: Array<{ id: ProjectStatusFilter; label: string }> = [
  { id: 'all', label: 'All Projects' },
  { id: 'in_progress', label: 'In Progress' },
  { id: 'review', label: 'In Review' },
  { id: 'completed', label: 'Completed' },
];

export const CreatePage: React.FC = () => {
  const { projects, filter, setFilter, searchQuery, setSearchQuery, createProject } = useProjects();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <SectionHeading
        as="h1"
        kicker="Department 02 · The Studio"
        title="CREATE:"
        skewWord="the studio"
        description="Make the work. Active projects, moodboards, content drafts, and tactile asset libraries."
        borderBottom
        action={
          <Sticker variant="acid" rotation="cw">
            Department 02
          </Sticker>
        }
      />

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
                <span>Explore Briefs in Learn</span>
              </Button>
            </Link>
            <Button variant="primary" size="sm" onClick={() => setModalOpen(true)}>
              <FolderPlus className="w-4 h-4 mr-1.5" />
              <span>New Studio Project</span>
            </Button>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap items-center gap-2">
          {STATUS_FILTERS.map((s) => (
            <Chip
              key={s.id}
              selected={filter === s.id}
              onClick={() => setFilter(s.id)}
              variant="default"
              className="capitalize"
            >
              {s.label}
            </Chip>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <div className="p-12 border-2 border-[var(--line)] bg-[var(--card-bg)] text-center space-y-4">
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
