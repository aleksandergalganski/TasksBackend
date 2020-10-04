import { Router } from 'express';
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
} from '../controllers/tasks';
import { checkJwt } from '../middleware/auth';

const router = Router();

router.route('/').get(checkJwt, getTasks).post(checkJwt, createTask);

router
  .route('/:id')
  .get(checkJwt, getTask)
  .put(checkJwt, updateTask)
  .delete(checkJwt, deleteTask);

export default router;
