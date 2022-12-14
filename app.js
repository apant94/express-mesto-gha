const express = require('express');

const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;

const app = express();

const userRouter = require('./routes/users');

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use((req, res, next) => {
  req.user = {
    _id: '6399a54d612dba75a4457f3d',
  };
  next();
});

app.use(express.json());

app.use(userRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
