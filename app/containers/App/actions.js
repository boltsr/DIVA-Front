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

/**
 * Dispatched to save JWT (from server) to localStore
 *
 * @param  {string} token
 * @return {object} An action object with a type of IS_LOADING
 */
export function setJwt(token) {
  return {
    type: SET_JWT,
    token,
  };
}

/**
 * Dispatched to save User object (from server) to localStore
 *
 * @param  {object} user
 * @return {object} An action object with a type of IS_LOADING
 */
export function setUser(user) {
  return {
    type: SET_USER,
    user,
  };
}

/**
 * Dispatched on isLoading
 *
 * @param  {boolean} isLoading
 * @return {object} An action object with a type of IS_LOADING
 */
export function setLoading(isLoading) {
  return {
    type: IS_LOADING,
    isLoading,
  };
}

/**
 * Dispatch on login request
 *
 * @param  {string} user username for login
 * @param  {string} pass password for login
 * @return {object} An action object with a type of DO_LOGIN passing login credentials
 */
export function doLogin(user, pass) {
  return {
    type: DO_LOGIN,
    user,
    pass,
  };
}

/**
 * Dispatched when the login is processed
 *
 * @param  {object} loginResponse The JWT object (API response)
 * @return {object} An action object with a type of LOGIN_SUCCESS passing the JWT object
 */
export function loginSuccess(loginResponse) {
  return {
    type: LOGIN_SUCCESS,
    loginResponse,
  };
}

/**
 * Dispatched when the login fails
 *
 * @param  {object} error The error object from API
 * @return {object} An action object with a type of LOGIN_ERROR passing the error
 */
export function loginError(error) {
  return {
    type: LOGIN_ERROR,
    error,
  };
}

/**
 * Dispatched on refresh token request
 *
 * @param  {string} oldToken The current (old) JWT
 * @return {object} An action object with a type of REFRESH_TOKEN
 */
export function refreshToken(oldToken) {
  return {
    type: DO_REFRESH,
    oldToken,
  };
}

/**
 * Dispatched when refresh request resulted in an error
 *
 * @param  {object} error The error object from API
 * @return {object} An action object with a type of REFRESH_ERROR passing the error
 */
export function refreshError(error) {
  return {
    type: REFRESH_ERROR,
    error,
  };
}

/**
 * Dispatched logout
 *
 * @param {string} token invalidate a JWT
 * @return {object} An action object with a type of LOGOUT
 */
export function doLogout(token) {
  return {
    type: DO_LOGOUT,
    token,
  };
}

/**
 * Dispatched logout successfully executed
 *
 * @return {object} An action object with a type of LOGOUT_SUCCESS
 */
export function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS,
  };
}

/**
 * Dispatched to update users profile
 *
 * @param {object} user  User object { firstName, lastName, email .. }
 * @return {object} An action object with a type of UPDATE_USER_PROFILE
 */
export function updateUserProfile(token, user) {
  return {
    type: UPDATE_USER_PROFILE,
    token,
    user,
  };
}

/**
 * Dispatched update successfully executed
 *
 * @param {object} updateResponse
 * @return {object} An action object with a type of UPDATE_USER_PROFILE_SUCCESS
 */
export function updateUserProfileSuccess(updateResponse) {
  return {
    type: UPDATE_USER_PROFILE_SUCCESS,
    updateResponse,
  };
}

/**
 * Dispatched update failed
 *
 * @param {object} error
 * @return {object} An action object with a type of UPDATE_USER_PROFILE_ERROR
 */
export function updateUserProfileError(error) {
  return {
    type: UPDATE_USER_PROFILE_ERROR,
    error,
  };
}

/**
 * Dispatched to update users password
 *
 * @param {string} password
 * @return {object} An action object with a type of UPDATE_USER_PASSWORD
 */
export function updateUserPassword(token, password) {
  return {
    type: UPDATE_USER_PASSWORD,
    token,
    password,
  };
}

/**
 * Dispatched update successfully executed
 *
 * @param {object} updateResponse
 * @return {object} An action object with a type of LOGOUT_SUCCESS
 */
export function updateUserPasswordSuccess(updateResponse) {
  return {
    type: UPDATE_USER_PASSWORD_SUCCESS,
    updateResponse,
  };
}

/**
 * Dispatched update failed
 *
 * @param {object} error
 * @return {object} An action object with a type of UPDATE_USER_PROFILE_ERROR
 */
export function updateUserPasswordError(error) {
  return {
    type: UPDATE_USER_PASSWORD_ERROR,
    error,
  };
}
