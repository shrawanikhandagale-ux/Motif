import React, { useState } from 'react';
import { X, Plus, Sparkles } from 'lucide-react';
import { MarketListing } from '../types';

interface NewListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublish: (listing: Omit<MarketListing, 'id'>) => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  zines: '#A8B8E8',
  fonts: '#D9E638',
  templates: '#702C35',
  services: '#477C75',
  graphics: '#FAF7EE',
};

export const NewListingModal: React.FC<NewListingModalProps> = ({ isOpen, onClose, onPublish }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<MarketListing['category']>('zines');
  const [creatorName, setCreatorName] = useState('Studio Resident');
  const [creatorHandle, setCreatorHandle] = useState('@resident.studio');
  const [priceFormatted, setPriceFormatted] = useState('$30 USD');
  const [badge, setBadge] = useState('Physical Edition');
  const [description, setDescription] = useState('');
  const [deliverablesInput, setDeliverablesInput] = useState('Print Proof, Vector Artwork, Imposition PDF');
  const [tagsInput, setTagsInput] = useState('Independent, Risograph, Editorial');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const deliverables = deliverablesInput
      .split(',')
      .map((d) => d.trim())
      .filter(Boolean);

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    onPublish({
      title: title.trim(),
      category,
      creatorName: creatorName.trim() || 'Studio Resident',
      creatorHandle: creatorHandle.trim().startsWith('@') ? creatorHandle.trim() : `@${creatorHandle.trim()}`,
      priceFormatted: priceFormatted.trim() || '$25 USD',
      coverColor: CATEGORY_COLORS[category] || '#A8B8E8',
      badge: badge.trim() || 'Verified Offering',
      description: description.trim() || 'Authentic tactile creative output produced in MOTIF studio.',
      deliverables: deliverables.length > 0 ? deliverables : ['Standard Production Assets'],
      tags: tags.length > 0 ? tags : ['Creative Output'],
      availabilityStatus: 'available',
      featured: false,
    });

    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Publish Marketplace Offering"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-[var(--card-bg)] border-2 border-[var(--line)] shadow-hard-lg max-h-[90vh] overflow-y-auto animate-in zoom-in-95 text-[var(--ink)] p-6 sm:p-8 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b-2 border-[var(--line)]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[var(--ox)]" />
            <h2 className="font-display font-black text-2xl text-[var(--ink)]">
              Publish Creative Offering
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1 border-2 border-[var(--line)] hover:bg-[var(--card-subtle)]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
          <div>
            <label className="block font-bold uppercase mb-1">Offering Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Broken Grid Editorial Zine Volume One"
              className="w-full px-3 py-2 border-2 border-[var(--line)] bg-[var(--bg)] text-xs font-mono"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold uppercase mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as MarketListing['category'])}
                className="w-full px-3 py-2 border-2 border-[var(--line)] bg-[var(--bg)] text-xs font-mono"
              >
                <option value="zines">Zines &amp; Print</option>
                <option value="fonts">Type Specimens</option>
                <option value="templates">Templates &amp; Kits</option>
                <option value="services">Creative Retainers</option>
                <option value="graphics">Graphic Packs</option>
              </select>
            </div>
            <div>
              <label className="block font-bold uppercase mb-1">Price / Terms</label>
              <input
                type="text"
                required
                value={priceFormatted}
                onChange={(e) => setPriceFormatted(e.target.value)}
                placeholder="e.g. $35 USD or Free"
                className="w-full px-3 py-2 border-2 border-[var(--line)] bg-[var(--bg)] text-xs font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold uppercase mb-1">Creator Name</label>
              <input
                type="text"
                required
                value={creatorName}
                onChange={(e) => setCreatorName(e.target.value)}
                className="w-full px-3 py-2 border-2 border-[var(--line)] bg-[var(--bg)] text-xs font-mono"
              />
            </div>
            <div>
              <label className="block font-bold uppercase mb-1">Creator Handle</label>
              <input
                type="text"
                required
                value={creatorHandle}
                onChange={(e) => setCreatorHandle(e.target.value)}
                className="w-full px-3 py-2 border-2 border-[var(--line)] bg-[var(--bg)] text-xs font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold uppercase mb-1">Badge / Edition Tag</label>
            <input
              type="text"
              value={badge}
              onChange={(e) => setBadge(e.target.value)}
              placeholder="e.g. Physical Print + PDF, Commercial License"
              className="w-full px-3 py-2 border-2 border-[var(--line)] bg-[var(--bg)] text-xs font-mono"
            />
          </div>

          <div>
            <label className="block font-bold uppercase mb-1">Offering Thesis &amp; Description</label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the aesthetic perspective, paper specifications, or font characteristics…"
              className="w-full p-2.5 border-2 border-[var(--line)] bg-[var(--bg)] font-sans text-xs"
            />
          </div>

          <div>
            <label className="block font-bold uppercase mb-1">Deliverables Included (Comma-separated)</label>
            <input
              type="text"
              value={deliverablesInput}
              onChange={(e) => setDeliverablesInput(e.target.value)}
              placeholder="e.g. Numbered Print Proof, Vector AI, Specimen Sheet"
              className="w-full px-3 py-2 border-2 border-[var(--line)] bg-[var(--bg)] text-xs font-mono"
            />
          </div>

          <div>
            <label className="block font-bold uppercase mb-1">Tags (Comma-separated)</label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="e.g. Risograph, Editorial, Print"
              className="w-full px-3 py-2 border-2 border-[var(--line)] bg-[var(--bg)] text-xs font-mono"
            />
          </div>

          <div className="pt-3 border-t-2 border-[var(--line)] flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border-2 border-[var(--line)] bg-[var(--card-subtle)] text-xs font-mono"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2 border-2 border-[#171717] bg-[var(--ink)] text-[var(--bg)] font-display font-extrabold text-xs hover:bg-[var(--ox)] transition-colors shadow-hard-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Publish to Marketplace</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewListingModal;

