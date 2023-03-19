import { all, call } from 'redux-saga/effects';

import { authSagas } from './sagas/auth';
import { initialTestSagas } from './sagas/initialTest';
import { tutorialSagas } from './sagas/tutorial';
import { weeksSagas } from './sagas/weeks';

export default function* rootSaga() {
  yield all([
    call(authSagas),
    call(initialTestSagas),
    call(tutorialSagas),
    call(weeksSagas),
  ]);
};