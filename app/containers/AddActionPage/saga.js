import { call, put, takeLatest } from 'redux-saga/effects';
import { getActionTypesSuccess, getActionTypesError } from './actions';
import { getActionTypes } from './request';
import { GET_ACTION_TYPES } from './constants';

export function* doGetActionTypes(obj) {
  const requestURL = 'http://localhost:3001/api/1.0/getActionTypes';
  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(getActionTypes, requestURL, obj);
    yield put(getActionTypesSuccess(response));
  } catch (err) {
    yield put(getActionTypesError(err));
  }
}

export default function* nothing() {
  yield takeLatest(GET_ACTION_TYPES, doGetActionTypes);
}
