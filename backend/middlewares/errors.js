const setError = (err, _, res, next) => {
  if (err.code === 11000) {
    res
      .status(409)
      .send({ message: 'Пользователь с таким Email существует' });

    return;
  }
  if (err.message === 'Validation failed' || err.name === 'CastError' || err.name === 'ValidationError') {
    res
      .status(400)
      .send({ message: 'Переданы некорректные данные' });

    return;
  }
  if (err.code === undefined) {
    res
      .status(500)
      .send({ message: 'На сервере произошла ошибка' });
  }

  res.status(err.code).send(err.message);

  next();
};

module.exports = {
  setError,
};
