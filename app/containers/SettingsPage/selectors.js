import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectSettings = state => state.get('settings', initialState);

// update user password
const makeSelectGetUsers = () =>
  createSelector(selectSettings, settingsState => settingsState.get('users'));

export { makeSelectGetUsers };
