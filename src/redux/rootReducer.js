import { combineReducers } from 'redux';

import auth, * as authSelectors from './auth/auth.reducer';
import timer, * as timerSelectors from './timer/timer.reducer';
import tests, * as testsSelectors from './tests/tests.reducer';
import weeks, * as weeksSelectors from './weeks/weeks.reducer';
import week, * as weekSelectors from './week/week.reducer';
import exercise, * as exerciseSelectors from './exercise/exercise.reducer';
import results, * as resultsSelectors from './results/results.reducer';

const reducer = combineReducers({
  auth,
  timer,
  tests,
  weeks,
  week,
  exercise,
  results,
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

export const getSubmitTutorialError = state => testsSelectors.getSubmitTutorialError(state.tests);
export const getSubmitInitialTestError = state => testsSelectors.getSubmitInitialTestError(state.tests);
export const getSubmitFinalTestError = state => testsSelectors.getSubmitFinalTestError(state.tests);

export const getWeek = (state, id) => weeksSelectors.getWeek(state.weeks, id);
export const getWeeks = state => weeksSelectors.getWeeks(state.weeks);
export const isWeekUnlocked = (state, id) => weeksSelectors.isWeekUnlocked(state.weeks, id);
export const isWeekCompleted = (state, id) => weeksSelectors.isWeekCompleted(state.weeks, id);
export const getIsFetchingWeeks = state => weeksSelectors.getIsFetchingWeeks(state.weeks);
export const getFetchingWeeksError = state => weeksSelectors.getFetchingWeeksError(state.weeks);

export const getWeekId = (state) => weekSelectors.getWeekId(state.week);
export const getExerciseById = (state, id) => weekSelectors.getExerciseById(state.week, id);
export const getExercisesFromArray = (state, array) => weekSelectors.getExercisesFromArray(state.week, array);
export const getDay = (state, id) => weekSelectors.getDay(state.week, id);
export const getIsDayUnlocked = (state, id) => weekSelectors.getIsDayUnlocked(state.week, id);
export const getIsDayCompleted = (state, id) => weekSelectors.getIsDayCompleted(state.week, id);
export const getDays = (state) => weekSelectors.getDays(state.week);
export const getIsFetchingWeek = (state) => weekSelectors.getIsFetchingWeek(state.week);
export const getFetchWeekError = (state) => weekSelectors.getFetchWeekError(state.week);

export const getExercise = (state) => exerciseSelectors.getExercise(state.exercise);
export const getIsFetchingExercise = (state) => exerciseSelectors.getIsFetchingExercise(state.exercise);
export const getFetchExerciseError = (state) => exerciseSelectors.getFetchExerciseError(state.exercise);
export const getIsProgressingExercise = (state) => exerciseSelectors.getIsProgressingExercise(state.exercise);
export const getProgressExerciseError = (state) => exerciseSelectors.getProgressExerciseError(state.exercise);

export const getInitialTestResult = (state) => resultsSelectors.getInitialTestResult(state.results);
export const getFinalTestResult = (state) => resultsSelectors.getFinalTestResult(state.results);
export const getImprovement = (state) => resultsSelectors.getImprovement(state.results);
export const getIsFetchingResults = (state) => resultsSelectors.getIsFetchingResults(state.results);
export const getFetchResultsError = (state) => resultsSelectors.getFetchResultsError(state.results);
