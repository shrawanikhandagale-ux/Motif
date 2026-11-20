import React, { useState } from 'react';
import { X, Megaphone } from 'lucide-react';
import { Button, Input } from '../../../components/ui';
import { CampaignRecord, ClientRecord } from '../../../types';

interface NewCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  clients: ClientRecord[];
  onCreate: (campaign: Partial<CampaignRecord> & { title: string }) => void;
}

export const NewCampaignModal: React.FC<NewCampaignModalProps> = ({
  isOpen,
  onClose,
  clients,
  onCreate,
}) => {
  const [title, setTitle] = useState('');
  const [channel, setChannel] = useState<CampaignRecord['channel']>('substack');
  const [dateNotice, setDateNotice] = useState('Today · 18:00');
  const [reach, setReach] = useState('20.0k');
  const [selectedClientId, setSelectedClientId] = useState(clients[0]?.id || '');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || title.trim().length < 3) {
      setError('Campaign title must be at least 3 characters.');
      return;
    }
    const client = clients.find((c) => c.id === selectedClientId);

    onCreate({
      title: title.trim(),
      channel,
      dateNotice: dateNotice.trim() || 'Scheduled',
      reach: reach.trim() || '15.0k',
      clientId: client?.id,
      clientName: client?.name,
      status: 'planned',
      description: description.trim() || 'Multi-channel marketing distribution sprint.',
      metrics: {
        reach: reach.trim() || '15.0k',
        engagement: '20.0%',
        conversion: '4.0%',
      },
    });

    setTitle('');
    setDescription('');
    setError(null);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Schedule Campaign Drop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-[var(--bg)] border-2 border-[var(--line)] shadow-hard p-6 sm:p-8 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b-2 border-[var(--line)]">
          <div className="flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-[var(--ox)]" />
            <h2 className="font-display font-bold text-2xl text-[var(--ink)]">Schedule Campaign Drop</h2>
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
            label="Campaign / Drop Title"
            placeholder="e.g. Autumn Manifesto Dispatch"
            value={title}
            onChange={(e) => { setTitle(e.target.value); setError(null); }}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--ink)]">
                Distribution Channel
              </label>
              <select
                value={channel}
                onChange={(e) => setChannel(e.target.value as CampaignRecord['channel'])}
                className="w-full px-3 py-2 border-2 border-[var(--line)] bg-[var(--card-bg)] text-xs font-mono"
              >
                <option value="substack">Substack Drop</option>
                <option value="instagram">Instagram Drop</option>
                <option value="x">X / Twitter Thread</option>
                <option value="email">Direct Email Broadcast</option>
                <option value="multi">Multi-Channel Release</option>
              </select>
            </div>
            <Input
              label="Timing / Date Notice"
              placeholder="e.g. Today · 18:00 or Friday"
              value={dateNotice}
              onChange={(e) => setDateNotice(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Target Reach"
              placeholder="e.g. 24.8k"
              value={reach}
              onChange={(e) => setReach(e.target.value)}
            />
            <div className="space-y-1">
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--ink)]">
                Client Imprint (Optional)
              </label>
              <select
                value={selectedClientId}
                onChange={(e) => setSelectedClientId(e.target.value)}
                className="w-full px-3 py-2 border-2 border-[var(--line)] bg-[var(--card-bg)] text-xs font-mono"
              >
                <option value="">Independent / Self-Released</option>
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Input
            label="Distribution Summary"
            placeholder="Key hooks, newsletter copy topics, teaser assets."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="pt-3 border-t border-[var(--line)]/20 flex items-center justify-end gap-2">
            <Button type="button" variant="secondary" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Schedule Drop
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

