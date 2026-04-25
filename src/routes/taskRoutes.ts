// src/routes/taskRoutes.ts
import { Router } from 'express';
import { TaskController } from '@/controllers/taskController';

export function createTaskRoutes(taskController: TaskController): Router {
  const router = Router();

  router.post('/tasks', (req, res) => taskController.createTask(req, res));
  router.get('/tasks', (req, res) => taskController.getAllTasks(req, res));
  router.get('/tasks/:id', (req, res) => taskController.getTaskById(req, res));
  router.patch('/tasks/:id', (req, res) => taskController.updateTask(req, res));
  router.delete('/tasks/:id', (req, res) => taskController.deleteTask(req, res));

  return router;
}