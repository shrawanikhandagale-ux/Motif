import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  X, Home, BookOpen, PenTool, Megaphone, Briefcase, BarChart3, Search, Bell, MessageSquare, User, Settings
} from 'lucide-react';

interface MenuSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch?: () => void;
}

export const MenuSheet: React.FC<MenuSheetProps> = ({ isOpen, onClose, onOpenSearch }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const primaryNav = [
    { label: 'Home', path: '/home', icon: Home },
    { label: 'Learn', path: '/learn', icon: BookOpen },
    { label: 'Create', path: '/create', icon: PenTool },
    { label: 'Market', path: '/market', icon: Megaphone },
    { label: 'Manage', path: '/manage', icon: Briefcase },
    { label: 'Analyze & Grow', path: '/analyze', icon: BarChart3 },
  ];

  const secondaryNav = [
    { label: 'Search', action: () => { onClose(); onOpenSearch?.(); }, icon: Search },
    { label: 'Notifications', path: '#notifications', icon: Bell },
    { label: 'Messages', path: '#messages', icon: MessageSquare },
    { label: 'Profile', path: '#profile', icon: User },
    { label: 'Settings', path: '#settings', icon: Settings },
  ];

  return (
    <div role="dialog" aria-modal="true" aria-label="Navigation Menu" className="fixed inset-0 z-50 flex md:hidden">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="relative w-4/5 max-w-xs bg-[var(--card-bg)] text-[var(--ink)] border-r-2 border-[var(--line)] shadow-hard-lg flex flex-col h-full z-10 overflow-y-auto">
        <div className="p-4 border-b-2 border-[var(--line)] flex items-center justify-between">
          <div>
            <span className="font-display font-extrabold text-2xl tracking-tight block">motif.</span>
            <span className="font-mono text-[10px] opacity-75 uppercase">Menu Navigation</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="p-1.5 border-2 border-[var(--line)] bg-[var(--bg)] hover:bg-[var(--acid)] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--ox)]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Primary Departments */}
        <div className="p-3 space-y-1">
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2 opacity-60 block my-1">
            Departments
          </span>
          {primaryNav.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/home'}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 text-sm font-sans border-2 transition-colors ${
                    isActive
                      ? 'border-[var(--line)] bg-[var(--ink)] text-[var(--bg)] font-bold shadow-hard-sm'
                      : 'border-transparent hover:border-[var(--line)] hover:bg-[var(--elec)] hover:text-[#171717]'
                  } focus-visible:outline-2 focus-visible:outline-[var(--ox)]`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Secondary Links */}
        <div className="mt-auto p-3 border-t-2 border-[var(--line)] bg-[var(--card-subtle)] space-y-1">
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2 opacity-60 block mb-1">
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
                  className="w-full flex items-center gap-3 px-3 py-2 text-xs font-mono border-2 border-transparent hover:border-[var(--line)] hover:bg-[var(--card-bg)] text-left cursor-pointer"
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            }
            return (
              <a
                key={item.label}
                href={item.path}
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-2 text-xs font-mono border-2 border-transparent hover:border-[var(--line)] hover:bg-[var(--card-bg)]"
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MenuSheet;
