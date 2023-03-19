import {
  FETCH_WEEKS_STARTED,
  FETCH_WEEKS_COMPLETED,
  FETCH_WEEKS_FAILED
} from './weeks.types';

export const startFetchWeeks = () => ({
  type: FETCH_WEEKS_STARTED,
});

export const completeFetchWeeks = (entities, order) => ({
  type: FETCH_WEEKS_COMPLETED,
  payload: {
    entities,
    order
  },
});

export const failFetchWeeks = (error) => ({
  type: FETCH_WEEKS_FAILED,
  payload: {
    error
  },
});