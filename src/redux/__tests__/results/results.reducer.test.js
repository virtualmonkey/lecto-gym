import * as types from '../../results/results.types';
import resultsReducer from '../../results/results.reducer';

describe('results reducer', () => {
  it('Should return default state', () => {
    const action = { type: 'dummy_action' };
    const initialState = {
      initialTest: null,
      finalTest: null,
      improvement: null,
      isFetchingResults: false,
      fetchResultsError: null,
    };

    expect(resultsReducer(undefined, action)).toEqual(initialState);
  });

  describe('initialTest subreducer', () => {
    it('Should return initialTest', () => {
      const action = {
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
      };

      expect(resultsReducer(undefined, action).initialTest).toEqual({
        id: 2,
        user_id: 1,
        words_percentage: 56,
        words_per_minute: 177,
        time: 153,
        type: 1,
        created_at: "2023-03-23T06:07:03.000000Z",
        updated_at: "2023-03-23T06:07:03.000000Z"
      });
    });
  });

  describe('finalTest subreducer', () => {
    it('Should return finalTest', () => {
      const action = {
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
      };

      expect(resultsReducer(undefined, action).finalTest).toEqual({
        id: 3,
        user_id: 1,
        words_percentage: 89,
        words_per_minute: 219,
        time: 104,
        type: 2,
        created_at: "2023-03-23T21:06:15.000000Z",
        updated_at: "2023-03-23T21:06:15.000000Z"
      });
    });
  });

  describe('improvement subreducer', () => {
    it('Should return improvement', () => {
      const action = {
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
      };

      expect(resultsReducer(undefined, action).improvement).toEqual({
        words_percentage: 58.92857142857143,
        words_per_minute: 23.728813559322035
      });
    });
  });

  describe('isFetchingResults subreducer', () => {
    it('Should return true', () => {
      const action = {
        type: types.FETCH_RESULTS_STARTED,
      };

      expect(resultsReducer(undefined, action).isFetchingResults).toEqual(true);
    });

    it('Should return false', () => {
      const action = {
        type: types.FETCH_RESULTS_FAILED,
        payload: { error: 'fetch results error' }
      };

      expect(resultsReducer(undefined, action).isFetchingResults).toEqual(false);
    });
  });

  describe('fetchResultsError subreducer', () => {
    it('Should return null', () => {
      const action = {
        type: types.FETCH_RESULTS_STARTED,
      };

      expect(resultsReducer(undefined, action).fetchResultsError).toEqual(null);
    });

    it('Should return error', () => {
      const action = {
        type: types.FETCH_RESULTS_FAILED,
        payload: { error: 'fetch results error' },
      };

      expect(resultsReducer(undefined, action).fetchResultsError).toEqual('fetch results error');
    });
  });
});