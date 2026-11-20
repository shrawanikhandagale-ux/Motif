import React, { useState, useMemo } from 'react';
import { Search, Plus, Sparkles, Filter, Store } from 'lucide-react';
import { HandoffNotice } from '../../../components/shared/HandoffNotice';
import {
  MarketSubNav,
  ListingCard,
  ListingDetailModal,
  NewListingModal,
} from '../components';
import { marketService } from '../services/marketService';
import { MarketListing, MarketCategory } from '../types';

const CATEGORIES: Array<{ id: MarketCategory; label: string }> = [
  { id: 'all', label: 'All Offerings' },
  { id: 'zines', label: 'Zines & Print' },
  { id: 'fonts', label: 'Type Specimens' },
  { id: 'templates', label: 'Templates & Kits' },
  { id: 'services', label: 'Creative Retainers' },
  { id: 'graphics', label: 'Graphic Packs' },
];

export const MarketPage: React.FC = () => {
  const [listings, setListings] = useState<MarketListing[]>(() => marketService.getListings());
  const [selectedCategory, setSelectedCategory] = useState<MarketCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [inspectedListing, setInspectedListing] = useState<MarketListing | null>(null);
  const [newModalOpen, setNewModalOpen] = useState(false);

  const filteredListings = useMemo(() => {
    return listings.filter((l) => {
      if (selectedCategory !== 'all' && l.category !== selectedCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          l.title.toLowerCase().includes(q) ||
          l.creatorName.toLowerCase().includes(q) ||
          l.creatorHandle.toLowerCase().includes(q) ||
          l.description.toLowerCase().includes(q) ||
          l.tags.some((t) => t.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [listings, selectedCategory, searchQuery]);

  const handlePublish = (data: Omit<MarketListing, 'id'>) => {
    const created = marketService.createListing(data);
    setListings((prev) => [created, ...prev]);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="flex flex-wrap items-baseline justify-between gap-4 pb-4 border-b-2 border-[var(--line)]">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase font-bold tracking-wider opacity-70 mb-1">
            <span className="w-2.5 h-2.5 bg-[var(--elec)] border border-[var(--line)]" />
            <span>Department 03 · The Hub · Creative Marketplace &amp; Discovery</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-[var(--ink)] tracking-tight">
            MARKET <span className="text-[var(--ox)] font-normal italic font-serif">the hub</span>
          </h1>
        </div>
        <div className="font-mono text-xs opacity-75 hidden sm:block text-right">
          <div>{listings.length} Curated Creative Offerings</div>
          <div className="font-bold text-[var(--ink)]">OFFSCRIPT COMMERCE</div>
        </div>
      </div>

      <MarketSubNav />

      {/* Telemetry Strip */}
      <div className="p-3 border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard-sm flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <Store className="w-3.5 h-3.5 text-[var(--ox)]" />
          <span className="font-bold uppercase">Marketplace Discovery:</span>
          <span className="opacity-80">
            {listings.length} Independent Creations · Zines, Type Foundries, Retainer Packages &amp; Graphic Kits
          </span>
        </div>
        <div className="flex items-center gap-2 font-bold">
          <Sparkles className="w-3.5 h-3.5 text-[var(--ox)]" />
          <span>Curated Studio Handoffs</span>
        </div>
      </div>

      <HandoffNotice
        toDeptName="Manage"
        toDeptPath="/manage"
        text="Campaign milestones and deliverable timelines attach directly to client retainers in Manage."
      />

      {/* Search & Control Filter Bar */}
      <div className="p-4 border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search offerings, creators, fonts, zines…"
              className="w-full pl-9 pr-4 py-2 border-2 border-[var(--line)] bg-[var(--bg)] font-mono text-xs text-[var(--ink)] placeholder:opacity-50 focus:outline-none focus:border-[var(--ox)]"
            />
            <Search className="w-4 h-4 opacity-50 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setNewModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 border-2 border-[#171717] bg-[var(--ink)] text-[var(--bg)] font-display font-extrabold text-xs hover:bg-[var(--ox)] transition-colors shadow-hard-xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Publish Offering</span>
            </button>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="font-mono text-xs uppercase font-bold opacity-70 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Filter:
          </span>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1 text-xs font-mono border-2 transition-colors cursor-pointer select-none ${
                  isSelected
                    ? 'border-[#171717] bg-[var(--ink)] text-[var(--bg)] font-bold shadow-hard-xs'
                    : 'border-[var(--line)] bg-[var(--bg)] text-[var(--ink)] hover:bg-[var(--card-subtle)]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Offerings Grid */}
      {filteredListings.length === 0 ? (
        <div className="p-12 border-2 border-[var(--line)] bg-[var(--card-bg)] text-center font-mono text-sm space-y-3">
          <p className="opacity-75">No creative offerings match your criteria.</p>
          <button
            type="button"
            onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
            className="px-3 py-1 border-2 border-[var(--line)] bg-[var(--card-subtle)] text-xs font-bold font-mono"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing, idx) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              index={idx}
              onInspect={(item) => setInspectedListing(item)}
            />
          ))}
        </div>
      )}

      {/* Inspect Offering Modal */}
      <ListingDetailModal
        listing={inspectedListing}
        onClose={() => setInspectedListing(null)}
      />

      {/* Publish Offering Modal */}
      <NewListingModal
        isOpen={newModalOpen}
        onClose={() => setNewModalOpen(false)}
        onPublish={handlePublish}
      />
    </div>
  );
};

export default MarketPage;
