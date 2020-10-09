import { Router } from 'express';
import { register, login, getUser } from '../controllers/auth';
import { checkJwt } from '../middleware/auth';
import validate, { userValidationRules } from '../middleware/validator';

const router: Router = Router();

router.post('/register', userValidationRules(), validate, register);
router.post('/login', userValidationRules(), validate, login);
router.get('/whoami', checkJwt, getUser);

export default router;
