const userRouter = require('express').Router();
const {
  getUsers, getUserById, updateProfile, updateAvatar, getCurrentUser,
} = require('../controllers/users');
const { validateGetUserById, validateUpdateProfile, validateUpdateAvatar } = require('../middlewares/validate');

userRouter.get('/', getUsers);
userRouter.get('/me', getCurrentUser);
userRouter.get('/:userId', validateGetUserById, getUserById);
userRouter.patch('/me', validateUpdateProfile, updateProfile);
userRouter.patch('/me/avatar', validateUpdateAvatar, updateAvatar);

module.exports = userRouter;
