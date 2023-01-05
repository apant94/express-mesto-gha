const cardRouter = require('express').Router();
const {
  getCards, createCard, deleteCardById, likeCard, dislikeCard,
} = require('../controllers/cards');
const { validateCreateCard, validateDeleteCardById, validateLikeCard } = require('../middlewares/validate');

cardRouter.get('/', getCards);
cardRouter.post('/', validateCreateCard, createCard);
cardRouter.delete('/:cardId', validateDeleteCardById, deleteCardById);
cardRouter.put('/:cardId/likes', validateLikeCard, likeCard);
cardRouter.delete('/:cardId/likes', validateLikeCard, dislikeCard);

module.exports = cardRouter;
