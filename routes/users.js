const userRouter = require('express').Router();
const {
  getUsers, createUser, getUserById, updateProfile, updateAvatar,
} = require('../controllers/users');

userRouter.get('/users', getUsers);
userRouter.get('/users/:userId', getUserById);
userRouter.post('/users', createUser);
userRouter.patch('/users/me', updateProfile);
userRouter.patch('/users/me/avatar', updateAvatar);

module.exports = userRouter;
