import { Router } from 'express';
import { UserController } from '../controllers/user.contoller';
import { validate } from '../middlewares/validator.middleware';
import {
  changeUserPasswordValidator,
  createUserValidator,
  deleteUserValidator,
  getUserValidator,
  updateUserValidator,
} from '../validators/userValidator';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

const userController = new UserController();

router.patch(
  '/change-password/:userId',
  validate(changeUserPasswordValidator),
  userController.changeUserPassword
);

router
  .route('/')
  .get(authMiddleware, userController.getAllUsers)
  .post(validate(createUserValidator), userController.createUser);

router
  .route('/:userId')
  .get(validate(getUserValidator), userController.getUser)
  .patch(validate(updateUserValidator), userController.updateUser)
  .delete(validate(deleteUserValidator), userController.deleteUser);

export default router;
