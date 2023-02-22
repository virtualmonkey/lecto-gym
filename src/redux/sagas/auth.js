import { all, call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../actions/auth';
import * as types from '../types/auth';

// TODO: change API route
const LOGIN_API_ROUTE = 'https://63f3bee0fe3b595e2ee89e0a.mockapi.io/api/v1/login';

const SignInFromApi = (credentials) => {
  return axios.post(LOGIN_API_ROUTE, credentials);
};

// TODO: fix the conditionals here to fit the shape of the data response
export function* signIn(action){
  try {
    const userResponse = yield call(SignInFromApi, action.payload);
    // TODO: check for the correct code
    if (userResponse.status === 201) {
      // TODO: check if the correct way to access response data is this
      if (userResponse.data){
        const authUser = userResponse.data;
        yield put(actions.completeSignIn(authUser));
      } else {
        actions.failSignIn('Could not fetch user due to an API error');
      }
    } else {
      // TODO: change error messages
      actions.failSignIn('Could not fetch user with given credentials');
    }
  } catch (error) {
    yield put(actions.failSignIn(error));
  }
};

export function* watchSignIn() {
  yield takeLatest(types.SIGNIN_USER_STARTED, signIn);
};

export function* authSagas() {
  yield all([call(watchSignIn)]);
};
