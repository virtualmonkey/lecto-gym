import { combineReducers } from 'redux';

import auth, * as authSelectors from './reducers/auth';

const reducer = combineReducers({
  auth,
});

export default reducer;

export const getIsAuthenticating = state => authSelectors.getIsAuthenticating(state.auth);
export const getAuthenticatingError = state => authSelectors.getAuthenticatingError(state.auth);
export const getAuthUser = state => authSelectors.getAuthUser(state.auth);
export const getAuthUsername = state => authSelectors.getAuthUsername(state.auth);
export const isAuthenticated = state => getAuthUser(state) != null;
