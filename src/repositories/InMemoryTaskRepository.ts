import { ITaskRepository } from '@/interfaces/ITaskRepository';
import { CreateTaskDTO, UpdateTaskDTO } from '@/interfaces/TaskDTOs';
import { Task } from '@/models/task';
import { taskStore } from '@/store/taskStore';
import { randomUUID } from 'crypto';

export class InMemoryTaskRepository implements ITaskRepository {
  async create(data: CreateTaskDTO): Promise<Task> {
    const now = new Date();
    const newTask: Task = {
      id: randomUUID(),
      title: data.title,
      completed: false,
      createdAt: now,
      updatedAt: now,
    };
    taskStore.save(newTask);
    return newTask;
  }

  async findAll(filter?: { completed?: boolean }): Promise<Task[]> {
    return taskStore.findAll(filter);
  }

  async findById(id: string): Promise<Task | null> {
    return taskStore.findById(id);
  }

  async update(id: string, data: UpdateTaskDTO): Promise<Task | null> {
    // Only allow updating fields that exist in the store's update signature
    const updates: Partial<Omit<Task, 'id' | 'createdAt'>> = {};
    if (data.title !== undefined) updates.title = data.title;
    if (data.completed !== undefined) updates.completed = data.completed;
    return taskStore.update(id, updates);
  }

  async delete(id: string): Promise<boolean> {
    return taskStore.delete(id);
  }
}