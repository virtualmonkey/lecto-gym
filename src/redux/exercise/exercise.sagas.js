import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { API_BASE_URL } from '../../utils/constants';
import * as authActions from '../auth/auth.actions';
import * as actions from './exercise.actions';
import * as types from './exercise.types';
import * as selectors from '../rootReducer';

const ITEMS_API_ROUTE = `${API_BASE_URL}/items`;
const PROGRESS_EXERCISE_API_ROUTE = `${API_BASE_URL}/progress`;

export function* fetchExercise(action){
  try {
    const isAuth = yield select(selectors.isAuthenticated);

    if (isAuth) {
      const token = yield select(selectors.getToken);
      const response = yield call(
        fetch,
        `${ITEMS_API_ROUTE}/${action.payload.id}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );

      if (response.status === 200) {
        const exercise = yield response.json();

        const modifiedExercise = {
          ...exercise,
          isCompleted: false,
        }

        yield put(actions.completeFetchExercise(modifiedExercise));
      } else {
        yield put(actions.failFetchExercise("Failed to fetch exercise"));
      }
    }
  } catch (error) {
    yield put(actions.failFetchExercise(error.message));
  }
}

export function* progressExercise(action){
  try {
    const isAuth = yield select(selectors.isAuthenticated);

    if (isAuth) {
      const token = yield select(selectors.getToken);
      const response = yield call(
        fetch,
        `${PROGRESS_EXERCISE_API_ROUTE}`,
        {
          method: 'POST',
          body: JSON.stringify(action.payload),
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );

      if (response.status === 200) {
        const data = yield response.json();

        if (data) {
          yield put(actions.completeProgressExercise());
          yield put(authActions.startGetUser(token));
        }
      } else {
        yield put(actions.failProgressExercise("Failed to submit result"));
      }
    }
  } catch (error) {
    yield put(actions.failProgressExercise(error.message));
  }
}

export function* watchProgressExercise() {
  yield takeLatest(types.PROGRESS_EXERCISE_STARTED, progressExercise);
};

export function* watchFetchExercise() {
  yield takeLatest(types.FETCH_EXERCISE_STARTED, fetchExercise);
};

export function* exerciseSagas() {
  yield all([call(watchFetchExercise), call(watchProgressExercise)]);
};