class ServerErrors extends Error {
  constructor(message = 'На сервере произошла ошибка') {
    super(message);
    this.message = { message };
    this.code = 500;
    this.name = 'ServerError';
  }
}

module.exports = ServerErrors;
