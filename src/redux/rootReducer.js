import { combineReducers } from 'redux';

import auth, * as authSelectors from './auth/auth.reducer';
import timer, * as timerSelectors from './timer/timer.reducer';
import tests, * as testsSelectors from './tests/tests.reducer';
import weeks, * as weeksSelectors from './weeks/weeks.reducer';

const reducer = combineReducers({
  auth,
  timer,
  tests,
  weeks,
});

export default reducer;

export const getToken = state => authSelectors.getToken(state.auth);
export const getAuthUser = state => authSelectors.getAuthUser(state.auth);
export const getIsGettingUser = state => authSelectors.getIsGettingUser(state.auth);
export const getIsGettingUserError = state => authSelectors.getIsGettingUserError(state.auth);
export const getIsAuthenticating = state => authSelectors.getIsAuthenticating(state.auth);
export const getAuthenticatingError = state => authSelectors.getAuthenticatingError(state.auth);
export const isAuthenticated = state => authSelectors.getToken(state.auth) !== null;

export const getIsRunning = state => timerSelectors.getIsRunning(state.timer);
export const getElapsedTime = state => timerSelectors.getElapsedTime(state.timer);
export const getElapsedTimeInSeconds = state => timerSelectors.getElapsedTimeInSeconds(state.timer);

export const getSumbitTutorialError = state => testsSelectors.getSumbitTutorialError(state.tests);
export const getSumbitInitialTestError = state => testsSelectors.getSumbitInitialTestError(state.tests);

export const getWeek = (state, id) => weeksSelectors.getWeek(state.weeks, id);
export const getWeeks = state => weeksSelectors.getWeeks(state.weeks);
export const getIsFetchingWeeks = state => weeksSelectors.getIsFetchingWeeks(state.weeks);
export const getFetchingWeeksError = state => weeksSelectors.getFetchingWeeksError(state.weeks);
