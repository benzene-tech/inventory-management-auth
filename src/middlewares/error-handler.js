const CustomError = require('../errors/custom-error');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  return res
    .status(400)
    .send({ errors: [{ message: 'Internal Server Error' }] });
};

module.exports = errorHandler;
