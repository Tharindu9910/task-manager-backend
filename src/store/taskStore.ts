import { Task } from '@/models/task';
import { TaskFilter } from '@/interfaces/TaskFilters';

// In-memory storage – replaceable with PostgreSQL later
const tasks = new Map<string, Task>();

export const taskStore = {
  save(task: Task): void {
    tasks.set(task.id, task);
  },

  findAll(filter?: TaskFilter): Task[] {
    const allTasks = Array.from(tasks.values());
    if (filter?.completed !== undefined) {
      return allTasks.filter((task) => task.completed === filter.completed);
    }
    return allTasks;
  },

  findById(id: string): Task | null {
    return tasks.get(id) || null;
  },

  update(id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>): Task | null {
    const existing = tasks.get(id);
    if (!existing) return null;

    const updated: Task = {
      ...existing,
      ...updates,
      updatedAt: new Date(),
    };
    tasks.set(id, updated);
    return updated;
  },

  delete(id: string): boolean {
    return tasks.delete(id);
  },

  clear(): void {
    tasks.clear();
  },
};