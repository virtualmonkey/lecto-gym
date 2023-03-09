import { all, call, put, takeLatest } from 'redux-saga/effects';

import * as actions from '../actions/auth';
import * as types from '../types/auth';

// TODO: change API route
const LOGIN_API_ROUTE = 'https://jsonplaceholder.typicode.com/users?id=1';
const SIGNUP_API_ROUTE = 'https://jsonplaceholder.typicode.com/users?id=1';

// TODO: fix the conditionals here to fit the shape of the data response
export function* signIn(action) {
  try {
    const requestBody = action.payload;
    const response = yield call(
      fetch,
      `${LOGIN_API_ROUTE}`,
      {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // TODO: check for the correct code
    if (response.status === 201) {
      const data = yield response.json();
      // TODO: check if the correct way to access response data is this
      if (data) {
        const authUser = data;
        yield put(actions.completeSignIn(authUser));
      } else {
        yield put(actions.failSignIn('Could not fetch user with given credentials'));
      }
    } else {
      // TODO: change error messages
      yield put(actions.failSignIn('Could not fetch user due to an API error'));
    }
  } catch (error) {
    yield put(actions.failSignIn(error));
  }
};

export function* signUp(action) {
  const requestBody = action.payload;

  try {
    const response = yield call(
      fetch,
      `${SIGNUP_API_ROUTE}`,
      {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    
    // TODO: check this conditionals based on api response
    if (response.status === 201) {
      const data = yield response.json();
      if (data) {
        const authUser = data;
        yield put(actions.completeSignUp(authUser));
      } else {
        yield put(actions.failSignUp('Could not sign up user in database'));
      }
    } else {
      // TODO: change error messages
      yield put(actions.failSignUp('Could not sign up user due to API error'));
    }

  } catch (error) {
    yield put(actions.failSignUp(error));
  };
};

export function* watchSignIn() {
  yield takeLatest(types.SIGNIN_USER_STARTED, signIn);
};

export function* watchSignUp() {
  yield takeLatest(types.SIGNUP_USER_STARTED, signUp);
}

export function* authSagas() {
  yield all([call(watchSignIn), call(watchSignUp)]);
};
