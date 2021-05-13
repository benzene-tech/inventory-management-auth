const { Router } = require('express');
const { body } = require('express-validator');
const jwt = require('jsonwebtoken');
const BadRequestError = require('../errors/bad-request-error');
const validateRequest = require('../middlewares/validate-request');
const User = require('../models/user');

const router = Router();

router.post(
  '*/sign-up',
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
    const {
      // firstName,
      // lastName,
      username,
      password,
      // dob,
      // phoneNumber,
    } = req.body;

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      next(new BadRequestError('Username already in use'));
      return;
    }

    const user = User.build({ username, password });
    await user.save();

    const userJwt = jwt.sign(
      {
        // eslint-disable-next-line no-underscore-dangle
        id: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET
    );

    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

module.exports = router;
