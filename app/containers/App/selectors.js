import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectRouter = state => state.get('router');
const selectGlobal = state => state.get('global', initialState);

const makeSelectLocation = () =>
  createSelector(selectRouter, routerState =>
    routerState.get('location').toJS(),
  );

// perm state
const makeSelectJwt = () =>
  createSelector(selectGlobal, globalState => globalState.get('token'));
const makeSelectUser = () =>
  createSelector(selectGlobal, globalState => globalState.get('user').toJS());

// global loading indicator
const makeSelectIsLoading = () =>
  createSelector(selectGlobal, globalState => globalState.get('isLoading'));

// login & logout
const makeSelectLoggedIn = () =>
  createSelector(selectGlobal, loginState => loginState.get('loggedIn'));
const makeSelectLoginError = () =>
  createSelector(selectGlobal, loginState => loginState.get('loginError'));
const makeSelectLoginResponse = () =>
  createSelector(selectGlobal, loginState => loginState.get('loginResponse'));
const makeSelectRefreshError = () =>
  createSelector(selectGlobal, loginState => loginState.get('refreshError'));
const makeSelectLoggedOut = () =>
  createSelector(selectGlobal, loginState => loginState.get('loggedOut'));

// update user profile
const makeSelectUserProfileError = () =>
  createSelector(selectGlobal, loginState =>
    loginState.get('updateUserProfileError'),
  );
const makeSelectUserProfileResponse = () =>
  createSelector(selectGlobal, loginState =>
    loginState.get('updateUserProfileResponse'),
  );

// update user password
const makeSelectUserPasswordError = () =>
  createSelector(selectGlobal, loginState =>
    loginState.get('updateUserPasswordError'),
  );
const makeSelectUserPasswordResponse = () =>
  createSelector(selectGlobal, loginState =>
    loginState.get('updateUserPasswordResponse'),
  );

export {
  makeSelectJwt,
  makeSelectUser,
  selectGlobal,
  makeSelectLocation,
  makeSelectIsLoading,
  makeSelectLoginError,
  makeSelectLoggedIn,
  makeSelectLoggedOut,
  makeSelectLoginResponse,
  makeSelectRefreshError,
  makeSelectUserProfileError,
  makeSelectUserProfileResponse,
  makeSelectUserPasswordError,
  makeSelectUserPasswordResponse,
};
