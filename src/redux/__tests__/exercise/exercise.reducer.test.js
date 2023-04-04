import * as types from '../../exercise/exercise.types';
import exerciseReducer from '../../exercise/exercise.reducer';

describe('exercise reducer', () => {
  it('Should return default state', () => {
    const action = { type: 'dummy_action' };
    const initialState = {
      data: null,
      isFetchingExercise: false,
      fetchExerciseError: null,
      isProgressingExercise: false,
      progressExerciseError: null,
    };

    expect(exerciseReducer(undefined, action)).toEqual(initialState);
  });

  describe('data subreducer', () => {
    it('Should return data with exercise', () => {
      const action = {
        type: types.FETCH_EXERCISE_COMPLETED,
        payload: {
          exercise: {
            id: 1,
            itemId: 2,
            name: 'Exercise 1',
            tools: 'Ninguna',
            type: 0,
            instructions: 'Realiza el ejercicio'
          }
        },
      };

      expect(exerciseReducer(undefined, action).data).toEqual({
        id: 1,
        itemId: 2,
        name: 'Exercise 1',
        tools: 'Ninguna',
        type: 0,
        instructions: 'Realiza el ejercicio'
      });
    });

    it('Should return exercise with isCompleted field true', () => {
      const action = {
        type: types.PROGRESS_EXERCISE_COMPLETED,
      };

      expect(exerciseReducer(undefined, action).data).toEqual({
        isCompleted: true,
      });
    });

    it('Should return null data', () => {
      const action = {
        type: 'FETCH_WEEK_STARTED',
      };

      expect(exerciseReducer(undefined, action).data).toEqual(null);
    });
  });

  describe('isFetchingExercise subreducer', () => {
    it('Should return true', () => {
      const action = {
        type: types.FETCH_EXERCISE_STARTED,
        payload: { id: 1 },
      };

      expect(exerciseReducer(undefined, action).isFetchingExercise).toEqual(true);
    });

    it('Should return false', () => {
      const action = {
        type: types.FETCH_EXERCISE_FAILED,
        payload: { error: 'fetch exercise error'}
      };

      expect(exerciseReducer(undefined, action).isFetchingExercise).toEqual(false);
    });
  });

  describe('fetchExerciseError subreducer', () => {
    it('Should return null', () => {
      const action = {
        type: types.FETCH_EXERCISE_STARTED,
        payload: { id: 1 },
      };

      expect(exerciseReducer(undefined, action).fetchExerciseError).toEqual(null);
    });

    it('Should return error', () => {
      const action = {
        type: types.FETCH_EXERCISE_FAILED,
        payload: { error: 'fetch exercise error' },
      };

      expect(exerciseReducer(undefined, action).fetchExerciseError).toEqual('fetch exercise error');
    });
  });

  describe('isProgressingExercise subreducer', () => {
    it('Should return true', () => {
      const action = {
        type: types.PROGRESS_EXERCISE_STARTED,
        payload: { id: 1, value: 20 },
      };

      expect(exerciseReducer(undefined, action).isProgressingExercise).toEqual(true);
    });

    it('Should return false', () => {
      const action = {
        type: types.PROGRESS_EXERCISE_FAILED,
        payload: { error: 'progress exercise error'}
      };

      expect(exerciseReducer(undefined, action).isProgressingExercise).toEqual(false);
    });
  });

  describe('progressExerciseError subreducer', () => {
    it('Should return null', () => {
      const action = {
        type: types.PROGRESS_EXERCISE_STARTED,
        payload: { id: 1, value: 20 },
      };

      expect(exerciseReducer(undefined, action).progressExerciseError).toEqual(null);
    });

    it('Should return error', () => {
      const action = {
        type: types.PROGRESS_EXERCISE_FAILED,
        payload: { error: 'progress exercise error' },
      };

      expect(exerciseReducer(undefined, action).progressExerciseError).toEqual('progress exercise error');
    });
  });
});