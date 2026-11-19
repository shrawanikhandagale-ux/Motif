import React, { useState, useMemo } from 'react';
import { Search, Bookmark, BookmarkCheck, ExternalLink } from 'lucide-react';
import { SectionHeading, Tile, Badge, Input, Chip } from '../../../components/ui';
import { LearnSubNav } from '../components';
import { useResources } from '../hooks';
import { useProgress } from '../../../hooks';
import { Resource } from '../../../types';

type CategoryFilter = 'All' | 'Saved' | Resource['category'];

const CATEGORIES: CategoryFilter[] = ['All', 'Saved', 'tool', 'specimen', 'template', 'guide', 'reading'];

export const LibraryPage: React.FC = () => {
  const { resources, loading } = useResources();
  const { savedResourceIds, toggleSaveResource } = useProgress();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');

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
    <div className="space-y-8 max-w-7xl mx-auto">
      <SectionHeading
        as="h1"
        kicker="Curated Vault"
        title="LIBRARY:"
        skewWord="specimens"
        description="Production tools, brutalist font specimens, imposition templates, and contrarian essays."
        borderBottom
      />

      <LearnSubNav />

      {/* Search & Filter Bar */}
      <div className="space-y-4">
        <div className="max-w-md">
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search 20+ specimens, guides, tools…"
            prefixElement={<Search className="w-4 h-4" />}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => (
            <Chip
              key={cat}
              selected={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              variant="default"
              className="capitalize"
            >
              {cat === 'Saved' ? `★ Saved (${savedResourceIds.length})` : cat}
            </Chip>
          ))}
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="p-12 text-center font-mono text-sm opacity-70">Querying catalog…</div>
      ) : filteredResources.length === 0 ? (
        <div className="p-12 border-2 border-[var(--line)] bg-[var(--card-bg)] text-center font-mono text-sm">
          No resources found matching current criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((res) => {
            const isSaved = savedResourceIds.includes(res.id);

            return (
              <Tile
                key={res.id}
                accent="none"
                shadow="default"
                className="p-5 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <Badge variant="oxblood" className="text-[10px] uppercase font-mono">{res.domain}</Badge>
                      <Badge variant="default" className="text-[10px] uppercase font-mono">{res.category}</Badge>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleSaveResource(res.id)}
                      title={isSaved ? 'Remove from collection' : 'Save to collection'}
                      aria-label={isSaved ? 'Remove from collection' : 'Save to collection'}
                      className={`p-1.5 border-2 transition-all ${
                        isSaved
                          ? 'border-[#171717] bg-[var(--acid)] text-[#171717]'
                          : 'border-[var(--line)] bg-[var(--card-bg)] text-[var(--ink)] hover:border-[var(--ox)]'
                      }`}
                    >
                      {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                    </button>
                  </div>

                  <div>
                    <h2 className="font-display font-extrabold text-xl text-[var(--ink)] leading-snug">
                      {res.title}
                    </h2>
                    <span className="font-mono text-xs opacity-75 mt-0.5 inline-block">{res.urlOrFormat}</span>
                    <p className="font-sans text-xs sm:text-sm opacity-85 mt-2 leading-relaxed">
                      {res.description}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[var(--line)]/20 flex items-center justify-between text-xs font-mono">
                  <span className="opacity-70">{res.id}</span>
                  <a
                    href="#download"
                    onClick={(e) => {
                      e.preventDefault();
                      alert(`Accessing artifact specimen: ${res.title}`);
                    }}
                    className="inline-flex items-center gap-1 font-bold text-[var(--ox)] hover:underline"
                  >
                    <span>Inspect Artifact</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </Tile>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LibraryPage;
