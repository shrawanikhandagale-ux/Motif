import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { Tile, Badge } from '../../../components/ui';
import { storageService } from '../../../services/storage';
import { DashboardTask } from '../../../types';

const INITIAL_TASKS: DashboardTask[] = [
  { id: 'task-1', title: 'Sign off on Issue Zero Type Specimen', department: 'Create', dueDate: 'Today', completed: false },
  { id: 'task-2', title: 'Review Substack Drop Announcement copy', department: 'Market', dueDate: 'Tomorrow', completed: false },
  { id: 'task-3', title: 'Finalize Retainer Scope for Sundown', department: 'Manage', dueDate: 'In 3 days', completed: true },
  { id: 'task-4', title: 'Complete Risograph Separation brief', department: 'Learn', dueDate: 'In 4 days', completed: false },
];

export const UpcomingTasksTile: React.FC = () => {
  const [tasks, setTasks] = useState<DashboardTask[]>(() =>
    storageService.getDashboardTasks(INITIAL_TASKS)
  );

  useEffect(() => {
    storageService.saveDashboardTasks(tasks);
  }, [tasks]);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const remaining = tasks.filter((t) => !t.completed).length;

  return (
    <Tile accent="none" shadow="default" className="p-5 flex flex-col justify-between space-y-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Badge variant="acid">Upcoming Tasks</Badge>
          <span className="font-mono text-xs opacity-75">{remaining} remaining</span>
        </div>
        <h3 className="font-display font-bold text-xl text-[var(--ink)]">Deliverable Queue</h3>

        <div className="space-y-2 pt-1">
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className={`p-3 border-2 border-[var(--line)] flex items-start gap-3 transition-colors cursor-pointer select-none ${
                task.completed ? 'bg-[var(--card-subtle)] opacity-60' : 'bg-[var(--card-bg)] hover:bg-[var(--card-subtle)]'
              }`}
            >
              <div
                className={`w-5 h-5 border-2 border-[var(--line)] shrink-0 flex items-center justify-center mt-0.5 ${
                  task.completed ? 'bg-[var(--ink)] text-[var(--bg)]' : 'bg-[var(--bg)]'
                }`}
              >
                {task.completed && <Check className="w-3.5 h-3.5" />}
              </div>
              <div className="min-w-0 flex-1">
                <p className={`text-xs font-sans font-medium leading-snug ${task.completed ? 'line-through' : ''}`}>
                  {task.title}
                </p>
                <div className="flex items-center gap-2 mt-1 text-[10px] font-mono opacity-70">
                  <span>{task.department}</span>
                  <span>·</span>
                  <span>{task.dueDate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-2 text-[11px] font-mono opacity-70 text-right">
        Tick tasks to update progress
      </div>
    </Tile>
  );
};

export default UpcomingTasksTile;

