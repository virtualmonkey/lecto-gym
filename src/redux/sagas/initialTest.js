import { all, call, put, takeLatest } from 'redux-saga/effects';

import * as actions from '../actions/initialTest';
import * as types from '../types/initialTest';

// TODO: change API route
const SUBMIT_INITIAL_TEST_API_ROUTE = 'https://jsonplaceholder.typicode.com/users?id=1';

// TODO: fix the conditionals here to fit the shape of the data response
export function* submitInitialTest(action) {
  try {
    const requestBody = action.payload;
    const response = yield call(
      fetch,
      `${SUBMIT_INITIAL_TEST_API_ROUTE}`,
      {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // TODO: check this conditionals based on api response
    if (response.status === 201){
      const data = yield response.json();
      if (data) {
        yield put(actions.completeSubmitInitialTest());
        // TODO: put editUser with changed field hasCompletedInitialTest
      }  else {
        yield put(actions.failSubmitInitialTest('Failed to submit initial test'));
      }
    } else {
      // TODO: change error messages
      yield put(actions.failSubmitInitialTest('Failed to submit initial test'));
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