const {
  errorHandler,
  NotFoundError,
} = require('@benzene-tech/inventory-management-core');
const express = require('express');
const cookieParser = require('cookie-parser');
const currentUserRoutes = require('./routes/current-user');
const signUpRoutes = require('./routes/sign-up');
const signOutRoutes = require('./routes/sign-out');
const signInRoutes = require('./routes/sign-in');

const app = express();

app.set('trust proxy', true);

app.use(express.json());
app.use(cookieParser());

app.use(currentUserRoutes);
app.use(signUpRoutes);
app.use(signInRoutes);
app.use(signOutRoutes);

// eslint-disable-next-line no-unused-vars
app.all('*', (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

module.exports = app;
