import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { errorHandler } from './middleware/errorHandler'
import { InMemoryTaskRepository } from './repositories/InMemoryTaskRepository'
import { TaskService } from './services/taskService'
import { TaskController } from './controllers/taskController'
import { createTaskRoutes } from './routes/taskRoutes'

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' })
})

const taskRepository = new InMemoryTaskRepository();
const taskService = new TaskService(taskRepository);
const taskController = new TaskController(taskService);
const taskRoutes = createTaskRoutes(taskController);

//routes
app.use('/api', taskRoutes);

app.use(errorHandler);

export default app