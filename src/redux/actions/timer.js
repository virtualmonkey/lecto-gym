import {
  START_TIMER,
  STOP_TIMER,
  RESET_TIMER,
  TICK_TIMER,
} from '../types/timer';

export const startTimer = () => ({
  type: START_TIMER,
});

export const stopTimer = () => ({
  type: STOP_TIMER,
});

export const resetTimer = () => ({
  type: RESET_TIMER,
});

export const tickTimer = (newTime) => ({
  type: TICK_TIMER,
  payload: {
    newTime: newTime
  }
});