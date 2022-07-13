class AuthErrors extends Error {
  constructor(message = 'Email или пароль не верные') {
    super(message);
    this.message = { message };
    this.code = 401;
    this.name = 'AuthError';
  }
}

module.exports = AuthErrors;
