const newUserEvent = (payload) => {
  return {
    eventName: 'NEW_USER_EVENT',
    payload,
  };
};

module.exports = newUserEvent;
