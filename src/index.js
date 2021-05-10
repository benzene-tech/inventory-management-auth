const mongoose = require('mongoose');
const app = require('./app');

const setupService = async () => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined!');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not defined!');
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }

  app.listen(3000, () => {
    // eslint-disable-next-line no-console
    console.log('Auth Service up and running');
  });
};

setupService();
