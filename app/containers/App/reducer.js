import { fromJS } from 'immutable';

import {
  SET_JWT,
  SET_USER,
  IS_LOADING,
  DO_LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  DO_REFRESH,
  REFRESH_ERROR,
  DO_LOGOUT,
  LOGOUT_SUCCESS,
  UPDATE_USER_PROFILE,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_ERROR,
  UPDATE_USER_PASSWORD,
  UPDATE_USER_PASSWORD_SUCCESS,
  UPDATE_USER_PASSWORD_ERROR,
} from './constants';

import { loadState, saveState } from '../../utils/localState';

// load permanent states from session
const permState = loadState({
  token: '',
  user: null,
});

// merge permanent and volatile state
export const initialState = fromJS({
  isLoading: false,
  loginError: false,
  loginResponse: null,
  loggedIn: false,
  loggedOut: false,
  refreshError: false,
  updateUserProfileError: null,
  updateUserProfileResponse: null,
  updateUserPasswordError: null,
  updateUserPasswordResponse: null,
  ...permState,
});

function globalReducer(state = initialState, action) {
  let newState = state;
  switch (action.type) {
    // permanent states
    case SET_JWT:
      newState = state.set('token', action.token);
      break;
    case SET_USER:
      newState = state
        .set('user', fromJS(action.user))
        .set('updateUserProfileError', null)
        .set('updateUserProfileResponse', null);
      break;

    // volatile state
    case IS_LOADING:
      return state.set('isLoading', action.isLoading);
    case DO_LOGIN:
      return state
        .set('loginError', false)
        .set('loggedIn', false)
        .set('loggedOut', true)
        .set('isLoading', true);
    case LOGIN_SUCCESS:
      return state
        .set('loginError', false)
        .set('loggedIn', true)
        .set('isLoading', false)
        .set('loggedOut', false)
        .set('loginResponse', action.loginResponse);
    case LOGIN_ERROR:
      return state
        .set('loginError', true)
        .set('loggedIn', false)
        .set('loggedOut', true)
        .set('isLoading', false)
        .set('loginResponse', null);

    case DO_REFRESH:
      return state.set('loginError', false).set('loggedIn', false);
    case REFRESH_ERROR:
      return state
        .set('refreshError', true)
        .set('loggedIn', false)
        .set('loginError', false)
        .set('loginResponse', null);

    case DO_LOGOUT:
      return state
        .set('isLoading', true)
        .set('loginError', false)
        .set('loggedIn', false)
        .set('loggedOut', false)
        .set('loginResponse', null);
    case LOGOUT_SUCCESS:
      return state
        .set('isLoading', false)
        .set('loginError', false)
        .set('loginResponse', null)
        .set('loggedIn', false)
        .set('loggedOut', true);

    case UPDATE_USER_PROFILE:
      return state
        .set('isLoading', true)
        .set('updateUserProfileError', null)
        .set('updateUserProfileResponse', null);
    case UPDATE_USER_PROFILE_SUCCESS:
      return state
        .set('isLoading', false)
        .set('updateUserProfileError', null)
        .set('updateUserProfileResponse', action.updateResponse);
    case UPDATE_USER_PROFILE_ERROR:
      return state
        .set('isLoading', false)
        .set('updateUserProfileError', action.error)
        .set('updateUserProfileResponse', null);

    case UPDATE_USER_PASSWORD:
      return state
        .set('isLoading', true)
        .set('updateUserPasswordError', null)
        .set('updateUserPasswordResponse', null);
    case UPDATE_USER_PASSWORD_SUCCESS:
      return state
        .set('isLoading', false)
        .set('updateUserPasswordError', null)
        .set('updateUserPasswordResponse', action.updateResponse);
    case UPDATE_USER_PASSWORD_ERROR:
      return state
        .set('isLoading', false)
        .set('updateUserPasswordError', action.error)
        .set('updateUserPasswordResponse', null);

    default:
      return state;
  }

  // save current state to localStorage
  if (newState !== state) {
    saveState({
      token: newState.get('token'),
      user: newState.get('user'),
    });
  }

  return newState;
}

export default globalReducer;
