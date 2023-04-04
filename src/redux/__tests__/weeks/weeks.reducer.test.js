import * as types from '../../weeks/weeks.types';
import weeksReducer from '../../weeks/weeks.reducer';

describe('weeks reducer', () => {
  it('Should return default state', () => {
    const action = { type: 'dummy_action' };
    const initialState = {
      byId: {},
      order: [],
      isFetchingWeeks: false,
      fetchWeeksError: null,
    };

    expect(weeksReducer(undefined, action)).toEqual(initialState);
  });

  describe('byId subreducer', () => {
    it('Should return byId', () => {
      const action = {
        type: types.FETCH_WEEKS_COMPLETED,
        payload: {
          entities: {
            1: {},
            2: {},
            3: {}
          },
          order: [1, 2, 3],
        },
      };

      expect(weeksReducer(undefined, action).byId).toEqual({
        1: {},
        2: {},
        3: {}
      });
    });
  });

  describe('order subreducer', () => {
    it('Should return order', () => {
      const action = {
        type: types.FETCH_WEEKS_COMPLETED,
        payload: {
          entities: {
            1: {},
            2: {},
            3: {}
          },
          order: [1, 2, 3],
        },
      };

      expect(weeksReducer(undefined, action).order).toEqual([1, 2, 3]);
    });
  });

  describe('isFetchingWeeks subreducer', () => {
    it('Should return true', () => {
      const action = {
        type: types.FETCH_WEEKS_STARTED,
      };

      expect(weeksReducer(undefined, action).isFetchingWeeks).toEqual(true);
    });

    it('Should return false', () => {
      const action = {
        type: types.FETCH_WEEKS_FAILED,
        payload: { error: 'fetch weeks error' }
      };

      expect(weeksReducer(undefined, action).isFetchingWeeks).toEqual(false);
    });
  });

  describe('fetchWeeksError subreducer', () => {
    it('Should return null', () => {
      const action = {
        type: types.FETCH_WEEKS_STARTED,
      };

      expect(weeksReducer(undefined, action).fetchWeeksError).toEqual(null);
    });

    it('Should return error', () => {
      const action = {
        type: types.FETCH_WEEKS_FAILED,
        payload: { error: 'fetch weeks error' },
      };

      expect(weeksReducer(undefined, action).fetchWeeksError).toEqual('fetch weeks error');
    });
  });
});