/* eslint-disable no-underscore-dangle */
const {
  Password,
  BadRequestError,
  validateRequest,
} = require('@benzene-tech/inventory-management-core');
const { Router } = require('express');
const { body } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = Router();

router.post(
  '/api/auth/sign-in',
  [
    body('username').isString(),
    body('password').trim().isLength({ min: 8, max: 32 }),
  ],
  validateRequest,
  async (req, res, next) => {
    const { username, password } = req.body;

    const existingUser = await User.findOne({
      username,
    });

    if (!existingUser) {
      next(new BadRequestError('User not found'));
      return;
    }

    const validatePassword = await Password.compare(
      existingUser.password,
      password
    );
    if (!validatePassword) {
      next(new BadRequestError('Invalid Password'));
      return;
    }

    const user = await User.findOne({ username });

    const userJwt = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET
    );

    res.cookie('jwt', userJwt, { maxAge: 86400000 });

    res.status(200).send({
      user: {
        _id: user._id,
        username: user.username,
      },
    });
  }
);

module.exports = router;
