import { combineReducers } from 'redux';
import * as types from '../types/timer';

const time = (state = 0, action) => {
  switch (action.type) {
    case (types.RESET_TIMER): {
      return 0
    }

    case (types.TICK_TIMER): {
      return action.payload.newTime
    }

    default:
      return state
  }
};

const isRunning = (state = null, action) => {
  switch (action.type) {
    case types.START_TIMER: {
      return true
    }

    case types.STOP_TIMER: {
      return false
    }

    case types.RESET_TIMER: {
      return false
    }

    default:
      return state
  }
};

const timer = combineReducers({
  time,
  isRunning,
});

export default timer;

export const getIsRunning = state => state.isRunning;
export const getElapsedTime = state => state.time;
export const getElapsedTimeInSeconds = state => Math.floor(state.time/1000);

