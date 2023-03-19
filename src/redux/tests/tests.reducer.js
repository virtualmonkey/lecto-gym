import * as types from './tests.types';
import { combineReducers } from 'redux';

const submitTutorialError = (state = null, action) => {
  switch (action.type) {
      case types.SUBMIT_TUTORIAL_FAILED: {
          return action.payload.error;
      }
      case types.SUBMIT_TUTORIAL_STARTED:
      case types.SUBMIT_TUTORIAL_COMPLETED: {
          return null;
      }
      default: {
          return state;
      }
  }
};

const submitInitialTestError = (state = null, action) => {
  switch (action.type) {
      case types.SUBMIT_INITIAL_TEST_FAILED: {
          return action.payload.error;
      }
      case types.SUBMIT_INITIAL_TEST_STARTED:
      case types.SUBMIT_INITIAL_TEST_COMPLETED: {
          return null;
      }
      default: {
          return state;
      }
  }
};

export default combineReducers({
  submitInitialTestError,
  submitTutorialError
});

export const getSumbitTutorialError = (state) => state.submitTutorialError;
export const getSumbitInitialTestError = (state) => state.submitInitialTestError;