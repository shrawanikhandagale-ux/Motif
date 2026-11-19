export * from './progressStore';
import { Profile, DashboardTilesConfig, DashboardTask } from '../../types';

const KEYS = {
  THEME: 'motif_theme_preference',
  PROFILE_STORE: 'motif_user_profile',
  DASHBOARD_CONFIG: 'motif_dashboard_config',
  DASHBOARD_TASKS: 'motif_dashboard_tasks',
} as const;

export const DEFAULT_DASHBOARD_CONFIG: DashboardTilesConfig = {
  departmentsStrip: true,
  continueLearning: true,
  recentProjects: true,
  upcomingTasks: true,
  skillMap: true,
};

function read<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

/**
 * Storage Service
 * Handles user preferences and UI configuration separate from the operational progressStore.
 */
export const storageService = {
  getTheme(): 'light' | 'dark' | 'system' {
    if (typeof window === 'undefined') return 'system';
    return (localStorage.getItem(KEYS.THEME) as 'light' | 'dark' | 'system') || 'system';
  },

  setTheme(theme: 'light' | 'dark' | 'system'): void {
    if (typeof window !== 'undefined') localStorage.setItem(KEYS.THEME, theme);
  },

  getProfile: () => read<Profile | null>(KEYS.PROFILE_STORE, null),
  saveProfile: (p: Profile) => write(KEYS.PROFILE_STORE, p),
  clearProfile: () => typeof window !== 'undefined' && localStorage.removeItem(KEYS.PROFILE_STORE),

  getDashboardConfig: () => read<DashboardTilesConfig>(KEYS.DASHBOARD_CONFIG, DEFAULT_DASHBOARD_CONFIG),
  saveDashboardConfig: (cfg: DashboardTilesConfig) => write(KEYS.DASHBOARD_CONFIG, cfg),

  getDashboardTasks: (fallback: DashboardTask[]) => read<DashboardTask[]>(KEYS.DASHBOARD_TASKS, fallback),
  saveDashboardTasks: (tasks: DashboardTask[]) => write(KEYS.DASHBOARD_TASKS, tasks),
};

export default storageService;
