import * as types from '../week/week.types';
import weekReducer from '../week/week.reducer';

describe('week reducer', () => {
  it('Should return default state', () => {
    const action = { type: 'dummy_action' };
    const initialState = {
      id: null,
      days: {
        byId: {},
        order: []
      },
      exercises: {
        byId: {},
        order: []
      },
      isFetchingWeek: false,
      fetchWeekError: null,
    };

    expect(weekReducer(undefined, action)).toEqual(initialState);
  });

  describe('id subreducer', () => {
    it('Should return id', () => {
      const action = {
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
      };

      expect(weekReducer(undefined, action).id).toEqual(1);
    });
  });

  describe('daysById subreducer', () => {
    it('Should return daysById', () => {
      const action = {
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
      };

      expect(weekReducer(undefined, action).days.byId).toEqual({
        1: {},
        2: {},
        3: {}
      });
    });
  });

  describe('daysOrder subreducer', () => {
    it('Should return daysOrder', () => {
      const action = {
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
      };

      expect(weekReducer(undefined, action).days.order).toEqual([1, 2, 3]);
    });
  });

  describe('exercisesById subreducer', () => {
    it('Should return exercisesById', () => {
      const action = {
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
      };

      expect(weekReducer(undefined, action).exercises.byId).toEqual({
        1: {},
        2: {},
        3: {}
      });
    });
  });

  describe('exercisesOrder subreducer', () => {
    it('Should return exercisesOrder', () => {
      const action = {
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
      };

      expect(weekReducer(undefined, action).exercises.order).toEqual([1, 2, 3]);
    });
  });

  describe('isFetchingWeek subreducer', () => {
    it('Should return true', () => {
      const action = {
        type: types.FETCH_WEEK_STARTED,
        payload: { id: 1 }
      };

      expect(weekReducer(undefined, action).isFetchingWeek).toEqual(true);
    });

    it('Should return false', () => {
      const action = {
        type: types.FETCH_WEEK_FAILED,
        payload: { error: 'fetch week error' }
      };

      expect(weekReducer(undefined, action).isFetchingWeek).toEqual(false);
    });
  });

  describe('fetchWeekError subreducer', () => {
    it('Should return null', () => {
      const action = {
        type: types.FETCH_WEEK_STARTED,
        payload: { id: 1 }
      };

      expect(weekReducer(undefined, action).fetchWeekError).toEqual(null);
    });

    it('Should return error', () => {
      const action = {
        type: types.FETCH_WEEK_FAILED,
        payload: { error: 'fetch week error' },
      };

      expect(weekReducer(undefined, action).fetchWeekError).toEqual('fetch week error');
    });
  });
});