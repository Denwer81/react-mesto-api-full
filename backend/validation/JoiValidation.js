const { Joi } = require('celebrate');
const { urlRegex } = require('../regex/regex');

const signInValidation = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};

const signUpValidtion = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(urlRegex),
  }),
};

const updateProfileValidation = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
};

const updateAvatarValidation = {
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(urlRegex),
  }),
};

const getUserValidation = {
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
};

const createCardValidation = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(urlRegex),
  }),
};

const cardValidation = {
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
};

module.exports = {
  signInValidation,
  signUpValidtion,
  updateProfileValidation,
  updateAvatarValidation,
  getUserValidation,
  createCardValidation,
  cardValidation,
};
