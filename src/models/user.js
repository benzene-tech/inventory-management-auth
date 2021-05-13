const mongoose = require('mongoose');
const Password = require('../services/password');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre('save', async function hashPassword(done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

userSchema.statics.build = (attrs) => {
  // eslint-disable-next-line no-use-before-define
  return new User(attrs);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
