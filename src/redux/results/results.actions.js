import {
  FETCH_RESULTS_STARTED,
  FETCH_RESULTS_FAILED,
  FETCH_RESULTS_COMPLETED
} from './results.types';

export const startFetchResults = () => ({
  type: FETCH_RESULTS_STARTED,
});

export const failFetchResults = error => ({
  type: FETCH_RESULTS_FAILED,
  payload: { error }
});

export const completeFetchResults = (initialTest, finalTest, improvement) => ({
  type: FETCH_RESULTS_COMPLETED,
  payload: { 
    initialTest,
    finalTest,
    improvement,
  }
});
