import {
  GET_PROJECTS,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_ERROR,
  GET_CLIENTS,
  GET_CLIENTS_SUCCESS,
  GET_CLIENTS_ERROR,
} from './constants';

export function getProjects(token) {
  return {
    type: GET_PROJECTS,
    token,
  };
}

export function getProjectsSuccess(projects) {
  return {
    type: GET_PROJECTS_SUCCESS,
    projects,
  };
}

export function getProjectsError(error) {
  return {
    type: GET_PROJECTS_ERROR,
    error,
  };
}

export function getClients(token) {
  return {
    type: GET_CLIENTS,
    token,
  };
}

export function getClientsSuccess(clients) {
  return {
    type: GET_CLIENTS_SUCCESS,
    clients,
  };
}

export function getClientsError(error) {
  return {
    type: GET_CLIENTS_ERROR,
    error,
  };
}
