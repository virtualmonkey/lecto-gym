import * as types from './week.types';
import { indexOf } from 'lodash';

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

const id = (state = null, action) => {
  switch (action.type) {
    case types.FETCH_WEEK_COMPLETED: {
      return action.payload.id;
    }

    default: {
      return state;
    }
  }
};

const daysById = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_WEEK_COMPLETED: {
      const { entities, order } = action.payload.normalizedDays;
      const newState = {};
      order.forEach(id => {
        newState[id] = {
          ...entities[id],
        };
      });
      return newState;
    }

    default: {
      return state;
    }
  }
};

const daysOrder = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_WEEK_COMPLETED: {
      const { order } = action.payload.normalizedDays;
      return [...order];
    }

    default: {
      return state;
    }
  }
};

const exercisesById = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_WEEK_COMPLETED: {
      const { entities, order } = action.payload.normalizedExercises;
      const newState = {};
      order.forEach(id => {
        newState[id] = {
          ...entities[id],
        };
      });

      return newState;
    }

    default: {
      return state;
    }
  }
};

const exercisesOrder = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_WEEK_COMPLETED: {
      const { order } = action.payload.normalizedExercises;
      return [...order];
    }

    default: {
      return state;
    }
  }
};

const isFetchingWeek = (state = false, action) => {
  switch (action.type) {
    case types.FETCH_WEEK_STARTED: {
      return true;
    }
    case types.FETCH_WEEK_COMPLETED: {
      return false;
    }
    case types.FETCH_WEEK_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const fetchWeekError = (state = null, action) => {
  switch (action.type) {
    case types.FETCH_WEEK_FAILED: {
      return action.payload.error;
    }
    case types.FETCH_WEEK_STARTED: {
      return null;
    }
    case types.FETCH_WEEK_COMPLETED: {
      return null;
    }
    default: {
      return state;
    }
  }
};

const week = (state = initialState, action) => {
  return {
    id: id(state.id, action),
    days: {
      byId: daysById(state.days.byId, action),
      order: daysOrder(state.days.order, action)
    },
    exercises: {
      byId: exercisesById(state.exercises.byId, action),
      order: exercisesOrder(state.exercises.order, action)
    },
    isFetchingWeek: isFetchingWeek(state.isFetchingWeek, action),
    fetchWeekError: fetchWeekError(state.fetchWeekError, action)
  }
};

export const getWeekId = (state) => state.id;
export const getExercise = (state, id) => state.exercises.byId[id];
export const getExercisesFromArray = (state, array) => array.map(id => getExercise(state, id))
export const getDay = (state, id) => ({
  ...state.days.byId[id],
  exercises: getExercisesFromArray(state, state.days.byId[id].exercises),
});
export const getIsDayUnlocked = (state, id) => {
  const dayOrderIndex = indexOf(state.days.order, id);
  if (dayOrderIndex > 0) {
    const exercises = getDay(state, state.days.order[dayOrderIndex-1]).exercises;
    for (const exercise of exercises) if (exercise.progression !== 3) return false;
  }
  return true;
}
export const getIsDayCompleted = (state, id) => {
  const exercises = getDay(state, id).exercises;
  for (const exercise of exercises) if (exercise.progression !== 3) return false;
  return true;
}
export const getDays = (state) => state.days.order.map(id => getDay(state, id));
export const getIsFetchingWeek = (state) => state.isFetchingWeek;
export const getFetchWeekError = (state) => state.fetchWeekError;

export default week;