require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { celebrate, errors } = require('celebrate');
const cors = require('cors');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const { createUser, login } = require('./controllers/users');
const { signUpValidtion, signInValidation } = require('./validation/JoiValidation');
const allowedCors = require('./const/allowedCors');
const auth = require('./middlewares/auth');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { setError } = require('./middlewares/errors');
const NotFoundError = require('./errors/NotFoundError');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());

app.use(helmet());

app.use(cors({
  origin: allowedCors,
  credentials: true,
}));

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate(signInValidation), login);
app.post('/signup', celebrate(signUpValidtion), createUser);

app.use('/users', auth, usersRouter);
app.use('/cards', auth, cardsRouter);

app.use((_, __, next) => next(new NotFoundError('Путь не найден')));

app.use(errorLogger);

app.use(errors());
app.use(setError);

app.listen(PORT);
