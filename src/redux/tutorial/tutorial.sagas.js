import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { API_BASE_URL } from '../../utils/constants';
import * as authActions from '../auth/auth.actions';
import * as actions from './tutorial.actions';
import * as types from './tutorial.types';
import * as selectors from '../rootReducer';

const SUBMIT_TUTORIAL_API_ROUTE = `${API_BASE_URL}/tests`;

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
        `${SUBMIT_TUTORIAL_API_ROUTE}`,
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

export function* watchSubmitTutorial() {
  yield takeLatest(types.SUBMIT_TUTORIAL_STARTED, submitTutorial);
}

export function* tutorialSagas() {
  yield all([call(watchSubmitTutorial)]);
};