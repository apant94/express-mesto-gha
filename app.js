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

// app.use((req, res, next) => {
//   req.user = {
//     _id: '6399a54d612dba75a4457f3d',
//   };
//   next();
// });
app.use(express.json());

app.post('/signup', createUser);
app.post('/signin', login);
app.use(auth);
app.use(userRouter);
app.use(cardRouter);
app.use('*', (req, res) => {
  res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Указанный путь не найден' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
