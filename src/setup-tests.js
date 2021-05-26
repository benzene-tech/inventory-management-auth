const mongoose = require('mongoose');

beforeAll(async () => {
  process.env.JWT_SECRET = 'asdf';
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  process.env.MONGO_URI = 'mongodb://auth-mongo-svc:27017/auth';
  jest.setTimeout(1000 * 60 * 10);

  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
