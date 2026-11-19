import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  Home,
  BookOpen,
  PenTool,
  Megaphone,
  Briefcase,
  BarChart3,
  Search,
  Bell,
  MessageSquare,
  User,
  Settings,
} from 'lucide-react';

interface SideRailProps {
  onOpenSearch?: () => void;
}

export const SideRail: React.FC<SideRailProps> = ({ onOpenSearch }) => {
  const primaryNav = [
    { label: 'Home', path: '/home', icon: Home },
    { label: 'Learn', path: '/learn', icon: BookOpen },
    { label: 'Create', path: '/create', icon: PenTool },
    { label: 'Market', path: '/market', icon: Megaphone },
    { label: 'Manage', path: '/manage', icon: Briefcase },
    { label: 'Analyze & Grow', path: '/analyze', icon: BarChart3 },
  ];

  const secondaryNav = [
    { label: 'Search', action: onOpenSearch, icon: Search },
    { label: 'Notifications', path: '#notifications', icon: Bell, badge: '3' },
    { label: 'Messages', path: '#messages', icon: MessageSquare },
    { label: 'Profile', path: '#profile', icon: User },
    { label: 'Settings', path: '#settings', icon: Settings },
  ];

  return (
    <aside
      aria-label="Desktop Navigation"
      className="hidden md:flex flex-col w-64 border-r-2 border-[var(--line)] bg-[var(--card-bg)] shrink-0 h-screen sticky top-0 selection:bg-[var(--acid)]"
    >
      {/* Brand Header */}
      <div className="p-5 border-b-2 border-[var(--line)]">
        <Link
          to="/"
          className="font-display font-extrabold text-3xl tracking-tight block text-[var(--ink)] hover:opacity-85 focus-visible:outline-2 focus-visible:outline-[var(--ox)]"
        >
          motif.
        </Link>
        <span className="font-mono text-[11px] block text-[var(--ink)] opacity-70 mt-0.5 uppercase tracking-wider">
          Creative OS · Studio 01
        </span>
      </div>

      {/* Primary Navigation */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        <span className="font-mono text-[10px] uppercase font-bold tracking-wider px-3 text-[var(--ink)] opacity-60 block my-2">
          Departments
        </span>
        {primaryNav.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/home'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 text-sm font-sans transition-all border-2 ${
                  isActive
                    ? 'border-[var(--line)] bg-[var(--ink)] text-[var(--bg)] font-bold shadow-hard-sm'
                    : 'border-transparent text-[var(--ink)] hover:border-[var(--line)] hover:bg-[var(--elec)] hover:text-[#171717]'
                } focus-visible:outline-2 focus-visible:outline-[var(--ox)]`
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="truncate">{item.label}</span>
            </NavLink>
          );
        })}
      </div>

      {/* Secondary Navigation */}
      <div className="p-3 border-t-2 border-[var(--line)] bg-[var(--card-subtle)] space-y-1">
        <span className="font-mono text-[10px] uppercase font-bold tracking-wider px-3 text-[var(--ink)] opacity-60 block mb-1">
          Workspace
        </span>
        {secondaryNav.map((item) => {
          const Icon = item.icon;
          if (item.action) {
            return (
              <button
                key={item.label}
                type="button"
                onClick={item.action}
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-mono border-2 border-transparent hover:border-[var(--line)] hover:bg-[var(--card-bg)] text-[var(--ink)] transition-colors cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-[var(--ox)]"
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </div>
                <span className="text-[10px] px-1 bg-[var(--card-bg)] border border-[var(--line)]">⌘K</span>
              </button>
            );
          }
          return (
            <a
              key={item.label}
              href={item.path}
              className="flex items-center justify-between px-3 py-2 text-xs font-mono border-2 border-transparent hover:border-[var(--line)] hover:bg-[var(--card-bg)] text-[var(--ink)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--ox)]"
            >
              <div className="flex items-center gap-2.5">
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="font-mono text-[10px] font-bold px-1.5 bg-[var(--ox)] text-[#F1EBDD] border border-[var(--line)]">
                  {item.badge}
                </span>
              )}
            </a>
          );
        })}
      </div>
    </aside>
  );
};

export default SideRail;

