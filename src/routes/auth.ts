import { Router } from 'express';
import { register, login, getUser } from '../controllers/auth';
import { checkJwt } from '../middleware/auth';

const router: Router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/whoami', checkJwt, getUser);

export default router;
