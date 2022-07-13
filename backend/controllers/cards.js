const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const ForbidenError = require('../errors/ForbidenErrors');

const getCards = (_, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(new NotFoundError())
    .then((card) => {
      if (card.owner._id.toString() === req.user._id) {
        return Card.findByIdAndRemove(req.params.cardId);
      }
      return next(new ForbidenError());
    })
    .then((card) => res.send(card))
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NotFoundError())
    .then((card) => res.send(card))
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NotFoundError())
    .then((card) => res.send(card))
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
