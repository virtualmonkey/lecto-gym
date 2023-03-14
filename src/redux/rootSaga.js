import { all, call } from 'redux-saga/effects';

import { authSagas } from './sagas/auth';
import { initialTestSagas } from './sagas/initialTest';

export default function* rootSaga() {
  yield all([call(authSagas), call(initialTestSagas)]);
};