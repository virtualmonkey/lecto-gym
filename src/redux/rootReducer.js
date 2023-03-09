import { combineReducers } from 'redux';

import auth, * as authSelectors from './reducers/auth';
import timer, * as timerSelectors from './reducers/timer';

const reducer = combineReducers({
  auth,
  timer,
});

export default reducer;

export const getIsAuthenticating = state => authSelectors.getIsAuthenticating(state.auth);
export const getAuthenticatingError = state => authSelectors.getAuthenticatingError(state.auth);
export const getAuthUser = state => authSelectors.getAuthUser(state.auth);
export const getAuthEmail = state => authSelectors.getAuthEmail(state.auth);
export const isAuthenticated = state => getAuthUser(state) != null;

export const getIsRunning = state => timerSelectors.getIsRunning(state.timer);
export const getElapsedTime = state => timerSelectors.getElapsedTime(state.timer);
export const getElapsedTimeInSeconds = state => timerSelectors.getElapsedTimeInSeconds(state.timer);
