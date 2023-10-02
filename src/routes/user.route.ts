import { Router } from 'express';
import { UserController } from '../controllers/user.contoller';
import { validate } from '../middlewares/validator.middleware';
import { createUserValidator } from '../validators/userValidator';

const router = Router();

router
  .route('/')
  .get(UserController.getAllUsers)
  .post(validate(createUserValidator), UserController.createUser);

export default router;
