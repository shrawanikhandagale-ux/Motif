import React from 'react';
import { SectionHeading, Button, Sticker } from '../../../components/ui';
import { HandoffNotice } from '../../../components/shared/HandoffNotice';
import { ClientRosterTable, DeliverablesBoard } from '../components';
import { Briefcase, DollarSign, Clock, BarChart2, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProgress } from '../../../hooks';

export const ManagePage: React.FC = () => {
  const { clients, deliverables } = useProgress();

  const activeClients = clients.filter((c) => c.status === 'active');
  const activeClientsCount = activeClients.length;
  const totalMrr = activeClients.reduce((acc, c) => acc + (c.monthlyRetainer || 0), 0);
  const liveDeliverables = deliverables.filter((d) => d.status !== 'Done');
  const completedDeliverables = deliverables.filter((d) => d.status === 'Done');
  const velocity =
    deliverables.length > 0
      ? Math.round((completedDeliverables.length / deliverables.length) * 100)
      : 100;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <SectionHeading
        as="h1"
        kicker="Department 04 · The Workspace · Business Operations Ledger"
        title="MANAGE:"
        skewWord="the workspace"
        description="Run the work with systematic client rosters, deliverable tracking boards, retainer scopes, and operational control."
        borderBottom
        action={
          <Sticker variant="acid" rotation="cw">
            Department 04
          </Sticker>
        }
      />

      {/* Operations Telemetry Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard-sm space-y-1">
          <div className="flex items-center justify-between font-mono text-[11px] opacity-75">
            <span>CLIENT ACCOUNTS</span>
            <Briefcase className="w-3.5 h-3.5 text-[var(--ox)]" />
          </div>
          <div className="font-display font-bold text-2xl text-[var(--ink)]">{activeClientsCount} Active</div>
          <div className="font-mono text-[10px] text-[var(--ox)] font-bold">{clients.length} Total Accounts</div>
        </div>

        <div className="p-4 border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard-sm space-y-1">
          <div className="flex items-center justify-between font-mono text-[11px] opacity-75">
            <span>RETAINER MRR</span>
            <DollarSign className="w-3.5 h-3.5 text-[var(--ox)]" />
          </div>
          <div className="font-display font-bold text-2xl text-[var(--ink)]">${(totalMrr / 1000).toFixed(1)}k/mo</div>
          <div className="font-mono text-[10px] text-green-700 font-bold">Active Contract Value</div>
        </div>

        <div className="p-4 border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard-sm space-y-1">
          <div className="flex items-center justify-between font-mono text-[11px] opacity-75">
            <span>LIVE DELIVERABLES</span>
            <Clock className="w-3.5 h-3.5 text-[var(--ox)]" />
          </div>
          <div className="font-display font-bold text-2xl text-[var(--ink)]">{liveDeliverables.length} Under Contract</div>
          <div className="font-mono text-[10px] opacity-70">{completedDeliverables.length} marked done</div>
        </div>

        <div className="p-4 border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard-sm space-y-1">
          <div className="flex items-center justify-between font-mono text-[11px] opacity-75">
            <span>DELIVERY VELOCITY</span>
            <ShieldCheck className="w-3.5 h-3.5 text-[var(--ox)]" />
          </div>
          <div className="font-display font-bold text-2xl text-[var(--ink)]">{velocity}% Completed</div>
          <div className="font-mono text-[10px] text-[var(--ox)] font-bold">Studio Verified</div>
        </div>
      </div>

      <HandoffNotice
        toDeptName="Analyze & Grow"
        toDeptPath="/analyze"
        text="Live client campaigns and completed scopes stream directly into Analyze & Grow metrics."
      />

      {/* 01. Client Roster Table */}
      <ClientRosterTable />

      {/* 02. Deliverables Board */}
      <DeliverablesBoard />

      {/* 03. Business Ledger & Retainer Scopes Strip */}
      <div className="p-6 border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1 max-w-xl">
          <span className="font-mono text-xs uppercase font-bold text-[var(--ox)]">Operational Closed-Loop</span>
          <h3 className="font-display font-bold text-xl text-[var(--ink)]">Deliverable Telemetry Sync</h3>
          <p className="font-sans text-xs sm:text-sm opacity-85 leading-relaxed">
            Completed scopes and billable milestones are audited directly in Analyze &amp; Grow to calculate studio margins and client profitability.
          </p>
        </div>
        <Link to="/analyze">
          <Button variant="primary" size="md">
            <BarChart2 className="w-4 h-4 mr-2" />
            <span>Open Telemetry in Analyze</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ManagePage;
