import configureStore from 'redux-mock-store';

import * as types from '../exercise/exercise.types';
import * as actions from '../exercise/exercise.actions';

const mockStore = configureStore();
const store = mockStore();

describe('exercise actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('Should start fetch exercise', () => {
    const expectedActions = [
      {
        type: types.FETCH_EXERCISE_STARTED,
        payload: { id: 1 },
      }
    ]

    store.dispatch(actions.startFetchExercise(1));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Should complete fetch exercise', () => {
    const expectedActions = [
      {
        type: types.FETCH_EXERCISE_COMPLETED,
        payload: { 
         exercise : {
          id: 1,
          itemId: 2,
          name: 'Exercise 1',
          tools: 'Ninguna',
          type: 0,
          instructions: 'Realiza el ejercicio'
         }
        },
      }
    ]

    store.dispatch(actions.completeFetchExercise({
      id: 1,
      itemId: 2,
      name: 'Exercise 1',
      tools: 'Ninguna',
      type: 0,
      instructions: 'Realiza el ejercicio'
    }));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Should fail fetch exercise', () => {
    const expectedActions = [
      {
        type: types.FETCH_EXERCISE_FAILED,
        payload: { error:'fetch exercise error' },
      }
    ]

    store.dispatch(actions.failFetchExercise('fetch exercise error'));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Should start progress exercise', () => {
    const expectedActions = [
      {
        type: types.PROGRESS_EXERCISE_STARTED,
        payload: {
          id: 1,
          value: 1,
        },
      }
    ]

    store.dispatch(actions.startProgressExercise(1, 1));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Should complete progress exercise', () => {
    const expectedActions = [
      {
        type: types.PROGRESS_EXERCISE_COMPLETED,
      }
    ]

    store.dispatch(actions.completeProgressExercise());

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Should fail progress exercise', () => {
    const expectedActions = [
      {
        type: types.PROGRESS_EXERCISE_FAILED,
        payload: { error:'progress exercise error' },
      }
    ]

    store.dispatch(actions.failProgressExercise('progress exercise error'));

    expect(store.getActions()).toEqual(expectedActions);
  });
});