import * as types from './results.types';
import { combineReducers } from 'redux';

const initialTest = (state = null, action) => {
  switch (action.type) {
    case types.FETCH_RESULTS_COMPLETED: {
      return  {
        ...state,
        ...action.payload.initialTest
      }
    }

    default:
      return state;
  }
};

const finalTest = (state = null, action) => {
  switch (action.type) {
    case types.FETCH_RESULTS_COMPLETED: {
      return  {
        ...state,
        ...action.payload.finalTest
      }
    }

    default:
      return state;
  }
};

const improvement = (state = null, action) => {
  switch (action.type) {
    case types.FETCH_RESULTS_COMPLETED: {
      return  {
        ...state,
        ...action.payload.improvement
      }
    }

    default:
      return state;
  }
};

const isFetchingResults= (state = false, action) => {
  switch(action.type) {
    case types.FETCH_RESULTS_STARTED: {
      return true;
    }
    case types.FETCH_RESULTS_COMPLETED: {
      return false;
    }
    case types.FETCH_RESULTS_FAILED: {
      return false;
    }

    default: {
      return false;
    }
  }
};

const fetchResultsError = (state = null, action) => {
  switch(action.type) {
    case types.FETCH_RESULTS_STARTED: {
      return null;
    }

    case types.FETCH_RESULTS_COMPLETED:  {
      return null;
    }

    case types.FETCH_RESULTS_FAILED: {
      return action.payload.error;
    }

    default:
      return state;
  }
};

const results = combineReducers({
  initialTest,
  finalTest,
  improvement,
  isFetchingResults,
  fetchResultsError
});

export default results;

export const getInitialTestResult= state => state.initialTest ? state.initialTest : null;
export const getFinalTestResult = state => state.finalTest ? state.finalTest : null;
export const getImprovement = state => state.improvement ? state.improvement : null;
export const getIsFetchingResults = state => state.isFetchingResults;
export const getFetchResultsError = state => state.fetchResultsError;
