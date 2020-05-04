import { fromJS } from 'immutable';
import { GET_USERS_SUCCESS, GET_USERS_ERROR } from './constants';

export const initialState = fromJS({
  users: null,
  getUserError: null,
});

function settingsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS_SUCCESS:
      return state.set('users', action.users);
    case GET_USERS_ERROR:
      return state.set('getUserError', action.error);
    default:
      return state;
  }
}

export default settingsReducer;
