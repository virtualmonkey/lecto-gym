import { all, call } from 'redux-saga/effects';

import { authSagas } from './auth/auth.sagas';
import { initialTestSagas } from './initialTest/initialTest.sagas';
import { tutorialSagas } from './tutorial/tutorial.sagas';
import { weeksSagas } from './weeks/weeks.sagas';

export default function* rootSaga() {
  yield all([
    call(authSagas),
    call(initialTestSagas),
    call(tutorialSagas),
    call(weeksSagas),
  ]);
};