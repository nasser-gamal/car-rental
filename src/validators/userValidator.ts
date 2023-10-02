import * as Joi from 'joi';

export const createUserValidator = {
  body: Joi.object().keys({
    firstName: Joi.string().required().min(3),
    lastName: Joi.string().required().min(3),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(20),
    phone: Joi.string().required(),
  }),
};
