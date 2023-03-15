import { all, call } from 'redux-saga/effects';

import { authSagas } from './sagas/auth';
import { initialTestSagas } from './sagas/initialTest';
import { tutorialSagas } from './sagas/tutorial';

export default function* rootSaga() {
  yield all([
    call(authSagas),
    call(initialTestSagas),
    call(tutorialSagas)
  ]);
};