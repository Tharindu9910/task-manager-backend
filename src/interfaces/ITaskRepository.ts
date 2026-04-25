
import { Task } from '@/models/task';
import { CreateTaskDTO, UpdateTaskDTO } from './TaskDTOs';

export interface ITaskRepository {
  create(data: CreateTaskDTO): Promise<Task>;
  findAll(filter?: { completed?: boolean }): Promise<Task[]>;
  findById(id: string): Promise<Task | null>;
  update(id: string, data: UpdateTaskDTO): Promise<Task | null>;
  delete(id: string): Promise<boolean>;
}