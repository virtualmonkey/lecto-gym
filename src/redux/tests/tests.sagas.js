import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { API_BASE_URL } from '../../utils/constants';
import * as authActions from '../auth/auth.actions';
import * as actions from './tests.actions';
import * as types from './tests.types';
import * as selectors from '../rootReducer';

const TESTS_API_ROUTE = `${API_BASE_URL}/tests`;

export function* submitTutorial(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);

    if (isAuth) {
      const token = yield select(selectors.getToken);
      const requestBody = {
        'words_percentage': 0,
        'words_per_minute': 0,
        'time': 0,
        'type': 0
      };

      const response = yield call(
        fetch,
        `${TESTS_API_ROUTE}`,
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
          yield put(actions.completeSubmitTutorial());
          yield put(authActions.startGetUser(token))
        } else {
          yield put(actions.failSubmitTutorial('Failed to submit tutorial'));
        }
      } else {
        yield put(actions.failSubmitTutorial('Failed to submit tutorial'));
      }
    }
  } catch(error) {
    yield put(actions.failSubmitTutorial(error))
  }
}

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
        `${TESTS_API_ROUTE}`,
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

export function* submitFinalTest(action) {
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
        `${TESTS_API_ROUTE}`,
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
          yield put(actions.completeSubmitFinalTest());
          yield put(authActions.startGetUser(token))
        } else {
          yield put(actions.failSubmitFinalTest('Failed to submit final test'));
        }
      } else {
        yield put(actions.failSubmitFinalTest('Failed to submit final test'));
      }
    }
  } catch(error) {
    yield put(actions.failSubmitFinalTest(error))
  }
}

export function* watchSubmitTutorial() {
  yield takeLatest(types.SUBMIT_TUTORIAL_STARTED, submitTutorial);
}

export function* watchSubmitInitialTest() {
  yield takeLatest(types.SUBMIT_INITIAL_TEST_STARTED, submitInitialTest);
}

export function* watchSubmitFinalTest() {
  yield takeLatest(types.SUBMIT_FINAL_TEST_STARTED, submitFinalTest);
}

export function* testsSagas() {
  yield all([call(watchSubmitTutorial), call(watchSubmitInitialTest), call(watchSubmitFinalTest)]);
};