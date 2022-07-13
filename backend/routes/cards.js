const cardsRouter = require('express').Router();
const { celebrate } = require('celebrate');

const {
  createCardValidation,
  cardValidation,
} = require('../validation/JoiValidation');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardsRouter.get('/', getCards);

cardsRouter.post('/', celebrate(createCardValidation), createCard);

cardsRouter.delete('/:cardId', celebrate(cardValidation), deleteCard);

cardsRouter.put('/:cardId/likes', celebrate(cardValidation), likeCard);

cardsRouter.delete('/:cardId/likes', celebrate(cardValidation), dislikeCard);

module.exports = cardsRouter;
