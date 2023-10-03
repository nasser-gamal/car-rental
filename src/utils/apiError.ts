import { StatusCodes } from 'http-status-codes';

export class  ApiError extends Error {
  statusText: string;
  constructor(message: string, public status: number) {
    super(message);
    this.statusText = `${this.status}`.startsWith('4') ? 'Fail' : 'Error';
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string) {
    super(message, StatusCodes.NOT_FOUND);
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string) {
    super(message, StatusCodes.BAD_REQUEST);
  }
}

export class UnAuthorizedError extends ApiError {
  constructor(message: string) {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}
