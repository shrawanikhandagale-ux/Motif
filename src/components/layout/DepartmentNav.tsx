import React from 'react';
import { NavLink } from 'react-router-dom';
import { DEPARTMENTS } from '../../constants';

export const DepartmentNav: React.FC = () => {
  return (
    <nav
      aria-label="Departments"
      className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-2"
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard">
        {DEPARTMENTS.map((dept, index) => {
          const isLast = index === DEPARTMENTS.length - 1;

          return (
            <NavLink
              key={dept.id}
              to={`/${dept.id}`}
              className={({ isActive }) =>
                `p-3 sm:p-4 text-left font-display font-extrabold tracking-tight transition-colors border-b-2 sm:border-b-0 border-[var(--line)] ${
                  !isLast ? 'md:border-r-2' : ''
                } ${
                  isActive
                    ? 'bg-[var(--ink)] text-[var(--bg)] shadow-inner'
                    : 'text-[var(--ink)] hover:bg-[var(--elec)] hover:text-[#171717]'
                } focus-visible:outline-2 focus-visible:outline-[var(--ox)] focus-visible:outline-offset-[-3px]`
              }
            >
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl uppercase leading-none">
                  {dept.name}
                </span>
                <span
                  className="font-mono text-xs font-normal opacity-75 mt-1 tracking-normal lowercase"
                >
                  {dept.subtitle}
                </span>
              </div>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

