const cardRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards, createCard, deleteCardById, likeCard, dislikeCard,
} = require('../controllers/cards');

cardRouter.get('/', getCards);
cardRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().regex(/http[s]?:\/\/([\w.]+\/?)\S*/).required(),
  }),
}), createCard);
cardRouter.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24).required(),
  }).unknown(true),
}), deleteCardById);
cardRouter.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24).required(),
  }).unknown(true),
}), likeCard);
cardRouter.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24).required(),
  }).unknown(true),
}), dislikeCard);

module.exports = cardRouter;
