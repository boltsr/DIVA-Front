import { call, put, takeLatest } from 'redux-saga/effects';
import { getUsersSuccess, getUsersError } from './actions';
import { getUsers } from './request';
import { GET_USERS } from './constants';

export function* doGetUsers(obj) {
  const requestURL = 'http://localhost:3001/api/1.0/listUsers';
  try {
    // Call our request helper (see 'utils/request')
    const userResponse = yield call(getUsers, requestURL, obj);
    yield put(getUsersSuccess(userResponse));
  } catch (err) {
    yield put(getUsersError(err));
  }
}

export default function* nothing() {
  yield takeLatest(GET_USERS, doGetUsers);
}
