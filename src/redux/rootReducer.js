import { combineReducers } from 'redux';

import auth, * as authSelectors from './reducers/auth';
import timer, * as timerSelectors from './reducers/timer';
import initialTest, * as initialTestSelectors from './reducers/initialTest';
import tutorial, * as tutorialSelectors from './reducers/tutorial';
import weeks, * as weeksSelectors from './reducers/weeks';

const reducer = combineReducers({
  auth,
  timer,
  initialTest,
  tutorial,
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

export const getSumbitInitialTestError = state => initialTestSelectors.getSumbitInitialTestError(state.initialTest);

export const getSumbitTutorialError = state => tutorialSelectors.getSumbitTutorialError(state.tutorial);

export const getWeek = (state, id) => weeksSelectors.getWeek(state.weeks, id);
export const getWeeks = state => weeksSelectors.getWeeks(state.weeks);
export const getIsFetchingWeeks = state => weeksSelectors.getIsFetchingWeeks(state.weeks);
export const getFetchingWeeksError = state => weeksSelectors.getFetchingWeeksError(state.weeks);
