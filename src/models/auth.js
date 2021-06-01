const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  storeId: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
  },
});

authSchema.statics.build = (attrs) => {
  // eslint-disable-next-line no-use-before-define
  return new Auth(attrs);
};

const Auth = mongoose.model('Auth', authSchema);

module.exports = Auth;
