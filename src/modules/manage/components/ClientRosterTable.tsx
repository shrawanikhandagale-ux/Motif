import React, { useState } from 'react';
import { Mail, ArrowUpRight, Building2, Plus, DollarSign, Search } from 'lucide-react';
import { Badge, Button } from '../../../components/ui';
import { ClientRecord } from '../../../types';
import { useProgress } from '../../../hooks';
import { NewClientModal } from './NewClientModal';
import { ClientScopeDetailModal } from './ClientScopeDetailModal';

interface ClientRosterTableProps {
  clients?: ClientRecord[];
}

export const ClientRosterTable: React.FC<ClientRosterTableProps> = () => {
  const { clients, deliverables, campaigns, createClient, updateClient } = useProgress();
  const [newModalOpen, setNewModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<ClientRecord | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'lead'>('all');

  const filteredClients = clients.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.contactEmail.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-[var(--ox)]" />
          <h2 className="font-display font-bold text-xl uppercase tracking-tight">Client Accounts &amp; Retainers</h2>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-xs opacity-75">{clients.length} Registered Imprints</span>
          <Button variant="secondary" size="sm" onClick={() => setNewModalOpen(true)}>
            <Plus className="w-3.5 h-3.5 mr-1" />
            <span>Register Client</span>
          </Button>
        </div>
      </div>

      {/* Search and Status Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-[var(--card-subtle)] border-2 border-[var(--line)]">
        <div className="flex items-center gap-2 flex-1 min-w-[220px]">
          <Search className="w-3.5 h-3.5 opacity-60" />
          <input
            type="text"
            placeholder="Search by client imprint, industry or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent font-mono text-xs text-[var(--ink)] placeholder:opacity-50 focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2 font-mono text-xs">
          {(['all', 'active', 'lead'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-2.5 py-1 uppercase text-[11px] font-bold border transition-colors ${
                statusFilter === st
                  ? 'border-[var(--line)] bg-[var(--ink)] text-[var(--bg)]'
                  : 'border-[var(--line)]/40 bg-[var(--card-bg)] text-[var(--ink)] hover:bg-[var(--card-subtle)]'
              }`}
            >
              {st === 'all' ? 'All Imprints' : st === 'active' ? 'Active Retainer' : 'Leads'}
            </button>
          ))}
        </div>
      </div>

      <div className="border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard overflow-x-auto">
        <table className="w-full text-left font-mono text-xs border-collapse min-w-[680px]">
          <thead>
            <tr className="border-b-2 border-[var(--line)] bg-[var(--card-subtle)]">
              <th className="p-3.5 uppercase">Client Imprint</th>
              <th className="p-3.5 uppercase">Industry / Sector</th>
              <th className="p-3.5 uppercase">Retainer Status</th>
              <th className="p-3.5 uppercase">MRR Scope</th>
              <th className="p-3.5 uppercase">Active Scopes</th>
              <th className="p-3.5 uppercase">Direct Contact</th>
              <th className="p-3.5 uppercase text-right">Contract</th>
            </tr>
          </thead>
          <tbody className="divide-y border-[var(--line)]/20">
            {filteredClients.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-6 text-center font-mono text-xs opacity-60">
                  No client imprints match the current filter criteria.
                </td>
              </tr>
            ) : (
              filteredClients.map((c) => {
                const activeCount = deliverables.filter((d) => d.clientId === c.id && d.status !== 'Done').length;
                return (
                  <tr key={c.id} className="hover:bg-[var(--card-subtle)] transition-colors">
                    <td className="p-3.5 font-sans font-bold text-base text-[var(--ink)]">
                      {c.name}
                    </td>
                    <td className="p-3.5 opacity-85 font-mono">{c.industry}</td>
                    <td className="p-3.5">
                      <Badge variant={c.status === 'active' ? 'oxblood' : 'default'} className="text-[10px] uppercase font-mono">
                        {c.status === 'active' ? 'Active Retainer' : 'Prospect / Lead'}
                      </Badge>
                    </td>
                    <td className="p-3.5 font-bold">
                      <span className="inline-flex items-center gap-1 text-[var(--ox)]">
                        <DollarSign className="w-3.5 h-3.5" />
                        {c.monthlyRetainer ? `${(c.monthlyRetainer / 1000).toFixed(1)}k/mo` : 'Non-Retainer'}
                      </span>
                    </td>
                    <td className="p-3.5 font-bold">
                      {activeCount} Live Deliverable{activeCount !== 1 ? 's' : ''}
                    </td>
                    <td className="p-3.5 text-xs opacity-80">
                      <a href={`mailto:${c.contactEmail}`} className="hover:underline inline-flex items-center gap-1">
                        <Mail className="w-3 h-3 text-[var(--ox)]" /> {c.contactEmail}
                      </a>
                    </td>
                    <td className="p-3.5 text-right">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setSelectedClient(c)}
                        className="text-xs px-2 py-1"
                      >
                        <span>Scope Agreement</span>
                        <ArrowUpRight className="w-3 h-3 ml-1" />
                      </Button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <NewClientModal
        isOpen={newModalOpen}
        onClose={() => setNewModalOpen(false)}
        onCreate={(data) => createClient(data)}
      />

      {selectedClient && (
        <ClientScopeDetailModal
          client={selectedClient}
          deliverables={deliverables}
          campaigns={campaigns}
          onClose={() => setSelectedClient(null)}
          onToggleStatus={(id, newStatus) => {
            updateClient(id, { status: newStatus });
            setSelectedClient((prev) => (prev ? { ...prev, status: newStatus } : null));
          }}
        />
      )}
    </div>
  );
};

export default ClientRosterTable;
