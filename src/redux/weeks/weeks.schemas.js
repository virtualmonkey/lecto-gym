import { schema } from 'normalizr';

export const week = new schema.Entity(
  'weeks',
);

export const weeks = new schema.Array(week);