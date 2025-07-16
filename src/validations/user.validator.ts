import Joi from 'joi';

export const createUserValidator = Joi.object({
  body: {
    fullname: Joi.string().required(),
    email: Joi.string().email(),
    password: Joi.string().min(3).required(),
  },
});

export const userSignInValidator = Joi.object({
  body: {
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required(),
  },
});
