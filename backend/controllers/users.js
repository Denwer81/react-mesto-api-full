const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');

const getUsers = (_, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};

const getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(new NotFoundError())
    .then((user) => res.send(user))
    .catch(next);
};

const getProfile = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((profile) => res.send(profile))
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create(
      {
        email, password: hash, name, about, avatar,
      },
    ))
    .then((user) => {
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        about: user.about,
        avatar: user.avatar,
      });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });

      res.send({ token });
    })
    .catch(next);
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(new NotFoundError())
    .then((user) => res.send(user))
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(new NotFoundError())
    .then((user) => res.send(user))
    .catch(next);
};

module.exports = {
  getUsers,
  getUser,
  getProfile,
  login,
  createUser,
  updateProfile,
  updateAvatar,
};
