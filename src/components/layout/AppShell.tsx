import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { SideRail } from './SideRail';
import { TopBar } from './TopBar';
import { BottomBar } from './BottomBar';
import { MoreSheet } from './MoreSheet';

export const AppShell: React.FC = () => {
  const [moreOpen, setMoreOpen] = useState(false);
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();

  const transitionConfig = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.18, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] flex flex-row transition-colors">
      {/* Desktop Sidebar Rail (fixed ~200px) */}
      <SideRail />

      {/* Main Layout Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen pb-16 md:pb-0">
        <TopBar onOpenSearch={() => {
          // Dispatch keyboard shortcut for search or trigger search modal if configured
          window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
        }} />

        <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 sm:px-6 py-6 md:py-8 focus:outline-none">
          <motion.div
            key={location.pathname}
            initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transitionConfig}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>

      {/* Mobile Drawer (More: Manage & Analyze & Grow) & Bottom Navigation */}
      <MoreSheet
        isOpen={moreOpen}
        onClose={() => setMoreOpen(false)}
        onOpenSearch={() => {
          window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
        }}
      />
      <BottomBar onOpenMore={() => setMoreOpen(true)} isMoreOpen={moreOpen} />
    </div>
  );
};

export default AppShell;
