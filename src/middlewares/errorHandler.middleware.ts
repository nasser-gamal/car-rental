import { ApiError } from '../utils/apiError';
import config from '../config/config.js';
import { NextFunction, Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { StatusCodes } from 'http-status-codes';

const sendErrorForDev = (
  err: {
    status: number;
    statusText: string;
    message: string;
    stack: string;
  },
  res: Response
) => {
  res.status(err.status).json({
    status: err.status,
    statusText: err.statusText,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorForProd = (
  err: {
    status: number;
    message: string;
    stack: string;
  },
  res: Response
) => {
  res.status(err.status).json({
    status: err.status,
    message: err.message,
  });
};

const globalError = (
  err: ApiError | QueryFailedError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errObj = {
    message: 'something went wrong',
    status: StatusCodes.INTERNAL_SERVER_ERROR,
    statusText: 'Error',
    stack: err.stack,
    error: err,
  };

  if (err instanceof ApiError) {
    errObj.status = err.status;
    errObj.message = err.message;
    errObj.statusText = err.statusText;
    errObj.stack = err.stack;
  }

  if (err instanceof QueryFailedError) {
    if (err.driverError.code === '23505') {
      errObj.status = StatusCodes.CONFLICT;
      errObj.message = err.driverError.message;
      errObj.statusText = 'Fail';
      errObj.stack = err.stack;
    }
  }

  sendErrorForDev(errObj, res);

  // err.statusCode = err.statusCode || 500;
  // err.status = err.status || 'error';
  // if (config.env === 'development') {
  //   sendErrorForDev(err, res);
  // } else {
  //   sendErrorForProd(err, res);
  // }
};

export default globalError;
