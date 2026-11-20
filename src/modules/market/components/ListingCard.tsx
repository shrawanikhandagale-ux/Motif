import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { MarketListing } from '../types';

interface ListingCardProps {
  listing: MarketListing;
  index: number;
  onInspect: (listing: MarketListing) => void;
}

export const ListingCard: React.FC<ListingCardProps> = ({ listing, index, onInspect }) => {
  const itemNum = `0${index + 1}`.slice(-2);

  return (
    <div className="border-2 border-[var(--line)] bg-[var(--card-bg)] p-5 flex flex-col justify-between shadow-hard-sm hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-hard-md transition-all group">
      <div>
        {/* Cover banner (.cov) from prototype */}
        <div
          className="h-28 -m-5 mb-4 border-b-2 border-[var(--line)] p-3 flex items-end justify-between overflow-hidden relative select-none"
          style={{
            backgroundColor: listing.coverColor || '#A8B8E8',
            backgroundImage: 'radial-gradient(circle, rgba(23,23,23,0.3) 30%, transparent 32%)',
            backgroundSize: '12px 12px',
          }}
        >
          <span className="font-display font-black text-5xl text-[#171717] tracking-tighter leading-none select-none">
            {itemNum}
          </span>
          <span className="font-mono text-[10px] font-bold uppercase px-2 py-0.5 border border-[#171717] bg-[#FAF7EE] text-[#171717] shadow-hard-xs">
            {listing.badge}
          </span>
        </div>

        {/* Creator row */}
        <div className="flex items-center justify-between text-xs font-mono opacity-80 mb-2">
          <span className="font-bold text-[var(--ox)] flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-[var(--ox)]" />
            <span>{listing.creatorHandle}</span>
          </span>
          <span className="px-2 py-0.5 border border-[#171717] bg-[#171717] text-[#FAF7EE] font-mono text-[11px] font-bold shadow-hard-xs">
            {listing.priceFormatted}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display font-black text-xl text-[var(--ink)] leading-snug group-hover:text-[var(--ox)] transition-colors">
          {listing.title}
        </h3>

        <p className="font-sans text-xs opacity-85 mt-2 leading-relaxed line-clamp-3">
          {listing.description}
        </p>

        {/* Inclusions snippet */}
        <div className="p-2.5 border border-[var(--line)] bg-[var(--card-subtle)] text-xs font-mono space-y-1 mt-3">
          <span className="font-bold text-[10px] uppercase opacity-75 block">Inclusions:</span>
          <div className="space-y-0.5 text-[11px] opacity-85">
            {listing.deliverables.slice(0, 2).map((d, i) => (
              <div key={i} className="truncate">
                • {d}
              </div>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-3">
          {listing.tags.map((t) => (
            <span
              key={t}
              className="font-mono text-[10px] px-1.5 py-0.5 border border-[var(--line)] bg-[var(--bg)] text-[var(--ink)]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="pt-4 mt-4 border-t-2 border-[var(--line)] flex items-center justify-between">
        <span className="font-mono text-[10px] opacity-65 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[var(--ox)]" /> Verified Studio
        </span>
        <button
          type="button"
          onClick={() => onInspect(listing)}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 border-2 border-[var(--line)] bg-[var(--ink)] text-[var(--bg)] font-display font-bold text-xs hover:bg-[var(--ox)] transition-colors shadow-hard-xs cursor-pointer"
        >
          <span>Inspect Offering</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default ListingCard;

