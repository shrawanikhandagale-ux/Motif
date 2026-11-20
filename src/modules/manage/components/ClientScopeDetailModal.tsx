import React from 'react';
import { X, Building2, CheckCircle2, Clock, Mail, DollarSign } from 'lucide-react';
import { Badge, Button } from '../../../components/ui';
import { ClientRecord, DeliverableRecord, CampaignRecord } from '../../../types';

interface ClientScopeDetailModalProps {
  client: ClientRecord;
  deliverables: DeliverableRecord[];
  campaigns: CampaignRecord[];
  onClose: () => void;
  onToggleStatus: (id: string, newStatus: 'active' | 'lead') => void;
}

export const ClientScopeDetailModal: React.FC<ClientScopeDetailModalProps> = ({
  client,
  deliverables,
  campaigns,
  onClose,
  onToggleStatus,
}) => {
  const clientDeliverables = deliverables.filter((d) => d.clientId === client.id);
  const clientCampaigns = campaigns.filter((c) => c.clientId === client.id);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Client Scope Agreement"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[var(--card-bg)] border-2 border-[var(--line)] shadow-hard-lg p-6 sm:p-8 space-y-5 text-[var(--ink)] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3 pb-3 border-b-2 border-[var(--line)]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[var(--ox)]" />
              <Badge variant={client.status === 'active' ? 'oxblood' : 'default'} className="font-mono text-[10px] uppercase">
                {client.status === 'active' ? 'Active Retainer' : 'Prospect / Lead'}
              </Badge>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl">{client.name}</h2>
            <div className="font-mono text-xs opacity-75">{client.industry}</div>
          </div>
          <button type="button" onClick={onClose} className="p-1 hover:bg-[var(--line)]/10" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Retainer & Contact Info Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 border border-[var(--line)] bg-[var(--card-subtle)] font-mono text-xs">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-[var(--ox)] shrink-0" />
            <span className="opacity-70">Contact:</span>
            <span className="font-bold">{client.contactEmail}</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-[var(--ox)] shrink-0" />
            <span className="opacity-70">Retainer MRR:</span>
            <span className="font-bold">${client.monthlyRetainer?.toLocaleString() || '0'}/mo</span>
          </div>
        </div>

        {client.notes && (
          <p className="font-sans text-xs sm:text-sm opacity-90 leading-relaxed p-3 border-l-2 border-[var(--ox)] bg-[var(--bg)] italic">
            “{client.notes}”
          </p>
        )}

        {/* Attached Deliverables */}
        <div className="space-y-2">
          <div className="flex items-center justify-between font-mono text-xs">
            <span className="font-bold uppercase tracking-wider">Contracted Deliverables ({clientDeliverables.length})</span>
            <span className="opacity-70">Manage Department</span>
          </div>
          {clientDeliverables.length === 0 ? (
            <div className="p-4 border border-dashed border-[var(--line)]/50 text-center font-mono text-xs opacity-60">
              No active deliverables logged for this client scope.
            </div>
          ) : (
            <div className="space-y-2">
              {clientDeliverables.map((del) => (
                <div key={del.id} className="p-3 border-2 border-[var(--line)] bg-[var(--bg)] flex items-center justify-between gap-3 text-xs">
                  <div className="space-y-0.5">
                    <div className="font-sans font-bold">{del.title}</div>
                    <div className="font-mono text-[10px] opacity-70">
                      {del.dueDate ? `Due: ${del.dueDate}` : del.id}
                    </div>
                  </div>
                  <Badge variant={del.status === 'Done' ? 'acid' : 'electric'} className="font-mono text-[10px]">
                    {del.status === 'Done' ? <CheckCircle2 className="w-3 h-3 mr-1 inline" /> : <Clock className="w-3 h-3 mr-1 inline" />}
                    {del.status}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Attached Campaigns */}
        <div className="space-y-2">
          <div className="flex items-center justify-between font-mono text-xs">
            <span className="font-bold uppercase tracking-wider">Distribution Campaigns ({clientCampaigns.length})</span>
            <span className="opacity-70">Market Department</span>
          </div>
          {clientCampaigns.length === 0 ? (
            <div className="p-4 border border-dashed border-[var(--line)]/50 text-center font-mono text-xs opacity-60">
              No marketing campaigns attached yet.
            </div>
          ) : (
            <div className="space-y-2">
              {clientCampaigns.map((camp) => (
                <div key={camp.id} className="p-3 border-2 border-[var(--line)] bg-[var(--bg)] flex items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="font-sans font-bold">{camp.title}</div>
                    <div className="font-mono text-[10px] opacity-70 capitalize">{camp.channel} · Reach: {camp.reach}</div>
                  </div>
                  <Badge variant="default" className="font-mono text-[10px] uppercase">
                    {camp.status}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-[var(--line)] flex items-center justify-between">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onToggleStatus(client.id, client.status === 'active' ? 'lead' : 'active')}
          >
            {client.status === 'active' ? 'Transition to Lead / Archived' : 'Activate Retainer Scope'}
          </Button>
          <Button variant="primary" size="sm" onClick={onClose}>
            Close Scope
          </Button>
        </div>
      </div>
    </div>
  );
};

