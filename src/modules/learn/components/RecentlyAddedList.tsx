import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Film, Layers, Type } from 'lucide-react';

export const RecentlyAddedList: React.FC = () => {
  const items = [
    {
      id: 'res-06',
      icon: FileText,
      title: 'Zine printing checklist & imposition',
      tag: 'Template',
      format: 'InDesign / PDF',
    },
    {
      id: 'res-02',
      icon: Film,
      title: 'Halftone dot matrix generator',
      tag: 'Tool',
      format: 'SVG / CSS',
    },
    {
      id: 'res-08',
      icon: Layers,
      title: 'Brand guideline zine scaffold',
      tag: 'Blueprint',
      format: 'Figma / PDF',
    },
    {
      id: 'res-01',
      icon: Type,
      title: 'Bricolage Grotesque OTF specimen',
      tag: 'Specimen',
      format: 'OTF / WOFF2',
    },
  ];

  return (
    <div className="border-2 border-[var(--line)] bg-[var(--card-bg)] p-5 flex flex-col justify-between shadow-hard-sm">
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-xs uppercase font-bold tracking-wider opacity-70">
            Vault Feed
          </span>
          <span className="font-mono text-[10px] px-1.5 py-0.5 border border-[var(--line)] bg-[var(--card-subtle)] font-bold">
            Curated Assets
          </span>
        </div>
        <h3 className="font-display font-extrabold text-xl text-[var(--ink)] tracking-tight mb-4">
          Recently added
        </h3>

        <div className="space-y-3">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                to={`/learn/library?search=${encodeURIComponent(item.title.split(' ')[0])}`}
                className="group flex items-start gap-3 p-2.5 border-2 border-[var(--line)] bg-[var(--bg)] hover:bg-[var(--card-subtle)] transition-colors"
              >
                <div className="p-1.5 border border-[var(--line)] bg-[var(--card-subtle)] group-hover:bg-[var(--acid)] text-[var(--ink)] transition-colors shrink-0 mt-0.5">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="font-sans font-bold text-xs text-[var(--ink)] block truncate group-hover:underline">
                    {item.title}
                  </span>
                  <span className="font-mono text-[10px] opacity-65">
                    {item.tag} · {item.format}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="pt-5 mt-4 border-t-2 border-[var(--line)]">
        <Link
          to="/learn/library"
          className="inline-flex items-center justify-between w-full font-mono text-xs font-bold text-[var(--ink)] hover:text-[var(--ox)] group transition-colors"
        >
          <span>Open Full Vault</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default RecentlyAddedList;

