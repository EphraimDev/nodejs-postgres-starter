import app from 'express';
import auth from '../app/controllers/auth';

const router = app.Router();

router.post('/signup', auth.signup);
router.post('/login', auth.login)

export default router;