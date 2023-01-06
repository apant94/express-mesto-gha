const { celebrate, Joi } = require('celebrate');

const regex = /http[s]?:\/\/([\w.]+\/?)\S*/;

module.exports.validateSignUp = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(20),
    avatar: Joi.string().regex(regex),
    about: Joi.string().min(2).max(30),
  }),
});

module.exports.validateSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validateGetUserById = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }).unknown(true),
});

module.exports.validateUpdateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(20).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

module.exports.validateUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(regex).required(),
  }),
});

module.exports.validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().regex(regex).required(),
  }),
});

module.exports.validateDeleteCardById = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }).unknown(true),
});

module.exports.validateLikeCard = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }).unknown(true),
});
