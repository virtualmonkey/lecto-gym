import * as types from '../types/initialTest';
import { combineReducers } from 'redux';

const error = (state = null, action) => {
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
  error,
});

export const getSumbitInitialTestError = (state) => state.error;