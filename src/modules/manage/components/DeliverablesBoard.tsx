import React, { useState } from 'react';
import { Check, ChevronRight, Layers, Plus } from 'lucide-react';
import { Badge, Button } from '../../../components/ui';
import { DeliverableStage } from '../../../types';
import { useProgress } from '../../../hooks';
import { NewDeliverableModal } from './NewDeliverableModal';

const STAGES: DeliverableStage[] = ['Queued', 'Doing', 'In Review', 'Done'];

export const DeliverablesBoard: React.FC = () => {
  const { deliverables, clients, updateDeliverableStage, createDeliverable } = useProgress();
  const [modalOpen, setModalOpen] = useState(false);

  const handleAdvance = (id: string, currentStatus: DeliverableStage) => {
    const currentIdx = STAGES.indexOf(currentStatus);
    const nextStatus = STAGES[(currentIdx + 1) % STAGES.length];
    updateDeliverableStage(id, nextStatus);
  };

  return (
    <div className="space-y-4 pt-4 border-t-2 border-[var(--line)]">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-[var(--ox)]" />
          <h2 className="font-display font-bold text-xl uppercase tracking-tight">Active Deliverables Board</h2>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs opacity-75 hidden sm:inline">Click card to advance stage</span>
          <Button variant="secondary" size="sm" onClick={() => setModalOpen(true)}>
            <Plus className="w-3.5 h-3.5 mr-1" />
            <span>Add Deliverable</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STAGES.map((col) => {
          const items = deliverables.filter((d) => d.status === col);
          const badgeVariant =
            col === 'Done' ? 'acid' : col === 'In Review' ? 'electric' : col === 'Doing' ? 'oxblood' : 'default';

          return (
            <div key={col} className="border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard flex flex-col justify-between">
              <div className="p-3 border-b-2 border-[var(--line)] bg-[var(--card-subtle)] flex items-center justify-between">
                <span className="font-mono text-xs font-bold uppercase tracking-wider">{col}</span>
                <Badge variant={badgeVariant} className="text-[10px] font-mono font-bold">
                  {items.length}
                </Badge>
              </div>

              <div className="p-3 space-y-3 flex-1 min-h-[140px]">
                {items.length === 0 ? (
                  <div className="h-full flex items-center justify-center p-4 border border-dashed border-[var(--line)]/40 font-mono text-xs opacity-50 text-center">
                    No deliverables
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleAdvance(item.id, item.status)}
                      className="p-3 border-2 border-[var(--line)] bg-[var(--bg)] hover:bg-[var(--card-subtle)] transition-all cursor-pointer select-none space-y-2 shadow-hard-sm group"
                      title="Click to advance status"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] font-bold text-[var(--ox)] uppercase">{item.clientName}</span>
                        <ChevronRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                      </div>
                      <h4 className="font-sans font-bold text-xs text-[var(--ink)] leading-snug">{item.title}</h4>
                      <div className="flex items-center justify-between pt-1 font-mono text-[10px] opacity-70">
                        <span>{item.dueDate ? `Due: ${item.dueDate}` : item.id}</span>
                        {col === 'Done' && <Check className="w-3 h-3 text-[var(--ox)]" />}
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
