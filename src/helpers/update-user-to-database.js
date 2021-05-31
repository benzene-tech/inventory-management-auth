const User = require('../models/user');

const updateUserToDatabase = async (userAttrs) => {
  // eslint-disable-next-line no-console
  await User.findOneAndUpdate(
    { username: userAttrs.username },
    { password: userAttrs.password }
  );
};

module.exports = updateUserToDatabase;
