import { Router } from 'express';
import { validate } from '../middlewares/validator.middleware';
import { AuthController } from '../controllers/auth.controller';
import {
  signupValidator,
  signinValidator,
  verifyEmailValidator,
  forgetPasswordValidator,
  verifyResetCodeValidator,
  resetPasswordValidator,
} from '../validators/authVaidator';

const router = Router();

const authController = new AuthController();

router.post('/signup', validate(signupValidator), authController.signup);
router.post('/signin', validate(signinValidator), authController.signin);
router.post(
  '/verify-email',
  validate(verifyEmailValidator),
  authController.verifyEmail
);
router.post(
  '/forget-password',
  validate(forgetPasswordValidator),
  authController.forgetPassword
);
router.post(
  '/verify-resetCode',
  validate(verifyResetCodeValidator),
  authController.verifyResetPasswordCode
);
router.post(
  '/reset-password',
  validate(resetPasswordValidator),
  authController.resetPassword
);

export default router;
