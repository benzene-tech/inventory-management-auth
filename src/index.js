/* eslint-disable node/no-unpublished-require */
const mongoose = require('mongoose');
const { Subscriber } = require('@benzene-tech/inventory-management-core');
const app = require('./app');
const eventHandler = require('./events/event-handler');

const setupService = async () => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined!');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not defined!');
  }
  if (!process.env.RABBITMQ_URI) {
    throw new Error('RABBITMQ_URI is not defined!');
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

  const subscriber = await Subscriber.build(process.env.RABBITMQ_URI, 'auth');

  await subscriber.listenForEvents(eventHandler);

  app.listen(3000, () => {
    // eslint-disable-next-line no-console
    console.log('Auth Service up and running');
  });
};

setupService();
