import {
  GET_ACTION,
  GET_ACTION_SUCCESS,
  GET_ACTION_ERROR,
  HEADER_COLLAPSED,
} from './constants';

export function getActions(token, projectId) {
  return {
    type: GET_ACTION,
    token,
    projectId,
  };
}

export function getActionsSuccess(actions) {
  return {
    type: GET_ACTION_SUCCESS,
    actions,
  };
}

export function getActionsError(error) {
  return {
    type: GET_ACTION_ERROR,
    error,
  };
}

export function setHeaderCollapsed(collapsed) {
  return {
    type: HEADER_COLLAPSED,
    collapsed,
  };
}
