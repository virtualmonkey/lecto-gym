import * as types from './exercise.types';
import { FETCH_WEEK_STARTED } from '../week/week.types'
import { combineReducers } from 'redux';

const data = (state = null, action) => {
  switch (action.type) {
    case types.FETCH_EXERCISE_COMPLETED: {
      return  {
        ...state,
        ...action.payload.exercise
      }
    }

    case types.PROGRESS_EXERCISE_COMPLETED: {
      return {
        ...state,
        isCompleted: true,
      }
    }

    case FETCH_WEEK_STARTED: {
      return null;
    }

    default:
      return state;
  }
};

const isFetchingExercise = (state = false, action) => {
  switch(action.type) {
    case types.FETCH_EXERCISE_STARTED: {
      return true;
    }
    case types.FETCH_EXERCISE_COMPLETED: {
      return false;
    }
    case types.FETCH_EXERCISE_FAILED: {
      return false;
    }

    default: {
      return false;
    }
  }
};

const fetchExerciseError = (state = null, action) => {
  switch(action.type) {
    case types.FETCH_EXERCISE_STARTED: {
      return null;
    }

    case types.FETCH_EXERCISE_COMPLETED:  {
      return null;
    }

    case types.FETCH_EXERCISE_FAILED: {
      return action.payload.error;
    }

    default:
      return state;
  }
};

const isProgressingExercise = (state = false, action) => {
  switch(action.type) {
    case types.PROGRESS_EXERCISE_STARTED: {
      return true;
    }
    case types.PROGRESS_EXERCISE_COMPLETED: {
      return false;
    }
    case types.PROGRESS_EXERCISE_FAILED: {
      return false;
    }

    default: {
      return false;
    }
  }
};

const progressExerciseError = (state = null, action) => {
  switch(action.type) {
    case types.PROGRESS_EXERCISE_STARTED: {
      return null;
    }

    case types.PROGRESS_EXERCISE_COMPLETED:  {
      return null;
    }

    case types.PROGRESS_EXERCISE_FAILED: {
      return action.payload.error;
    }

    default:
      return state;
  }
};

const exercise = combineReducers({
  data,
  isFetchingExercise,
  fetchExerciseError,
  isProgressingExercise,
  progressExerciseError
});

export default exercise;

export const getExercise = state => state.data ? state.data : null;
export const getIsFetchingExercise = state => state.isFetchingExercise;
export const getFetchExerciseError= state => state.fetchExerciseError;
export const getIsProgressingExercise = state => state.isProgressingExercise;
export const getProgressExerciseError = state => state.progressExerciseError;