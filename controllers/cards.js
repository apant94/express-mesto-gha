const Card = require('../models/card');

const NOT_FOUND_ERROR_CODE = 404;
const BAD_REQUEST_ERROR_CODE = 400;
const INTENTAL_SERVER_ERROR_CODE = 500;

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(INTENTAL_SERVER_ERROR_CODE).send({ message: `Произошла ошибка: ${err.message}` }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_ERROR_CODE).send({ message: 'Переданы невалидные данные при создании карточки' });
      } else {
        res.status(INTENTAL_SERVER_ERROR_CODE).send({ message: `Произошла ошибка: ${err.message}` });
      }
    });
};

module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(new Error('NotFoundError'))
    .then((card) => {
      if (card.owner._id !== req.user.cardId) {
        throw new Error('Невозможно удалить карточку другого пользователя');
      } else {
        res.send({ message: 'Карточка удалена' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST_ERROR_CODE).send({ message: 'Переданы некорректные данные при удалении карточки' });
      } else if (err.message === 'NotFoundError') {
        res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Карточка по данному id не найдена' });
      } else {
        res.status(INTENTAL_SERVER_ERROR_CODE).send({ message: `Произошла ошибка: ${err.message}` });
      }
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error('NotFoundError'))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(BAD_REQUEST_ERROR_CODE).send({ message: 'Переданы некорректные данные при лайке' });
      } else if (err.message === 'NotFoundError') {
        res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Карточка с указанным id не найдена' });
      } else {
        res.status(INTENTAL_SERVER_ERROR_CODE).send({ message: `Произошла ошибка: ${err.message}` });
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error('NotFoundError'))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(BAD_REQUEST_ERROR_CODE).send({ message: 'Переданы некорректные данные при снятии лайка' });
      } else if (err.message === 'NotFoundError') {
        res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Карточка с указанным id не найдена' });
      } else {
        res.status(INTENTAL_SERVER_ERROR_CODE).send({ message: `Произошла ошибка: ${err.message}` });
      }
    });
};
