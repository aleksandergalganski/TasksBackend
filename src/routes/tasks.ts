import { Router } from 'express';
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
} from '../controllers/tasks';
import { checkJwt } from '../middleware/auth';
import validate, { taskValidationRules } from '../middleware/validator';

const router = Router();

router
  .route('/')
  .get(checkJwt, getTasks)
  .post(checkJwt, taskValidationRules(), validate, createTask);
router
  .route('/:id')
  .get(checkJwt, getTask)
  .put(checkJwt, taskValidationRules(), validate, updateTask)
  .delete(checkJwt, deleteTask);

export default router;
