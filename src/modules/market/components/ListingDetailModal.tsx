import React, { useState } from 'react';
import { X, CheckCircle2, MessageSquare, ShieldCheck, ArrowRight } from 'lucide-react';
import { MarketListing } from '../types';

interface ListingDetailModalProps {
  listing: MarketListing | null;
  onClose: () => void;
}

export const ListingDetailModal: React.FC<ListingDetailModalProps> = ({ listing, onClose }) => {
  const [enquiryMode, setEnquiryMode] = useState(false);
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [scope, setScope] = useState('Commercial Print & Web');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!listing) return null;

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerName.trim() || !buyerEmail.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      // keep open for brief moment to read success message
    }, 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={listing.title}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[var(--card-bg)] border-2 border-[var(--line)] shadow-hard-lg max-h-[90vh] overflow-y-auto animate-in zoom-in-95 text-[var(--ink)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cover header */}
        <div
          className="p-6 border-b-2 border-[var(--line)] relative select-none"
          style={{
            backgroundColor: listing.coverColor || '#A8B8E8',
            backgroundImage: 'radial-gradient(circle, rgba(23,23,23,0.3) 30%, transparent 32%)',
            backgroundSize: '12px 12px',
          }}
        >
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="font-mono text-xs uppercase font-bold px-2 py-0.5 border border-[#171717] bg-[#FAF7EE] text-[#171717]">
              {listing.category} · {listing.badge}
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="p-1 border-2 border-[#171717] bg-[#FAF7EE] hover:bg-[#171717] hover:text-[#FAF7EE] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <h2 className="font-display font-black text-2xl sm:text-4xl text-[#171717] tracking-tight leading-tight">
            {listing.title}
          </h2>

          <div className="flex items-center justify-between gap-2 pt-2">
            <span className="font-mono text-xs font-bold text-[#171717]">
              By {listing.creatorName} ({listing.creatorHandle})
            </span>
            <span className="font-display font-black text-xl px-2.5 py-0.5 border-2 border-[#171717] bg-[#171717] text-[#FAF7EE] shadow-hard-xs">
              {listing.priceFormatted}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <span className="font-mono text-xs uppercase font-bold text-[var(--ox)] block mb-1">
              Creative Offering Overview
            </span>
            <p className="font-sans text-sm sm:text-base opacity-90 leading-relaxed">
              {listing.description}
            </p>
          </div>

          {/* Included Deliverables List */}
          <div className="p-4 border-2 border-[var(--line)] bg-[var(--card-subtle)] space-y-2">
            <span className="font-mono text-xs uppercase font-bold tracking-wider text-[var(--ink)] block">
              What Is Included In This Offering:
            </span>
            <div className="space-y-1.5 font-sans text-xs sm:text-sm">
              {listing.deliverables.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[var(--ox)] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Licensing & Terms */}
          <div className="flex items-start gap-2.5 p-3.5 border border-[var(--line)] bg-[var(--bg)] font-mono text-xs opacity-85">
            <ShieldCheck className="w-4 h-4 text-[var(--ox)] shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold">Independent Studio License:</strong>
              <span>Granted for commercial and non-commercial productions. Reselling raw vector tokens or font files prohibited.</span>
            </div>
          </div>

          {/* Commission / Enquiry Section */}
          {!enquiryMode && !submitted ? (
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t-2 border-[var(--line)]">
              <span className="font-mono text-xs opacity-70">
                Direct creator transaction via studio ledger.
              </span>
              <button
                type="button"
                onClick={() => setEnquiryMode(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-[#171717] bg-[var(--ink)] text-[var(--bg)] font-display font-extrabold text-sm hover:bg-[var(--ox)] transition-colors shadow-hard-xs cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Enquire / Commission Work →</span>
              </button>
            </div>
          ) : submitted ? (
            <div className="p-4 border-2 border-[#171717] bg-[var(--acid)] text-[#171717] shadow-hard-xs space-y-2 animate-in fade-in">
              <div className="flex items-center gap-2 font-display font-extrabold text-base">
                <CheckCircle2 className="w-5 h-5 text-[var(--ox)]" />
                <span>Commission Enquiry Dispatched!</span>
              </div>
              <p className="font-sans text-xs sm:text-sm opacity-90 leading-normal">
                Your brief has been routed to <strong>{listing.creatorName}</strong>. A ledger confirmation has been logged to your studio communications.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-1.5 border-2 border-[#171717] bg-[#171717] text-[#FAF7EE] font-mono text-xs font-bold"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleEnquirySubmit} className="p-4 border-2 border-[var(--line)] bg-[var(--bg)] space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between pb-2 border-b border-[var(--line)]/20">
                <h4 className="font-display font-extrabold text-sm uppercase">
                  Commission / Enquiry Form
                </h4>
                <button
                  type="button"
                  onClick={() => setEnquiryMode(false)}
                  className="font-mono text-xs opacity-60 hover:opacity-100"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    placeholder="e.g. Elena Rostova"
                    className="w-full px-3 py-1.5 border-2 border-[var(--line)] bg-[var(--card-bg)] text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase mb-1">Contact Email</label>
                  <input
                    type="email"
                    required
                    value={buyerEmail}
                    onChange={(e) => setBuyerEmail(e.target.value)}
                    placeholder="elena@studio.design"
                    className="w-full px-3 py-1.5 border-2 border-[var(--line)] bg-[var(--card-bg)] text-xs font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase mb-1">Scope</label>
                  <select
                    value={scope}
                    onChange={(e) => setScope(e.target.value)}
                    className="w-full px-3 py-1.5 border-2 border-[var(--line)] bg-[var(--card-bg)] text-xs font-mono"
                  >
                    <option value="Commercial Print & Web">Commercial Print &amp; Web</option>
                    <option value="Direct Purchase / Proof">Direct Purchase / Proof</option>
                    <option value="Studio Collaboration">Studio Collaboration</option>
                    <option value="Editorial Only">Editorial Only</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase mb-1">Timeline</label>
                  <input
                    type="text"
                    placeholder="e.g. 2-3 weeks"
                    className="w-full px-3 py-1.5 border-2 border-[var(--line)] bg-[var(--card-bg)] text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold uppercase mb-1">Project Notes &amp; Specifications</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Share details regarding print runs, paper stock, or distribution objectives…"
                  className="w-full p-2 border-2 border-[var(--line)] bg-[var(--card-bg)] text-xs font-sans"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEnquiryMode(false)}
                  className="px-3 py-1.5 border-2 border-[var(--line)] bg-[var(--card-subtle)] text-xs font-mono"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 border-2 border-[#171717] bg-[var(--ink)] text-[var(--bg)] font-display font-bold text-xs hover:bg-[var(--ox)] transition-colors shadow-hard-xs"
                >
                  <span>Dispatch Commission Enquiry</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingDetailModal;

