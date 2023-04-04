import * as types from '../../timer/timer.types';
import timerReducer from '../../timer/timer.reducer';

describe('timer reducer', () => {
  it('Should return default state', () => {
    const action = { type: 'dummy_action' };
    const initialState = {
      time: 0,
      isRunning: null,
    };

    expect(timerReducer(undefined, action)).toEqual(initialState);
  });

  describe('time subreducer', () => {
    it('Should return 0', () => {
      const action =       {
        type: types.RESET_TIMER,
      }

      expect(timerReducer(undefined, action).time).toEqual(0);
    });

    it('Should return new time', () => {
      const action =       {
        type: types.TICK_TIMER,
        payload: { newTime: 1 }
      }

      expect(timerReducer(undefined, action).time).toEqual(1);
    });
  });

  describe('isRunning subreducer', () => {
    it('Should return true', () => {
      const action = {
        type: types.START_TIMER,
      };

      expect(timerReducer(undefined, action).isRunning).toEqual(true);
    });

    it('Should return false', () => {
      const action = {
        type: types.STOP_TIMER,
      };

      expect(timerReducer(undefined, action).isRunning).toEqual(false);
    });
  });
});