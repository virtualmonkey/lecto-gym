import configureStore from 'redux-mock-store';

import * as types from '../results/results.types';
import * as actions from '../results/results.actions';

const mockStore = configureStore();
const store = mockStore();

describe('results actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('Should start fetch results', () => {
    const expectedActions = [
      {
        type: types.FETCH_RESULTS_STARTED,
      }
    ]

    store.dispatch(actions.startFetchResults());

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Should complete fetch results', () => {
    const expectedActions = [
      {
        type: types.FETCH_RESULTS_COMPLETED,
        payload: { 
          initialTest: {
            id: 2,
            user_id: 1,
            words_percentage: 56,
            words_per_minute: 177,
            time: 153,
            type: 1,
            created_at: "2023-03-23T06:07:03.000000Z",
            updated_at: "2023-03-23T06:07:03.000000Z"
          },
          finalTest: {
            id: 3,
            user_id: 1,
            words_percentage: 89,
            words_per_minute: 219,
            time: 104,
            type: 2,
            created_at: "2023-03-23T21:06:15.000000Z",
            updated_at: "2023-03-23T21:06:15.000000Z"
          },
          improvement: {
            words_percentage: 58.92857142857143,
            words_per_minute: 23.728813559322035
          }
        },
      }
    ]

    store.dispatch(actions.completeFetchResults(
      {
        id: 2,
        user_id: 1,
        words_percentage: 56,
        words_per_minute: 177,
        time: 153,
        type: 1,
        created_at: "2023-03-23T06:07:03.000000Z",
        updated_at: "2023-03-23T06:07:03.000000Z"
      },
      {
        id: 3,
        user_id: 1,
        words_percentage: 89,
        words_per_minute: 219,
        time: 104,
        type: 2,
        created_at: "2023-03-23T21:06:15.000000Z",
        updated_at: "2023-03-23T21:06:15.000000Z"
      },
      {
        words_percentage: 58.92857142857143,
        words_per_minute: 23.728813559322035
      }
    ));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Should fail fetch results', () => {
    const expectedActions = [
      {
        type: types.FETCH_RESULTS_FAILED,
        payload: { error:'fetch results error' },
      }
    ]

    store.dispatch(actions.failFetchResults('fetch results error'));

    expect(store.getActions()).toEqual(expectedActions);
  });
});