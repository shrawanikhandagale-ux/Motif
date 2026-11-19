import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { DEPARTMENTS } from '../../../constants';

export const HomeDepartmentsStrip: React.FC = () => {
  const departmentStats: Record<string, string> = {
    learn: '3 Paths · 1 Active Brief',
    create: '2 Projects · 5 Assets',
    market: '1 Live Drop Sequence',
    manage: '2 Retainer Clients',
    analyze: '78.6k Audience Reach',
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="font-display font-extrabold text-xl text-[var(--ink)]">
          Five Departments
        </h2>
        <span className="font-mono text-xs opacity-75">Interconnected Records</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-[var(--line)]">
        {DEPARTMENTS.map((dept) => (
          <Link
            key={dept.id}
            to={`/${dept.id}`}
            className="p-3.5 flex flex-col justify-between hover:bg-[var(--elec)] hover:text-[#171717] transition-colors group"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="font-display font-extrabold text-lg uppercase block leading-tight">
                  {dept.name}
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
              <span className="font-mono text-[11px] opacity-75 block mt-0.5 lowercase">
                {dept.subtitle}
              </span>
            </div>
            <span className="font-mono text-[10px] text-[var(--ox)] font-bold mt-3 block">
              {departmentStats[dept.id]}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomeDepartmentsStrip;

