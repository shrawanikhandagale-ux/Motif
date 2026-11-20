import React, { useState } from 'react';
import { X, Layers } from 'lucide-react';
import { Button, Input } from '../../../components/ui';
import { ClientRecord, DeliverableStage } from '../../../types';

interface NewDeliverableModalProps {
  isOpen: boolean;
  onClose: () => void;
  clients: ClientRecord[];
  onCreate: (data: { title: string; clientId: string; clientName: string; status: DeliverableStage; dueDate: string }) => void;
}

export const NewDeliverableModal: React.FC<NewDeliverableModalProps> = ({ isOpen, onClose, clients, onCreate }) => {
  const [title, setTitle] = useState('');
  const [selectedClientId, setSelectedClientId] = useState(clients[0]?.id || '');
  const [status, setStatus] = useState<DeliverableStage>('Queued');
  const [dueDate, setDueDate] = useState('2026-12-05');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || title.trim().length < 3) {
      setError('Title must be at least 3 characters.');
      return;
    }
    const client = clients.find((c) => c.id === selectedClientId) || clients[0];
    if (!client) {
      setError('A valid client account must be selected.');
      return;
    }

    onCreate({
      title: title.trim(),
      clientId: client.id,
      clientName: client.name,
      status,
      dueDate,
    });
    setTitle('');
    setError(null);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Add Client Deliverable"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[var(--bg)] border-2 border-[var(--line)] shadow-hard p-6 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b-2 border-[var(--line)]">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-[var(--ox)]" />
            <h2 className="font-display font-bold text-xl text-[var(--ink)]">Add Deliverable</h2>
          </div>
          <button type="button" onClick={onClose} className="p-1 hover:bg-[var(--line)]/10" aria-label="Close">
            <X className="w-4 h-4" />
          </button>
        </div>

        {error && (
          <div className="p-2.5 border-2 border-[var(--ox)] bg-[var(--ox)]/10 font-mono text-xs text-[var(--ox)] font-bold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Deliverable Scope Title"
            placeholder="e.g. Acid Halftone Separations"
            value={title}
            onChange={(e) => { setTitle(e.target.value); setError(null); }}
            required
          />

          <div className="space-y-1">
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--ink)]">
              Assigned Client Account
            </label>
            <select
              value={selectedClientId}
              onChange={(e) => setSelectedClientId(e.target.value)}
              className="w-full px-3 py-2 border-2 border-[var(--line)] bg-[var(--card-bg)] text-xs font-mono"
            >
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.industry})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--ink)]">
                Initial Stage
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as DeliverableStage)}
                className="w-full px-3 py-2 border-2 border-[var(--line)] bg-[var(--card-bg)] text-xs font-mono"
              >
                <option value="Queued">Queued</option>
                <option value="Doing">Doing</option>
                <option value="In Review">In Review</option>
                <option value="Done">Done</option>
              </select>
            </div>
            <Input
              label="Delivery Due Date"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <div className="pt-3 border-t border-[var(--line)]/20 flex items-center justify-end gap-2">
            <Button type="button" variant="secondary" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Create Deliverable
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

