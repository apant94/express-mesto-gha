const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { rootErrorHandler } = require('./middlewares/rootErrorHandler');
const { validateSignUp, validateSignIn } = require('./middlewares/validate');
const NotFoundError = require('./errors/NotFoundError');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());

app.post('/signup', validateSignUp, createUser);
app.post('/signin', validateSignIn, login);
app.use(auth);
app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use('*', (next) => {
  next(new NotFoundError('Указанный путь не найден'));
});
app.use(rootErrorHandler);

app.listen(PORT);
