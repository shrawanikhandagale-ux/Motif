import React, { useState } from 'react';
import { X, Share2, CheckCircle2 } from 'lucide-react';
import { Button } from '../../../components/ui';
import { CampaignRecord, ClientRecord } from '../../../types';

interface AttachToClientModalProps {
  campaign: CampaignRecord;
  clients: ClientRecord[];
  isOpen: boolean;
  onClose: () => void;
  onAttach: (campaignId: string, clientId: string, clientName: string) => void;
}

export const AttachToClientModal: React.FC<AttachToClientModalProps> = ({
  campaign,
  clients,
  isOpen,
  onClose,
  onAttach,
}) => {
  const [selectedClientId, setSelectedClientId] = useState(
    campaign.clientId || clients[0]?.id || ''
  );
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = () => {
    const client = clients.find((c) => c.id === selectedClientId) || clients[0];
    if (!client) return;

    onAttach(campaign.id, client.id, client.name);
    setConfirmed(true);
    setTimeout(() => {
      setConfirmed(false);
      onClose();
    }, 1200);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Attach Campaign to Client"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[var(--bg)] border-2 border-[var(--line)] shadow-hard p-6 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b-2 border-[var(--line)]">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-[var(--ox)]" />
            <h2 className="font-display font-bold text-xl text-[var(--ink)]">Attach to Client Scope</h2>
          </div>
          <button type="button" onClick={onClose} className="p-1 hover:bg-[var(--line)]/10" aria-label="Close">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3 font-mono text-xs">
          <div className="p-3 border border-[var(--line)] bg-[var(--card-subtle)] space-y-1">
            <span className="opacity-70">Target Campaign:</span>
            <div className="font-sans font-bold text-sm text-[var(--ink)]">{campaign.title}</div>
            <div className="text-[10px] opacity-75 capitalize">{campaign.channel} · Reach {campaign.reach}</div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--ink)]">
              Assign to Client Imprint
            </label>
            <select
              value={selectedClientId}
              onChange={(e) => setSelectedClientId(e.target.value)}
              className="w-full px-3 py-2 border-2 border-[var(--line)] bg-[var(--card-bg)] text-xs font-mono"
            >
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.status === 'active' ? 'Active Retainer' : 'Lead'})
                </option>
              ))}
            </select>
          </div>

          <p className="font-sans text-xs opacity-85 leading-relaxed">
            Attaching links this campaign to the client ledger and automatically spawns a corresponding deliverable in <strong className="font-bold">Manage</strong>.
          </p>
        </div>

        {confirmed && (
          <div className="p-3 border-2 border-[#171717] bg-[var(--acid)] text-[#171717] font-mono text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[var(--ox)]" />
            <span>Campaign linked! Manage deliverable initialized.</span>
          </div>
        )}

        <div className="pt-3 border-t border-[var(--line)]/20 flex items-center justify-end gap-2">
          <Button type="button" variant="secondary" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" variant="primary" size="sm" onClick={handleConfirm} disabled={confirmed}>
            Confirm &amp; Attach
          </Button>
        </div>
      </div>
    </div>
  );
};

