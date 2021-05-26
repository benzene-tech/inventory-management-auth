/* eslint-disable no-underscore-dangle */
const {
  BadRequestError,
  Publisher,
  validateRequest,
  Password,
} = require('@benzene-tech/inventory-management-core');
const { Router } = require('express');
const { body } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const newUserEvent = require('../events/new-user-event');

const router = Router();

router.post(
  '/api/auth/sign-up',
  [
    body('firstName').isString(),
    body('lastName').isString(),
    body('username').isString(),
    body('password')
      .trim()
      .isLength({ min: 8, max: 32 })
      .withMessage('Passwords must be between 8 and 32 characters'),
    body('dob').isString(),
    body('phoneNumber').isMobilePhone(),
  ],
  validateRequest,
  async (req, res, next) => {
    const { firstName, lastName, username, password, dob, phoneNumber } =
      req.body;

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      next(new BadRequestError('Username already in use'));
      return;
    }
    const hashedPassword = await Password.toHash(password);
    const user = User.build({ username, password: hashedPassword });
    await user.save();

    const userJwt = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET
    );

    const publisher = await Publisher.build(process.env.RABBITMQ_URI, 'users');

    const eventPayload = newUserEvent({
      firstName,
      lastName,
      username,
      password: user.password,
      dob,
      phoneNumber,
    });

    await publisher.publishToQueue(JSON.stringify(eventPayload));

    res.cookie('jwt', userJwt, { maxAge: 86400000 });

    res.status(201).send({
      user: {
        _id: user._id,
        username: user.username,
      },
    });
  }
);

module.exports = router;
