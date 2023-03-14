import {
  SUBMIT_INITIAL_TEST_STARTED,
  SUBMIT_INITIAL_TEST_FAILED,
  SUBMIT_INITIAL_TEST_COMPLETED,
} from '../types/initialTest';

export const startSubmitInitialTest = (percentage, time, wordsPerMinute, type = 1) => ({
  type: SUBMIT_INITIAL_TEST_STARTED,
  payload: { percentage, time, wordsPerMinute, type }
});

export const completeSubmitInitialTest = () => ({
  type: SUBMIT_INITIAL_TEST_COMPLETED,
});

export const failSubmitInitialTest = (error) => ({
  type: SUBMIT_INITIAL_TEST_FAILED,
  payload: { error }
});