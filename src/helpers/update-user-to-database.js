const User = require('../models/user');

const updateUserToDatabase = async (userAttrs) => {
  await User.findOneAndUpdate(
    { username: userAttrs.username },
    { password: userAttrs.password }
  );
};

module.exports = updateUserToDatabase;
