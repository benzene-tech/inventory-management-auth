class CustomError extends Error {
  constructor(message) {
    super(message);

    this.statusCode = 400;
  }

  serializeErrors() {}
}

module.exports = CustomError;
