import * as types from '../tests/tests.types';
import testsReducer from '../tests/tests.reducer';

describe('tests reducer', () => {
  it('Should return default state', () => {
    const action = { type: 'dummy_action' };
    const initialState = {
      submitTutorialError: null,
      submitInitialTestError: null,
      submitFinalTestError: null,
    };

    expect(testsReducer(undefined, action)).toEqual(initialState);
  });

  describe('submitTutorialError subreducer', () => {
    it('Should return null', () => {
      const action = {
        type: types.SUBMIT_TUTORIAL_STARTED,
      };

      expect(testsReducer(undefined, action).submitTutorialError).toEqual(null);
    });

    it('Should return error', () => {
      const action = {
        type: types.SUBMIT_TUTORIAL_FAILED,
        payload: { error: 'submit tutorial error' },
      };

      expect(testsReducer(undefined, action).submitTutorialError).toEqual('submit tutorial error');
    });
  });

  describe('submitInitialTestError subreducer', () => {
    it('Should return null', () => {
      const action = {
        type: types.SUBMIT_INITIAL_TEST_STARTED,
      };

      expect(testsReducer(undefined, action).submitInitialTestError).toEqual(null);
    });

    it('Should return error', () => {
      const action = {
        type: types.SUBMIT_INITIAL_TEST_FAILED,
        payload: { error: 'submit initial test error' },
      };

      expect(testsReducer(undefined, action).submitInitialTestError).toEqual('submit initial test error');
    });
  });

  describe('submitFinalTestError subreducer', () => {
    it('Should return null', () => {
      const action = {
        type: types.SUBMIT_FINAL_TEST_STARTED,
      };

      expect(testsReducer(undefined, action).submitFinalTestError).toEqual(null);
    });

    it('Should return error', () => {
      const action = {
        type: types.SUBMIT_FINAL_TEST_FAILED,
        payload: { error: 'submit final test error' },
      };

      expect(testsReducer(undefined, action).submitFinalTestError).toEqual('submit final test error');
    });
  });
});