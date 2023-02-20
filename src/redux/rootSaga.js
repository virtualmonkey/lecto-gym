import { all, call } from 'redux-saga/effects';

import { authSagas } from './sagas/auth';

export default function* rootSaga() {
  yield all([call(authSagas)]);
};