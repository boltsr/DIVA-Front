import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getProjectsSuccess,
  getProjectsError,
  getClientsSuccess,
  getClientsError,
} from './actions';
import { getClients, getProjects } from './request';
import { GET_CLIENTS, GET_PROJECTS } from './constants';

export function* doGetClients(obj) {
  const requestURL = 'http://localhost:3001/api/1.0/listClients';
  try {
    // Call our request helper (see 'utils/request')
    const clientsResponse = yield call(getClients, requestURL, obj);
    yield put(getClientsSuccess(clientsResponse));
  } catch (err) {
    yield put(getClientsError(err));
  }
}

export function* doGetProjects(obj) {
  const requestURL = 'http://localhost:3001/api/1.0/listProjects';
  try {
    // Call our request helper (see 'utils/request')
    const projectsResponse = yield call(getProjects, requestURL, obj);
    yield put(getProjectsSuccess(projectsResponse));
  } catch (err) {
    yield put(getProjectsError(err));
  }
}

export default function* nothing() {
  yield takeLatest(GET_PROJECTS, doGetProjects);
  yield takeLatest(GET_CLIENTS, doGetClients);
}
