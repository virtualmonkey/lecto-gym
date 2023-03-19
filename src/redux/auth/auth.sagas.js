import { all, call, put, takeLatest } from 'redux-saga/effects';
import { v4 as uuidv4 } from 'uuid';

import { API_BASE_URL } from '../../utils/constants';
import * as actions from './auth.actions';
import * as types from './auth.types';

const LOGIN_API_ROUTE = `${API_BASE_URL}/sanctum/token`;
const SIGNUP_API_ROUTE = `${API_BASE_URL}/register`;
const GET_USER_API_ROUTE = `${API_BASE_URL}/user`;

export function* getUser(action) {
  try {
    const response = yield call(
      fetch,
      `${GET_USER_API_ROUTE}`,
      {
        headers: {
          'Authorization': `Bearer ${action.payload.token}`,
        }
      }
    );

    if (response.status === 200) {
      const authUser = yield response.json();
      yield put(actions.completeGetUser(authUser));
    } else {
      yield put(actions.failGetUser('Could not get user with given token'));
    }
  } catch (error) {
    yield put(actions.failGetUser(error));
  }
}

export function* signIn(action) {
  const requestBody = { ...action.payload, device_name: uuidv4() };

  try {
    const response = yield call(
      fetch,
      `${LOGIN_API_ROUTE}`,
      {
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 200) {
      const { token } = yield response.json();

      if (token) {
        yield put(actions.completeSignIn(token));
        yield put(actions.startGetUser(token));
      } else {
        yield put(actions.failSignIn('Could not fetch user with given credentials'));
      }
    } else {
      yield put(actions.failSignIn('Could not fetch user due to an API error'));
    }
  } catch (error) {
    yield put(actions.failSignIn(error));
  }
};

export function* signUp(action) {
  const requestBody = {
    "name": action.payload.name,
    "email": action.payload.email,
    "password": action.payload.password,
    "password_confirmation": action.payload.passwordConfirmation
  };

  try {
    const response = yield call(
      fetch,
      `${SIGNUP_API_ROUTE}`,
      {
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 200) {
      const { token } = yield response.json();

      if (token) {
        yield put(actions.completeSignUp(token));
        yield put(actions.startGetUser(token));
      } else {
        yield put(actions.failSignUp('Could not sign up user in database'));
      }
    } else {
      yield put(actions.failSignUp('Could not sign up user due to API error'));
    }

  } catch (error) {
    yield put(actions.failSignUp(error));
  };
};

export function* watchGetUser() {
  yield takeLatest(types.GET_USER_STARTED, getUser);
}

export function* watchSignIn() {
  yield takeLatest(types.SIGNIN_USER_STARTED, signIn);
};

export function* watchSignUp() {
  yield takeLatest(types.SIGNUP_USER_STARTED, signUp);
}

export function* authSagas() {
  yield all([call(watchGetUser), call(watchSignIn), call(watchSignUp)]);
};
