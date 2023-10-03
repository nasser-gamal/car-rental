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

const router = Router();

router.patch(
  '/change-password/:userId',
  validate(changeUserPasswordValidator),
  UserController.changeUserPassword
);

router
  .route('/')
  .get(UserController.getAllUsers)
  .post(validate(createUserValidator), UserController.createUser);

router
  .route('/:userId')
  .get(validate(getUserValidator), UserController.getUser)
  .patch(validate(updateUserValidator), UserController.updateUser)
  .delete(validate(deleteUserValidator), UserController.deleteUser);

export default router;
