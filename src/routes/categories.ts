import { Router } from 'express';
import validate, { categoryValidationRules } from '../middleware/validator';
import { getCategories, createCategory } from '../controllers/categories';

const router: Router = Router();

router.post('/', categoryValidationRules(), validate, createCategory);
router.get('/', getCategories);

export default router;
