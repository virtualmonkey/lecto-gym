import configureStore from 'redux-mock-store';

import * as types from '../../week/week.types';
import * as actions from '../../week/week.actions';

const mockStore = configureStore();
const store = mockStore();

describe('week actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('Should start fetch week', () => {
    const expectedActions = [
      {
        type: types.FETCH_WEEK_STARTED,
        payload: {
          id: 1,
        }
      }
    ]

    store.dispatch(actions.startFetchWeek(1));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Should complete fetch week', () => {
    const expectedActions = [
      {
        type: types.FETCH_WEEK_COMPLETED,
        payload: { 
          id: 1,
          normalizedDays: {
            entities: {
              1: {},
              2: {},
              3: {}
            },
            order: [1, 2, 3],
          },
          normalizedExercises: {
            entities: {
              1: {},
              2: {},
              3: {}
            },
            order: [1, 2, 3],
          },
        },
      }
    ]

    store.dispatch(actions.completeFetchWeek(
      1,
      {
        entities: {
          1: {},
          2: {},
          3: {}
        },
        order: [1, 2, 3],
      },
      {
        entities: {
          1: {},
          2: {},
          3: {}
        },
        order: [1, 2, 3],
      }
    ));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Should fail fetch week', () => {
    const expectedActions = [
      {
        type: types.FETCH_WEEK_FAILED,
        payload: { error:'fetch week error' },
      }
    ]

    store.dispatch(actions.failFetchWeek('fetch week error'));

    expect(store.getActions()).toEqual(expectedActions);
  });
});