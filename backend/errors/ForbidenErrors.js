class ForbidenErrors extends Error {
  constructor(message = 'Ошибка доступа') {
    super(message);
    this.message = { message };
    this.code = 403;
    this.name = 'Forbiden';
  }
}

module.exports = ForbidenErrors;
