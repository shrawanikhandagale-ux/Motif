import React from 'react';
import { BarChart3, TrendingUp, Layers, CheckCircle2, AlertCircle } from 'lucide-react';
import { Tile } from '../../../components/ui';

export const TelemetryCharts: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 01: Multi-Channel Distribution Breakdown */}
        <Tile accent="none" shadow="default" className="p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase font-bold text-[var(--ox)] flex items-center gap-1.5">
                <BarChart3 className="w-3.5 h-3.5" /> Channel Share
              </span>
              <span className="font-mono text-xs opacity-75">78.6k Total Reach</span>
            </div>
            <h3 className="font-display font-bold text-xl text-[var(--ink)]">Audience Distribution Velocity</h3>
            <p className="font-sans text-xs opacity-80 leading-relaxed">
              Proportional audience reach across owned publishing channels versus social acquisition loops.
            </p>

            {/* Stacked Brutalist Proportion Bar */}
            <div className="space-y-2 pt-2">
              <div className="h-6 w-full border-2 border-[var(--line)] flex overflow-hidden shadow-hard-sm">
                <div style={{ width: '54%' }} className="bg-[var(--ox)] text-[#F1EBDD] font-mono text-[10px] font-bold flex items-center justify-center" title="Substack: 54%">
                  54%
                </div>
                <div style={{ width: '32%' }} className="bg-[var(--acid)] text-[#171717] font-mono text-[10px] font-bold flex items-center justify-center border-l-2 border-r-2 border-[var(--line)]" title="Instagram: 32%">
                  32%
                </div>
                <div style={{ width: '14%' }} className="bg-[var(--elec)] text-[#171717] font-mono text-[10px] font-bold flex items-center justify-center" title="Direct Drops: 14%">
                  14%
                </div>
              </div>

              {/* Legend */}
              <div className="grid grid-cols-3 gap-2 font-mono text-[11px] pt-1">
                <div>
                  <div className="flex items-center gap-1.5 font-bold"><span className="w-2.5 h-2.5 bg-[var(--ox)] border border-[var(--line)]" /> Substack</div>
                  <div className="opacity-70 text-[10px]">42.5k readers</div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 font-bold"><span className="w-2.5 h-2.5 bg-[var(--acid)] border border-[var(--line)]" /> Instagram</div>
                  <div className="opacity-70 text-[10px]">24.8k reach</div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 font-bold"><span className="w-2.5 h-2.5 bg-[var(--elec)] border border-[var(--line)]" /> Direct Drops</div>
                  <div className="opacity-70 text-[10px]">11.3k buyers</div>
                </div>
              </div>
            </div>
          </div>
        </Tile>

        {/* Chart 02: 4-Week Conversion Velocity Step Chart */}
        <Tile accent="none" shadow="default" className="p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase font-bold text-[var(--ox)] flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5" /> Conversion Telemetry
              </span>
              <span className="font-mono text-xs text-[var(--ox)] font-bold">4.8% Active (-0.6%)</span>
            </div>
            <h3 className="font-display font-bold text-xl text-[var(--ink)]">4-Week Conversion Trajectory</h3>
            <p className="font-sans text-xs opacity-80 leading-relaxed">
              Step telemetry measuring visitor-to-subscriber conversion across weekly release cycles.
            </p>

            {/* Custom SVG Step-Line Chart */}
            <div className="p-2 border-2 border-[var(--line)] bg-[var(--card-subtle)] overflow-hidden">
              <svg viewBox="0 0 460 110" className="w-full h-24 stroke-[var(--line)]" aria-label="Conversion chart">
                {/* Horizontal grid lines */}
                <line x1="40" y1="20" x2="440" y2="20" stroke="var(--line)" strokeDasharray="3 3" opacity="0.25" />
                <line x1="40" y1="55" x2="440" y2="55" stroke="var(--line)" strokeDasharray="3 3" opacity="0.25" />
                <line x1="40" y1="90" x2="440" y2="90" stroke="var(--line)" opacity="0.5" />

                {/* Y Axis Labels */}
                <text x="10" y="24" className="font-mono text-[9px] fill-[var(--ink)] opacity-70">6.0%</text>
                <text x="10" y="59" className="font-mono text-[9px] fill-[var(--ink)] opacity-70">4.0%</text>
                <text x="10" y="94" className="font-mono text-[9px] fill-[var(--ink)] opacity-70">2.0%</text>

                {/* Stepped Line Path */}
                <path
                  d="M 60 72 L 140 72 L 140 45 L 240 45 L 240 28 L 340 28 L 340 42 L 430 42"
                  fill="none"
                  stroke="var(--ox)"
                  strokeWidth="3.5"
                  strokeLinecap="square"
                />

                {/* Data Points */}
                <rect x="56" y="68" width="8" height="8" fill="var(--acid)" stroke="var(--line)" strokeWidth="1.5" />
                <rect x="136" y="41" width="8" height="8" fill="var(--acid)" stroke="var(--line)" strokeWidth="1.5" />
                <rect x="236" y="24" width="8" height="8" fill="var(--acid)" stroke="var(--line)" strokeWidth="1.5" />
                <rect x="336" y="24" width="8" height="8" fill="var(--acid)" stroke="var(--line)" strokeWidth="1.5" />
                <rect x="426" y="38" width="8" height="8" fill="#702C35" stroke="var(--line)" strokeWidth="1.5" />

                {/* X Axis Labels */}
                <text x="75" y="105" className="font-mono text-[9px] fill-[var(--ink)] opacity-75">W1 (3.2%)</text>
                <text x="175" y="105" className="font-mono text-[9px] fill-[var(--ink)] opacity-75">W2 (4.5%)</text>
                <text x="275" y="105" className="font-mono text-[9px] fill-[var(--ink)] opacity-75">W3 (5.4%)</text>
                <text x="375" y="105" className="font-mono text-[9px] fill-[var(--ox)] font-bold">W4 (4.8% ↓)</text>
              </svg>
            </div>
          </div>
        </Tile>
      </div>

      {/* Chart 03: Competency-to-Outcome Correlation Matrix */}
      <div className="border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[var(--ox)]" />
            <h3 className="font-display font-bold text-xl uppercase tracking-tight">Competency-to-Outcome Matrix</h3>
          </div>
          <span className="font-mono text-xs opacity-75">Direct link between Academy skills &amp; Studio output</span>
        </div>

        <div className="border-2 border-[var(--line)] overflow-x-auto">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="border-b-2 border-[var(--line)] bg-[var(--card-subtle)]">
                <th className="p-3 uppercase">Learned Competency</th>
                <th className="p-3 uppercase">Output Artifact in Studio</th>
                <th className="p-3 uppercase">Market Channel</th>
                <th className="p-3 uppercase text-right">Demonstrated Impact</th>
              </tr>
            </thead>
            <tbody className="divide-y border-[var(--line)]/20">
              <tr className="hover:bg-[var(--card-subtle)]">
                <td className="p-3 font-bold text-[var(--ink)] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-700" /> High-Contrast Type Pairing
                </td>
                <td className="p-3">Editorial Style Specimen (SVG)</td>
                <td className="p-3">Substack Manifesto</td>
                <td className="p-3 text-right font-bold text-green-700">+14.2% Read-through</td>
              </tr>
              <tr className="hover:bg-[var(--card-subtle)]">
                <td className="p-3 font-bold text-[var(--ink)] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-700" /> Risograph Halftone Masks
                </td>
                <td className="p-3">Zine Imposition Blueprint</td>
                <td className="p-3">Instagram Carousel</td>
                <td className="p-3 text-right font-bold text-green-700">24.8% Click Rate</td>
              </tr>
              <tr className="hover:bg-[var(--card-subtle)] bg-[var(--ox)]/5">
                <td className="p-3 font-bold text-[var(--ox)] flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-[var(--ox)]" /> Scarcity Drop Timing
                </td>
                <td className="p-3">Flash Drop Release Copy</td>
                <td className="p-3">Streetwear Merch Drop</td>
                <td className="p-3 text-right font-bold text-[var(--ox)]">-0.6% Conversion Dip</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TelemetryCharts;
