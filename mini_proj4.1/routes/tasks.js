import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';

const taskRouter = express.Router();

// taskRouter.post('/', authMiddleware createTask);
// taskRouter.get('/', authMiddleware getTask);
// taskRouter.put('/:id',authMiddleware updateTask);
// taskRouter.delete('/:id', authMiddleware deleteTask);

export default taskRouter;
