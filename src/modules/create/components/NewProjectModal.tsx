import React, { useState, useEffect } from 'react';
import { X, FolderPlus } from 'lucide-react';
import { Button, Input } from '../../../components/ui';
import { useProgress } from '../../../hooks';

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: { title: string; clientName: string; summary: string; tags: string[] }) => void;
}

export const NewProjectModal: React.FC<NewProjectModalProps> = ({ isOpen, onClose, onCreate }) => {
  const { clients } = useProgress();
  const [title, setTitle] = useState('');
  const [clientName, setClientName] = useState('');
  const [summary, setSummary] = useState('');
  const [tagInput, setTagInput] = useState('Identity, Editorial');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    const tags = tagInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    onCreate({
      title: title.trim(),
      clientName: clientName.trim() || 'Independent Studio',
      summary: summary.trim() || 'Tactile studio creative production underway.',
      tags: tags.length > 0 ? tags : ['Studio Output'],
    });
    setTitle('');
    setClientName('');
    setSummary('');
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Create New Studio Project"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-[var(--bg)] border-2 border-[var(--line)] shadow-hard p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b-2 border-[var(--line)]">
          <div className="flex items-center gap-2">
            <FolderPlus className="w-5 h-5 text-[var(--ox)]" />
            <h2 className="font-display font-bold text-2xl text-[var(--ink)]">New Studio Project</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1 border-2 border-[var(--line)] hover:bg-[var(--line)]/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Project Title"
            placeholder="e.g. Heavy Grotesque Typeface Specimen"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <div className="space-y-1">
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--ink)]">
              Client or Brand Context
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <select
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full sm:w-1/2 px-3 py-2 border-2 border-[var(--line)] bg-[var(--card-bg)] text-xs font-mono"
              >
                <option value="">Select Existing Account</option>
                {clients.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
              <Input
                placeholder="Or type custom imprint"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>

          <Input
            label="Summary & Goal"
            placeholder="What are you producing in this studio sprint?"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />

          <Input
            label="Tags (comma separated)"
            placeholder="Branding, Type, Risograph"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
          />

          <div className="pt-4 border-t border-[var(--line)]/20 flex items-center justify-end gap-3">
            <Button type="button" variant="secondary" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Initialize Project
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewProjectModal;

