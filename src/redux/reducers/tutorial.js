import * as types from '../types/tutorial';
import { combineReducers } from 'redux';

const error = (state = null, action) => {
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

export default combineReducers({
  error,
});

export const getSumbitTutorialError = (state) => state.error;