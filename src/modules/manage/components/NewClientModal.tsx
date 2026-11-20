import React, { useState } from 'react';
import { X, Building2 } from 'lucide-react';
import { Button, Input } from '../../../components/ui';
import { ClientRecord } from '../../../types';

interface NewClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (client: Partial<ClientRecord> & { name: string; contactEmail: string }) => void;
}

export const NewClientModal: React.FC<NewClientModalProps> = ({ isOpen, onClose, onCreate }) => {
  const [name, setName] = useState('');
  const [industry, setIndustry] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'active' | 'lead'>('active');
  const [retainer, setRetainer] = useState('5000');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || name.trim().length < 2) {
      setError('Client imprint name must be at least 2 characters.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError('Please provide a valid direct contact email address.');
      return;
    }

    onCreate({
      name: name.trim(),
      industry: industry.trim() || 'Creative Studio',
      contactEmail: email.trim(),
      status,
      monthlyRetainer: Number(retainer) || 0,
      notes: notes.trim(),
    });

    setName('');
    setIndustry('');
    setEmail('');
    setNotes('');
    setError(null);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Register Client Account"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-[var(--bg)] border-2 border-[var(--line)] shadow-hard p-6 sm:p-8 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b-2 border-[var(--line)]">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[var(--ox)]" />
            <h2 className="font-display font-bold text-2xl text-[var(--ink)]">Register Client Account</h2>
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
            label="Client Imprint Name"
            placeholder="e.g. Offscript Press / Hyperlink Records"
            value={name}
            onChange={(e) => { setName(e.target.value); setError(null); }}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Industry / Sector"
              placeholder="e.g. Independent Publishing"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
            />
            <Input
              label="Direct Contact Email"
              type="email"
              placeholder="editor@imprint.org"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(null); }}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--ink)]">
                Retainer Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as 'active' | 'lead')}
                className="w-full px-3 py-2 border-2 border-[var(--line)] bg-[var(--card-bg)] text-xs font-mono"
              >
                <option value="active">Active Retainer</option>
                <option value="lead">Lead / Prospect</option>
              </select>
            </div>
            <Input
              label="Monthly Retainer ($ MRR)"
              type="number"
              placeholder="5000"
              value={retainer}
              onChange={(e) => setRetainer(e.target.value)}
            />
          </div>

          <Input
            label="Notes & Scope Guidelines"
            placeholder="Key creative deliverables, branding contracts, release timelines."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <div className="pt-3 border-t border-[var(--line)]/20 flex items-center justify-end gap-2">
            <Button type="button" variant="secondary" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Client Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

