import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { normalize } from 'normalizr';

import { API_BASE_URL } from '../../utils/constants';
import * as actions from './week.actions';
import * as types from './week.types';
import * as schemas from './week.schemas';
import * as selectors from '../rootReducer';

const WEEK_API_ROUTE = `${API_BASE_URL}/week`;

export function* fetchWeek(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);

    if (isAuth) {
      const token = yield select(selectors.getToken);
      const response = yield call(
        fetch,
        `${WEEK_API_ROUTE}/${action.payload.id}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );

      if (response.status === 200) {
        const jsonResult = yield response.json();
        const normalizedData = normalize(jsonResult, schemas.week);
        const normalizedDays = normalize(normalizedData.entities.days, schemas.days);
        const normalizedExercises = normalize(normalizedData.entities.exercises, schemas.exercises);

        yield put(actions.completeFetchWeek(
          normalizedData.result,
          {
            entities: normalizedDays.entities.days,
            order: normalizedDays.result,
          },
          {
            entities: normalizedExercises.entities.exercises,
            order: normalizedExercises.result,
          }
        )
        );
      } else {
        yield put(actions.failFetchWeek("Failed to fetch week"))
      }
    }

  } catch (error) {
    yield put(actions.failFetchWeek(error.message))
  }
};

export function* watchFetchWeek() {
  yield takeLatest(types.FETCH_WEEK_STARTED, fetchWeek);
};

export function* weekSagas() {
  yield all([call(watchFetchWeek)]);
};