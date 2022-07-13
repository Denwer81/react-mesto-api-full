class NotFoundError extends Error {
  constructor(message = 'Переданые данные не найдены') {
    super(message);
    this.message = { message };
    this.code = 404;
    this.name = 'NotFound';
  }
}

module.exports = NotFoundError;
