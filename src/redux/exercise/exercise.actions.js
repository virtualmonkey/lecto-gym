import {
  FETCH_EXERCISE_STARTED,
  FETCH_EXERCISE_FAILED,
  FETCH_EXERCISE_COMPLETED,
  PROGRESS_EXERCISE_STARTED,
  PROGRESS_EXERCISE_FAILED,
  PROGRESS_EXERCISE_COMPLETED,
} from './exercise.types';

export const startFetchExercise = (id) => ({
  type: FETCH_EXERCISE_STARTED,
  payload: { id }
});

export const failFetchExercise = error => ({
  type: FETCH_EXERCISE_FAILED,
  payload: { error }
});

export const completeFetchExercise = (exercise) => ({
  type: FETCH_EXERCISE_COMPLETED,
  payload: { exercise }
});

// id in this action refers to the userItemId that relates a user and an item in the database
export const startProgressExercise = (id, value) => ({
  type: PROGRESS_EXERCISE_STARTED,
  payload: { id, value },
});

export const failProgressExercise = error => ({
  type: PROGRESS_EXERCISE_FAILED,
  payload: { error }
});

export const completeProgressExercise = () => ({
  type: PROGRESS_EXERCISE_COMPLETED,
});
