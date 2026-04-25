import { ITaskRepository } from '@/interfaces/ITaskRepository';
import { CreateTaskDTO, UpdateTaskDTO, TaskResponseDTO } from '@/interfaces/TaskDTOs';
import { TaskFilter } from '@/interfaces/TaskFilters';
import { AppError } from '@/utils/AppError';

export class TaskService {
  constructor(private taskRepo: ITaskRepository) {}

  async createTask(data: CreateTaskDTO): Promise<TaskResponseDTO> {
    if (!data.title || data.title.trim().length === 0) {
      throw new AppError('Task title is required', 400);
    }

    const task = await this.taskRepo.create({
      title: data.title.trim(),
    });

    return this.toResponseDTO(task);
  }

  async getAllTasks(filter?: TaskFilter): Promise<TaskResponseDTO[]> {
    const tasks = await this.taskRepo.findAll(filter);
    return tasks.map((task) => this.toResponseDTO(task));
  }

  async getTaskById(id: string): Promise<TaskResponseDTO> {
    const task = await this.taskRepo.findById(id);
    if (!task) {
        throw new AppError('Task not found', 404);
    }
    return this.toResponseDTO(task);
  }

  async updateTask(id: string, data: UpdateTaskDTO): Promise<TaskResponseDTO> {
    if (data.title !== undefined && data.title.trim().length === 0) {
        throw new AppError('Task title cannot be empty', 400);
    }

    const cleanedData: UpdateTaskDTO = {};
    if (data.title !== undefined) cleanedData.title = data.title.trim();
    if (data.completed !== undefined) cleanedData.completed = data.completed;

    const updated = await this.taskRepo.update(id, cleanedData);
    if (!updated) {
        throw new AppError('Task not found', 404);
    }
    return this.toResponseDTO(updated);
  }

  async deleteTask(id: string): Promise<void> {
    const deleted = await this.taskRepo.delete(id);
    if (!deleted) {
        throw new AppError('Task not found', 404);
    }
  }

  private toResponseDTO(task: any): TaskResponseDTO {
    return {
      id: task.id,
      title: task.title,
      completed: task.completed,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
  }
}