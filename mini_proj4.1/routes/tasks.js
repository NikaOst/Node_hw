import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { createTask, getTask, updateTask, deleteTask } from '../controllers/taskController.js';

const taskRouter = express.Router();

// http://127.0.0.1:3333/tasks/
taskRouter.post('/', authMiddleware, createTask);
taskRouter.get('/', authMiddleware, getTask);
taskRouter.put('/:id', authMiddleware, updateTask);
taskRouter.delete('/:id', authMiddleware, deleteTask);

export default taskRouter;
