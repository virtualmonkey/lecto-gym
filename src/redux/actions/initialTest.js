import {
  SUBMIT_INITIAL_TEST_STARTED,
  SUBMIT_INITIAL_TEST_FAILED,
  SUBMIT_INITIAL_TEST_COMPLETED,
} from '../types/initialTest';

export const startSubmitInitialTest = ({ score, time, wpm, date }) => ({
  type: SUBMIT_INITIAL_TEST_STARTED,
  payload: { score, time, wpm, date }
});

export const completeSubmitInitialTest = () => ({
  type: SUBMIT_INITIAL_TEST_COMPLETED,
});

export const failSubmitInitialTest = (error) => ({
  type: SUBMIT_INITIAL_TEST_FAILED,
  payload: { error }
});