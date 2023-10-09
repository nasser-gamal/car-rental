import * as Joi from 'joi';

export const siteValidator = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    logo: Joi.string().required(),
    address: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    facebook: Joi.string().optional(),
    instgram: Joi.string().optional(),
    whatsApp: Joi.string().optional(),
  }),
};
