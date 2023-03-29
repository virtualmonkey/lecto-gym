import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { API_BASE_URL } from '../../utils/constants';
import * as actions from './results.actions';
import * as types from './results.types';
import * as selectors from '../rootReducer';

const RESULTS_API_ROUTE = `${API_BASE_URL}/results`;

export function* fetchResults(action){
  try {
    const isAuth = yield select(selectors.isAuthenticated);

    if (isAuth) {
      const token = yield select(selectors.getToken);
      const response = yield call(
        fetch,
        `${RESULTS_API_ROUTE}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );

      if (response.status === 200) {
        const results = yield response.json();

        yield put(actions.completeFetchResults(
          results.initial_test,
          results.final_test,
          results.improvement
        ));
      } else {
        yield put(actions.failFetchResults("Failed to fetch results"));
      }
    }
  } catch (error) {
    yield put(actions.failFetchResults(error));
  }
};

export function* watchFetchResults() {
  yield takeLatest(types.FETCH_RESULTS_STARTED, fetchResults);
};

export function* resultsSagas() {
  yield all([call(watchFetchResults)]);
};
