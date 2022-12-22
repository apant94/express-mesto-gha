const userRouter = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getUsers, createUser, getUserById, updateProfile, updateAvatar, login,
} = require('../controllers/users');

userRouter.get('/users', getUsers);
userRouter.get('/users/:userId', getUserById);
userRouter.post('/signin', auth, login);
userRouter.post('/signup', createUser);
userRouter.patch('/users/me', updateProfile);
userRouter.patch('/users/me/avatar', updateAvatar);

module.exports = userRouter;
