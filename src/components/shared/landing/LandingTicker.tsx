import React from 'react';

export const LandingTicker: React.FC = () => {
  const items = [
    'BUILT FOR THE OFFSCRIPT',
    'IDEA IN. REAL THING OUT',
    'FIVE DEPARTMENTS, ONE ECOSYSTEM',
    'LEARN → CREATE → MARKET → MANAGE → ANALYZE',
    'SHARED RECORDS · ZERO RETYPING',
    'NOT A GENERIC SAAS DASHBOARD',
  ];

  return (
    <div
      aria-label="Editorial Brand Ticker"
      className="border-b-2 border-[var(--line)] bg-[var(--acid)] text-[#171717] py-2.5 overflow-hidden whitespace-nowrap select-none"
    >
      <div className="flex items-center gap-8 font-mono text-xs font-bold tracking-widest uppercase animate-marquee">
        {/* Doubled for seamless loop */}
        {[...items, ...items].map((phrase, idx) => (
          <div key={idx} className="flex items-center gap-8 shrink-0">
            <span>{phrase}</span>
            <span className="w-2 h-2 rounded-full bg-[#171717]" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingTicker;

