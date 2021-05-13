const CustomError = require('./custom-error');

class NotFoundError extends CustomError {
  constructor() {
    super('Route not Found');

    this.statusCode = 404;
  }

  serializeErrors() {
    return [{ message: 'Not Found' }];
  }
}

module.exports = NotFoundError;
