const { checkAuth } = require('@benzene-tech/inventory-management-core');
const { Router } = require('express');
const jwt = require('jsonwebtoken');

const router = Router();

router.get('/api/auth/current-user', checkAuth, (req, res) => {
  const bearerToken = req.headers.authorization.split(' ')[1];

  const { id, username } = jwt.decode(bearerToken, process.env.JWT_SECRET);

  res.status(200).send({ user: { _id: id, username } });
});

module.exports = router;
