const mainRouter = require('express').Router();
const { celebrate } = require('celebrate');

const { createUser, login } = require('../controllers/users');
const { signUpValidtion, signInValidation } = require('../validation/JoiValidation');
const auth = require('../middlewares/auth');
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const NotFoundError = require('../errors/NotFoundError');

mainRouter.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

mainRouter.post('/signin', celebrate(signInValidation), login);
mainRouter.post('/signup', celebrate(signUpValidtion), createUser);

mainRouter.use('/users', auth, usersRouter);
mainRouter.use('/cards', auth, cardsRouter);

mainRouter.use((_, __, next) => next(new NotFoundError('Путь не найден')));

module.exports = mainRouter;
