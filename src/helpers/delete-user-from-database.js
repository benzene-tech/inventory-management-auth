const User = require('../models/user');
const Auth = require('../models/auth');

const deleteUserFromDatabase = async (userAttrs) => {
  // eslint-disable-next-line no-console
  await User.findOneAndDelete({ username: userAttrs.username });
  await Auth.findOneAndDelete({ username: userAttrs.username });
};

module.exports = deleteUserFromDatabase;
