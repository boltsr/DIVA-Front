import { fromJS } from 'immutable';
import {
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_ERROR,
  GET_CLIENTS_SUCCESS,
  GET_CLIENTS_ERROR,
} from './constants';

export const initialState = fromJS({
  clients: null,
  getClientsError: null,
  projects: null,
  getProjectsrError: null,
});

function settingsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CLIENTS_SUCCESS:
      return state.set('clients', action.clients);
    case GET_CLIENTS_ERROR:
      return state.set('getClientsError', action.error);
    case GET_PROJECTS_SUCCESS:
      return state.set('projects', action.projects);
    case GET_PROJECTS_ERROR:
      return state.set('getProjectsError', action.error);
    default:
      return state;
  }
}

export default settingsReducer;
