const express = require('express');
const cookieSession = require('cookie-session');
const signUpRoutes = require('./routes/sign-up');
const errorHandler = require('./middlewares/error-handler');
const NotFoundError = require('./errors/not-found-error');

const app = express();

app.set('trust proxy', true);

app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

app.use(signUpRoutes);

// eslint-disable-next-line no-unused-vars
app.all('*', (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

module.exports = app;
