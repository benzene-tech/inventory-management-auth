const { checkAuth } = require('@benzene-tech/inventory-management-core');
const { Router } = require('express');
const jwt = require('jsonwebtoken');
const Auth = require('../models/auth');

const router = Router();

router.get('/api/auth/current-user', checkAuth, async (req, res) => {
  const bearerToken = req.headers.authorization.split(' ')[1];

  const { id, username } = jwt.decode(bearerToken, process.env.JWT_SECRET);

  const auth = await Auth.findOne({ username });

  res.status(200).send({
    user: {
      _id: id,
      username,
      storeId: auth.storeId,
      userType: auth.userType,
    },
  });
});

module.exports = router;
