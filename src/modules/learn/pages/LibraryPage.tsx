import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Bookmark, BookmarkCheck, ExternalLink, X } from 'lucide-react';
import { LearnSubNav } from '../components';
import { useResources } from '../hooks';
import { useProgress } from '../../../hooks';
import { Resource } from '../../../types';

type CategoryFilter = 'All' | 'Saved' | Resource['category'];

const CATEGORIES: CategoryFilter[] = ['All', 'Saved', 'tool', 'specimen', 'template', 'guide', 'reading'];

export const LibraryPage: React.FC = () => {
  const { resources, loading } = useResources();
  const { savedResourceIds, toggleSaveResource } = useProgress();
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');
  const [inspectingResource, setInspectingResource] = useState<Resource | null>(null);

  const filteredResources = useMemo(() => {
    return resources.filter((res) => {
      if (activeCategory === 'Saved' && !savedResourceIds.includes(res.id)) {
        return false;
      }
      if (activeCategory !== 'All' && activeCategory !== 'Saved' && res.category !== activeCategory) {
        return false;
      }
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        return (
          res.title.toLowerCase().includes(query) ||
          res.description.toLowerCase().includes(query) ||
          res.domain.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [resources, activeCategory, savedResourceIds, searchTerm]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="flex flex-wrap items-baseline justify-between gap-4 pb-4 border-b-2 border-[var(--line)]">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase font-bold tracking-wider opacity-70 mb-1">
            <span className="w-2.5 h-2.5 bg-[var(--elec)] border border-[var(--line)]" />
            <span>Curated Asset Vault · Tactile Artifacts</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-[var(--ink)] tracking-tight">
            VAULT <span className="text-[var(--ox)] font-normal italic font-serif">specimens</span>
          </h1>
        </div>
        <div className="font-mono text-xs opacity-75 hidden sm:block text-right">
          <div>{resources.length} Verified Studio Artifacts</div>
          <div className="font-bold text-[var(--ink)]">OFFSCRIPT REPOSITORIES</div>
        </div>
      </div>

      <LearnSubNav />

      {/* Search & Category Filter Bar */}
      <div className="p-4 border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard-sm space-y-3">
        <div className="relative max-w-md">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search 20+ specimens, guides, tools…"
            className="w-full pl-9 pr-4 py-2 border-2 border-[var(--line)] bg-[var(--bg)] font-mono text-xs text-[var(--ink)] placeholder:opacity-50 focus:outline-none focus:border-[var(--ox)]"
          />
          <Search className="w-4 h-4 opacity-50 absolute left-3 top-1/2 -translate-y-1/2" />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-xs opacity-60 hover:opacity-100"
            >
              ×
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="font-mono text-xs uppercase font-bold opacity-70 mr-1">Category:</span>
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 text-xs font-mono border-2 transition-colors cursor-pointer select-none capitalize ${
                  isSelected
                    ? 'border-[#171717] bg-[var(--ink)] text-[var(--bg)] font-bold shadow-hard-xs'
                    : 'border-[var(--line)] bg-[var(--bg)] text-[var(--ink)] hover:bg-[var(--card-subtle)]'
                }`}
              >
                {cat === 'Saved' ? `★ Saved (${savedResourceIds.length})` : cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Resource Cards Grid */}
      {loading ? (
        <div className="p-12 text-center font-mono text-sm opacity-70 border-2 border-[var(--line)] bg-[var(--card-bg)]">
          Querying catalog…
        </div>
      ) : filteredResources.length === 0 ? (
        <div className="p-12 border-2 border-[var(--line)] bg-[var(--card-bg)] text-center font-mono text-sm">
          No resources found matching current criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((res) => {
            const isSaved = savedResourceIds.includes(res.id);

            return (
              <div
                key={res.id}
                className="border-2 border-[var(--line)] bg-[var(--card-bg)] p-5 flex flex-col justify-between shadow-hard-sm hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-hard-md transition-all group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-mono text-[10px] uppercase font-bold px-2 py-0.5 border border-[var(--line)] bg-[var(--card-subtle)] text-[var(--ink)]">
                        {res.domain}
                      </span>
                      <span className="font-mono text-[10px] uppercase font-bold px-1.5 py-0.5 border border-[var(--line)] bg-[var(--bg)] opacity-75">
                        {res.category}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleSaveResource(res.id)}
                      title={isSaved ? 'Remove from collection' : 'Save to collection'}
                      aria-label={isSaved ? 'Remove from collection' : 'Save to collection'}
                      className={`p-1.5 border-2 transition-all cursor-pointer ${
                        isSaved
                          ? 'border-[#171717] bg-[var(--acid)] text-[#171717] shadow-hard-xs'
                          : 'border-[var(--line)] bg-[var(--bg)] text-[var(--ink)] hover:border-[var(--ox)]'
                      }`}
                    >
                      {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4 opacity-60" />}
                    </button>
                  </div>

                  <div>
                    <h2 className="font-display font-extrabold text-lg text-[var(--ink)] leading-snug group-hover:text-[var(--ox)] transition-colors">
                      {res.title}
                    </h2>
                    <span className="font-mono text-[11px] opacity-70 mt-1 inline-block">
                      {res.urlOrFormat}
                    </span>
                    <p className="font-sans text-xs opacity-85 mt-2 leading-relaxed line-clamp-3">
                      {res.description}
                    </p>
                  </div>
                </div>

                <div className="pt-3 mt-4 border-t border-[var(--line)]/30 flex items-center justify-between text-xs font-mono">
                  <span className="opacity-60">{res.id}</span>
                  <button
                    type="button"
                    onClick={() => setInspectingResource(res)}
                    className="inline-flex items-center gap-1 font-bold text-[var(--ox)] hover:underline cursor-pointer"
                  >
                    <span>Inspect Artifact</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Artifact Inspection Modal (Replacing browser alert) */}
      {inspectingResource && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={inspectingResource.title}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
          onClick={() => setInspectingResource(null)}
        >
          <div
            className="w-full max-w-lg border-2 border-[var(--line)] bg-[var(--card-bg)] text-[var(--ink)] p-6 shadow-hard-lg space-y-5 animate-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b-2 border-[var(--line)]">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs uppercase font-bold text-[var(--ox)]">
                  Artifact Inspection
                </span>
                <span className="font-mono text-[10px] px-1.5 py-0.5 border border-[var(--line)] bg-[var(--card-subtle)]">
                  {inspectingResource.id}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setInspectingResource(null)}
                aria-label="Close modal"
                className="p-1 border-2 border-[var(--line)] bg-[var(--bg)] hover:bg-[var(--card-subtle)]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 border border-[var(--line)] bg-[var(--acid)] text-[#171717]">
                  {inspectingResource.domain}
                </span>
                <span className="font-mono text-xs px-2 py-0.5 border border-[var(--line)] bg-[var(--card-subtle)]">
                  {inspectingResource.category}
                </span>
                <span className="font-mono text-xs opacity-75">
                  Format: {inspectingResource.urlOrFormat}
                </span>
              </div>

              <h2 className="font-display font-black text-2xl text-[var(--ink)]">
                {inspectingResource.title}
              </h2>

              <p className="font-sans text-sm opacity-90 leading-relaxed">
                {inspectingResource.description}
              </p>

              <div className="p-3.5 border-2 border-[var(--line)] bg-[var(--card-subtle)] space-y-1.5 font-mono text-xs">
                <span className="font-bold text-[var(--ink)] block">Operational Parameters:</span>
                <div className="opacity-80 leading-normal">
                  • Licensed for commercial independent print runs and web deployment.
                  <br />
                  • Pre-calibrated for 2px solid ink lines and tactile contrast tokens.
                  <br />
                  • Can be imported into active Create projects as a linked reference asset.
                </div>
              </div>
            </div>

            <div className="pt-4 border-t-2 border-[var(--line)] flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => toggleSaveResource(inspectingResource.id)}
                className={`px-3 py-2 border-2 border-[var(--line)] font-mono text-xs font-bold transition-colors cursor-pointer ${
                  savedResourceIds.includes(inspectingResource.id)
                    ? 'bg-[var(--acid)] text-[#171717]'
                    : 'bg-[var(--bg)] text-[var(--ink)] hover:bg-[var(--card-subtle)]'
                }`}
              >
                {savedResourceIds.includes(inspectingResource.id)
                  ? '★ Saved in Collection'
                  : '☆ Save to Collection'}
              </button>

              <button
                type="button"
                onClick={() => setInspectingResource(null)}
                className="px-4 py-2 border-2 border-[#171717] bg-[var(--ink)] text-[var(--bg)] font-display font-bold text-xs hover:bg-[var(--ox)] transition-colors shadow-hard-xs cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LibraryPage;
