class BadRequestErrors extends Error {
  constructor(message = 'Переданы некорректные данные') {
    super(message);
    this.message = { message };
    this.code = 400;
    this.name = 'BadRequest';
  }
}

module.exports = BadRequestErrors;
