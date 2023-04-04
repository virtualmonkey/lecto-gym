import configureStore from 'redux-mock-store';

import * as types from '../../timer/timer.types';
import * as actions from '../../timer/timer.actions';

const mockStore = configureStore();
const store = mockStore();

describe('timer actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('Should start timer', () => {
    const expectedActions = [
      {
        type: types.START_TIMER,
      }
    ]

    store.dispatch(actions.startTimer());

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Should stop timer', () => {
    const expectedActions = [
      {
        type: types.STOP_TIMER,
      }
    ]

    store.dispatch(actions.stopTimer());

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Should reset timer', () => {
    const expectedActions = [
      {
        type: types.RESET_TIMER,
      }
    ]

    store.dispatch(actions.resetTimer());

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Should tick timer', () => {
    const expectedActions = [
      {
        type: types.TICK_TIMER,
        payload: { 
          newTime: 1,
        },
      }
    ]

    store.dispatch(actions.tickTimer(1));

    expect(store.getActions()).toEqual(expectedActions);
  });
});