const logger = (store) => (next) => (action) => {
  console.group(action.type);
  console.log('The action: ', action);
  const returnValue = next(action); // dispatch the action (we update the state)
  console.log('The new state: ', store.getState()); // we access the state updated
  console.groupEnd();
  return returnValue;
};

export default logger;
