import { all, call } from 'redux-saga/effects';

import { authSagas } from './auth/auth.sagas';
import { testsSagas } from './tests/tests.sagas';
import { weeksSagas } from './weeks/weeks.sagas';

export default function* rootSaga() {
  yield all([
    call(authSagas),
    call(testsSagas),
    call(weeksSagas),
  ]);
};