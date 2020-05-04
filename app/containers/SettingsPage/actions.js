import { GET_USERS, GET_USERS_SUCCESS, GET_USERS_ERROR } from './constants';

export function getUsers(token) {
  return {
    type: GET_USERS,
    token,
  };
}

export function getUsersSuccess(users) {
  return {
    type: GET_USERS_SUCCESS,
    users,
  };
}

export function getUsersError(error) {
  return {
    type: GET_USERS_ERROR,
    error,
  };
}
