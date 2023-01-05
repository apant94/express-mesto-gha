const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUserById, updateProfile, updateAvatar, getCurrentUser,
} = require('../controllers/users');

userRouter.get('/', getUsers);
userRouter.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24).required(),
  }).unknown(true),
}), getUserById);
userRouter.get('/me', getCurrentUser);
userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(20),
    about: Joi.string().min(2).max(30),
  }),
}), updateProfile);
userRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(/http[s]?:\/\/([\w.]+\/?)\S*/).required(),
  }),
}), updateAvatar);

module.exports = userRouter;
