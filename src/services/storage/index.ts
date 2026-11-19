export * from './progressStore';
import { Profile, DashboardTilesConfig, DashboardTask } from '../../types';

const KEYS = {
  THEME: 'motif_theme_preference',
  PROGRESS_STORE: 'motif_progress_store',
  PROFILE_STORE: 'motif_user_profile',
  DASHBOARD_CONFIG: 'motif_dashboard_config',
  DASHBOARD_TASKS: 'motif_dashboard_tasks',
} as const;

export interface ProgressState {
  completedCourseIds: string[];
  activeBriefId?: string;
  activeProjectId?: string;
  handOffLogs: Array<{ id: string; fromDept: string; toDept: string; summary: string; timestamp: string }>;
}

const defaultProgress: ProgressState = {
  completedCourseIds: ['path-branding-01'],
  activeBriefId: 'brief-01',
  activeProjectId: 'proj-01',
  handOffLogs: [{ id: 'log-1', fromDept: 'learn', toDept: 'create', summary: 'Prompt "Rebrand collective" sent to Studio', timestamp: 'Today' }],
};

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

export const storageService = {
  getTheme(): 'light' | 'dark' | 'system' {
    if (typeof window === 'undefined') return 'system';
    return (localStorage.getItem(KEYS.THEME) as 'light' | 'dark' | 'system') || 'system';
  },

  setTheme(theme: 'light' | 'dark' | 'system'): void {
    if (typeof window !== 'undefined') localStorage.setItem(KEYS.THEME, theme);
  },

  getProgress: () => read<ProgressState>(KEYS.PROGRESS_STORE, defaultProgress),
  saveProgress: (state: ProgressState) => write(KEYS.PROGRESS_STORE, state),

  toggleCourseModule(id: string): ProgressState {
    const curr = this.getProgress();
    const has = curr.completedCourseIds.includes(id);
    const updated = { ...curr, completedCourseIds: has ? curr.completedCourseIds.filter((x) => x !== id) : [...curr.completedCourseIds, id] };
    this.saveProgress(updated);
    return updated;
  },

  addHandoffLog(fromDept: string, toDept: string, summary: string): ProgressState {
    const curr = this.getProgress();
    const updated = {
      ...curr,
      handOffLogs: [{ id: `log-${Date.now()}`, fromDept, toDept, summary, timestamp: 'Just now' }, ...curr.handOffLogs.slice(0, 9)],
    };
    this.saveProgress(updated);
    return updated;
  },

  getProfile: () => read<Profile | null>(KEYS.PROFILE_STORE, null),
  saveProfile: (p: Profile) => write(KEYS.PROFILE_STORE, p),
  clearProfile: () => typeof window !== 'undefined' && localStorage.removeItem(KEYS.PROFILE_STORE),

  getDashboardConfig: () => read<DashboardTilesConfig>(KEYS.DASHBOARD_CONFIG, DEFAULT_DASHBOARD_CONFIG),
  saveDashboardConfig: (cfg: DashboardTilesConfig) => write(KEYS.DASHBOARD_CONFIG, cfg),

  getDashboardTasks: (fallback: DashboardTask[]) => read<DashboardTask[]>(KEYS.DASHBOARD_TASKS, fallback),
  saveDashboardTasks: (tasks: DashboardTask[]) => write(KEYS.DASHBOARD_TASKS, tasks),
};
