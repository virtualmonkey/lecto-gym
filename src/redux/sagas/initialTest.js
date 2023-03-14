import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { API_BASE_URL } from '../../utils/constants';
import * as authActions from '../actions/auth';
import * as actions from '../actions/initialTest';
import * as types from '../types/initialTest';
import * as selectors from '../rootReducer';

const SUBMIT_INITIAL_TEST_API_ROUTE = `${API_BASE_URL}/tests`;

export function* submitInitialTest(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);

    if (isAuth) {
      const token = yield select(selectors.getToken);
      const requestBody = {
        'words_percentage': action.payload.percentage,
        'words_per_minute': action.payload.wordsPerMinute,
        'time': action.payload.time,
        'type': action.payload.type
      };

      const response = yield call(
        fetch,
        `${SUBMIT_INITIAL_TEST_API_ROUTE}`,
        {
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      
      if (response.status === 201){
        const data = yield response.json();
        if (data) {
          yield put(actions.completeSubmitInitialTest());
          yield put(authActions.startGetUser(token))
        } else {
          yield put(actions.failSubmitInitialTest('Failed to submit initial test'));
        }
      } else {
        yield put(actions.failSubmitInitialTest('Failed to submit initial test'));
      }
    }
  } catch(error) {
    yield put(actions.failSubmitInitialTest(error))
  }
}

export function* watchSubmitInitialTest() {
  yield takeLatest(types.SUBMIT_INITIAL_TEST_STARTED, submitInitialTest);
}

export function* initialTestSagas() {
  yield all([call(watchSubmitInitialTest)]);
};