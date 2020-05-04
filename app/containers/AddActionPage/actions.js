import {
  GET_ACTION_TYPES,
  GET_ACTION_TYPES_SUCCESS,
  GET_ACTION_TYPES_ERROR,
} from './constants';

export function getActionTypes(token) {
  return {
    type: GET_ACTION_TYPES,
    token,
  };
}

export function getActionTypesSuccess(actionTypes) {
  return {
    type: GET_ACTION_TYPES_SUCCESS,
    actionTypes,
  };
}

export function getActionTypesError(error) {
  return {
    type: GET_ACTION_TYPES_ERROR,
    error,
  };
}
