import { call, put, takeLatest } from 'redux-saga/effects';
import {
  loginSuccess,
  loginError,
  refreshError,
  logoutSuccess,
  updateUserProfileSuccess,
  updateUserProfileError,
  updateUserPasswordSuccess,
  updateUserPasswordError,
} from './actions';
import {
  login,
  refreshToken,
  invalidateToken,
  updateUserProfile,
  updateUserPassword,
} from './request';
import {
  DO_LOGIN,
  DO_REFRESH,
  DO_LOGOUT,
  UPDATE_USER_PROFILE,
  UPDATE_USER_PASSWORD,
} from './constants';

export function* doLogin(obj) {
  const requestURL = 'http://localhost:3001/api/1.0/login';
  try {
    // Call our request helper (see 'utils/request')
    const loginResponse = yield call(login, requestURL, obj);
    yield put(loginSuccess(loginResponse));
  } catch (err) {
    yield put(loginError(err));
  }
}

export function* doRefreshToken(obj) {
  const requestURL = 'http://localhost:3001/api/1.0/refreshToken';
  try {
    // Call our request helper (see 'utils/request')
    const refreshResponse = yield call(refreshToken, requestURL, obj);
    yield put(loginSuccess(refreshResponse));
  } catch (err) {
    yield put(refreshError(err));
  }
}

export function* doInvalidateToken(obj) {
  const requestURL = 'http://localhost:3001/api/1.0/invalidateToken';
  try {
    // Call our request helper (see 'utils/request')
    const invalidateResponse = yield call(invalidateToken, requestURL, obj);
    yield put(logoutSuccess(invalidateResponse));
  } catch (err) {
    yield put(logoutSuccess());
  }
}

export function* doUpdateUserProfile(obj) {
  const requestURL = 'http://localhost:3001/api/1.0/updateUserProfile';
  try {
    // Call our request helper (see 'utils/request')
    const updateResponse = yield call(updateUserProfile, requestURL, obj);
    yield put(updateUserProfileSuccess(updateResponse));
  } catch (err) {
    yield put(updateUserProfileError(err));
  }
}

export function* doUpdateUserPassword(obj) {
  const requestURL = 'http://localhost:3001/api/1.0/updateUserPassword';
  try {
    // Call our request helper (see 'utils/request')
    const updateResponse = yield call(updateUserPassword, requestURL, obj);
    yield put(updateUserPasswordSuccess(updateResponse));
  } catch (err) {
    yield put(updateUserPasswordError(err));
  }
}

export default function* nothing() {
  yield takeLatest(DO_LOGIN, doLogin);
  yield takeLatest(DO_REFRESH, doRefreshToken);
  yield takeLatest(DO_LOGOUT, doInvalidateToken);
  yield takeLatest(UPDATE_USER_PROFILE, doUpdateUserProfile);
  yield takeLatest(UPDATE_USER_PASSWORD, doUpdateUserPassword);
}
