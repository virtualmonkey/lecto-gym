import { all, call } from 'redux-saga/effects';

import { authSagas } from './auth/auth.sagas';
import { testsSagas } from './tests/tests.sagas';
import { weeksSagas } from './weeks/weeks.sagas';
import { weekSagas } from './week/week.sagas';
import { exerciseSagas } from './exercise/exercise.sagas';
import { resultsSagas } from './results/results.sagas';

export default function* rootSaga() {
  yield all([
    call(authSagas),
    call(testsSagas),
    call(weeksSagas),
    call(weekSagas),
    call(exerciseSagas),
    call(resultsSagas)
  ]);
};