const { checkAuth } = require('@benzene-tech/inventory-management-core');
const { Router } = require('express');

const router = Router();

router.post('/api/auth/sign-out', checkAuth, (req, res) => {
  res.clearCookie('jwt');

  res.status(200).send({ message: 'Sign out successful' });
});

module.exports = router;
