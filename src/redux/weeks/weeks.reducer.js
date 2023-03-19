import * as types from './weeks.types';
import { combineReducers } from 'redux';

const byId = (state = {}, action) => {
  switch(action.type) {
    case types.FETCH_WEEKS_COMPLETED: {
      const { entities, order } = action.payload;
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

const order = (state = [], action) => {
  switch(action.type) {
    case types.FETCH_WEEKS_COMPLETED: {
      const { order } = action.payload;
      return [...order];
    }

    default: {
      return state;
    }
  }
};

const isFetchingWeeks = (state = false, action) => {
  switch(action.type) {
    case types.FETCH_WEEKS_STARTED: {
      return true;
    }
    case types.FETCH_WEEKS_COMPLETED: {
      return false;
    }
    case types.FETCH_WEEKS_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const fetchWeeksError = (state = null, action) => {
  switch(action.type) {
    case types.FETCH_WEEKS_FAILED: {
      return action.payload.error;
    }
    case types.FETCH_WEEKS_STARTED: {
      return null;
    }
    case types.FETCH_WEEKS_COMPLETED: {
      return null;
    }
    default: {
      return state;
    }
  }
};

export default combineReducers({
  byId,
  order,
  isFetchingWeeks,
  fetchWeeksError,
})

export const getWeek = (state, id) => state.byId[id];
export const getWeeks = state => state.order.map(id => getWeek(state, id));
export const getIsFetchingWeeks = state => state.isFetchingWeeks;
export const getFetchingWeeksError = state => state.fetchWeeksError;