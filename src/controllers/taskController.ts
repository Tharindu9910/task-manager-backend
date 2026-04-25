import { Request, Response } from 'express';
import { TaskService } from '@/services/taskService';
import { CreateTaskDTO, UpdateTaskDTO } from '@/interfaces/TaskDTOs';

export class TaskController {
  constructor(private taskService: TaskService) {}

  async createTask(req: Request, res: Response): Promise<void> {
    const data: CreateTaskDTO = req.body;
    const task = await this.taskService.createTask(data);
    res.status(201).json(task);
  }

  async getAllTasks(req: Request, res: Response): Promise<void> {
    const query = req as { status?: 'completed' | 'incomplete' } | undefined;
    const filter = query?.status ? { completed: query.status === 'completed' } : undefined;
    const tasks = await this.taskService.getAllTasks(filter);
    res.json(tasks);
  }

  async getTaskById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    
    if (!id || typeof id !== 'string') {
      res.status(400).json({ error: 'Invalid task ID' });
      return;
    }
    
    const task = await this.taskService.getTaskById(id);
    res.json(task);
  }

  async updateTask(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    
    if (!id || typeof id !== 'string') {
      res.status(400).json({ error: 'Invalid task ID' });
      return;
    }
    
    const data: UpdateTaskDTO = req.body;
    const task = await this.taskService.updateTask(id, data);
    res.json(task);
  }

  async deleteTask(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    
    if (!id || typeof id !== 'string') {
      res.status(400).json({ error: 'Invalid task ID' });
      return;
    }
    
    await this.taskService.deleteTask(id);
    res.status(204).send();
  }
}