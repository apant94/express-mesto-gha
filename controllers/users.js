/* eslint-disable no-restricted-globals */
const User = require('../models/user');

const NOT_FOUND_ERROR_CODE = 404;
const BAD_REQUEST_ERROR_CODE = 400;
const INTENTAL_SERVER_ERROR_CODE = 500;

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(INTENTAL_SERVER_ERROR_CODE).send({ message: `Произошла ошибка: ${err.message}` }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(new Error('NotFoundError'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST_ERROR_CODE).send({ message: 'Указан невалидный id' });
      } else if (err.message === 'NotFoundError') {
        res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Пользователь с указанным id не найден' });
      } else {
        res.status(INTENTAL_SERVER_ERROR_CODE).send({ message: `Произошла ошибка: ${err.message}` });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_ERROR_CODE).send({ message: 'Переданы некорректные данные при создании пользователя' });
      } else {
        res.status(INTENTAL_SERVER_ERROR_CODE).send({ message: `Произошла ошибка: ${err.message}` });
      }
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(BAD_REQUEST_ERROR_CODE).send({ message: 'Переданы некорректные данные при обновлении профиля' });
      } else {
        res.status(INTENTAL_SERVER_ERROR_CODE).send({ message: `Произошла ошибка: ${err.message}` });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar })
    .then((user) => res.send({ avatar: user.avatar }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(BAD_REQUEST_ERROR_CODE).send({ message: 'Переданы некорректные данные при обновлении аватара' });
      } else {
        res.status(INTENTAL_SERVER_ERROR_CODE).send({ message: `Произошла ошибка: ${err.message}` });
      }
    });
};
