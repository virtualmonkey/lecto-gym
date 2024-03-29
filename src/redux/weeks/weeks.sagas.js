import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { normalize } from 'normalizr';

import { API_BASE_URL } from '../../utils/constants';
import * as actions from './weeks.actions';
import * as types from './weeks.types';
import * as schemas from './weeks.schemas';
import * as selectors from '../rootReducer';

const WEEKS_API_ROUTE = `${API_BASE_URL}/dashboard`;

export function* fetchWeeks(action){
  try {
    const isAuth = yield select(selectors.isAuthenticated);

    if (isAuth) {
      const token = yield select(selectors.getToken);
      const response = yield call(
        fetch,
        `${WEEKS_API_ROUTE}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );
      
      if (response.status === 200){
        const jsonResult = yield response.json();
        const {
          entities: { weeks },
          result,
        } = normalize(jsonResult, schemas.weeks);
        
        yield put(actions.completeFetchWeeks(weeks, result));
      } else {
        yield put(actions.failFetchWeeks("Failed to fetch weeks"))
      }
    }
  } catch (error) {
    yield put(actions.failFetchWeeks(error.message));
  }
};

export function* watchFetchWeeks() {
  yield takeLatest(types.FETCH_WEEKS_STARTED, fetchWeeks);
};

export function* weeksSagas() {
  yield all([call(watchFetchWeeks)]);
};