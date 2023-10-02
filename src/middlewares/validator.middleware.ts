import { NextFunction, Request, Response } from 'express';
import { pick } from '../utils/pick';
import { BadRequestError } from '../utils/apiError';
import * as Joi from 'joi';

export const validate =
  (validator: any) => (req: Request, res: Response, next: NextFunction) => {
    const toPick: string[] = Object.keys(validator);

    const toValidate: any = pick(toPick, req);

    const validateSchema = Joi.compile(validator);
    const { error } = validateSchema.validate(toValidate, {
      abortEarly: false,
    });

    if (error) throw new BadRequestError(error.message);
    next();
  };
