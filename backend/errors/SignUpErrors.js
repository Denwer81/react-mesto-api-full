class SignUpErrors extends Error {
  constructor(message = 'Пользователь с таким Email существует') {
    super(message);
    this.message = { message };
    this.code = 409;
    this.name = 'SignUpError';
  }
}

module.exports = SignUpErrors;
