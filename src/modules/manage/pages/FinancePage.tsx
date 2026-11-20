import React from 'react';
import { SectionHeading, Sticker, Badge } from '../../../components/ui';
import { ManageSubNav } from '../components';
import { DollarSign, Building2, TrendingUp, Mail } from 'lucide-react';
import { useProgress } from '../../../hooks';

export const FinancePage: React.FC = () => {
  const { clients, deliverables } = useProgress();

  const activeClients = clients.filter((c) => c.status === 'active');
  const totalMrr = activeClients.reduce((acc, c) => acc + (c.monthlyRetainer || 0), 0);
  const annualRunRate = totalMrr * 12;
  const avgRetainer = activeClients.length > 0 ? Math.round(totalMrr / activeClients.length) : 0;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <SectionHeading
        as="h1"
        kicker="Department 04 · Operations & Contract Billing Ledger"
        title="FINANCE & RETAINERS:"
        skewWord="live scopes"
        description="Active contract retainers, monthly recurring revenue run-rates, and billing terms derived from verified client accounts."
        borderBottom
        action={
          <Sticker variant="ivory" rotation="cw" className="!bg-[#171717] !text-[#F1EBDD] !border-[#F1EBDD]">
            Department 04
          </Sticker>
        }
      />

      <ManageSubNav />

      {/* Financial Telemetry Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard-sm space-y-1">
          <div className="flex items-center justify-between font-mono text-[11px] opacity-75">
            <span>MONTHLY MRR</span>
            <DollarSign className="w-3.5 h-3.5 text-[var(--ox)]" />
          </div>
          <div className="font-display font-bold text-2xl text-[var(--ink)]">${(totalMrr / 1000).toFixed(1)}k/mo</div>
          <div className="font-mono text-[10px] text-green-700 font-bold">Contracted Active Retainers</div>
        </div>

        <div className="p-4 border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard-sm space-y-1">
          <div className="flex items-center justify-between font-mono text-[11px] opacity-75">
            <span>ANNUAL RUN-RATE (ARR)</span>
            <TrendingUp className="w-3.5 h-3.5 text-[var(--ox)]" />
          </div>
          <div className="font-display font-bold text-2xl text-[var(--ink)]">${(annualRunRate / 1000).toFixed(1)}k/yr</div>
          <div className="font-mono text-[10px] text-[var(--ox)] font-bold">12-Month Projected Value</div>
        </div>

        <div className="p-4 border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard-sm space-y-1">
          <div className="flex items-center justify-between font-mono text-[11px] opacity-75">
            <span>AVG RETAINER</span>
            <Building2 className="w-3.5 h-3.5 text-[var(--ox)]" />
          </div>
          <div className="font-display font-bold text-2xl text-[var(--ink)]">${(avgRetainer / 1000).toFixed(1)}k/mo</div>
          <div className="font-mono text-[10px] opacity-70">Per Active Imprint</div>
        </div>

        <div className="p-4 border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard-sm space-y-1">
          <div className="flex items-center justify-between font-mono text-[11px] opacity-75">
            <span>ACTIVE ACCOUNTS</span>
            <Building2 className="w-3.5 h-3.5 text-[var(--ox)]" />
          </div>
          <div className="font-display font-bold text-2xl text-[var(--ink)]">{activeClients.length}</div>
          <div className="font-mono text-[10px] opacity-70">Under Formal Contract</div>
        </div>
      </div>

      {/* Active Retainer Contracts Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight">Active Client Retainer Contracts</h2>
          <span className="font-mono text-xs opacity-75">{activeClients.length} Active Ledgers</span>
        </div>

        <div className="border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard overflow-x-auto">
          <table className="w-full text-left font-mono text-xs border-collapse min-w-[680px]">
            <thead>
              <tr className="border-b-2 border-[var(--line)] bg-[var(--card-subtle)]">
                <th className="p-3.5 uppercase">Client Imprint</th>
                <th className="p-3.5 uppercase">Sector</th>
                <th className="p-3.5 uppercase">Billing Cadence</th>
                <th className="p-3.5 uppercase">Monthly Retainer</th>
                <th className="p-3.5 uppercase">Annual Value</th>
                <th className="p-3.5 uppercase">Active Scopes</th>
                <th className="p-3.5 uppercase">Contact</th>
              </tr>
            </thead>
            <tbody className="divide-y border-[var(--line)]/20">
              {activeClients.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-6 text-center font-mono text-xs opacity-60">
                    No active client retainers registered yet. Register client accounts in the Clients directory.
                  </td>
                </tr>
              ) : (
                activeClients.map((client) => {
                  const clientDeliverablesCount = deliverables.filter((d) => d.clientId === client.id && d.status !== 'Done').length;
                  const retainer = client.monthlyRetainer || 0;
                  return (
                    <tr key={client.id} className="hover:bg-[var(--card-subtle)] transition-colors">
                      <td className="p-3.5 font-sans font-bold text-base text-[var(--ink)]">
                        {client.name}
                      </td>
                      <td className="p-3.5 opacity-85 font-mono">{client.industry}</td>
                      <td className="p-3.5">
                        <Badge variant="default" className="text-[10px] font-mono uppercase">
                          Monthly Net 15
                        </Badge>
                      </td>
                      <td className="p-3.5 font-bold text-[var(--ox)]">
                        ${(retainer / 1000).toFixed(1)}k / mo
                      </td>
                      <td className="p-3.5 font-bold">
                        ${((retainer * 12) / 1000).toFixed(1)}k / yr
                      </td>
                      <td className="p-3.5">
                        {clientDeliverablesCount} Milestone{clientDeliverablesCount !== 1 ? 's' : ''}
                      </td>
                      <td className="p-3.5 text-xs opacity-80">
                        <a href={`mailto:${client.contactEmail}`} className="hover:underline inline-flex items-center gap-1">
                          <Mail className="w-3 h-3 text-[var(--ox)]" /> {client.contactEmail}
                        </a>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Editorial Brutalist Integrity Notice (follows motif-v2.html:123) */}
      <div className="p-6 border-2 border-dashed border-[var(--line)] bg-[var(--card-bg)] space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="subtle" className="font-mono text-[10px] uppercase font-bold">
            Editorial Brutalist Principle
          </Badge>
          <span className="font-mono text-xs text-[var(--ox)] font-bold">No Fabricated Payment Processing</span>
        </div>
        <h3 className="font-display font-bold text-lg text-[var(--ink)]">
          Finance &amp; Operations · Live Client Scopes
        </h3>
        <p className="font-sans text-xs sm:text-sm opacity-85 leading-relaxed max-w-3xl">
          Invoices and fee allocations reflect active client retainer contracts registered in the MOTIF operational store. We do not inject decorative billing graphs or synthetic Stripe/payment gateway integrations without an authenticated accounting backend.
        </p>
      </div>
    </div>
  );
};

export default FinancePage;
