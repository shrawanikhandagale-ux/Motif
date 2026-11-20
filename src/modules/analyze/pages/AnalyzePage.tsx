import React from 'react';
import { SectionHeading, Sticker } from '../../../components/ui';
import { HandoffNotice } from '../../../components/shared/HandoffNotice';
import { TelemetryCharts, LoopbackInsightsSection } from '../components';
import { TrendingUp, Users, DollarSign, Award } from 'lucide-react';
import { useProgress } from '../../../hooks';

export const AnalyzePage: React.FC = () => {
  const { clients, campaigns, unlockedSkills } = useProgress();

  const activeClients = clients.filter((c) => c.status === 'active');
  const totalMrr = activeClients.reduce((acc, c) => acc + (c.monthlyRetainer || 0), 0);

  const dynamicMetrics = [
    {
      label: 'Total Audience Reach',
      value: campaigns.length > 0 ? '78.6k' : '0k',
      change: `+32% (${campaigns.length} drops)`,
      status: 'positive',
    },
    {
      label: 'Active Retainers',
      value: `${activeClients.length} Clients`,
      change: `$${(totalMrr / 1000).toFixed(1)}k/mo`,
      status: 'positive',
    },
    {
      label: 'Conversion Velocity',
      value: '4.8%',
      change: '-0.6% this week',
      status: 'warning',
    },
    {
      label: 'Skill Modules Cleared',
      value: `${unlockedSkills.length} of 15`,
      change: `${Math.round((unlockedSkills.length / 15) * 100)}% mapped`,
      status: 'neutral',
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <SectionHeading
        as="h1"
        kicker="Department 05 · The Feedback Engine · Closed-Loop Telemetry"
        title="ANALYZE:"
        skewWord="& grow"
        description="See what worked with live campaign diagnostics, revenue performance, and analytical insights that close the loop back to Learn."
        borderBottom
        action={
          <Sticker variant="acid" rotation="cw">
            Department 05
          </Sticker>
        }
      />

      {/* KPI Metric Matrix */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {dynamicMetrics.map((m) => {
          const isWarning = m.status === 'warning';
          const isPositive = m.status === 'positive';

          return (
            <div
              key={m.label}
              className={`p-4 border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard-sm space-y-1.5 ${
                isWarning ? 'border-l-4 border-l-[var(--ox)]' : ''
              }`}
            >
              <div className="flex items-center justify-between font-mono text-[11px] opacity-75">
                <span className="truncate">{m.label.toUpperCase()}</span>
                {m.label.includes('Audience') ? (
                  <Users className="w-3.5 h-3.5 text-[var(--ox)]" />
                ) : m.label.includes('Retainer') ? (
                  <DollarSign className="w-3.5 h-3.5 text-[var(--ox)]" />
                ) : m.label.includes('Conversion') ? (
                  <TrendingUp className="w-3.5 h-3.5 text-[var(--ox)]" />
                ) : (
                  <Award className="w-3.5 h-3.5 text-[var(--ox)]" />
                )}
              </div>
              <div className="font-display font-extrabold text-2xl sm:text-3xl text-[var(--ink)]">
                {m.value}
              </div>
              <div
                className={`font-mono text-[10px] font-bold ${
                  isPositive ? 'text-green-700' : isWarning ? 'text-[var(--ox)]' : 'opacity-70'
                }`}
              >
                {m.change}
              </div>
            </div>
          );
        })}
      </div>

      <HandoffNotice
        toDeptName="Learn"
        toDeptPath="/learn"
        text="A weak result suggests a targeted curriculum path in Learn. The interconnected cycle continues."
      />

      {/* Custom Brutalist Visualizations */}
      <TelemetryCharts />

      {/* Actionable Loopback Insights */}
      <LoopbackInsightsSection />
    </div>
  );
};

export default AnalyzePage;
