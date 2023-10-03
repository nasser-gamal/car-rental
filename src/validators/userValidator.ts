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

export const updateUserValidator = {
  params: Joi.object().keys({
    userId: Joi.string().id().required(),
  }),
  body: Joi.object().keys({
    firstName: Joi.string().optional().min(3),
    lastName: Joi.string().optional().min(3),
    email: Joi.string().optional().email(),
    phone: Joi.string().optional(),
  }),
};

export const getUserValidator = {
  params: Joi.object().keys({
    userId: Joi.string().id().required(),
  }),
};

export const deleteUserValidator = {
  params: Joi.object().keys({
    userId: Joi.string().id().required(),
  }),
};

export const changeUserPasswordValidator = {
  body: Joi.object().keys({
    password: Joi.string().required().min(8).max(20),
  }),
};
