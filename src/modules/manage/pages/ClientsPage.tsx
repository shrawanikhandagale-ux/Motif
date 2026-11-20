import React from 'react';
import { SectionHeading, Sticker } from '../../../components/ui';
import { ManageSubNav, ClientRosterTable } from '../components';
import { Building2, Briefcase, DollarSign, Award } from 'lucide-react';
import { useProgress } from '../../../hooks';

export const ClientsPage: React.FC = () => {
  const { clients, deliverables } = useProgress();

  const activeClients = clients.filter((c) => c.status === 'active');
  const leadClients = clients.filter((c) => c.status === 'lead');
  const totalMrr = activeClients.reduce((acc, c) => acc + (c.monthlyRetainer || 0), 0);
  const totalDeliverablesUnderContract = deliverables.filter((d) => d.status !== 'Done').length;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <SectionHeading
        as="h1"
        kicker="Department 04 · Client Accounts & Retainer Imprints"
        title="CLIENTS:"
        skewWord="accounts & scopes"
        description="Manage direct client partnerships, industry sectors, active retainers, and deliverable commitments."
        borderBottom
        action={
          <Sticker variant="ivory" rotation="cw" className="!bg-[#171717] !text-[#F1EBDD] !border-[#F1EBDD]">
            Department 04
          </Sticker>
        }
      />

      <ManageSubNav />

      {/* Client Overview Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard-sm space-y-1">
          <div className="flex items-center justify-between font-mono text-[11px] opacity-75">
            <span>ACTIVE RETAINERS</span>
            <Building2 className="w-3.5 h-3.5 text-[var(--ox)]" />
          </div>
          <div className="font-display font-bold text-2xl text-[var(--ink)]">{activeClients.length}</div>
          <div className="font-mono text-[10px] text-green-700 font-bold">Under Retainer Agreement</div>
        </div>

        <div className="p-4 border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard-sm space-y-1">
          <div className="flex items-center justify-between font-mono text-[11px] opacity-75">
            <span>PROSPECTS & LEADS</span>
            <Briefcase className="w-3.5 h-3.5 text-[var(--ox)]" />
          </div>
          <div className="font-display font-bold text-2xl text-[var(--ink)]">{leadClients.length}</div>
          <div className="font-mono text-[10px] opacity-70">Pending Contract Terms</div>
        </div>

        <div className="p-4 border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard-sm space-y-1">
          <div className="flex items-center justify-between font-mono text-[11px] opacity-75">
            <span>CONTRACTED MRR</span>
            <DollarSign className="w-3.5 h-3.5 text-[var(--ox)]" />
          </div>
          <div className="font-display font-bold text-2xl text-[var(--ink)]">${(totalMrr / 1000).toFixed(1)}k/mo</div>
          <div className="font-mono text-[10px] text-[var(--ox)] font-bold">Recurring Operational Run-Rate</div>
        </div>

        <div className="p-4 border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard-sm space-y-1">
          <div className="flex items-center justify-between font-mono text-[11px] opacity-75">
            <span>LIVE SCOPES</span>
            <Award className="w-3.5 h-3.5 text-[var(--ox)]" />
          </div>
          <div className="font-display font-bold text-2xl text-[var(--ink)]">{totalDeliverablesUnderContract}</div>
          <div className="font-mono text-[10px] opacity-70">Active Project Deliverables</div>
        </div>
      </div>

      {/* Main Client Roster Table with Search, Filter & Modals */}
      <ClientRosterTable />
    </div>
  );
};

export default ClientsPage;

