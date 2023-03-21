import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { normalize } from 'normalizr';

import { API_BASE_URL } from '../../utils/constants';
import * as actions from './week.actions';
import * as types from './week.types';
import * as schemas from './week.schemas';
import * as selectors from '../rootReducer';

const WEEK_API_ROUTE = `${API_BASE_URL}/week`;

const normalizedDays = {
  entities: {
    1: {
      id: 1,
      name: "Día 1",
      exercises: [1, 2, 3, 4, 5]
    },
    2: {
      id: 2,
      name: "Día 2",
      exercises: [6, 7, 8, 9, 10]
    },
    3: {
      id: 3,
      name: "Día 3",
      exercises: [11, 12, 13, 14, 15]
    }
  },
  order: [1, 2, 3],
}

const normalizedExercises = {
  entities: {
    1: {
      id: 1,
      week: 1,
      day: 1,
      tool: "taquistoscopio",
      name: "Ejercicio 1",
      type: 0,
      progression: 3
    },
    2: {
      id: 2,
      week: 1,
      day: 1,
      tool: "taquistoscopio",
      name: "Ejercicio 2",
      type: 1,
      progression: 3
    },
    3: {
      id: 3,
      week: 1,
      day: 1,
      tool: "taquistoscopio",
      name: "Ejercicio 3",
      type: 2,
      progression: 3
    },
    4: {
      id: 4,
      week: 1,
      day: 1,
      tool: "taquistoscopio",
      name: "Ejercicio 4",
      type: 3,
      progression: 3
    },
    5: {
      id: 5,
      week: 1,
      day: 1,
      tool: "taquistoscopio",
      name: "Ejercicio 5",
      type: 4,
      progression: 3
    },
    6: {
      id: 6,
      week: 1,
      day: 2,
      tool: "taquistoscopio",
      name: "Ejercicio 1",
      type: 0,
      progression: 3
    },
    7: {
      id: 7,
      week: 1,
      day: 2,
      tool: "taquistoscopio",
      name: "Ejercicio 2",
      type: 0,
      progression: 3
    },
    8: {
      id: 8,
      week: 1,
      day: 2,
      tool: "taquistoscopio",
      name: "Ejercicio 3",
      type: 2,
      progression: 3
    },
    9: {
      id: 9,
      week: 1,
      day: 2,
      tool: "taquistoscopio",
      name: "Ejercicio 4",
      type: 3,
      progression: 3
    },
    10: {
      id: 10,
      week: 1,
      day: 2,
      tool: "taquistoscopio",
      name: "Ejercicio 5",
      type: 4,
      progression: 3
    },
    11: {
      id: 11,
      week: 1,
      day: 3,
      tool: "taquistoscopio",
      name: "Ejercicio 1",
      type: 0,
      progression: 0
    },
    12: {
      id: 12,
      week: 1,
      day: 3,
      tool: "taquistoscopio",
      name: "Ejercicio 2",
      type: 0,
      progression: 0
    },
    13: {
      id: 13,
      week: 1,
      day: 3,
      tool: "taquistoscopio",
      name: "Ejercicio 3",
      type: 2,
      progression: 0
    },
    14: {
      id: 14,
      week: 1,
      day: 3,
      tool: "taquistoscopio",
      name: "Ejercicio 4",
      type: 3,
      progression: 0
    },
    15: {
      id: 15,
      week: 1,
      day: 3,
      tool: "taquistoscopio",
      name: "Ejercicio 5",
      type: 4,
      progression: 0
    },
  },
  order: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
}

export function* fetchWeek(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);

    if (isAuth) {
      const token = yield select(selectors.getToken);
      const response = yield call(
        fetch,
        `${WEEK_API_ROUTE}/${action.payload.id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );

      if (response.status === 200) {
        const jsonResult = yield response.json();

        // console.log("jsonResult -> ", jsonResult)
        const normalizedData = normalize(jsonResult, schemas.week);
        // const normalizedDays = normalize(normalizedData.entities.days, schemas.days);
        // const normalizedExercises = normalize(normalizedData.entities.exercises, schemas.exercises);

        // console.log("normalizedData -> ", normalizedData)
        // console.log("normalizedDays -> ", normalizedDays)
        // console.log("normalizedExercises -> ", normalizedExercises)

        yield put(actions.completeFetchWeek(
          normalizedData.result,
          // TODO: change this to use normalizedDays.entities.days and result
          {
            entities: normalizedDays.entities,
            order: normalizedDays.order,
          },
          // TODO: change this to use normalizedExercises.entities.exercises and result
          {
            entities: normalizedExercises.entities,
            order: normalizedExercises.order,
          }
        )
        );
      } else {
        yield put(actions.failFetchWeek("Failed to fetch week"))
      }
    }

  } catch (error) {
    yield put(actions.failFetchWeek(error))
  }
};

export function* watchFetchWeek() {
  yield takeLatest(types.FETCH_WEEK_STARTED, fetchWeek);
};

export function* weekSagas() {
  yield all([call(watchFetchWeek)]);
};