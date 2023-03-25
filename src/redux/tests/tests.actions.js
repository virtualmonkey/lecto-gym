import {
  SUBMIT_TUTORIAL_STARTED,
  SUBMIT_TUTORIAL_FAILED,
  SUBMIT_TUTORIAL_COMPLETED,
  SUBMIT_INITIAL_TEST_STARTED,
  SUBMIT_INITIAL_TEST_FAILED,
  SUBMIT_INITIAL_TEST_COMPLETED,
  SUBMIT_FINAL_TEST_STARTED,
  SUBMIT_FINAL_TEST_FAILED,
  SUBMIT_FINAL_TEST_COMPLETED
} from './tests.types';

export const startSubmitTutorial = () => ({
  type: SUBMIT_TUTORIAL_STARTED,
});

export const completeSubmitTutorial = () => ({
  type: SUBMIT_TUTORIAL_COMPLETED,
});

export const failSubmitTutorial = (error) => ({
  type: SUBMIT_TUTORIAL_FAILED,
  payload: { error }
});

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

export const startSubmitFinalTest = (percentage, time, wordsPerMinute, type = 2) => ({
  type: SUBMIT_FINAL_TEST_STARTED,
  payload: { percentage, time, wordsPerMinute, type }
});

export const failSubmitFinalTest = (error) => ({
  type: SUBMIT_FINAL_TEST_FAILED,
  payload: { error }
});

export const completeSubmitFinalTest = () => ({
  type: SUBMIT_FINAL_TEST_COMPLETED,
});
