import { NextFunction, Response, Request } from 'express';
import config from '../config/config';
import { DataStoredInToken } from '../interfaces/token.interface';
import { UnAuthorizedError } from '../utils/apiError';
import { verify } from 'jsonwebtoken';
import { Jwt } from '../utils/jwt';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = <string>req.headers['authorization'];
    const token = authHeader.split(' ')[1];
    const jwt = new Jwt();
    const jwtPayload = jwt.verifyToken(token, config.jwt.secret);
    next();
  } catch (err) {
    console.log('error ------------------------------------', err);
    throw new UnAuthorizedError('token not valid');
  }
};
