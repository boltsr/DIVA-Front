export const loadState = (initialState, name = 'global') => {
  try {
    const serializedState = localStorage.getItem(name);
    if (serializedState === null) {
      return initialState;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return initialState;
  }
};

export const saveState = (state, name = 'global') => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(name, serializedState);
  } catch (err) {
    // ignore
  }
};
