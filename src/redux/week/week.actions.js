import {
  FETCH_WEEK_STARTED,
  FETCH_WEEK_COMPLETED,
  FETCH_WEEK_FAILED
} from './week.types';

export const startFetchWeek = (id) => ({
  type: FETCH_WEEK_STARTED,
  payload: { id }
});

export const completeFetchWeek = (id, normalizedDays, normalizedExercises) => ({
  type: FETCH_WEEK_COMPLETED,
  payload: {
    id,
    normalizedDays,
    normalizedExercises
  }
});

export const failFetchWeek = (error) => ({
  type: FETCH_WEEK_FAILED,
  payload: { error }
});