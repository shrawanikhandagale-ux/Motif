import React, { useState } from 'react';
import { SectionHeading, Sticker, Badge, Button } from '../../../components/ui';
import { ManageSubNav, NewDeliverableModal } from '../components';
import { CheckSquare, Plus, Search, Filter, Layers, AlertCircle } from 'lucide-react';
import { DeliverableStage } from '../../../types';
import { useProgress } from '../../../hooks';

const ALL_STAGES: DeliverableStage[] = ['Queued', 'Doing', 'In Review', 'Done'];

export const TasksPage: React.FC = () => {
  const { deliverables, clients, updateDeliverableStage, createDeliverable } = useProgress();
  const [modalOpen, setModalOpen] = useState(false);
  const [stageFilter, setStageFilter] = useState<string>('all');
  const [clientFilter, setClientFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDeliverables = deliverables.filter((d) => {
    const matchesStage = stageFilter === 'all' || d.status === stageFilter;
    const matchesClient = clientFilter === 'all' || d.clientId === clientFilter || d.clientName === clientFilter;
    const matchesSearch =
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.clientName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStage && matchesClient && matchesSearch;
  });

  const handleCheckboxToggle = (id: string, currentStatus: DeliverableStage) => {
    const nextStatus: DeliverableStage = currentStatus === 'Done' ? 'Doing' : 'Done';
    updateDeliverableStage(id, nextStatus);
  };

  const handleSetStage = (id: string, newStage: DeliverableStage) => {
    updateDeliverableStage(id, newStage);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <SectionHeading
        as="h1"
        kicker="Department 04 · Production Tasks & Milestone Deliverables"
        title="TASKS:"
        skewWord="& deliverables"
        description="Track production milestones, client review stages, revision requests, and handoffs from Studio."
        borderBottom
        action={
          <Sticker variant="ivory" rotation="cw" className="!bg-[#171717] !text-[#F1EBDD] !border-[#F1EBDD]">
            Department 04
          </Sticker>
        }
      />

      <ManageSubNav />

      {/* Control Strip: Search, Stage Filter, Client Filter, New Deliverable */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard">
        <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[280px]">
          <div className="flex items-center gap-2 px-3 py-1.5 border border-[var(--line)] bg-[var(--bg)] flex-1 min-w-[200px]">
            <Search className="w-4 h-4 opacity-60" />
            <input
              type="text"
              placeholder="Filter tasks by deliverable or client name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent font-mono text-xs text-[var(--ink)] placeholder:opacity-50 focus:outline-none w-full"
            />
          </div>

          <div className="flex items-center gap-1.5 font-mono text-xs">
            <Filter className="w-3.5 h-3.5 opacity-60" />
            <select
              aria-label="Filter tasks by client"
              value={clientFilter}
              onChange={(e) => setClientFilter(e.target.value)}
              className="bg-[var(--bg)] border border-[var(--line)] px-2.5 py-1.5 text-xs font-mono text-[var(--ink)] focus:outline-none"
            >
              <option value="all">All Clients</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Button variant="primary" size="sm" onClick={() => setModalOpen(true)}>
          <Plus className="w-3.5 h-3.5 mr-1" />
          <span>New Deliverable Task</span>
        </Button>
      </div>

      {/* Stage Tabs Filter */}
      <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
        <button
          onClick={() => setStageFilter('all')}
          className={`px-3 py-1.5 uppercase font-bold border transition-colors ${
            stageFilter === 'all'
              ? 'border-[var(--line)] bg-[var(--ink)] text-[var(--bg)]'
              : 'border-[var(--line)]/50 bg-[var(--card-bg)] text-[var(--ink)] hover:bg-[var(--card-subtle)]'
          }`}
        >
          All Tasks ({deliverables.length})
        </button>
        {ALL_STAGES.map((st) => {
          const count = deliverables.filter((d) => d.status === st).length;
          return (
            <button
              key={st}
              onClick={() => setStageFilter(st)}
              className={`px-3 py-1.5 uppercase font-bold border transition-colors ${
                stageFilter === st
                  ? 'border-[var(--line)] bg-[var(--ink)] text-[var(--bg)]'
                  : 'border-[var(--line)]/50 bg-[var(--card-bg)] text-[var(--ink)] hover:bg-[var(--card-subtle)]'
              }`}
            >
              {st} ({count})
            </button>
          );
        })}
      </div>

      {/* Interactive Deliverables Task List (matches motif-v2.html pattern) */}
      <div className="border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard divide-y border-[var(--line)]">
        {filteredDeliverables.length === 0 ? (
          <div className="p-8 text-center space-y-2">
            <CheckSquare className="w-8 h-8 mx-auto opacity-30" />
            <div className="font-display font-bold text-lg">No tasks found</div>
            <p className="font-mono text-xs opacity-60">Adjust your stage or client filter above, or create a new deliverable task.</p>
          </div>
        ) : (
          filteredDeliverables.map((item) => {
            const isDone = item.status === 'Done';
            const badgeVariant =
              item.status === 'Done' ? 'acid' : item.status === 'In Review' ? 'electric' : item.status === 'Doing' ? 'oxblood' : 'default';

            return (
              <div
                key={item.id}
                className={`p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 transition-colors ${
                  isDone ? 'bg-[var(--card-subtle)]/60' : 'hover:bg-[var(--card-subtle)]'
                }`}
              >
                <div className="flex items-start gap-3.5 flex-1 min-w-[260px]">
                  <input
                    type="checkbox"
                    checked={isDone}
                    onChange={() => handleCheckboxToggle(item.id, item.status)}
                    className="mt-1 w-4 h-4 rounded-none border-2 border-[var(--line)] accent-[var(--ox)] cursor-pointer"
                    title={isDone ? 'Mark as incomplete' : 'Mark as Done'}
                  />
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[10px] font-bold text-[var(--ox)] uppercase">
                        {item.clientName}
                      </span>
                      <Badge variant={badgeVariant} className="text-[10px] font-mono uppercase">
                        {item.status}
                      </Badge>
                      {item.dueDate && (
                        <span className="font-mono text-[10px] opacity-70">
                          Due: {item.dueDate}
                        </span>
                      )}
                    </div>
                    <h3
                      className={`font-sans font-bold text-base text-[var(--ink)] leading-snug ${
                        isDone ? 'line-through opacity-50' : ''
                      }`}
                    >
                      {item.title}
                    </h3>
                    {item.notes && (
                      <p className="font-sans text-xs opacity-75 leading-relaxed max-w-xl">
                        {item.notes}
                      </p>
                    )}
                  </div>
                </div>

                {/* Stage Progression Buttons */}
                <div className="flex items-center gap-1 font-mono text-[10px]">
                  {ALL_STAGES.map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleSetStage(item.id, st)}
                      className={`px-2 py-1 border uppercase font-bold transition-colors ${
                        item.status === st
                          ? 'border-[var(--line)] bg-[var(--ink)] text-[var(--bg)]'
                          : 'border-[var(--line)]/40 bg-[var(--bg)] text-[var(--ink)] hover:bg-[var(--card-subtle)]'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Internal vs Client Scope Distinction Tile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t-2 border-[var(--line)]">
        <div className="p-5 border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard space-y-2">
          <div className="flex items-center gap-2 text-[var(--ox)] font-mono text-xs font-bold uppercase">
            <Layers className="w-4 h-4" />
            <span>Studio Production Assets vs Deliverables</span>
          </div>
          <p className="font-sans text-xs opacity-80 leading-relaxed">
            Raw creative files (.cov, .psd, .svg) authored in <strong>Create Studio</strong> stay in the asset ledger until packaged as client-facing milestone deliverables under contracted scope.
          </p>
        </div>

        <div className="p-5 border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard space-y-2">
          <div className="flex items-center gap-2 text-green-700 font-mono text-xs font-bold uppercase">
            <AlertCircle className="w-4 h-4" />
            <span>Review &amp; Revision Loop</span>
          </div>
          <p className="font-sans text-xs opacity-80 leading-relaxed">
            When a deliverable moves to <strong>In Review</strong>, client feedback notes can be appended before sign-off. Moving to <strong>Done</strong> unlocks completion metrics in Analyze &amp; Grow.
          </p>
        </div>
      </div>

      <NewDeliverableModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        clients={clients}
        onCreate={(data) => createDeliverable(data)}
      />
    </div>
  );
};

export default TasksPage;
