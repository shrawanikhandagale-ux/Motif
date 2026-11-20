import React from 'react';
import { Link } from 'react-router-dom';
import { RefreshCw, ArrowRight, Sparkles } from 'lucide-react';
import { Tile, Badge, Button } from '../../../components/ui';
import { MetricInsight } from '../../../types';
import { MOCK_INSIGHTS } from '../services/mock/metrics';

export const LoopbackInsightsSection: React.FC = () => {
  return (
    <div className="space-y-4 pt-4 border-t-2 border-[var(--line)]">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <RefreshCw className="w-4 h-4 text-[var(--ox)] animate-spin-slow" />
          <h2 className="font-display font-bold text-xl uppercase tracking-tight">Closed-Loop Learning Diagnostics</h2>
        </div>
        <span className="font-mono text-xs opacity-75">Automated telemetry recommendations</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_INSIGHTS.map((insight: MetricInsight) => {
          const isWarning = insight.stat.includes('-');

          return (
            <Tile
              key={insight.id}
              accent={isWarning ? 'acid' : 'none'}
              shadow={isWarning ? 'ox' : 'default'}
              className="p-6 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <Badge variant="default" className="text-[10px] uppercase font-mono">
                    From Dept: {insight.departmentOrigin}
                  </Badge>
                  <span className={`font-mono text-xs font-bold px-2 py-0.5 border ${
                    isWarning ? 'border-[#171717] bg-[#702C35] text-[#F1EBDD]' : 'border-[var(--line)] bg-[var(--card-subtle)] text-green-700'
                  }`}>
                    {insight.stat}
                  </span>
                </div>

                <div>
                  <h3 className="font-display font-bold text-xl leading-snug">
                    {insight.headline}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm opacity-90 mt-2 leading-relaxed">
                    {insight.suggestedAction}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[var(--line)]/20 flex items-center justify-between">
                <span className="font-mono text-[10px] opacity-70">
                  Target: {insight.recommendPathId || 'path-branding-01'}
                </span>
                <Link
                  to={
                    insight.recommendPathId
                      ? `/learn/paths/${insight.recommendPathId}?from=analyze&reason=${encodeURIComponent(insight.headline)}`
                      : '/learn/paths'
                  }
                >
                  <Button variant="primary" size="sm" className="text-xs">
                    <Sparkles className="w-3.5 h-3.5 mr-1 text-[var(--acid)]" />
                    <span>Loop Back to Learn</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </Link>
              </div>
            </Tile>
          );
        })}
      </div>
    </div>
  );
};

export default LoopbackInsightsSection;
