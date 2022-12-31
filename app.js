const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/NotFoundError');

const INTENTAL_SERVER_ERROR_CODE = 500;

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());

app.post('/signup', createUser);
app.post('/signin', login);
app.use(auth);
app.use(userRouter);
app.use(cardRouter);
app.use('*', () => {
  throw new NotFoundError('Указанный путь не найден');
});
app.use((err, req, res, next) => {
  const { status = INTENTAL_SERVER_ERROR_CODE, message } = err;
  res.status(status).send({ message: status === INTENTAL_SERVER_ERROR_CODE ? 'На сервере произошла ошибка' : message });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
