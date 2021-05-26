const updateUserToDatabase = require('../helpers/update-user-to-database');

const eventHandler = (_event) => {
  const event = JSON.parse(_event);

  switch (event.eventName) {
    case 'UPDATE_USER_EVENT':
      // eslint-disable-next-line no-console
      updateUserToDatabase(event.payload);
      break;
    default:
      break;
  }
};

module.exports = eventHandler;
