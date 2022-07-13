const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { celebrate, errors } = require('celebrate');
const cors = require('cors');

// const { cors } = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { createUser, login } = require('./controllers/users');
const { signUpValidtion, signInValidation } = require('./validation/JoiValidation');
const auth = require('./middlewares/auth');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { setError } = require('./middlewares/errors');
const NotFoundError = require('./errors/NotFoundError');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());

// app.use(cors);
app.use(helmet());

const allowedCors = [
  'http://localhost:3000',
  'http://localhost:3001',
];

app.use(cors({
  origin: allowedCors,
  credentials: true,
}));

app.use(requestLogger);

app.post('/signin', celebrate(signInValidation), login);
app.post('/signup', celebrate(signUpValidtion), createUser);

app.use('/users', auth, usersRouter);
app.use('/cards', auth, cardsRouter);

app.use((_, __, next) => next(new NotFoundError('Путь не найден')));

app.use(errorLogger);

app.use(errors());
app.use(setError);

app.listen(PORT);
