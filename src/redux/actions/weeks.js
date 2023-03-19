import {
  FETCH_WEEKS_STARTED,
  FETCH_WEEKS_COMPLETED,
  FETCH_WEEKS_FAILED
} from '../types/weeks';

export const startFetchingWeeks = () => ({
  type: FETCH_WEEKS_STARTED,
});

export const completeFetchingWeeks = (entities, order) => ({
  type: FETCH_WEEKS_COMPLETED,
  payload: {
    entities,
    order
  },
});

export const failFetchingWeeks = (error) => ({
  type: FETCH_WEEKS_FAILED,
  payload: {
    error
  },
});