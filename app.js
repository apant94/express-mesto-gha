const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');

const NOT_FOUND_ERROR_CODE = 404;

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());

app.post('/signup', createUser);
app.post('/signin', login);
app.use(auth);
app.use(userRouter);
app.use(cardRouter);
app.use('*', (req, res) => {
  res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Указанный путь не найден' });
});
// app.use((err, req, res, next) => {
//   res.status(500).send({ message: 'На сервере произошла ошибка' });
//   next(err);
// });

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
