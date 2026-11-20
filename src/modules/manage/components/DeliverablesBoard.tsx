import React, { useState } from 'react';
import { Check, ArrowRight, Layers, Plus, Filter } from 'lucide-react';
import { Badge, Button } from '../../../components/ui';
import { DeliverableStage } from '../../../types';
import { useProgress } from '../../../hooks';
import { NewDeliverableModal } from './NewDeliverableModal';

const STAGES: DeliverableStage[] = ['Queued', 'Doing', 'In Review', 'Done'];

export const DeliverablesBoard: React.FC = () => {
  const { deliverables, clients, updateDeliverableStage, createDeliverable } = useProgress();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedClientFilter, setSelectedClientFilter] = useState<string>('all');
  const [draggedId, setDraggedId] = useState<string | null>(null);

  const handleAdvance = (id: string, currentStatus: DeliverableStage, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const currentIdx = STAGES.indexOf(currentStatus);
    const nextStatus = STAGES[(currentIdx + 1) % STAGES.length];
    updateDeliverableStage(id, nextStatus);
  };

  const handleDragStart = (id: string, e: React.DragEvent) => {
    setDraggedId(id);
    e.dataTransfer.setData('text/plain', id);
  };

  const handleDrop = (targetStage: DeliverableStage, e: React.DragEvent) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain') || draggedId;
    if (id) {
      updateDeliverableStage(id, targetStage);
    }
    setDraggedId(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const filteredDeliverables = selectedClientFilter === 'all'
    ? deliverables
    : deliverables.filter((d) => d.clientId === selectedClientFilter || d.clientName === selectedClientFilter);

  return (
    <div className="space-y-4 pt-4 border-t-2 border-[var(--line)]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-[var(--ox)]" />
          <h2 className="font-display font-bold text-xl uppercase tracking-tight">Active Deliverables Board</h2>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {/* Client Filter */}
          <div className="flex items-center gap-1.5 font-mono text-xs">
            <Filter className="w-3.5 h-3.5 opacity-60" />
            <select
              aria-label="Filter by client imprint"
              value={selectedClientFilter}
              onChange={(e) => setSelectedClientFilter(e.target.value)}
              className="bg-[var(--card-bg)] border border-[var(--line)] px-2.5 py-1 text-xs font-mono text-[var(--ink)] focus:outline-none focus:border-[var(--ox)]"
            >
              <option value="all">All Client Imprints</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <Button variant="secondary" size="sm" onClick={() => setModalOpen(true)}>
            <Plus className="w-3.5 h-3.5 mr-1" />
            <span>Add Deliverable</span>
          </Button>
        </div>
      </div>

      <p className="font-mono text-xs opacity-75">
        Drag deliverable cards between stages, or tap the <ArrowRight className="inline w-3 h-3 text-[var(--ox)]" /> arrow to advance. Changes synchronize with Create and Analyze.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STAGES.map((col) => {
          const items = filteredDeliverables.filter((d) => d.status === col);
          const badgeVariant =
            col === 'Done' ? 'acid' : col === 'In Review' ? 'electric' : col === 'Doing' ? 'oxblood' : 'default';

          return (
            <div
              key={col}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(col, e)}
              className="border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard flex flex-col justify-between transition-colors min-h-[220px]"
            >
              <div className="p-3 border-b-2 border-[var(--line)] bg-[var(--card-subtle)] flex items-center justify-between">
                <span className="font-mono text-xs font-bold uppercase tracking-wider">{col}</span>
                <Badge variant={badgeVariant} className="text-[10px] font-mono font-bold">
                  {items.length}
                </Badge>
              </div>

              <div className="p-3 space-y-3 flex-1">
                {items.length === 0 ? (
                  <div className="h-full min-h-[140px] flex items-center justify-center p-4 border border-dashed border-[var(--line)]/40 font-mono text-xs opacity-50 text-center">
                    No deliverables in {col}
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.id}
                      draggable
                      onDragStart={(e) => handleDragStart(item.id, e)}
                      onClick={() => handleAdvance(item.id, item.status)}
                      className="p-3 border-2 border-[var(--line)] bg-[var(--bg)] hover:bg-[var(--card-subtle)] transition-all cursor-grab active:cursor-grabbing select-none space-y-2 shadow-hard-sm group"
                      title="Click or drag to advance status"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] font-bold text-[var(--ox)] uppercase truncate max-w-[150px]">
                          {item.clientName}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => handleAdvance(item.id, item.status, e)}
                          title="Advance to next stage"
                          className="p-1 hover:bg-[var(--card-subtle)] border border-[var(--line)]/40 rounded-xs transition-transform group-hover:scale-110"
                        >
                          <ArrowRight className="w-3 h-3 text-[var(--ox)]" />
                        </button>
                      </div>
                      <h4 className="font-sans font-bold text-xs text-[var(--ink)] leading-snug">{item.title}</h4>
                      <div className="flex items-center justify-between pt-1 font-mono text-[10px] opacity-70">
                        <span>{item.dueDate ? `Due: ${item.dueDate}` : item.id}</span>
                        {col === 'Done' && <Check className="w-3.5 h-3.5 text-[var(--ox)]" />}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
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

export default DeliverablesBoard;
