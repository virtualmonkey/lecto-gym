import { schema } from 'normalizr';

export const exercise = new schema.Entity('exercises');
export const exercises = new schema.Array(exercise);

export const day = new schema.Entity('days', {
    exercises: exercises
  }
);
export const days = new schema.Array(day)

export const week = new schema.Entity('weeks', {
  days: days
})