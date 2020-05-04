import { call, put, takeLatest } from 'redux-saga/effects';
import { getActionsSuccess, getActionsError } from './actions';
import { getActions } from './request';
import { GET_ACTION } from './constants';

export function* doGetActions(obj) {
  const requestURL = `http://localhost:3001/api/1.0/getActionForProject/${
    obj.projectId
  }`;
  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(getActions, requestURL, obj);
    yield put(getActionsSuccess(response));
  } catch (err) {
    yield put(getActionsError(err));
  }
}

export default function* nothing() {
  yield takeLatest(GET_ACTION, doGetActions);
}
