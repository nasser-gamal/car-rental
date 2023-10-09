import { Router } from 'express';
import userRoute from './user.route';
import authRoute from './auth.route';

const router = Router();

router.use('/auth', authRoute);
router.use('/users', userRoute);

export default router;
