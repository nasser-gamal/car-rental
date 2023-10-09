import * as Joi from 'joi';

export const signupValidator = {
  body: Joi.object().keys({
    firstName: Joi.string().required().min(3),
    lastName: Joi.string().required().min(3),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(20),
    phone: Joi.string().required(),
  }),
};

export const signinValidator = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(20),
  }),
};

export const verifyEmailValidator = {
  body: Joi.object().keys({
    code: Joi.string().required(),
  }),
};

export const forgetPasswordValidator = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
  }),
};

export const verifyResetCodeValidator = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    code: Joi.string().required(),
  }),
};

export const resetPasswordValidator = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(20),
  }),
};
