import configureStore from 'redux-mock-store';

import * as types from '../../weeks/weeks.types';
import * as actions from '../../weeks/weeks.actions';

const mockStore = configureStore();
const store = mockStore();

describe('weeks actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('Should start fetch weeks', () => {
    const expectedActions = [
      {
        type: types.FETCH_WEEKS_STARTED,
      }
    ]

    store.dispatch(actions.startFetchWeeks());

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Should complete fetch weeks', () => {
    const expectedActions = [
      {
        type: types.FETCH_WEEKS_COMPLETED,
        payload: {
          entities: {
            1: {},
            2: {},
            3: {}
          },
          order: [1, 2, 3],
        },
      }
    ]

    store.dispatch(actions.completeFetchWeeks(
      {
        1: {},
        2: {},
        3: {}
      },
      [1, 2, 3]
    ));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Should fail fetch weeks', () => {
    const expectedActions = [
      {
        type: types.FETCH_WEEKS_FAILED,
        payload: { error: 'fetch weeks error' },
      }
    ]

    store.dispatch(actions.failFetchWeeks('fetch weeks error'));

    expect(store.getActions()).toEqual(expectedActions);
  });
});