import configureStore from 'redux-mock-store';

import * as types from '../tests/tests.types';
import * as actions from '../tests/tests.actions';

const mockStore = configureStore();
const store = mockStore();

describe('tests actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('Should start submit tutorial', () => {
    const expectedActions = [
      {
        type: types.SUBMIT_TUTORIAL_STARTED,
      }
    ]

    store.dispatch(actions.startSubmitTutorial());

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Should complete submit tutorial', () => {
    const expectedActions = [
      {
        type: types.SUBMIT_TUTORIAL_COMPLETED,
      }
    ]

    store.dispatch(actions.completeSubmitTutorial());

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Should fail submit tutorial', () => {
    const expectedActions = [
      {
        type: types.SUBMIT_TUTORIAL_FAILED,
        payload: { error:'submit tutorial error' },
      }
    ]

    store.dispatch(actions.failSubmitTutorial('submit tutorial error'));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Should start submit initial test', () => {
    const expectedActions = [
      {
        type: types.SUBMIT_INITIAL_TEST_STARTED,
        payload: {
          percentage: 85,
          time: 100,
          wordsPerMinute: 50,
          type: 1
        }
      }
    ]

    store.dispatch(actions.startSubmitInitialTest(85, 100, 50, 1));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Should complete submit initial test', () => {
    const expectedActions = [
      {
        type: types.SUBMIT_INITIAL_TEST_COMPLETED,
      }
    ]

    store.dispatch(actions.completeSubmitInitialTest());

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Should fail submit initial test', () => {
    const expectedActions = [
      {
        type: types.SUBMIT_INITIAL_TEST_FAILED,
        payload: { error:'submit initial test error' },
      }
    ]

    store.dispatch(actions.failSubmitInitialTest('submit initial test error'));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Should start submit final test', () => {
    const expectedActions = [
      {
        type: types.SUBMIT_FINAL_TEST_STARTED,
        payload: {
          percentage: 85,
          time: 100,
          wordsPerMinute: 50,
          type: 1
        }
      }
    ]

    store.dispatch(actions.startSubmitFinalTest(85, 100, 50, 1));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Should complete submit final test', () => {
    const expectedActions = [
      {
        type: types.SUBMIT_FINAL_TEST_COMPLETED,
      }
    ]

    store.dispatch(actions.completeSubmitFinalTest());

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Should fail submit final test', () => {
    const expectedActions = [
      {
        type: types.SUBMIT_FINAL_TEST_FAILED,
        payload: { error:'final test test error' },
      }
    ]

    store.dispatch(actions.failSubmitFinalTest('final test test error'));

    expect(store.getActions()).toEqual(expectedActions);
  });
});