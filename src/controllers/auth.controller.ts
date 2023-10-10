import { Request, Response, response } from 'express';
import { StatusCodes } from 'http-status-codes';
import AuthService from '../services/auth.service';
import sendResponse from '../utils/sendResponse';
import config from '../config/config';

export class AuthController {
  public async signup(req: Request, res: Response) {
    const authService = new AuthService();
    const { user, randomCode } = await authService.signup(req.body);
    return sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      message: 'user created successfully',
      data: { user, randomCode },
    });
  }

  public async signin(req: Request, res: Response) {
    const authService = new AuthService();
    const { tokens, user } = await authService.signin(req.body);
    // save refreshToken in Cookies
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: config.jwt.refresh_expires_in,
    });

    return sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: 'login sucessed',
      data: {
        tokens,
        user,
      },
    });
  }

  public async verifyEmail(req: Request, res: Response) {
    const authService = new AuthService();
    const { tokens, user } = await authService.verifyEmailCode(req.body.code);
    return sendResponse(res, {
      statusCode: 200,
      message: 'verify email success',
      data: {
        tokens,
        user,
      },
    });
  }
  public async forgetPassword(req: Request, res: Response) {
    const authService = new AuthService();
    const { randomCode } = await authService.forgetPassword(req.body.email);
    return sendResponse(res, {
      statusCode: 200,
      message: 'your reset code is sent to your email, check your inbox',
      data: {
        randomCode,
      },
    });
  }
  public async verifyResetPasswordCode(req: Request, res: Response) {
    const authService = new AuthService();
    const { user } = await authService.verifyResetPasswordCode(
      req.body.email,
      req.body.code
    );
    return sendResponse(res, {
      statusCode: 200,
      message: 'reset password code verified',
      data: {
        user,
      },
    });
  }
  public async resetPassword(req: Request, res: Response) {
    const authService = new AuthService();
    const { user, tokens } = await authService.resetPassword(
      req.body.email,
      req.body.password
    );
    return sendResponse(res, {
      statusCode: 200,
      message: 'password changed successfully',
      data: {
        user,
        tokens,
      },
    });
  }

  public async signout(req: Request, res: Response) {
    const authService = new AuthService();
    const refreshToken = req.cookies('refreshToken');
    await authService.signout(refreshToken);
    // remove refreshToken from the cookies
    res.clearCookie('refreshToken');
    return sendResponse(res, {
      statusCode: 200,
      message: 'user logout success',
    });
  }
}
